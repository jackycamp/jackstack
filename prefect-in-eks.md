name:Prefect in EKS
date:08/10/2024
label:programming

# Prefect in EKS Basic Setup Guide

> this page is under construction

Want to run `prefect` `flows` on your EKS cluster? Let me show you how I set this up.

This guide assumes you have an EKS cluster running and helm installed.

## Background

One of the things I like about prefect is it allows you to "bring-your-own-cluster".

In this guide, we're going to setup a prefect-server that runs in our EKS cluster. The prefect-server will
use a bundled postgres database to store its application data. We'll also create a `Kubernetes` work-pool
that is managed by prefect and this will also require a prefect-worker so that prefect can schedule flows on
the cluster.

To boil it down, there will be 3 prefect pods running in our cluster:

1. The prefect-server pod
2. The prefect-postgresql pod
3. The prefect-worker pod

## Install EKS CSI Driver add-on

Follow my guide on that [here](http://jackstack.lol/pages/pvc-prereqs-in-eks.html)

## Setup prefect-0 node group

## Setup `prefect-auth` secret

## Setup `prefect-pg-secret`

## Setup `prefect-server-ingress`

## Install `prefect-server` via helm

## Setup a `default-prefect-workpool` using the prefect cli

## Install `prefect-worker` via helm

## Setup prefect-postgres secret

TODO:

## Setup prefect-server values.yml

First let's download the values.yml file

```bash
wget https://raw.githubusercontent.com/PrefectHQ/prefect-helm/main/charts/prefect-server/values.yaml
```

TODO: show how to change the values.yml so reflect our secret

## Installing prefect-server

```bash
helm repo add prefect https://prefecthq.github.io/prefect-helm
helm install prefect-server prefect/prefect-server -f values.yml
```

## Resources

[prefect-helm repo](https://github.com/PrefectHQ/prefect-helm)

[prefect-server instructions](https://github.com/PrefectHQ/prefect-helm/tree/main/charts/prefect-server)

[prefect-worker instructions](https://github.com/PrefectHQ/prefect-helm/tree/main/charts/prefect-worker)
