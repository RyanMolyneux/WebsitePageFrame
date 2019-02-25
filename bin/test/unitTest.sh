#!/bin/bash

UNIT_TEST_DIRECTORY="$PWD/tst/unit"

echo "-------------------------"
echo "|  UNIT TESTS STARTED   |"
echo "-------------------------"

jasmine --config="$UNIT_TEST_DIRECTORY/jasmine.json"


echo "-------------------------"
echo "|  UNIT TESTS FINISHED  |"
echo "-------------------------"
