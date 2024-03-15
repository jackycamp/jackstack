name:ctr cheat sheet
date:08/27/2023
label:programming

# containerd cli cheat sheet

### collection of ctr commands and explanations that i reference frequently.

**pull an image**

```bash
ctr image pull my-repo/my-image:latest
```

**running containers**

basic usage

```bash
ctr run my-repo/my-image:latest my-container
```

run a container with a mount

```bash
ctr run --rm \
--mount type=bind,src=/path/on/host,dst=/path/in/container,options=rbind:rw \
my-image:latest my-container
```

run a container interactively

```bash
sudo ctr run \
-t --rm \
--mount type=bind,src=/path/on/host,dst=/path/in/container,options=rbind:rw \
my-image:latest my-container /bin/bash
```

