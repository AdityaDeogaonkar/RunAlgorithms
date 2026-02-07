export const cheatSheets = [
  {
    id: "time-complexity",
    title: "Time Complexity (Big O)",
    description: "Quick reference for common algorithm complexities.",
    content: `
### Big O Complexity Chart

| Data Structure | Access | Search | Insertion | Deletion |
| :--- | :--- | :--- | :--- | :--- |
| **Array** | O(1) | O(n) | O(n) | O(n) |
| **Stack** | O(n) | O(n) | O(1) | O(1) |
| **Queue** | O(n) | O(n) | O(1) | O(1) |
| **Linked List** | O(n) | O(n) | O(1) | O(1) |
| **Hash Table** | N/A | O(1) | O(1) | O(1) |
| **BST** | O(n) | O(n) | O(n) | O(n) |
| **AVL Tree** | O(log n) | O(log n) | O(log n) | O(log n) |

### Sorting Algorithms

| Algorithm | Best | Average | Worst | Space |
| :--- | :--- | :--- | :--- | :--- |
| **Quick Sort** | O(n log(n)) | O(n log(n)) | O(n^2) | O(log(n)) |
| **Merge Sort** | O(n log(n)) | O(n log(n)) | O(n log(n)) | O(n) |
| **Heap Sort** | O(n log(n)) | O(n log(n)) | O(n log(n)) | O(1) |
| **Bubble Sort** | O(n) | O(n^2) | O(n^2) | O(1) |
    `
  },
  {
    id: "bfs-dfs",
    title: "Graph Traversals (BFS & DFS)",
    description: "Standard templates for Breadth-First Search and Depth-First Search.",
    content: `
### Breadth-First Search (BFS)
Used for finding the shortest path in unweighted graphs.

```cpp
void bfs(int startNode, vector<vector<int>>& adj, int n) {
    vector<bool> visited(n, false);
    queue<int> q;

    visited[startNode] = true;
    q.push(startNode);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " "; // Process node

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}
```

### Depth-First Search (DFS)
Used for exploring all paths, cycle detection, and topological sort.

```cpp
void dfs(int u, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;
    cout << u << " "; // Process node

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v, adj, visited);
        }
    }
}
```
    `
  },
  {
    id: "sliding-window",
    title: "Sliding Window Pattern",
    description: "Template for variable-size sliding window problems.",
    content: `
### Sliding Window Template
Commonly used for finding the longest/shortest substring with a condition.

```cpp
int slidingWindow(string s) {
    int left = 0, right = 0;
    int n = s.length();
    int maxLength = 0;
    
    // Map to store frequency or other state
    unordered_map<char, int> count;

    while (right < n) {
        // 1. Expand window
        char c = s[right];
        count[c]++;
        
        // 2. Shrink window if condition is violated
        while (/* condition is false, e.g., count[c] > 1 */) {
            char leftChar = s[left];
            count[leftChar]--;
            left++;
        }
        
        // 3. Update result
        maxLength = max(maxLength, right - left + 1);
        right++;
    }
    return maxLength;
}
```
    `
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description: "Standard template for searching in sorted arrays.",
    content: `
### Binary Search Template
Finds the index of a target value in a sorted array. Returns -1 if not found.

```cpp
int binarySearch(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid; // Found
        } else if (nums[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Not found
}
```
    `
  }
];
