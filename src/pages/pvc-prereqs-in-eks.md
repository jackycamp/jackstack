name:PVC Pre-Reqs in EKS
date:08/02/2024
label:programming

# PVC Pre-Requisites in EKS

## Background

In order to use PVC's in EKS, you need to go through a little bit of
setup. These are the steps I followed to get this to work for one such
cluster.

## Terms

Let's make sure we are on the same page about some terms used in this guide.

**Container Storage Interface (CSI)**

The Container Storage Interface is a standard way for container orchestration systems like Kubernetes
to interact with arbitrary block and file storage systems. Vendors and other third-party storage providers (such as EKS)
can develop CSI drivers to expose new storage systems in Kubernetes without messing with core Kubernetes code.

**CSI Driver**

A CSI driver allows vendors/developers to define how Kubernetes interacts with a specific storage system.
Although Kubernetes doesn't particularly care about the underlying storage system as it interacts through a single interface.
For example, there exists a CSI Driver for AWS EBS blocks.

**Persistent Volume (PV)**

Some form of storage that has been provisioned. Just like a `node` is a Kubernetes resource,
a PV is a Kubernetes resource. It has its own life-cycle independent of pods that use this form of storage.

**Persistent Volume Claim (PVC)**

A request for storage by a user. Just as a pod can request specific levels of compute resources (memory, vcpus),
pvc's can request sizes and access modes.

**So, how does this all fit together?**

To summarize, when a user requests a `PVC`, Kubernetes will communicate with the `CSI Driver` to provision a new `PVC`.
The `CSI Driver` creates the actual storage (in this case an EBS block). Once the storage is provisioned, the `PV`
is created and the `PVC` is bound to the `PV`. Then the pod that originally requested the `PVC` will be scheduled.

## Create an IAM OIDC provider for your cluster

You can follow the aws guide below to set this up, it's pretty straight forward.

[AWS - Create an IAM OIDC provider for your cluster](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html)

## Create an IAM role for the EBS CSI plugin

Again, the aws guide is pretty easy to follow, so I just recommend walking through that:

[AWS EBS CSI Step 1: Create an IAM role](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#csi-iam-role)

In my case, I just skipped all the stuff regarding the KMS key.
But make sure you note the role-name used when you create this role. You'll need to specify
it when you install the add-on later.

## Install the Amazon EBS CSI Driver

Now all you gotta do is install the EBS CSI driver, you can do this by using the Amazon EKS add-on.

If you navigate to your cluster in EKS, and select the add-ons tab, and then press the Get more add-ons button.
From here, select the add-on labeled: `Amazon EBS CSI Driver`. Then scroll to the bottom of that page and press Next.

Regarding the IAM role, select the role with the name you created in the step above.

Regarding the version, I picked the version corresponding to the version of my cluster: `v1.27.0-eksbuild.1`.

Then you can click through the rest of the menus. It'll take a couple of mins to install the add-on.

The docs aren't particularly helpful here, but here's the link to the guide anyway:

[AWS EBS CSI Step 2: Get the Amazon EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#managing-ebs-csi)

## Usage

Now, you should be able to specify pvc's in your manifests and EKS should take care of the rest.
If you notice that pv's get stuck provisioning then it's likely an IAM issue...

Standard kubectl commands are pretty helpful for debugging this:

```bash
# use pvcs to find out what the pv is
kubectl get pvcs
# then check out the status of the pv
kubectl describe pv <my-pv>
```
