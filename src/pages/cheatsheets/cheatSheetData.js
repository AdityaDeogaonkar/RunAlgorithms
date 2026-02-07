export const cheatSheets = [
  {
    id: "time-space-complexity",
    title: "Time & Space Complexity (Big O)",
    description: "Comprehensive guide to Best, Average, and Worst case complexities for Data Structures and Algorithms.",
    content: `
### Data Structures Complexity

| Data Structure | Access (Avg) | Search (Avg) | Insertion (Avg) | Deletion (Avg) | Access (Worst) | Search (Worst) | Insertion (Worst) | Deletion (Worst) | Space Complexity |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Array** | O(1) | O(n) | O(n) | O(n) | O(1) | O(n) | O(n) | O(n) | O(n) |
| **Stack** | O(n) | O(n) | O(1) | O(1) | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Queue** | O(n) | O(n) | O(1) | O(1) | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Singly Linked List** | O(n) | O(n) | O(1) | O(1) | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Doubly Linked List** | O(n) | O(n) | O(1) | O(1) | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Hash Table** | N/A | O(1) | O(1) | O(1) | N/A | O(n) | O(n) | O(n) | O(n) |
| **Binary Search Tree** | O(log n) | O(log n) | O(log n) | O(log n) | O(n) | O(n) | O(n) | O(n) | O(n) |
| **AVL Tree** | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| **B-Tree** | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| **Red-Black Tree** | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |

### Sorting Algorithms Complexity

| Algorithm | Best Time | Average Time | Worst Time | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Quick Sort** | O(n log(n)) | O(n log(n)) | O(n^2) | O(log(n)) |
| **Merge Sort** | O(n log(n)) | O(n log(n)) | O(n log(n)) | O(n) |
| **Heap Sort** | O(n log(n)) | O(n log(n)) | O(n log(n)) | O(1) |
| **Bubble Sort** | O(n) | O(n^2) | O(n^2) | O(1) |
| **Insertion Sort** | O(n) | O(n^2) | O(n^2) | O(1) |
| **Selection Sort** | O(n^2) | O(n^2) | O(n^2) | O(1) |
| **Tree Sort** | O(n log(n)) | O(n log(n)) | O(n^2) | O(n) |
| **Shell Sort** | O(n log(n)) | O(n(log(n))^2) | O(n(log(n))^2) | O(1) |
| **Bucket Sort** | O(n+k) | O(n+k) | O(n^2) | O(n) |
| **Radix Sort** | O(nk) | O(nk) | O(nk) | O(n+k) |
| **Counting Sort** | O(n+k) | O(n+k) | O(n+k) | O(k) |

### Graph Algorithms Complexity

| Algorithm | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| **Breadth-First Search (BFS)** | O(V + E) | O(V) |
| **Depth-First Search (DFS)** | O(V + E) | O(V) |
| **Dijkstra's Algorithm** | O((V + E) log V) | O(V) |
| **Bellman-Ford Algorithm** | O(VE) | O(V) |
| **Floyd-Warshall Algorithm** | O(V^3) | O(V^2) |
| **Prim's Algorithm** | O(E log V) | O(V + E) |
| **Kruskal's Algorithm** | O(E log E) | O(V + E) |
| **Topological Sort** | O(V + E) | O(V) |
    `
  }
];
