#!/bin/bash

INTEGRATION_TEST_FOLDER="$PWD/tst/integration"

echo "----------------------------------------"
echo "| PREPARING INTEGRATION TEST RESOURCES |"
echo "----------------------------------------"

echo "webpack is bundling client javascript..."

webpack "$INTEGRATION_TEST_FOLDER/client/script.js" -o "$INTEGRATION_TEST_FOLDER/client/bundle.js"

echo "--------------------------------"
echo "| STARTING TEST WEBSITE SERVER |"
echo "--------------------------------"

node "$INTEGRATION_TEST_FOLDER/test-website/startServer.js" "$INTEGRATION_TEST_FOLDER/test-website/" &
NODE_TEST_WEBSITE_PID=$!


echo "-----------------------------"
echo "| INTEGRATION TEST STARTING |"
echo "-----------------------------"

jasmine --config="$INTEGRATION_TEST_FOLDER/jasmine.json" --color;

echo "-----------------------------"
echo "| INTEGRATION TEST FINISHED |"
echo "-----------------------------"


echo "-------------------------------"
echo "| STOPPING TEST WEBSITE SERVER |"
echo "-------------------------------"
kill $NODE_TEST_WEBSITE_PID

echo "---------------------------------------"
echo "| REMOVING INTEGRATION TEST RESOURCES |"
echo "---------------------------------------"

echo "removing bundled client javascript...";
rm "$INTEGRATION_TEST_FOLDER/client/bundle.js";
