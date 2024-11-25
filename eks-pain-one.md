name:EKS Pain Part I
date:08/24/2023
label:programming

# EKS Pain Part I

## node selectors not working in aws eks

TLDR; aws doesn't auto add tags to your ASG's when your node groups have kubernetes labels. You'll have to manually add them.

Consider the following scenario:

You have a cluster in EKS with a cluster-autoscaler. You have node groups that you prefer to keep at 0 when you don't have active jobs running.

If you have a cluster-autoscaler setup for your cluster, this means that you have already configured the auto-scaling groups (ASG's) for your node groups.

When you create an EKS managed nodegroup, AWS will automatically create ASG's for the nodegroup. AWS will also add some 'tags' to the nodegroups (especially if you have a cluster-autoscaler already setup).

However, and this is the pain point, if you are using node selectors in your job manifests, and if you prefer to keep certain node groups at a desired size of 0 (maybe you're running some beefy instances under the hood and wish to save costs), your autoscaler won't be able to identify which node groups you're selecting.

Luckily, the fix is quite simple. So simple it's painful.

Let's assume you have a node group with the following kubernetes labels (set up through the aws console):

```bash
label: foo, value: bar
label: baz, value: buzz
```

Go to your nodegroups (in the aws console), and ensure they have the following tags:

```bash
key: k8s.io/cluster-autoscaler/node-template/label/foo
value: bar

key: k8s.io/cluster-autoscaler/node-template/label/baz
value: buzz
```

references
https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-can-i-scale-a-node-group-to-0
