#!/bin/bash

session="OBTRTA"
window=0

function stop_bot {
  echo "Killing session...";
  tmux kill-session -t $session;
}

function start_bot {
  echo "Creating session";
  tmux new-session -d -s $session;
  tmux rename-window -t $session:$window 'bot';
  echo "Runing bot...";
  tmux send-keys -t $session:$window 'npm start' C-m;
}

function help_params {
  echo "Parameters:";
  echo "'start' - for start bot";
  echo "'stop' - for stop bot";
  echo "'restart' - for restart bot";
}

case $1 in
  start)
    start_bot;;
  restart)
    stop_bot;
    start_bot;;
  stop)
    stop_bot;;
  help)
    help_params;;
  *)
    echo "This parameter was wrong. Write help if you want see parameters list.";;
esac