#!/bin/bash

SECURITY_TEST_FOLDER="$PWD/tst/security"
npm run client-build

echo "----------------------------------------"
echo "| STARTING SECURITY TEST NODEJS SERVER |"
echo "----------------------------------------"

node "$SECURITY_TEST_FOLDER/scenarios/nodeServer" "$SECURITY_TEST_FOLDER/scenarios" &


if [ $? -eq 0 ]; then

    echo "-----------------------------------------------------"
    echo "| SUCCESSFULLY: STARTED SECURITY TEST NODEJS SERVER |"
    echo "-----------------------------------------------------"

    SECURITY_TEST_NODE_PID=$!;

else

    echo "-----------------------------------------------"
    echo "| FAILED TO START SECURITY TEST NODEJS SERVER |"
    echo "-----------------------------------------------"

    kill $!;

    exit 1;

fi

echo "---------------------------------"
echo "| STARTING SECURITY TEST SCRIPT |"
echo "---------------------------------"


jasmine --config="$SECURITY_TEST_FOLDER/jasmine.json" --color


echo "---------------------------------"
echo "| SECURITY TEST SCRIPT FINISHED |"
echo "---------------------------------"


echo "---------------------------------------------"
echo "| SHUTTING DOWN SECURITY TEST NODEJS SERVER |"
echo "---------------------------------------------"

kill $SECURITY_TEST_NODE_PID;
