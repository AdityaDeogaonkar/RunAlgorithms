export const potdList = [
  {
    id: 2,
    date: "2026-02-07",
    title: "Minimum Deletions to Make String Balanced",
    link: "https://leetcode.com/problems/minimum-deletions-to-make-string-balanced/",
    difficulty: "Medium",
    problemStatement: `
You are given a string \`s\` consisting only of characters 'a' and 'b'.

You can delete any number of characters in \`s\` to make \`s\` **balanced**. \`s\` is **balanced** if there is no pair of indices \`(i,j)\` such that \`i < j\` and \`s[i] = 'b'\` and \`s[j] = 'a'\`.

Return the *minimum number of deletions* needed to make \`s\` **balanced**.
    `,
    approach: `
### Approach: Greedy (Stack Simulation)

1.  **Understand the Goal**: We want the string to look like some number of 'a's followed by some number of 'b's (e.g., "aaabbb"). We strictly cannot have a 'b' appearing before an 'a'.
2.  **Identify Conflict**: The only forbidden pattern is \`"ba"\`.
3.  **Greedy Strategy**: 
    -   Iterate through the string.
    -   Keep a count of \`'b'\`s seen so far (\`countB\`).
    -   If we encounter an \`'a'\`:
        -   Check if we have seen any \`'b'\`s before it (\`countB > 0\`).
        -   If yes, we have a \`"ba"\` conflict. To fix this with minimum deletions, we must delete either the current \`'a'\` or the previous \`'b'\`.
        -   Greedily, we increment our deletion count and conceptually "remove" one 'b' from our count (decrement \`countB\`). Why? Because by deleting one character of the conflicting pair, we resolve that specific conflict.
    -   If we encounter a \`'b'\`, just increment \`countB\`.

### Complexity:
- **Time**: O(N) - Single pass through the string.
- **Space**: O(1) - Only using integer variables.
    `,
    code: `
\`\`\`cpp
class Solution {
public:
    int minimumDeletions(string s) {
        int countB = 0;
        int deletions = 0;
        
        for (char c : s) {
            if (c == 'b') {
                countB++;
            } else { // c is 'a'
                if (countB > 0) {
                    deletions++;
                    countB--;
                }
            }
        }
        
        return deletions;
    }
};
\`\`\`
    `
  },
  {
    id: 1,
    date: "2026-02-06",
    title: "Tuple with Same Product",
    link: "https://leetcode.com/problems/tuple-with-same-product/",
    difficulty: "Medium",
    problemStatement: `
Given an array nums of distinct positive integers, return the number of tuples (a, b, c, d) such that a * b = c * d where a, b, c, and d are elements of nums, and a != b != c != d.
    `,
    approach: `
### Approach: Hash Map (Frequency Counting)

1.  **Use a Hash Map**: 
    -   Iterate through all possible pairs (i, j) in the array.
    -   Calculate their product \`prod = nums[i] * nums[j]\`.
    -   Store the frequency of each product in a map.
2.  **Calculate**:
    -   For every product count \`c\`, the number of tuples is \`8 * (c * (c - 1) / 2)\`.
    `,
    code: `
\`\`\`cpp
class Solution {
public:
    int tupleSameProduct(vector<int>& nums) {
        unordered_map<int, int> productCount;
        int n = nums.size();
        int result = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int product = nums[i] * nums[j];
                result += 8 * productCount[product];
                productCount[product]++;
            }
        }
        return result;
    }
};
\`\`\`
    `
  }
];