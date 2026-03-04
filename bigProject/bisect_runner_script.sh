#!/bin/bash
TEST_DIR="C:\\פרויקטים\\Test2"

echo "Starting runner script 6"

C:/פרויקטים/Test2/node_modules/.bin/start-server-and-test \
  "cd bigProject/apps/client && npm install && npm run dev" \
  http://localhost:5180 \
  "cd C:/פרויקטים/Test2 && npx jest bigProject/test/divide.test.js"
exit $?
  #  && npx jest bigProject/test/divide.test.js && pwd"
# cd $TEST_DIR
# # cd "$(git rev-parse --show-toplevel)" || exit 1
# echo "Running test directory: 2"
# pwd
# # npx jest --detectOpenHandles --forceExit --runInBand "$TEST_FILE"
# npx jest bigProject/test/divide.test.js
# cd $PROJECT_ROOT
# npm install --silent
# echo "Running the app again"
# cd bigProject/apps/client
# npm run dev
# echo "App is up, now running the test: $((5180 + $counter))"
echo "Finishing runner script"