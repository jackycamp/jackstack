name:PVC Pre-Reqs in EKS
date:08/02/2024
label:programming

# PVC Pre-Requisites in EKS

> this page is under construction

## Background

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

## An analogy

Consider a space station with docking bays.

## Create an IAM OIDC provider for our cluster

Using the AWS Management Console, navigate to your cluster in EKS and note the OpenID Connect provider URL.
This should exist in the Details section on the Overview tab.

Now, navigate to the IAM console. In the left sidebar, choose Identity Providers under Access Management.
If your provider URL (noted earlier) appears in the list then your cluster already has a provider.

To create one, click the Add provider button, and use the OpenID Connect Provider type.
Enter the url noted earlier for the Provider URL. For audience, enter sts.amazonaws.com
and then create!

Feel free to check out the AWS guide for more info:

[AWS - Create an IAM OIDC provider for your cluster](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html)

## Create an IAM role for the EBS CSI plugin

If you don't already have your OIDC provider url retrieve like so:

```bash
aws eks describe-cluster --name my-cluster --query "cluster.identity.oidc.issuer" --output text
>>>https://oidc.eks.us-east-2.amazonaws.com/id/EXAMPLED539D4633E53DE1B71EXAMPLE
```

Feel free to check out the AWS guide for more info:

[AWS EBS CSI Step 1: Create an IAM role](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#csi-iam-role)

## References
