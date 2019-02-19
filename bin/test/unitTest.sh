#!/bin/bash

CURRENT_DIRECTORY=$PWD

echo "-------------------------"
echo "|  UNIT TESTS STARTED   |"
echo "-------------------------"

jasmine --config="$CURRENT_DIRECTORY/tst/unit/jasmine.json"


echo "-------------------------"
echo "|  UNIT TESTS FINISHED  |"
echo "-------------------------"
