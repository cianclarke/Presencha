#!/bin/bash
hash docblox 2>&- || { echo >&2 "I require Docblox but it's not installed.  Aborting."; exit 1; }
docblox -d . -t ./docs/ -i docs/*  --title "Presencha API"
