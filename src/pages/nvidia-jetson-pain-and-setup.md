name:Nvidia Jetson Orin Nano Setup Pain
date:04/29/24
label:programming

# Nvidia Jetson Orin Nano Dev Kit Setup Pain

I ordered an Nvidia Jetson Orin Nano Dev Kit. ANDDDDDD... it wouldn't boot.
Following the getting started guide and everything but no dice.

So I attempted to flash it manually. Turns out, this is really really painful
when you don't have an ubuntu host. Despite the torture, I came away with a solution.

Also, Nvidia is a multi-trillion dollar company. It's pretty baffling that the documentation
and releases around Jetson Developer products are such a mess..

## Host Setup

It is preferred to have an Ubuntu host to download the SDKManager and natively flash the OS on the jetson device.
But, I don't really like Ubuntu, so I setup an Ubuntu docker container on my Debian box.

In summary, we're going to have a debian amd64 host running an amd64 ubuntu docker container with some architectural emulation capabilities.

This assumes that you have docker installed, but if you don't you can follow these [instructions](https://docs.docker.com/engine/install/debian/) (pretty straightforward).

```bash
# install QEMU
sudo apt-get update
sudo apt-get install qemu qemu-user-static

# auto-configure QEMU, under the hood configures binfmt_misc
# to recognize and handle/execute non-native binaries
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes

# then we're going to verify that emulation is working properly
# if everything is working, this command should return aarch64
docker run --rm -t arm64v8/ubuntu uname -m
```

Now, we can run arm64 containers on our amd64 debian host. Conveniently, the steps above will
not affect previously working non-emulated software or containers running on our system.

## Launch Ubuntu Docker Container

We are going to launch an amd64 ubuntu container that has all of the dependencies and scaffolding
needed for sdkmanager, but we're not actually going to use sdkmanager.

I tried multiple times to use sdkmanager via cli and it's just simply broken. But, following these steps allows us
to be confident that we have all of the dependencies we need to flash.

```bash
git clone https://github.com/atinfinity/sdk_manager_docker.git
cd sdk_manager_docker
```

