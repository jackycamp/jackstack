name:eks-getting-started
date:07/01/2023
label:systems

# Noob's guide for creating an EKS cluster
## .. and connecting to it from your mac!

first, create an EKS cluster through the aws console

```bash
TODO: put images and stuff here
```

now you need to install kubectl with homebrew

```bash
brew install kubectl

# if you're a HOMEBREW_NO_AUTO_UPDATE enjoyer
HOMEBREW_NO_AUTO_UPDATE=1 brew install kubectl
```

assuming you have the aws cli set up on your machine, we need to update our local
kubernetes configuration file; basically linking the cluster with our kubernetes cli.

```bash
aws eks update-kubeconfig --region us-east-2 --name my-cluster
```

this command will create/modify the kubernetes config file which lives in __~/.kube/config__.

if you don't have the aws cli set up on your machine, you can follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

now check that it shows information for your cluster
```bash
kubectl cluster-info
```

you should see something like:
```bash
Kubernetes control plane is running at https://SOMETHINGSOMETHING.eks.amazonaws.com
CoreDNS is running at https://SOMETHINGSOMETHING.eks.amazonaws.com/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

but if you see something like:
```bash
error: exec plugin: invalid apiVersion "client.authentication.k8s.io/v1alpha1"
```

that means you probably have an old version of the aws cli on your mac. all you need to do
is install a newer version. following the directions [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

after you upgrade the aws cli, make sure you run the __update-kubeconfig__ command shown above.

now we need to add a node group to our cluster.

```bash
TODO: this happens in the aws console. show images and stuff.
```

let's spin up a pod by applying a basic hello world kubernetes manifest (.yml) file.

```bash
TODO:
```

