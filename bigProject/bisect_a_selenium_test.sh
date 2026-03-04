# Usage: ./bisect_a_selenium_test.sh <bad_commit> <good_commit> <test_file>
# e.g. ./bisect_a_selenium_test.sh e56b6bbcf89d82cb8cbb414d70efb889afc8fe66 2041a3a1e35c898922e9c18ebb05f9b9cbdf94b5 bigProject/test/add.test.ts

BAD_COMMIT=$1
GOOD_COMMIT=$2
TEST_FILE=$3

PROJECT_ROOT="/c/פרויקטים/Playground/Playground/"
TEST_DIR="/c/פרויקטים/Test2/"
LOGS_DIR="/c/פרויקטים/dist/bisect"

if [[ -z "$BAD_COMMIT" || -z "$GOOD_COMMIT" || -z "$TEST_FILE" ]]; then
  echo "Usage: $0 <bad_commit> <good_commit> <test_file>"
  echo "Example: $0 abc123 def456 bigProject/test/add.test.ts"
  exit 1
fi

if [[ ! -f "$TEST_FILE" ]]; then
  echo "❌ Test file not found: $TEST_FILE"
  exit 1
fi

echo "🔍 Bisecting test file: $TEST_FILE"
DETAILED_FILE="$LOGS_DIR/selenium_bisect_detailed.txt"
SUMMARY_FILE="$LOGS_DIR/selenium_bisect_summary.txt"
mkdir -p "$LOGS_DIR"
> "$DETAILED_FILE"
> "$SUMMARY_FILE"

echo -e "\n🔍 Starting bisect for: \"$TEST_FILE\""
cd "$PROJECT_ROOT" || exit 1
cd "$(git rev-parse --show-toplevel)" || exit 1
# npm install
git log -1
git bisect start "$BAD_COMMIT" "$GOOD_COMMIT"

echo "▶️ Running test 2: $test_file"

echo "Check this out"
RUNNER_SCRIPT="$TEST_DIR/bigProject/bisect_runner_script.sh"
chmod +x "$RUNNER_SCRIPT"


echo -e "\n🧪 START: $TEST_FILE\n" >> "$DETAILED_FILE"
git bisect run "$RUNNER_SCRIPT" >> "$DETAILED_FILE" 2>&1

BISECT_RESULT=$(grep 'is the first bad commit' "$DETAILED_FILE" | tail -n1 | grep -oE '^[0-9a-f]{7,40}')
if [[ -z "$BISECT_RESULT" ]]; then
  echo "[$TEST_FILE] no bad commit found" >> "$SUMMARY_FILE"
else
  COMMIT_MSG=$(git log -1 --pretty=%s "$BISECT_RESULT")
  echo "[$TEST_FILE] failed first in commit $BISECT_RESULT: $COMMIT_MSG" >> "$SUMMARY_FILE"
fi

echo "✅ Done: $TEST_FILE → $BISECT_RESULT"
git bisect log >> "$DETAILED_FILE"

git bisect reset

echo -e "\n📄 Detailed log: $DETAILED_FILE"
echo -e "📄 Summary log:  $SUMMARY_FILE"
echo "✅ Bisect complete."