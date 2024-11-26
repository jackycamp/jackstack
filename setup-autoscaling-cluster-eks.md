# How to setup an auto-scaling cluster in Elastic Kubernetes Service

I've used this guide to scaffold three auto-scaling clusters in AWS EKS.
For the most part, this guide uses the AWS console to setup everything, which has its trade-offs.

This guide assumes that you have kubectl and aws-cli-v2 installed on your machine.

## Create the Cluster

todo

## Access the Cluster Locally

## Create Node Role

## Add a Node Group

Now we are going to add a node group, which will house what I like to call our "admin"
pods.

## Test by Scheduling a Job

## Setup Cluster Auto-Scaler (CA)

## Add an Auto-Scaleable Node Group

## Suspend Availability Zone Re-Balancing (optional)

## Schedule a Job and Watch Cluster Auto-Scaler Go BRRRRR

todo

## Setup aws-auth Config Map (optional)

todo

## Conclusion

todo
