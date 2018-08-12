#!/usr/bin/env bash
yum -y update
sudo yum install -y mongodb-org
sudo mkdir -p /data/db