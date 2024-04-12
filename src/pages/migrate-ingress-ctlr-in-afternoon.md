name:Swapping Ingress Controller in an Afternoon
date:04/11/2024
label:programming

# Swappin' our Ingress Controller in an Afternoon

One of our legacy api's ran on a single raw ec2 instance for quite some time. A couple of weeks ago, this api started to be used a lot more than expected. We noticed deploying new versions also led to some service interruptions.

It was a single instance, after all.

So I threw this in our cluster behind a **Deployment** and a corresponding **Ingress**.

I was able to **curl** and verify the routing was working. But... HTTPS requests were failing.

To my surprise, the cluster never supported HTTPS traffic; the services it exposes don't require such security measures anyway. I discovered the cluster's ingress controller was the [default ingress-nginx deployment](https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml) recommended by [kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx).

And by default, TLS is terminated in the ingress controller. So I started down the road of getting the TLS cert and key (associated with the domain of the api) until I realized the cert was issued with AWS Certificate Manager.

For those who don't know, ACM doesn't expose private keys to users. :\