Download [sdkmanager-1.9.3.10904](https://developer.nvidia.com/downloads/sdkmanager/secure/clients/sdkmanager-1.9.3.10904/sdkmanager_1.9.3-10904_amd64.deb) and place in the `sdk_manager_docker` directory.

wget didn't work for me to download this so you may have to download manually from your browser.

Then build the docker image with our preferred version of the sdkmanager.

```bash
docker build --build-arg SDK_MANAGER_VERSION=1.9.3-10904 --build-arg GID=$(id -g) --build-arg UID=$(id -u) -t jetpack .

# then launch the container using the script
sudo ./launch_container.sh
```

Under the hood, `launch_contianer.sh` will mount usb locations in a read write fashion as well as other important configs
for the docker container. I'd recommend taking a look at the `docker run` command in `launch_container.sh` as it's really
the bread and butter.

## Download and Prepare Jetson Linux (the goods to flash)

We will be using Jetson Linux 35.5.0 as it uses Jetpack 5.1.3 which seems
to be the most stable version of Jetpack at the time of writing.

```bash
# i recommend using an empty directory
mkdir jetson-linux && cd jetson-linux

# download Driver Package
wget https://developer.nvidia.com/downloads/embedded/l4t/r35_release_v5.0/release/jetson_linux_r35.5.0_aarch64.tbz2

# download sample root file system
wget https://developer.nvidia.com/downloads/embedded/l4t/r35_release_v5.0/release/tegra_linux_sample-root-filesystem_r35.5.0_aarch64.tbz2

# untar the driver package
# you should see a Linux_for_Tegra directory appear that has all the goods
tar xf jetson_linux_r35.5.0_aarch64.tbz2

# untar the sample file system and place in Linux_for_Tegra/rootfs/
sudo tar xpf tegra_linux_sample-root-filesystem_r35.5.0_aarch64.tbz2 -C Linux_for_Tegra/rootfs/
```

Take a look at the `Linux_for_Tegra` directory and you'll notice a `flash.sh` script. This will be our golden ticket.
But before we get there, we need to setup our hardware!

## Jetson Orin Nano Setup

These instructions assume your jetson orin nano board is powered off and not connected to the host.

Take a female-to-female DuPont jumper cable and connect it to pins 9 and 10 of the button headers
on the board. Not to be confused with the obvious 40 pin header, the button headers are located sneakily
under the orin module; the little crevice in between the main board and the orin module. These pins are labeled FOC REC
and GND.

Then connect a USB-C cable to your host and the board and then connect the board to power.
This will boot up the board in Forced Recovery mode which is required for flashing.

After the device boots, go back to the shell you have in your docker container.

```bash
lsusb
```

You should notice an entry corresponding to your board. It should say nvidia something or other.
If you don't see this entry, either docker doesn't see the device or the host doesn't recognize the device.
If this happens, try the above process again or recreate your docker container's shell session.

Assuming you do see the entry though, you can remove the jumper cable.

## Flash it

In your docker container, navigate to the `Linux_for_Tegra` directory. We are going to run the `flash.sh` script.

```bash
cd Linux_for_Tegra
sudo ./flash.sh jetson-orin-nano-devkit internal
```

This will start the flash process using the internal SD card.
This process should take about 20 minutes or so.

If you would rather flash the OS onto an nvme drive or some other device, the flash command will be a little bit different.
Check out the examples part of `flash.sh` to find the right command for you.

```bash
# pulled from examples in flash.sh
./flash.sh <target_board> internal                    - boot <target_board> from on-board device (eMMC/SDCARD)
./flash.sh <target_board> external                    - boot <target_board> from external device
./flash.sh <target_board> mmcblk0p1                   - boot <target_board> from eMMC
./flash.sh <target_board> mmcblk1p1                   - boot <target_board> from SDCARD
./flash.sh <target_board> sda1                        - boot <target_board> from USB device
./flash.sh <target_board> nvme0n1                     - boot <target_board> from NVME storage device
./flash.sh -N <IPaddr>:/nfsroot <target_board> eth0   - boot <target_board> from NFS
./flash.sh -k LNX <target_board> mmcblk1p1            - update <target_board> kernel
./flash.sh -k EBT <target_board> mmcblk1p1            - update <target_board> bootloader
```

Upon flash completion, you should see something like:

```bash
[ 1234.7217 ] tegradevflash_v2 --write B_MEM_BCT mem_coldboot_sigheader.bct.encrypt
[ 1234.7259 ] Bootloader version 01.00.0000
[ 1234.7842 ] Writing partition B_MEM_BCT with mem_coldboot_sigheader.bct.encrypt [ 243712 bytes ]
[ 1234.7866 ] [................................................] 100%
[ 1237.7862 ] Flashing completed

[ 1237.7865 ] Coldbooting the device
[ 1237.7908 ] tegrarcm_v2 --chip 0x23 0 --ismb2
[ 1237.7947 ] MB2 version 01.00.0000
[ 1237.8520 ] Coldbooting the device
[ 1237.8564 ] tegrarcm_v2 --chip 0x23 0 --reboot coldboot
[ 1237.8604 ] MB2 version 01.00.0000
*** The target t186ref has been flashed successfully. ***
Reset the board to boot from internal eMMC.
```

Go ahead and power down the board, disconnect from the debian host, remove the jumper cable if you haven't,
connect the peripherals/monitor, and power it back up.

## First Boot

And just like that, you're in.

Let's go ahead and setup python3 real quick so we can run a cool visualization/monitoring tool on our system.

```bash
sudo apt update
sudo apt install python3-pip
sudo pip3 install -U jetson-stats
# you'll probably have to reboot

# finally...
jtop
```

## References
