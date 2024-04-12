name:Swapping Ingress Controller in an Afternoon
date:04/11/2024
label:programming

# Swappin' an Ingress Controller in an Afternoon

One of our legacy api's ran on a single raw ec2 instance for quite some time. A couple of weeks ago, this api started to be used a lot more than expected. We noticed deploying new versions also led to some service interruptions.

It was a single instance, after all.

So I threw this in our cluster behind a **Deployment** and a corresponding **Ingress**.

I was able to **curl** and verify the routing was working. But... HTTPS requests were failing.

To my surprise, the cluster never supported HTTPS traffic; the services it exposes don't require such security measures anyway. I discovered the cluster's ingress controller was the [default ingress-nginx deployment](https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml) recommended by [kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx).

And by default, TLS is terminated in the ingress controller. So I started down the road of getting the TLS cert and key (associated with the domain of the api) until I realized the cert was issued by AWS Certificate Manager. For those who don't know, ACM doesn't expose private keys to users. :\

Hmm, quite the dilemma I'll say!

luckily, kubernetes/ingress-nginx has a section describing terminating TLS in the Network Load Balancer. [https://kubernetes.github.io/ingress-nginx/deploy/#tls-termination-in-aws-load-balancer-nlb]().

I checked out the manifest, seemed pretty straight forward. I decided to essentially swap the current ingress controller configuration for this new one. As a side effect, it would mean going from a **Classic Load Balancer** to a **Network Load Balancer**.

So a very rough outline of routing would look like:

```
request to https://api.my-domain.com -> A record in route53 -> Network Load Balancer -> TLS (443) -> Cluster's Ingress Controller -> Api Ingress -> Api.
```

And so it begins.

First, we download the new ingress-controller's manifest, and update some properties:

```bash
wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/aws/nlb-with-tls-termination/deploy.yaml

# Update the cidr in the controller's ConfigMap
proxy-real-ip-cidr: MY-VPC-IPV4-CIDR

# Update the arn of the tls cert in controller's Service
service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:my-cert-arn-in-acm
```

At first I fumbled a bit with the api's ingress definition, thinking we might need
an HTTPS annotation but I ultimately settled on this:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-api-ingress
  namespace: default
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
    - host: api.my-domain.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-api-service
                port:
                  number: 80
```

Now before we deploy our new ingress controller, let's do a little cleanup.

```bash
# find all the resources associated with the current ingress-nginx deployment
kubectl get all --selector=app.kubernetes.io/name=ingress-nginx --all-namespaces

# then PURGE
kubectl delete deployment ingress-nginx-controller --namespace=ingress-nginx
kubectl delete service ingress-nginx-controller --namespace=ingress-nginx # gonna take a min
kubectl delete service ingress-nginx-controller-admission --namespace=ingress-nginx
kubectl delete job ingress-nginx-admission-create --namespace=ingress-nginx
kubectl delete job ingress-nginx-admission-patch --namespace=ingress-nginx
```

Conveniently, after purging the ingress-nginx-controller service, this will also tear down the old Classic Load Balancer automatically.

It is time; time to deploy.

```bash
kubectl apply -f deploy.yaml
```

Watch with glory as your new controller and load balancer are created. And don't forget to point your A records to the new load balancer! After a few minutes, everything should propagate, and you should be able to make https requests to your api.

Not so scary right? Just a typical Thursday.

By the way, here's my interpretation of the cost/capability differences for aws load balancer types. In general, an NLB is a good choice for kubernetes environments and the cost difference doesn't seem that significant.

**Classic Load Balancer (CLB)**

- least expensive and least capabilities.
- $0.025 per hour, for simpler use-cases (legacy).

**Application Load Balancer (ALB)**

- $0.0225 per Load Balancer Capacity Unit hour.
- designed for web apps and container based apps requiring more complex routing capabilities.

**Network Load Balancer (NLB)**

- most expensive and most capability.
- $0.0225 per hour + $0.006 per LCU hour.
- better performance.
- generally more suitable for kubernetes requirements.

**Resources**

[original ingress controller](https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.0/deploy/static/provider/cloud/deploy.yaml)

[ingress controller with NLB and TLS termination](https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/aws/nlb-with-tls-termination/deploy.yaml)

[https://kubernetes.github.io/ingress-nginx/deploy]()
