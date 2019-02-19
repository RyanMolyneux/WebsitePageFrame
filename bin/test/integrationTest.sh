#!/bin/bash

INTEGRATION_TEST_FOLDER="$PWD/tst/integration/"

echo "----------------------------------------"
echo "| PREPARING INTEGRATION TEST RESOURCES |"
echo "----------------------------------------"

echo "webpack is bundling client javascript...";
webpack "$INTEGRATION_TEST_FOLDER/client/script.js" -o "$INTEGRATION_TEST_FOLDER/client/bundle.js";

echo "-----------------------------"
echo "| INTEGRATION TEST STARTING |"
echo "-----------------------------"

jasmine --config="$INTEGRATION_TEST_FOLDER/jasmine.json";

echo "-----------------------------"
echo "| INTEGRATION TEST FINISHED |"
echo "-----------------------------"

echo "---------------------------------------"
echo "| REMOVING INTEGRATION TEST RESOURCES |"
echo "---------------------------------------"

echo "removing bundled client javascript...";
#rm "$INTEGRATION_TEST_FOLDER/client/bundle.js";
