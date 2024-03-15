name:Auto-Scaling Group AZ trolling (EKS pain part II)
date:10/10/2023
label:programming

# EKS Pain Part II

## Availability Zones giving you a hard time

One of our pipelines can scale up to hundreds of concurrent worker nodes in our kubernetes cluster hosted in EKS.

For this particular pipeline, there appeared to be almost random pod eviction. The cluster would scale up to more than 10 nodes, some of them would finish successfully and then some would just be terminated.

I figured there must be some memory shenanigans going on; under the hood, the workflow was running some legacy algorithms written 10 years prior in c++. However, since this was a relatively new cluster, we didn't have any monitoring or logging in place...so what do? You setup a monitoring system of course!

After a day or so, I was able to get a workable prometheus and grafana setup rolled out (we needed it anyway). Back to the original issue, I did some more "issue-recreation" runs and noticed a spike in memory on the nodes whenever this incident occurred.

Kubernetes must know what's going on, it's bound to leave some sort of diagnostic or message in the pod's events, right? RIGHT?!?!
