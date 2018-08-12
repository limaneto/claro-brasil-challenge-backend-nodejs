#!/usr/bin/env bash
sudo yum -y update
sudo yum install -y mongodb-org
sudo mkdir -p /data/db
sudo npm install