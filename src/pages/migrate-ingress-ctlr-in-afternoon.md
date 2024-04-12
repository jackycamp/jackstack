name:Swapping Ingress Controller in an Afternoon
date:04/11/2024
label:programming

# Swappin' our Ingress Controller in an Afternoon

One of our legacy api's ran on a single raw ec2 instance for quite some time. A couple of weeks ago, this api started to be used a lot more than expected. We noticed deploying new versions also led to some service interruptions.

It was a single instance, after all.

So I threw this in our cluster behind a **Deployment** and a corresponding **Ingress**.

I was able to **curl** and verify the routing was working.

But... no https...
