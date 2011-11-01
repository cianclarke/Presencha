#!/bin/bash
hash jsduck 2>&- || { echo >&2 "I require jsduck but it's not installed.  Aborting."; exit 1; }
jsduck --title="Presencha" -o ./docs/ app.js ./app/controller/* ./app/model/* ./app/store/* ./app/view/*
