name:Path Manager in Python
date:07/01/2023
label:codestuff

# Path Manager in Python

at one of my places of employment we had various systems around geo-processing tools and spatial algorithms; often dealing with a ridiculous number of files on disk.

at the time, it was challenging to know which files were inputs or outputs for the pieces in the system. decent documentation didn't really help either as it was too separate from the code.

some pieces of said system consume the same inputs; the outputs of some pieces may be inputs to some other pieces. as the number of processing modules and number of inputs increased, this became messy, frustrating, and inefficient for our team.

my team agreed we should establish a single entry point and solid interface for all files the system might consume or produce.

we cam up with a list of requirements:

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

