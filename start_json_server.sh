#!/bin/bash
source ${HOME}/.bashrc

nohup json-server --watch /home/li/app/li-nav/db.json --host 0.0.0.0 --port 10004  2>&1 &

echo "$!" > /home/li/app/li-nav/json_server.pid

