export const systemDesignTopics = [
  {
    id: "concepts",
    title: "Core Concepts",
    description: "Fundamental building blocks of scalable systems.",
    items: [
      {
        id: "cap-theorem",
        title: "CAP Theorem",
        description: "Consistency, Availability, Partition Tolerance. You can only pick two.",
        diagram: `
graph TD
    C[Consistency] --- A[Availability]
    A --- P[Partition Tolerance]
    P --- C
    style C fill:#3b82f6,stroke:#333,stroke-width:2px
    style A fill:#a855f7,stroke:#333,stroke-width:2px
    style P fill:#14b8a6,stroke:#333,stroke-width:2px
        `,
        content: `
### The "Impossible" Triangle
In a distributed system, you can only guarantee **two** of the following three properties at the same time:

1.  **Consistency (C)**: Every read receives the most recent write or an error.
2.  **Availability (A)**: Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
3.  **Partition Tolerance (P)**: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

#### Real-World Trade-offs:
*   **CP (Consistency + Partition Tolerance)**: Wait for response from the partitioned node which might result in a timeout error. 
    *   *Example:* Banking Systems (ATM), Booking Systems.
*   **AP (Availability + Partition Tolerance)**: Return the most recent version of the data, which could be stale.
    *   *Example:* Social Media Feeds (Twitter/Facebook), Amazon Shopping Cart.
        `
      },
      {
        id: "load-balancing",
        title: "Load Balancing",
        description: "Distributing network traffic across multiple servers.",
        diagram: `
graph LR
    User((User)) --> LB[Load Balancer]
    LB --> S1[Server 1]
    LB --> S2[Server 2]
    LB --> S3[Server 3]
    style LB fill:#f59e0b,color:black
        `,
        content: `
### Why Load Balance?
To prevent any single server from becoming a bottleneck, ensuring high availability and reliability.

#### Algorithms:
*   **Round Robin**: Requests are distributed sequentially (A -> B -> C -> A).
*   **Least Connections**: Request sent to the server with fewest active connections.
*   **IP Hash**: The client's IP determines which server receives the request (good for session stickiness).

#### Placement:
1.  Between **User** and **Web Server**.
2.  Between **Web Server** and **Internal Platform Layer**.
3.  Between **Internal Platform Layer** and **Database**.
        `
      },
      {
        id: "caching",
        title: "Caching Strategies",
        description: "Techniques to store frequently accessed data in memory.",
        diagram: `
graph LR
    App[Application] --> Cache{Cache Hit?}
    Cache -- Yes --> Data[Return Data]
    Cache -- No --> DB[(Database)]
    DB --> Cache
    style Cache fill:#10b981,color:black
        `,
        content: `
### Caching Patterns
*   **Cache-Aside (Lazy Loading)**: Application looks in cache first. If not found, load from DB and update cache. *Best for read-heavy workloads.*
*   **Write-Through**: Write to cache and DB at the same time. *High consistency, higher latency.*
*   **Write-Back**: Write to cache first, then asynchronously to DB. *Lowest latency, risk of data loss.*

#### Eviction Policies:
*   **LRU (Least Recently Used)**: Discard items not used for the longest time.
*   **LFU (Least Frequently Used)**: Discard items used least often.
        `
      }
    ]
  },
  {
    id: "case-studies",
    title: "Real-World Architecture",
    description: "Deep dives into designing famous systems.",
    items: [
      {
        id: "url-shortener",
        title: "Design TinyURL",
        description: "System to shorten long URLs (e.g., bit.ly).",
        diagram: `
graph TD
    User --> LB[Load Balancer]
    LB --> App[App Server]
    App --> Cache[Redis Cache]
    App --> DB[(NoSQL DB)]
    App --> KGS[Key Gen Service]
    style KGS fill:#ef4444,color:white
        `,
        content: `
### 1. Requirements
*   **Functional**: Given a long URL, generate a unique short alias. Redirect alias to original URL.
*   **Non-Functional**: High availability, Low latency, Analytics.

### 2. High-Level Design
*   **API**: 
    *   \`createShortURL(longURL) -> shortURL\`
    *   \`getLongURL(shortURL) -> longURL\`
*   **Database**: NoSQL (Key-Value like DynamoDB/Cassandra) is best for fast reads/writes.
*   **Schema**: \`{shortKey, longURL, creationDate, userId}\`.

### 3. Key Challenge: Collision Handling
**The Problem:** How to generate a unique 7-character string?
**Solution: Key Generation Service (KGS)**
*   Pre-generate random 7-char strings and store them in a "Unused Key" database.
*   When a request comes, just pick a key. No collision checks needed at runtime!
        `
      },
      {
        id: "whatsapp",
        title: "Design WhatsApp",
        description: "Real-time messaging system.",
        diagram: `
graph LR
    UserA((User A)) --> LB[Load Balancer]
    LB --> Gateway[Gateway Server]
    Gateway --> UserB((User B))
    Gateway --> DB[(Chat History DB)]
    style Gateway fill:#8b5cf6,color:white
        `,
        content: `
### 1. Requirements
*   **Functional**: 1-on-1 chat, Group chat, Sent/Delivered/Read receipts.
*   **Non-Functional**: Low latency, Consistency (Message ordering).

### 2. Core Protocol: WebSocket
*   Unlike HTTP (Request-Response), **WebSockets** allow a persistent bi-directional connection.
*   Server can "push" messages to User B instantly without User B asking for it.

### 3. Storage Strategy
*   **Hot Data (Recent Chats)**: Store in **Cassandra** or **HBase** (Wide-column stores) because they handle massive write throughput well.
*   **Cold Data (Old Chats)**: Archive to **S3** or **Blob Storage** to save costs.
        `
      }
    ]
  }
];