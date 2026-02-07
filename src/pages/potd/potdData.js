export const potdList = [
  {
    id: 1,
    date: "2026-02-07",
    title: "Tuple with Same Product",
    link: "https://leetcode.com/problems/tuple-with-same-product/",
    difficulty: "Medium",
    problemStatement: `
Given an array nums of distinct positive integers, return the number of tuples (a, b, c, d) such that a * b = c * d where a, b, c, and d are elements of nums, and a != b != c != d.
    `,
    approach: `
### Approach: Hash Map (Frequency Counting)

1.  **Understand the Goal**: We need to find count of tuples (a, b, c, d) such that a * b = c * d.
2.  **Key Insight**: Instead of finding four numbers, let's focus on the **product** of pairs. If we find two pairs (a, b) and (c, d) that have the same product P, then they can form a valid tuple.
3.  **Use a Hash Map**: 
    -   Iterate through all possible pairs (i, j) in the array.
    -   Calculate their product \`prod = nums[i] * nums[j]\`.
    -   Store the frequency of each product in a map: \`product_map[prod]\`.
4.  **Calculate the Answer**:
    -   If a product P appears \`k\` times, it means there are \`k\` pairs with that product.
    -   From these \`k\` pairs, we can choose any 2 pairs to form a tuple. The number of ways to choose 2 pairs is \`k * (k - 1) / 2\`.
    -   Each chosen pair of pairs (e.g., pair1 and pair2) can form 8 distinct tuples:
        -   (a, b, c, d), (b, a, c, d), (a, b, d, c), (b, a, d, c) ... and so on.
    -   Wait, a simpler way: For every pair added to the map that already has count \`n\`, it forms \`8 * n\` new tuples with the existing \`n\` pairs.
    -   So, iterate map values. If a product count is \`c\`, the number of tuples is \`8 * (c * (c - 1) / 2)\`.
    
### Complexity:
- **Time**: O(N^2) to iterate all pairs.
- **Space**: O(N^2) to store products in the map.
    `,
    code: `
\`\`\`cpp
class Solution {
public:
    int tupleSameProduct(vector<int>& nums) {
        unordered_map<int, int> productCount;
        int n = nums.size();
        int result = 0;
        
        // Iterate through all pairs
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int product = nums[i] * nums[j];
                // If this product has been seen before, it contributes to the result
                // Each existing pair with the same product can form 8 tuples with the current pair
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
