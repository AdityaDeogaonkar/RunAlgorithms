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
        content: `
### The CAP Theorem
In a distributed system, you can only guarantee two of the following three properties at the same time:

1.  **Consistency (C)**: Every read receives the most recent write or an error.
2.  **Availability (A)**: Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
3.  **Partition Tolerance (P)**: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

**Trade-offs:**
*   **CP (Consistency + Partition Tolerance)**: Wait for response from the partitioned node which might result in a timeout error. Used in banking systems.
*   **AP (Availability + Partition Tolerance)**: Return the most recent version of the data, which could be stale. Used in social media feeds.
        `
      },
      {
        id: "load-balancing",
        title: "Load Balancing",
        description: "Distributing network traffic across multiple servers.",
        content: `
### Load Balancing Strategies
*   **Round Robin**: Requests are distributed sequentially.
*   **Least Connections**: Request sent to the server with fewest active connections.
*   **IP Hash**: The IP address of the client is used to determine which server receives the request.

**Where to place Load Balancers?**
1.  Between User and Web Server.
2.  Between Web Server and Internal Platform Layer.
3.  Between Internal Platform Layer and Database.
        `
      },
      {
        id: "caching",
        title: "Caching Strategies",
        description: "Techniques to store frequently accessed data in memory.",
        content: `
### Caching Patterns
*   **Cache-Aside**: Application looks in cache first. If not found, load from DB and update cache.
*   **Write-Through**: Write to cache and DB at the same time. High consistency, higher latency.
*   **Write-Back (Write-Behind)**: Write to cache first, then asynchronously to DB. Low latency, risk of data loss.

**Eviction Policies:**
*   **LRU (Least Recently Used)**: Discard items not used for the longest time.
*   **LFU (Least Frequently Used)**: Discard items used least often.
        `
      },
      {
        id: "databases",
        title: "SQL vs NoSQL",
        description: "Choosing the right database for your use case.",
        content: `
### SQL (Relational)
*   **Structure**: Tables with fixed schemas.
*   **Examples**: MySQL, PostgreSQL.
*   **Use Case**: Complex queries, Transactions (ACID), e.g., Banking.

### NoSQL (Non-Relational)
*   **Structure**: Key-Value, Document, Graph, Wide-Column.
*   **Examples**: MongoDB, Redis, Cassandra, Neo4j.
*   **Use Case**: Large data volume, Rapid growth, Unstructured data, e.g., Analytics, Real-time feeds.
        `
      }
    ]
  },
  {
    id: "case-studies",
    title: "Real-World Case Studies",
    description: "Design famous systems like URL Shortener, Twitter, etc.",
    items: [
      {
        id: "url-shortener",
        title: "Design TinyURL",
        description: "System to shorten long URLs (e.g., bit.ly).",
        content: `
### Requirements
*   **Functional**: Given a URL, generate a shorter alias. Redirect alias to original URL.
*   **Non-Functional**: High availability, Low latency, Analytics.

### High-Level Design
1.  **API**: \`createShortURL(longURL)\` -> \`shortURL\`, \`getLongURL(shortURL)\` -> \`longURL\`.
2.  **Database**: NoSQL (Key-Value like DynamoDB/Cassandra) for fast reads. Schema: \`{shortKey, longURL, creationDate, userId}\`.
3.  **Encoding**: Base62 (a-z, A-Z, 0-9) encoding. 7 characters = 62^7 = ~3.5 Trillion combinations.
4.  **Collision Handling**: Pre-generate keys using a Key Generation Service (KGS).
        `
      },
      {
        id: "twitter",
        title: "Design Twitter (News Feed)",
        description: "Scalable social media feed system.",
        content: `
### Requirements
*   **Functional**: Post tweet, Follow user, View news feed.
*   **Non-Functional**: Low latency for feed generation (Read-heavy).

### High-Level Design
1.  **Data Model**: Users, Tweets, Follows tables.
2.  **Feed Generation (Fan-out)**:
    *   **Pull Model (Fan-out on Load)**: Fetch tweets from all followees when user loads feed. Slow for users with many follows.
    *   **Push Model (Fan-out on Write)**: When user posts, push tweet to all followers' pre-computed feed caches. Fast reads, slow writes for celebrities.
    *   **Hybrid**: Push for normal users, Pull for celebrities.
3.  **Caching**: Redis for storing the pre-computed feeds.
        `
      },
      {
        id: "whatsapp",
        title: "Design Chat App (WhatsApp)",
        description: "Real-time messaging system.",
        content: `
### Requirements
*   **Functional**: 1-on-1 chat, Group chat, Online status, Sent/Delivered/Read receipts.
*   **Non-Functional**: Low latency, Consistency (Message ordering).

### High-Level Design
1.  **Protocol**: WebSocket for real-time bi-directional communication.
2.  **Message Flow**: User A -> Load Balancer -> Chat Server -> User B.
3.  **Storage**: 
    *   **Hot Data (Recent)**: Cassandra/HBase (Write-heavy).
    *   **Cold Data (Old)**: Archive to Blob Storage/S3.
4.  **Group Chat**: Fan-out service to deliver message to all group members.
        `
      }
    ]
  }
];
