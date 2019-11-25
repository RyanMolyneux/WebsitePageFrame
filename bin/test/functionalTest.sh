#!/bin/bash

FUNCTIONAL_TEST_FOLDER="$PWD/tst/functional"

echo "----------------------------------------"
echo "| PREPARING INTEGRATION TEST RESOURCES |"
echo "----------------------------------------"

echo "webpack is bundling client javascript..."

npm run client-build

echo "--------------------------------"
echo "| STARTING TEST WEBSITE SERVER |"
echo "--------------------------------"

node "$FUNCTIONAL_TEST_FOLDER/scenarios/nodeServer.js" "$FUNCTIONAL_TEST_FOLDER/scenarios/" &
NODE_TEST_WEBSITE_PID=$!


echo "-----------------------------"
echo "| FUNCTIONAL TEST STARTING |"
echo "-----------------------------"

jasmine --config="$FUNCTIONAL_TEST_FOLDER/jasmine.json" --color;

echo "----------------------------"
echo "| FUNCTIONAL TEST FINISHED |"
echo "----------------------------"


echo "-------------------------------"
echo "| STOPPING TEST WEBSITE SERVER |"
echo "-------------------------------"
kill $NODE_TEST_WEBSITE_PID
