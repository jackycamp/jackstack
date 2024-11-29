# How to setup an auto-scaling cluster in Elastic Kubernetes Service

I've reliably used this guide to scaffold three auto-scaling clusters in AWS EKS.
For the most part, this guide uses the AWS console to setup everything, which has its trade-offs.

This guide assumes that you have kubectl and aws-cli-v2 installed on your machine.

## Create the Cluster

Navigate to the EKS Clusters page and click Add cluster -> Create.

![create-cluster](assets/create-cluster.png)

On the next page, give your cluster a name, select a kubernetes version (I used 1.27), and
select the Cluster Service Role.

If you don't have a Cluster Service Role yet, it's pretty easy to create one following aws's
linked guide, but TLDR; just create an IAM role and attach the policy: `AmazonEKSClusterPolicy` to it.
This should be the only policy needed. The json below the screenshot includes what that policy looks like.
This is just default stuff.

![configure-cluster](assets/configure-cluster.png)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "autoscaling:DescribeAutoScalingGroups",
        "autoscaling:UpdateAutoScalingGroup",
        "ec2:AttachVolume",
        "ec2:AuthorizeSecurityGroupIngress",
        "ec2:CreateRoute",
        "ec2:CreateSecurityGroup",
        "ec2:CreateTags",
        "ec2:CreateVolume",
        "ec2:DeleteRoute",
        "ec2:DeleteSecurityGroup",
        "ec2:DeleteVolume",
        "ec2:DescribeInstances",
        "ec2:DescribeRouteTables",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSubnets",
        "ec2:DescribeVolumes",
        "ec2:DescribeVolumesModifications",
        "ec2:DescribeVpcs",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DescribeAvailabilityZones",
        "ec2:DetachVolume",
        "ec2:ModifyInstanceAttribute",
        "ec2:ModifyVolume",
        "ec2:RevokeSecurityGroupIngress",
        "ec2:DescribeAccountAttributes",
        "ec2:DescribeAddresses",
        "ec2:DescribeInternetGateways",
        "ec2:DescribeInstanceTopology",
        "elasticloadbalancing:AddTags",
        "elasticloadbalancing:ApplySecurityGroupsToLoadBalancer",
        "elasticloadbalancing:AttachLoadBalancerToSubnets",
        "elasticloadbalancing:ConfigureHealthCheck",
        "elasticloadbalancing:CreateListener",
        "elasticloadbalancing:CreateLoadBalancer",
        "elasticloadbalancing:CreateLoadBalancerListeners",
        "elasticloadbalancing:CreateLoadBalancerPolicy",
        "elasticloadbalancing:CreateTargetGroup",
        "elasticloadbalancing:DeleteListener",
        "elasticloadbalancing:DeleteLoadBalancer",
        "elasticloadbalancing:DeleteLoadBalancerListeners",
        "elasticloadbalancing:DeleteTargetGroup",
        "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
        "elasticloadbalancing:DeregisterTargets",
        "elasticloadbalancing:DescribeListeners",
        "elasticloadbalancing:DescribeLoadBalancerAttributes",
        "elasticloadbalancing:DescribeLoadBalancerPolicies",
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeTargetGroupAttributes",
        "elasticloadbalancing:DescribeTargetGroups",
        "elasticloadbalancing:DescribeTargetHealth",
        "elasticloadbalancing:DetachLoadBalancerFromSubnets",
        "elasticloadbalancing:ModifyListener",
        "elasticloadbalancing:ModifyLoadBalancerAttributes",
        "elasticloadbalancing:ModifyTargetGroup",
        "elasticloadbalancing:ModifyTargetGroupAttributes",
        "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
        "elasticloadbalancing:RegisterTargets",
        "elasticloadbalancing:SetLoadBalancerPoliciesForBackendServer",
        "elasticloadbalancing:SetLoadBalancerPoliciesOfListener",
        "kms:DescribeKey"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "iam:CreateServiceLinkedRole",
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "iam:AWSServiceName": "elasticloadbalancing.amazonaws.com"
        }
      }
    }
  ]
}
```

Moving onto networking, you can leave all of these settings as the default.
Ensure that the VPC specified is vpc-2144fa4a (which is the default for the pyrologix aws account)
and ensure that the subnets are respective of us-east-2 a,b,c.

You’ll also want to ensure that Cluster endpoint access is Public.

You don't need to worry about the Security Groups field, aws will generate one
automatically and we will mess with it later.

![cluster-networking](assets/cluster-networking.png)

Next, configure logging. I want all the logs.

![config-cluster-logging](assets/config-cluster-logging.png)

Select add-ons, should look like this:

![choose-cluster-addons](assets/choose-cluster-addons.png)

You can leave the defaults for the add-ons.

![config-cluster-addons](assets/config-cluster-addons.png)

After reviewing, click create!

![review-cluster-create](assets/review-cluster-create.png)

The cluster will be in a Creating state for several minutes.
But once the Cluster security group becomes available, click on the security group link.
It will bring you to the Security Groups page.

![after-cluster-create](assets/after-cluster-create.png)

The name for this security group is auto-generated and the first inbound/outbound rules are auto-generated.
If you want, you can whitelist IP’s here so that those IP’s can ssh into the nodes.

Even if the node groups' launch templates have remote access configured,
you still need to whitelist IP’s for the cluster’s security group otherwise
you won’t be able to connect (or ssh into the nodes).

Open up a terminal, and let's check that you can see the cluster.

```bash
aws eks list-clusters
```

You should see something like

```bash
jack@Jacks-MBP-2 ~ % aws eks list-clusters

