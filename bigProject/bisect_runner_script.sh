#!/bin/bash
TEST_DIR="C:\\פרויקטים\\Test2"

echo "Starting runner script"

C:/פרויקטים/Test2/node_modules/.bin/start-server-and-test \
  "cd bigProject/apps/client && npm install && cd ../../../ && npx nx run client:start" \
  http://localhost:5180 \
  "cd C:/פרויקטים/Test2 && npx jest bigProject/test/divide.test.js"
echo "Finishing runner script"
exit $?