#!/bin/bash

FUNCTIONAL_TEST_FOLDER="$PWD/tst/functional"

echo "----------------------------------------"
echo "| PREPARING INTEGRATION TEST RESOURCES |"
echo "----------------------------------------"

echo "webpack is bundling client javascript..."

webpack "$FUNCTIONAL_TEST_FOLDER/client/script.js" -o "$FUNCTIONAL_TEST_FOLDER/client/bundle.js"

echo "--------------------------------"
echo "| STARTING TEST WEBSITE SERVER |"
echo "--------------------------------"

node "$FUNCTIONAL_TEST_FOLDER/test-website/startServer.js" "$FUNCTIONAL_TEST_FOLDER/test-website/" &
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

echo "---------------------------------------"
echo "| REMOVING FUNCTIONAL TEST RESOURCES |"
echo "---------------------------------------"

echo "removing bundled client javascript...";
rm "$FUNCTIONAL_TEST_FOLDER/client/bundle.js";