{
  "clusters": [
    "my-cluster-name"
  ]
}
```

That's it, you successfully created a Kubernetes cluster in EKS. Here's a ⭐
But, we've only just begun...

## Access the Cluster Locally

Now we can add the cluster to our local kubeconfig. In your terminal run:

```bash
aws eks update-kubeconfig --region us-east-2 --name my-cluster-name
```

Don't worry if you don't have a kubeconfig, this command will create one for you.
This command will automatically switch to the cluster's context.

Let's just double check that the cluster was added and that our current context
points to it:

```bash
kubectl config get-contexts

CURRENT NAME   AUTHINFO       CLUSTER           NAMESPACE
*       arn:aws:eks:us-east-2:598028:cluster/my-cluster-name arn:aws:eks:us-east-2:598028:cluster/my-cluster-name ...
```

Also, verify the cluster-info command:

```bash
kubectl cluster-info

Kubernetes control plane is running at https://4839483928490.gr7.us-east-2.eks.amazonaws.com
CoreDNS is running at https://4839483928490.gr7.us-east-2.eks.amazonaws.com/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluste problems, use 'kubectl cluster-info dump'.
```

If you see an error like:

```bash
error: exec plugin: invalid apiVersion "client.authentication.k8s.io/v1alpha1"
```

You probably have an old version of the aws cli installed or perhaps an incompatible
kube client. I recommend [upgrading to awscliv2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

By default, the user or role that created the cluster is the only IAM entity that
has access. Kubernetes has its own permission model, so you need to add additional
users/roles manually. Not necessary to do now, but will be once your teammates
or coworkers need to access it. I'll show how to do this towards the end of this guide.

## Create Node Role

We are going to need an iam role that we can attach to node groups in our cluster.

Navigate to the IAM roles page and click Create role.

![create-node-role](assets/create-node-role.png)

Choose **Custom trust policy** under **Select trusted entity** and copy the following policy into
the editor.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

![node-role-trust-policy](assets/node-role-trust-policy.png)

Then, add the following policies:

```
AmazonEC2ContainerRegistryReadOnly
AmazonEKS_CNI_Policy
AmazonEKSWorkerNodePolicy
```

If you want to add customer-defined policies you can add those here as well.
For example, you may want to give the nodes read-only access to an s3 bucket.

You can simply search for and check the policy names.

![node-role-permission-policies](assets/node-role-permission-policies.png)

When you're finished attaching policies, click next, give the role a name and description,
and then click Create. Remember the node role's name as we will be attaching it to node groups
later in this guide.

## Add a Node Group

Now we are going to add a node group, which will house what I like to call our "admin"
pods.

Navigate to your cluster in EKS and click on the **Compute** tab. Then click on **Add node group**.

![add-node-group](assets/add-node-group.png)

On the configure page, name the node group: `admin-node-group` and, using the iam role we created earlier,
assign the role under the **Node IAM role** part.

![configure-node-group](assets/configure-node-group.png)

You don’t need to add any Kubernetes labels or taints to this node group so once you’ve filled the name and the role, click Next.

In the compute configuration, follow this spec:

```
AMI type: Amazon Linux 2 Arm
Capacity type: On-Demand
Instance type: t4g.large
Disk size: 20GiB
```

![node-group-compute](assets/node-group-compute.png)

For the scaling config, follow this spec:

```
Desired size: 1
Minimum size: 1
Maximum size: 2
```

![node-group-scaling](assets/node-group-scaling.png)

You can keep the defaults for the "Update configuration". Click Next.

For the network config, if you want to allow remote access to nodes, you can set that up here.
Just choose the proper ec2 key pair and security groups. You can also generate these pretty easily
to add your IP to the allowlist.

![node-group-networking](assets/node-group-networking.png)

Click next when you're finished. The node group will be in a creating state for a few minutes.

Once it's done creating, we should see some nodes in our cluster:

```bash
kubectl get nodes

NAME                                            STATUS    ROLES    AGE    VERSION
ip-172-31-18-97.us-east-2.compute.internal      Ready     <none>   3m29s  v1.27.5-eks-43840fb
```

Now take this yml and stick it in a file called: `hello-world-job.yml`.

```json
apiVersion: batch/v1
kind: Job
metadata:
  name: hello-world-job
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: hello-world
        image: hello-world
```

Then, let's run our job:

```bash
kubectl apply -f hello-world-job.yml
```

Then let's check on our job:

```bash
kubectl get jobs

NAME              COMPLETIONS   DURATION    AGE
hello-world-job   0/1           3s          3s
```

If you're feeling excited, you can check the logs and detailed status of the job.

```bash
kubectl logs jobs/hello-world-job

Hello from Docker!
This message shows that your installation appears to be working correctly.
...


kubectl describe job hello-world-job
```

Congrats on attaching some nodes to your cluster. In theory, you could attempt
to schedule some of your containerized workflows/scripts/apps with this setup.
Though, they are likely to be evicted if they are resource heavy.

It'd be funner if we setup auto-scaling node groups as well.

## Setup Cluster Auto-Scaler (CA)

## Add an Auto-Scaleable Node Group

## Suspend Availability Zone Re-Balancing (optional)

## Schedule a Job and Watch Cluster Auto-Scaler Go BRRRRR

todo

## Setup aws-auth Config Map (optional)

todo

## Conclusion

todo
