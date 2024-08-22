name:Prefect in EKS
date:08/10/2024
label:programming

# Prefect in EKS Basic Setup Guide

> this page is under construction

Want to run `prefect` `flows` on your EKS cluster? Let me show you how I set this up.

This guide assumes you have an EKS cluster running and helm installed.

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
