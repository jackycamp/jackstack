name:Kubectl cheat sheet
date:07/01/2023
label:systems

# kubectl command cheat sheet
### collection of kubectl commands and explanations that i reference frequently.

__apply__

create or update resources in a k8s cluster according to a configuration file.

often used to spin up pods, deployments, jobs, etc.

```bash
kubectl apply -f my-manifest.yml
```

__logs__ 

```bash
# show stdout and stderr for a pod
kubectl logs my-pod

# can also be done for jobs/other resources
# effectively syntactic sugar for the command above
kubectl logs jobs/my-job

# can pinpoint the logs for a particular container in a pod too
kubectl logs jobs/my-job -c my-container
```

__describe__

display information about a resource, includes configuration details, current status, events, etc.
```bash
kubectl describe my-pod
```


__exec__

```bash
# open a shell inside a running container
kubectl exec my-pod -c my-container -- /bin/bash

# execute arbitrary sys commands inside a running container
kubectl exec my-pod -c my-container -- ls /data
```
