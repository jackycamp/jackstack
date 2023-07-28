name:Path Manager in Python
date:07/01/2023
label:codestuff

# Path Manager in Python

yeah yeah; i know what you're thinking. a path manager in python? how elementary!

at the surface, i agree. this seems like a trivial problem (why not just maintain a __dict__ and invoke __os.path.join__). but let's say you have dozens of paths and files and this needs to be intuitive for other collaborators.

this is trickier than you might expect.

at one of my places of employment we had various systems around geo-processing tools and spatial algorithms; often dealing with a ridiculous number of files on disk.

at the time, it was challenging to know which files were inputs or outputs for the pieces in the system. decent documentation didn't really help either as it was too separate from the code.

some pieces of said system consume the same inputs; the outputs of some pieces may be inputs to some other pieces. as the number of processing modules and number of inputs increased, this became messy, frustrating, and inefficient for our team.

my team agreed we should establish a single entry point and solid interface for all files the system might consume or produce.

we came up with a list of requirements:

- should be able to hit . and see all the files.
- defining a file or path should be trivial.
- needs to support nested directories.
- always takes care of `os.path.join` for us.
- documenting a path should be easy.

i figured we should be able to define a subclass and instance like so:

```python
class MyPaths:
    foo: "some_path.txt"
    """some info about the foo path"""

    bar: "some_other.txt"
    """bar is used for x"""

mypaths = MyPaths(root="root_dir")
```

behind the scenes, when you access an attribute, the base class will detect whether or not the attribute is a file item, and return the value accordingly. 

if the attribute is a file item, we will join the item's path with the root and return a path string, otherwise, business as usual; we don't want to interfere with any methods or non-file attributes defined in the base class or the subclass.

originally, i went with a decorator approach, heavily inspired by python's `dataclass` implementation.

```python
import os
import types
from functools import partial


def _process_class(cls, root=None):
    # only access user defined attributes
    cls_attributes = {
        name: value for name, value in vars(cls).items() if not name.startswith("__")
    }

    def getter(self, name: str, val: str):
        root = self._root
        if isinstance(root, list):
            return os.path.join(*[*root, val])
        return os.path.join(root, val)
        
    for name, val in cls_attributes.items():
        default = getattr(cls, name)
        _gettr = partial(getter, name=name, val=default)
        prop = property(_gettr)
        setattr(cls, name, prop)

    cls._root = ""
    if root is not None:
        cls._root = root

    return cls


def pathmanager(cls=None, root=None, use_posix=False):
    def wrap(cls):
        return _process_class(cls, root, use_posix)

    if cls is None:
        return wrap

    return wrap(cls)


@pathmanager(root='root_dir')
class MyPaths:
    foo = "foo.txt"
    ...
```

this implementation is pretty straight forward. the base path manager function will generate getters on the fly for the attributes defined on the class. those getters are basically just invoking os.path.join and injecting the root where applicable.

BUT.. i decided against this approach.

if we wanted the class to be able to define its own methods and also have intellisense, this becomes non-trivial. there would be quite a bit of complexity in the implementation and it would probably be a pain to maintain.

so, i went with a class based approach; below is skeletal version of the base class.

```python
class PathManager:
    def __init__(self, root: Union[str, List[str]] = []):
        self._root = []

        if isinstance(root, List):
            self._root.extend(root)

        if isinstance(root, str):
            self._root.append(root)
    
    def __getattribute__(self, name: str):
        val = super().__getattribute__(name)

        # ignore private PathManager attributes (could be done more elegantly)
        if name in ["_root"]:
            return val

        # ignore the dunders
        if name.startswith("__") and name.endswith("__"):
            return val

        # handle attributes of type str (just raw string paths or file names)
        if isinstance(val, str):
            return os.path.join(*[*self._root, val])

        # otherwise, just return the val captured from super
        return val
```

and you could subclass it like so

```python
class MyPaths(PathManager):
    foo = "foo.txt"
    bar = "bar.txt"


mypaths = MyPaths(root="root_dir")

mypaths.foo
>>> 'root_dir/foo.txt'
mypaths.bar
>>> 'root_dir/bar.txt'
```

however, what if foo.txt and bar.txt were actually in different directories? but those directories
still had the same parent directory? you could kind of hack the subclass like so:


```python
class MyPaths(PathManager):
    foo = "/foo_parent/foo.txt"
    bar = "/bar_parent/bar.txt"
```

but we don't like hardcoded parent directories (not to mention this would break on windows).

so let me present the __Path__ class.

```python
class Path:
    def __init__(self, raw: str, root: Union[str, List[str]] = []):
        self.raw = raw
        self._root: List[str] = []

        if isinstance(root, List):
            self._root.extend(root)

        if isinstance(root, str):
            self._root.append(root)

    def tostr(self):
        return os.path.join(*[*self._root], self.raw)
```

as you can see, a __Path__ instance has its own root. what i'm thinking here, the user of __PathManager__ could specify either a string or a __Path__ instance for the attributes of the subclass.

when you access an attribute, the base class will check to see if its an instance of __Path__. if it is, 
