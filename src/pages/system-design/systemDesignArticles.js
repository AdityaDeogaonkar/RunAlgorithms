// Structured article data for all system design articles.
// Each article has sections with type-based rendering.

export const systemDesignArticles = {
  // =============================================
  // CORE CONCEPTS
  // =============================================
  'cap-theorem': {
    title: 'CAP Theorem',
    subtitle: 'Consistency, Availability, Partition Tolerance — you can only pick two.',
    category: 'Core Concept',
    difficulty: 'Beginner',
    readTime: '8 min',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: 'BookOpen',
        content: [
          {
            type: 'paragraph',
            text: 'The CAP theorem (also known as Brewer\'s theorem) states that in a distributed data store, it is impossible to simultaneously guarantee all three of the following properties: Consistency, Availability, and Partition Tolerance.'
          },
          {
            type: 'info-box',
            boxType: 'key',
            title: 'The "Impossible" Triangle',
            items: [
              '**Consistency (C)**: Every read receives the most recent write or an error.',
              '**Availability (A)**: Every request receives a (non-error) response, without the guarantee that it contains the most recent write.',
              '**Partition Tolerance (P)**: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.'
            ]
          }
        ]
      },
      {
        id: 'tradeoffs',
        title: 'Real-World Trade-offs',
        icon: 'AlertCircle',
        content: [
          {
            type: 'paragraph',
            text: 'Since network partitions are unavoidable in distributed systems, you must choose between consistency and availability during a partition event.'
          },
          {
            type: 'requirements',
            functional: {
              title: 'CP Systems (Consistency + Partition Tolerance)',
              color: 'emerald',
              items: [
                'Wait for response from the partitioned node (may timeout)',
                'Guarantees data correctness over availability',
                'Example: Banking Systems, Booking Systems',
                'Technologies: HBase, MongoDB (default), Redis Cluster'
              ]
            },
            nonFunctional: {
              title: 'AP Systems (Availability + Partition Tolerance)',
              color: 'purple',
              items: [
                'Return the most recent version of data (may be stale)',
                'Guarantees service uptime over data freshness',
                'Example: Social Media Feeds, Shopping Carts',
                'Technologies: Cassandra, DynamoDB, CouchDB'
              ]
            }
          }
        ]
      }
    ]
  },

  'load-balancing': {
    title: 'Load Balancing',
    subtitle: 'Distributing network traffic across multiple servers for high availability.',
    category: 'Core Concept',
    difficulty: 'Beginner',
    readTime: '10 min',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: 'BookOpen',
        content: [
          {
            type: 'paragraph',
            text: 'A load balancer distributes incoming network traffic across multiple servers to prevent any single server from becoming a bottleneck, ensuring high availability and reliability.'
          },
          {
            type: 'info-box',
            boxType: 'key',
            title: 'Key Benefits',
            items: [
              'Prevents single point of failure',
              'Enables horizontal scaling',
              'Improves response times through traffic distribution',
              'Enables zero-downtime deployments'
            ]
          }
        ]
      },
      {
        id: 'algorithms',
        title: 'Load Balancing Algorithms',
        icon: 'Code',
        content: [
          {
            type: 'paragraph',
            text: 'Different algorithms suit different scenarios. The choice depends on whether your servers are homogeneous and whether sessions need to be sticky.'
          },
          {
            type: 'info-box',
            boxType: 'info',
            title: 'Common Algorithms',
            items: [
              '**Round Robin**: Requests are distributed sequentially (A -> B -> C -> A). Simple and effective for homogeneous servers.',
              '**Least Connections**: Request sent to the server with fewest active connections. Best for varying request durations.',
              '**IP Hash**: The client\'s IP determines which server receives the request. Good for session stickiness.',
              '**Weighted Round Robin**: Servers with higher capacity get proportionally more requests.'
            ]
          }
        ]
      },
      {
        id: 'placement',
        title: 'Placement Strategy',
        icon: 'Server',
        content: [
          {
            type: 'paragraph',
            text: 'Load balancers can be placed at multiple tiers of the architecture:'
          },
          {
            type: 'info-box',
            boxType: 'tip',
            title: 'Placement Tiers',
            items: [
              'Between **User** and **Web Server** (L7 load balancing)',
              'Between **Web Server** and **Internal Platform Layer** (L4 load balancing)',
              'Between **Internal Platform Layer** and **Database** (database proxy)'
            ]
          }
        ]
      }
    ]
  },

  'caching': {
    title: 'Caching Strategies',
    subtitle: 'Techniques to store frequently accessed data in memory for faster retrieval.',
    category: 'Core Concept',
    difficulty: 'Beginner',
    readTime: '10 min',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: 'BookOpen',
        content: [
          {
            type: 'paragraph',
            text: 'Caching stores copies of frequently accessed data in a high-speed data storage layer (like RAM) so that future requests can be served faster. It is one of the most impactful performance optimizations in system design.'
          }
        ]
      },
      {
        id: 'patterns',
        title: 'Caching Patterns',
        icon: 'Database',
        content: [
          {
            type: 'info-box',
            boxType: 'info',
            title: 'Read Strategies',
            items: [
              '**Cache-Aside (Lazy Loading)**: Application looks in cache first. If not found, load from DB and update cache. Best for read-heavy workloads.',
              '**Read-Through**: Cache sits in front of the DB and loads data on cache miss automatically. Simplifies application code.'
            ]
          },
          {
            type: 'info-box',
            boxType: 'tip',
            title: 'Write Strategies',
            items: [
              '**Write-Through**: Write to cache and DB at the same time. High consistency, higher latency.',
              '**Write-Back**: Write to cache first, then asynchronously to DB. Lowest latency, risk of data loss.',
              '**Write-Around**: Write directly to DB, bypassing cache. Good when written data is rarely read immediately.'
            ]
          }
        ]
      },
      {
        id: 'eviction',
        title: 'Eviction Policies',
        icon: 'Zap',
        content: [
          {
            type: 'info-box',
            boxType: 'key',
            title: 'Common Eviction Policies',
            items: [
              '**LRU (Least Recently Used)**: Discard items not used for the longest time. Most commonly used.',
              '**LFU (Least Frequently Used)**: Discard items used least often. Good for skewed access patterns.',
              '**FIFO (First In, First Out)**: Evict the oldest cached item. Simple but less optimal.',
              '**TTL (Time To Live)**: Items expire after a fixed duration. Good for data that changes predictably.'
            ]
          }
        ]
      }
    ]
  },

  // =============================================
  // CASE STUDIES
  // =============================================
  'url-shortener': {
    title: 'Design a URL Shortener',
    subtitle: 'Learn how to design a scalable URL shortening service like Bit.ly or TinyURL. This comprehensive guide covers architecture, database design, API endpoints, and scaling strategies.',
    category: 'Case Study',
    difficulty: 'Intermediate',
    readTime: '25 min',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: 'BookOpen',
        content: [
          {
            type: 'paragraph',
            text: 'A URL shortener is a service that creates short aliases for long URLs. When users visit the short URL, they are redirected to the original long URL. This is commonly used in social media, marketing campaigns, and anywhere character count matters.'
          },
          {
            type: 'info-box',
            boxType: 'key',
            title: 'Key Learning Objectives',
            items: [
              'Design a system that handles billions of URLs with low latency',
              'Implement efficient URL encoding/decoding algorithms',
              'Build scalable storage and caching strategies',
              'Handle analytics and click tracking at scale'
            ]
          },
          {
            type: 'paragraph',
            text: ''
          },
          {
            type: 'heading',
            level: 3,
            text: 'Real-World Examples'
          },
          {
            type: 'info-box',
            boxType: 'info',
            title: 'Industry Leaders',
            items: [
              '**Bit.ly**: 600M+ links created monthly, handling billions of redirects',
              '**TinyURL**: One of the first URL shorteners, simple and reliable',
              '**Rebrandly**: Custom branded short links for marketing'
            ]
          }
        ]
      },
      {
        id: 'requirements',
        title: 'Requirements Gathering',
        icon: 'Code',
        content: [
          {
            type: 'requirements',
            functional: {
              title: 'Functional Requirements',
              color: 'emerald',
              items: [
                'Generate a unique short URL for a given long URL',
                'Redirect users from short URL to original URL',
                'Support custom short URLs (optional)',
                'Provide analytics (clicks, geography, referrers)',
                'Support URL expiration'
              ]
            },
            nonFunctional: {
              title: 'Non-Functional Requirements',
              color: 'purple',
              items: [
                '**High availability**: 99.99% uptime',
                '**Low latency**: Redirects under 100ms',
                '**Scalability**: Handle billions of URLs',
                '**Durability**: URLs should not be lost',
                '**Security**: Prevent URL abuse'
              ]
            }
          }
        ]
      },
      {
        id: 'capacity',
        title: 'Capacity Estimation',
        icon: 'TrendingUp',
        content: [
          {
            type: 'info-box',
            boxType: 'info',
            title: 'Traffic Assumptions',
            text: 'Let\'s assume our service has Bit.ly-like scale with the following estimates.'
          },
          {
            type: 'stats',
            items: [
              { label: 'Write QPS', value: '500', desc: 'new URLs per second', color: 'emerald' },
              { label: 'Read QPS', value: '50,000', desc: 'redirects per second', color: 'blue' },
              { label: 'Read:Write', value: '100:1', desc: 'ratio (read-heavy)', color: 'purple' }
            ]
          },
          {
            type: 'collapsible',
            id: 'storage-calc',
            title: 'Storage Calculations',
            icon: 'Database',
            defaultOpen: true,
            content: [
              {
                type: 'code',
                language: 'text',
                id: 'storage-math',
                code: '// Storage over 10 years\nURLs per day = 500 QPS × 86,400 seconds = 43.2M URLs/day\nURLs per year = 43.2M × 365 = 15.8B URLs/year\nURLs in 10 years = 15.8B × 10 = 158B URLs\n\nAverage URL size = 500 bytes (URL + metadata)\nTotal storage = 158B × 500 bytes = 79 TB'
              },
              {
                type: 'info-box',
                boxType: 'tip',
                title: 'Storage Optimization',
                text: 'With compression and efficient indexing, actual storage will be lower. Consider using columnar storage for analytics data and time-series databases for click tracking.'
              }
            ]
          },
          {
            type: 'collapsible',
            id: 'bandwidth-calc',
            title: 'Bandwidth Calculations',
            icon: 'Globe',
            defaultOpen: false,
            content: [
              {
                type: 'code',
                language: 'text',
                id: 'bandwidth-math',
                code: '// Incoming traffic (writes)\n500 URLs/sec × 500 bytes = 250 KB/sec = 0.25 MB/sec\n\n// Outgoing traffic (reads)\n50,000 redirects/sec × 500 bytes = 25 MB/sec\n\n// Total bandwidth\nIngress + Egress = ~25 MB/sec'
              }
            ]
          }
        ]
      },
      {
        id: 'architecture',
        title: 'System Architecture',
        icon: 'Globe',
        content: [
          {
            type: 'paragraph',
            text: 'Our architecture follows a standard three-tier design with specialized components for URL generation, caching, and analytics. The system prioritizes read performance given the 100:1 read-to-write ratio.'
          },
          {
            type: 'architecture-diagram'
          },
          {
            type: 'info-box',
            boxType: 'key',
            title: 'Key Design Decisions',
            items: [
              'Redis for caching hot URLs (80/20 rule)',
              'Read replicas for scaling read operations',
              'Separate analytics pipeline to avoid blocking writes',
              'Load balancer with health checks and auto-scaling'
            ]
          },
          {
            type: 'info-box',
            boxType: 'warning',
            title: 'Bottlenecks to Watch',
            items: [
              'Database write contention during peak hours',
              'Cache invalidation strategy',
              'Analytics write throughput',
              'Short code generation at scale'
            ]
          }
        ]
      },
      {
        id: 'database',
        title: 'Database Design',
        icon: 'Database',
        content: [
          {
            type: 'paragraph',
            text: 'We use PostgreSQL for ACID compliance and strong consistency. The schema is optimized for fast lookups on the short_code column with proper indexing.'
          },
          {
            type: 'database-schema'
          },
          {
            type: 'collapsible',
            id: 'indexing-strategy',
            title: 'Indexing Strategy',
            icon: 'Zap',
            defaultOpen: true,
            content: [
              {
                type: 'code',
                language: 'SQL',
                id: 'indexes',
                code: '-- Primary indexes for fast lookups\nCREATE UNIQUE INDEX idx_short_code ON urls(short_code);\nCREATE INDEX idx_user_urls ON urls(user_id, created_at DESC);\nCREATE INDEX idx_expiration ON urls(expires_at) WHERE expires_at IS NOT NULL;\n\n-- Analytics indexes\nCREATE INDEX idx_url_clicks_url_id ON url_clicks(url_id, clicked_at DESC);\nCREATE INDEX idx_clicks_time ON url_clicks(clicked_at);\n\n-- Partial index for active URLs\nCREATE INDEX idx_active_urls ON urls(created_at) \nWHERE expires_at IS NULL OR expires_at > NOW();'
              },
              {
                type: 'info-box',
                boxType: 'tip',
                title: 'Index Performance',
                text: 'The partial index on active URLs significantly improves query performance for common lookups. Regularly analyze query patterns and update indexes accordingly.'
              }
            ]
          }
        ]
      },
      {
        id: 'api',
        title: 'API Design',
        icon: 'Server',
        content: [
          {
            type: 'collapsible',
            id: 'create-url',
            title: 'POST /api/shorten — Create Short URL',
            icon: 'Code',
            defaultOpen: true,
            content: [
              {
                type: 'heading',
                level: 4,
                text: 'Request:'
              },
              {
                type: 'code',
                language: 'JSON',
                id: 'create-request',
                code: '{\n  "original_url": "https://www.example.com/very/long/url/with/many/parameters",\n  "custom_alias": "my-link",\n  "expires_at": "2026-12-31T23:59:59Z"\n}'
              },
              {
                type: 'heading',
                level: 4,
                text: 'Response (201 Created):'
              },
              {
                type: 'code',
                language: 'JSON',
                id: 'create-response',
                code: '{\n  "short_url": "https://short.ly/abc123",\n  "short_code": "abc123",\n  "original_url": "https://www.example.com/very/long/url/with/many/parameters",\n  "created_at": "2026-02-08T10:30:00Z",\n  "expires_at": "2026-12-31T23:59:59Z"\n}'
              },
              {
                type: 'heading',
                level: 4,
                text: 'Implementation:'
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'create-impl',
                code: 'async function createShortUrl(req, res) {\n  const { original_url, custom_alias, expires_at } = req.body;\n  \n  // Validate URL\n  if (!isValidUrl(original_url)) {\n    return res.status(400).json({ error: \'Invalid URL\' });\n  }\n  \n  // Generate or use custom short code\n  const shortCode = custom_alias || await generateUniqueShortCode();\n  \n  // Check if custom alias already exists\n  if (custom_alias && await shortCodeExists(shortCode)) {\n    return res.status(409).json({ error: \'Alias already taken\' });\n  }\n  \n  // Store in database\n  const url = await db.urls.create({\n    short_code: shortCode,\n    original_url,\n    user_id: req.user?.id,\n    expires_at: expires_at || null\n  });\n  \n  return res.status(201).json({\n    short_url: `https://short.ly/${shortCode}`,\n    short_code: shortCode,\n    original_url: url.original_url,\n    created_at: url.created_at,\n    expires_at: url.expires_at\n  });\n}'
              }
            ]
          },
          {
            type: 'collapsible',
            id: 'redirect-url',
            title: 'GET /:shortCode — Redirect to Original URL',
            icon: 'Globe',
            defaultOpen: false,
            content: [
              {
                type: 'heading',
                level: 4,
                text: 'Response (301 Moved Permanently):'
              },
              {
                type: 'code',
                language: 'HTTP',
                id: 'redirect-response',
                code: 'HTTP/1.1 301 Moved Permanently\nLocation: https://www.example.com/very/long/url/with/many/parameters\nCache-Control: public, max-age=3600'
              },
              {
                type: 'heading',
                level: 4,
                text: 'Implementation with Caching:'
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'redirect-impl',
                code: 'async function redirect(req, res) {\n  const { shortCode } = req.params;\n  \n  // Try cache first (Redis)\n  let url = await cache.get(`url:${shortCode}`);\n  \n  if (!url) {\n    // Cache miss - query database\n    url = await db.urls.findOne({\n      where: { short_code: shortCode }\n    });\n    \n    if (!url) {\n      return res.status(404).json({ error: \'URL not found\' });\n    }\n    \n    // Check expiration\n    if (url.expires_at && new Date(url.expires_at) < new Date()) {\n      return res.status(410).json({ error: \'URL has expired\' });\n    }\n    \n    // Cache for 1 hour\n    await cache.set(`url:${shortCode}`, url.original_url, 3600);\n  }\n  \n  // Track analytics asynchronously (non-blocking)\n  trackClick(shortCode, req);\n  \n  // Redirect with 301 (permanent) or 302 (temporary)\n  return res.redirect(301, url.original_url || url);\n}'
              },
              {
                type: 'info-box',
                boxType: 'key',
                title: '301 vs 302 Redirects',
                text: 'Use 301 (permanent) for better SEO and caching, but use 302 (temporary) if you need to track every click accurately, as browsers may cache 301 redirects.'
              }
            ]
          },
          {
            type: 'collapsible',
            id: 'analytics-api',
            title: 'GET /api/analytics/:shortCode — Get URL Analytics',
            icon: 'TrendingUp',
            defaultOpen: false,
            content: [
              {
                type: 'heading',
                level: 4,
                text: 'Response (200 OK):'
              },
              {
                type: 'code',
                language: 'JSON',
                id: 'analytics-response',
                code: '{\n  "short_code": "abc123",\n  "total_clicks": 15847,\n  "clicks_by_date": [\n    { "date": "2026-02-01", "clicks": 1234 },\n    { "date": "2026-02-02", "clicks": 1456 }\n  ],\n  "top_referrers": [\n    { "referrer": "twitter.com", "clicks": 5230 },\n    { "referrer": "facebook.com", "clicks": 3120 }\n  ],\n  "geographic_distribution": [\n    { "country": "US", "clicks": 7500 },\n    { "country": "UK", "clicks": 2300 }\n  ]\n}'
              }
            ]
          }
        ]
      },
      {
        id: 'scaling',
        title: 'Scaling Strategy',
        icon: 'Zap',
        content: [
          {
            type: 'collapsible',
            id: 'url-generation',
            title: 'URL Short Code Generation',
            icon: 'Code',
            defaultOpen: true,
            content: [
              {
                type: 'paragraph',
                text: 'Two main approaches for generating unique short codes: Base62 encoding and pre-generated key ranges.'
              },
              {
                type: 'heading',
                level: 4,
                text: 'Approach 1: Base62 Encoding'
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'base62',
                code: 'const BASE62 = \'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\';\n\nfunction encodeBase62(num) {\n  if (num === 0) return BASE62[0];\n  \n  let encoded = \'\';\n  while (num > 0) {\n    encoded = BASE62[num % 62] + encoded;\n    num = Math.floor(num / 62);\n  }\n  return encoded;\n}\n\nasync function generateUniqueShortCode() {\n  const id = await getNextSequenceValue();\n  return encodeBase62(id).padStart(7, \'0\');\n}\n\n// 62^7 = 3,521,614,606,208 possible combinations'
              },
              {
                type: 'heading',
                level: 4,
                text: 'Approach 2: Key Range Distribution'
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'key-range',
                code: 'class KeyGenerationService {\n  constructor() {\n    this.serverId = getServerId();\n    this.counter = 0;\n  }\n  \n  generateKey() {\n    const timestamp = Date.now();\n    const uniqueId = (timestamp * 1000000) + \n                     (this.serverId * 1000) + \n                     this.counter++;\n    return encodeBase62(uniqueId);\n  }\n}\n\n// Guarantees uniqueness across distributed servers\n// without coordination'
              },
              {
                type: 'info-box',
                boxType: 'tip',
                title: 'Trade-offs',
                text: '**Base62:** Simple but requires sequence coordination. **Key Range:** No coordination needed but slightly longer codes. For massive scale, use Snowflake-like IDs or ZooKeeper for coordination.'
              }
            ]
          },
          {
            type: 'collapsible',
            id: 'caching-strategy',
            title: 'Caching Strategy',
            icon: 'Zap',
            defaultOpen: false,
            content: [
              {
                type: 'paragraph',
                text: 'Implement a multi-level caching strategy to handle 50K QPS read traffic efficiently.'
              },
              {
                type: 'cache-layers',
                layers: [
                  {
                    title: 'Cache Layer 1: CDN',
                    color: 'emerald',
                    items: ['Cache redirect responses at edge', 'Handles ~80% of traffic', 'TTL: 1 hour for popular URLs', 'CloudFront, Cloudflare, Fastly']
                  },
                  {
                    title: 'Cache Layer 2: Redis',
                    color: 'blue',
                    items: ['In-memory cache for hot URLs', 'Handles ~15% of traffic', 'TTL: 24 hours', 'LRU eviction policy']
                  }
                ]
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'cache-impl',
                code: 'async function getUrl(shortCode) {\n  // L1: Check Redis\n  const cached = await redis.get(`url:${shortCode}`);\n  if (cached) return cached;\n  \n  // L2: Query database\n  const url = await db.urls.findOne({ \n    where: { short_code: shortCode } \n  });\n  \n  if (url) {\n    const ttl = calculateTTL(url);\n    await redis.setex(`url:${shortCode}`, ttl, url.original_url);\n  }\n  \n  return url?.original_url;\n}\n\nfunction calculateTTL(url) {\n  const accessCount = url.total_clicks || 0;\n  if (accessCount > 10000) return 86400;  // 24 hours\n  if (accessCount > 1000) return 3600;    // 1 hour\n  return 600;  // 10 minutes\n}'
              }
            ]
          },
          {
            type: 'collapsible',
            id: 'database-scaling',
            title: 'Database Scaling',
            icon: 'Database',
            defaultOpen: false,
            content: [
              {
                type: 'heading',
                level: 4,
                text: 'Sharding Strategy'
              },
              {
                type: 'paragraph',
                text: 'Horizontal partitioning based on short_code hash to distribute load across multiple database instances.'
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'sharding',
                code: 'const NUM_SHARDS = 16;\n\nfunction getShardId(shortCode) {\n  const hash = shortCode.charCodeAt(0) + \n               shortCode.charCodeAt(1);\n  return hash % NUM_SHARDS;\n}\n\nasync function getUrlFromShard(shortCode) {\n  const shardId = getShardId(shortCode);\n  const shard = dbShards[shardId];\n  \n  return await shard.query(\n    \'SELECT original_url FROM urls WHERE short_code = $1\',\n    [shortCode]\n  );\n}\n\n// Each shard handles ~6.25% of total traffic'
              },
              {
                type: 'info-box',
                boxType: 'warning',
                title: 'Sharding Considerations',
                text: 'Resharding is expensive. Plan shard count based on 5-10 year growth projections. Use virtual shards (e.g., 256 virtual shards mapped to 16 physical shards) for easier future rebalancing.'
              }
            ]
          }
        ]
      },
      {
        id: 'tradeoffs',
        title: 'Design Trade-offs',
        icon: 'AlertCircle',
        content: [
          {
            type: 'tradeoff',
            title: 'SQL vs NoSQL',
            titleColor: 'emerald',
            comparisons: [
              {
                title: 'PostgreSQL (Chosen)',
                items: ['ACID compliance for data integrity', 'Strong consistency guarantees', 'Excellent for analytics queries', 'Mature ecosystem and tooling']
              },
              {
                title: 'Cassandra/DynamoDB',
                items: ['Better write scalability', 'Easier horizontal scaling', 'Higher throughput potential', 'Eventually consistent (trade-off)']
              }
            ]
          },
          {
            type: 'tradeoff',
            title: 'Short Code Length',
            titleColor: 'blue',
            table: {
              headers: ['Length', 'Combinations (Base62)', 'Good For'],
              rows: [
                ['6 chars', '56.8 billion', 'Small to medium services'],
                ['7 chars', '3.5 trillion', 'Large scale (recommended)'],
                ['8 chars', '218 trillion', 'Massive scale, future-proof']
              ]
            }
          },
          {
            type: 'tradeoff',
            title: '301 vs 302 Redirects',
            titleColor: 'purple',
            comparisons: [
              {
                title: '301 Permanent',
                items: ['Better for SEO (link equity transfer)', 'Browsers/CDNs cache aggressively', 'Reduced server load', 'May miss some analytics data']
              },
              {
                title: '302 Temporary',
                items: ['Every click hits your server', 'More accurate analytics', 'Higher server load', 'Better for A/B testing']
              }
            ]
          }
        ]
      },
      {
        id: 'takeaways',
        title: 'Key Takeaways',
        icon: 'Lightbulb',
        content: [
          {
            type: 'takeaways',
            columns: [
              {
                title: 'Core Design Principles',
                items: [
                  'Read-heavy systems need aggressive caching',
                  'Short code generation must be collision-free at scale',
                  'Separate analytics pipeline from critical path',
                  'Plan for horizontal scaling from day one'
                ]
              },
              {
                title: 'Production Considerations',
                items: [
                  'Monitor cache hit rates and adjust TTLs',
                  'Implement rate limiting to prevent abuse',
                  'Set up automated URL expiration cleanup',
                  'Use CDN for global low-latency redirects'
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  'whatsapp': {
    title: 'Design WhatsApp',
    subtitle: 'Design a real-time messaging system with delivery receipts and group chat support.',
    category: 'Case Study',
    difficulty: 'Intermediate',
    readTime: '15 min',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: 'BookOpen',
        content: [
          {
            type: 'paragraph',
            text: 'WhatsApp is a real-time messaging application that supports 1-on-1 chat, group messaging, and delivery receipts. Designing such a system requires careful consideration of connection management, message ordering, and storage strategy.'
          }
        ]
      },
      {
        id: 'requirements',
        title: 'Requirements',
        icon: 'Code',
        content: [
          {
            type: 'requirements',
            functional: {
              title: 'Functional Requirements',
              color: 'emerald',
              items: [
                '1-on-1 chat',
                'Group chat',
                'Sent/Delivered/Read receipts',
                'Online/Offline status',
                'Media sharing'
              ]
            },
            nonFunctional: {
              title: 'Non-Functional Requirements',
              color: 'purple',
              items: [
                '**Low latency**: Messages delivered in real-time',
                '**Consistency**: Message ordering must be preserved',
                '**Durability**: No message loss',
                '**Scalability**: Support billions of users'
              ]
            }
          }
        ]
      },
      {
        id: 'protocol',
        title: 'Core Protocol: WebSocket',
        icon: 'Zap',
        content: [
          {
            type: 'paragraph',
            text: 'Unlike HTTP (Request-Response), WebSockets allow a persistent bi-directional connection. The server can "push" messages to User B instantly without User B asking for it.'
          },
          {
            type: 'info-box',
            boxType: 'key',
            title: 'Why WebSockets?',
            items: [
              'Persistent bi-directional connection',
              'Low overhead compared to HTTP polling',
              'Server can push messages instantly',
              'Ideal for real-time communication'
            ]
          }
        ]
      },
      {
        id: 'storage',
        title: 'Storage Strategy',
        icon: 'Database',
        content: [
          {
            type: 'info-box',
            boxType: 'info',
            title: 'Hot vs Cold Storage',
            items: [
              '**Hot Data (Recent Chats)**: Store in Cassandra or HBase — handles massive write throughput well.',
              '**Cold Data (Old Chats)**: Archive to S3 or Blob Storage to save costs.',
              '**Message Queue**: Use Kafka for reliable message delivery between services.'
            ]
          }
        ]
      }
    ]
  },

  // =============================================
  // NEW CORE CONCEPTS
  // =============================================
  'consistent-hashing': {
    title: 'Consistent Hashing',
    subtitle: 'Distributing data across nodes so that adding or removing a server only remaps a small fraction of keys.',
    category: 'Core Concept',
    difficulty: 'Intermediate',
    readTime: '12 min',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: 'BookOpen',
        content: [
          {
            type: 'paragraph',
            text: 'In distributed systems, we often need to distribute data across multiple servers. Naive hashing (key % N) breaks catastrophically when you add or remove a server — almost every key remaps. Consistent hashing solves this by arranging servers on a virtual ring, so that only K/N keys need to move when the topology changes (where K is the total number of keys and N is the number of servers).'
          },
          {
            type: 'info-box',
            boxType: 'key',
            title: 'The Core Problem',
            items: [
              '**Naive hashing**: `hash(key) % N` — adding 1 server remaps ~100% of keys',
              '**Consistent hashing**: adding 1 server remaps only ~1/N of keys',
              'Used by DynamoDB, Cassandra, Akamai CDN, Discord, and Memcached'
            ]
          }
        ]
      },
      {
        id: 'naive-problem',
        title: 'Why Naive Hashing Fails',
        icon: 'AlertCircle',
        content: [
          {
            type: 'paragraph',
            text: 'Consider 4 servers and 8 keys. With simple modular hashing, every key maps to server = hash(key) % 4. Now suppose Server 3 crashes — you change N to 3. Suddenly 6 out of 8 keys now hash to a different server. All cached data on those servers becomes useless.'
          },
          {
            type: 'code',
            language: 'text',
            id: 'naive-example',
            code: '// 4 servers: hash(key) % 4\nKey A → hash=14 → 14 % 4 = Server 2\nKey B → hash=22 → 22 % 4 = Server 2\nKey C → hash=7  →  7 % 4 = Server 3\nKey D → hash=11 → 11 % 4 = Server 3\n\n// Server 3 dies → now hash(key) % 3\nKey A → 14 % 3 = Server 2  ✓ (same)\nKey B → 22 % 3 = Server 1  ✗ (moved!)\nKey C →  7 % 3 = Server 1  ✗ (moved!)\nKey D → 11 % 3 = Server 2  ✗ (moved!)\n\n// 75% of keys moved — cache stampede!'
          },
          {
            type: 'info-box',
            boxType: 'warning',
            title: 'Cache Stampede',
            text: 'When most keys remap simultaneously, all clients suddenly hit the database instead of the cache. This causes a "thundering herd" effect that can bring down the entire system.'
          }
        ]
      },
      {
        id: 'hash-ring',
        title: 'The Hash Ring',
        icon: 'Globe',
        content: [
          {
            type: 'paragraph',
            text: 'Consistent hashing maps both servers and keys onto a circular ring (0 to 2^32 - 1). Each key walks clockwise around the ring until it finds the first server. When a server is added or removed, only the keys between it and the previous server on the ring are affected.'
          },
          {
            type: 'info-box',
            boxType: 'info',
            title: 'How It Works',
            items: [
              '**Step 1**: Hash each server\'s identifier (e.g., IP address) to a position on the ring',
              '**Step 2**: Hash each key to a position on the ring',
              '**Step 3**: Walk clockwise from the key\'s position — the first server you encounter owns that key',
              '**Step 4**: When a server is added, only the keys between it and its counter-clockwise neighbor need to move'
            ]
          },
          {
            type: 'code',
            language: 'JavaScript',
            id: 'basic-ring',
            code: 'class ConsistentHash {\n  constructor() {\n    this.ring = new Map();       // position → serverName\n    this.sortedKeys = [];        // sorted positions on the ring\n  }\n\n  // Hash function: maps a string to a position on 0..2^32\n  _hash(key) {\n    let hash = 0;\n    for (let i = 0; i < key.length; i++) {\n      hash = ((hash << 5) - hash + key.charCodeAt(i)) >>> 0;\n    }\n    return hash;\n  }\n\n  addServer(server) {\n    const pos = this._hash(server);\n    this.ring.set(pos, server);\n    this.sortedKeys.push(pos);\n    this.sortedKeys.sort((a, b) => a - b);\n  }\n\n  removeServer(server) {\n    const pos = this._hash(server);\n    this.ring.delete(pos);\n    this.sortedKeys = this.sortedKeys.filter(k => k !== pos);\n  }\n\n  getServer(key) {\n    if (this.sortedKeys.length === 0) return null;\n    const hash = this._hash(key);\n    // Walk clockwise: find first server position >= key hash\n    for (const pos of this.sortedKeys) {\n      if (pos >= hash) return this.ring.get(pos);\n    }\n    // Wrap around to the first server (it\'s a ring)\n    return this.ring.get(this.sortedKeys[0]);\n  }\n}'
          }
        ]
      },
      {
        id: 'virtual-nodes',
        title: 'Virtual Nodes',
        icon: 'Zap',
        content: [
          {
            type: 'paragraph',
            text: 'A basic consistent hash ring has a critical flaw: servers are not evenly distributed. One server might own 60% of the ring while another owns 5%. Virtual nodes fix this by giving each physical server multiple positions on the ring.'
          },
          {
            type: 'info-box',
            boxType: 'key',
            title: 'Virtual Nodes Explained',
            items: [
              'Each physical server gets 100-200 virtual positions on the ring',
              'More virtual nodes → more even distribution (law of large numbers)',
              'Powerful servers can be given more virtual nodes (weighted distribution)',
              'Trade-off: more virtual nodes = more memory for the ring, but better balance'
            ]
          },
          {
            type: 'code',
            language: 'JavaScript',
            id: 'vnodes',
            code: 'class ConsistentHashWithVNodes {\n  constructor(replicas = 150) {\n    this.replicas = replicas;    // virtual nodes per server\n    this.ring = new Map();\n    this.sortedKeys = [];\n  }\n\n  _hash(key) {\n    let hash = 0;\n    for (let i = 0; i < key.length; i++) {\n      hash = ((hash << 5) - hash + key.charCodeAt(i)) >>> 0;\n    }\n    return hash;\n  }\n\n  addServer(server) {\n    for (let i = 0; i < this.replicas; i++) {\n      // Each virtual node gets a unique hash\n      const virtualKey = `${server}#${i}`;\n      const pos = this._hash(virtualKey);\n      this.ring.set(pos, server);\n      this.sortedKeys.push(pos);\n    }\n    this.sortedKeys.sort((a, b) => a - b);\n  }\n\n  removeServer(server) {\n    for (let i = 0; i < this.replicas; i++) {\n      const pos = this._hash(`${server}#${i}`);\n      this.ring.delete(pos);\n    }\n    this.sortedKeys = this.sortedKeys.filter(k => this.ring.has(k));\n  }\n\n  getServer(key) {\n    if (this.sortedKeys.length === 0) return null;\n    const hash = this._hash(key);\n    for (const pos of this.sortedKeys) {\n      if (pos >= hash) return this.ring.get(pos);\n    }\n    return this.ring.get(this.sortedKeys[0]);\n  }\n}\n\n// Usage:\n// const ch = new ConsistentHashWithVNodes(150);\n// ch.addServer("db-east-1");\n// ch.addServer("db-west-2");\n// ch.getServer("user:42");  → "db-west-2"'
          },
          {
            type: 'stats',
            items: [
              { label: 'Without VNodes', value: '±40%', desc: 'load imbalance between servers', color: 'purple' },
              { label: 'With 150 VNodes', value: '±5%', desc: 'near-perfect distribution', color: 'emerald' },
              { label: 'Key Remapping', value: '~1/N', desc: 'keys move when adding a server', color: 'blue' }
            ]
          }
        ]
      },
      {
        id: 'real-world',
        title: 'Real-World Usage',
        icon: 'Server',
        content: [
          {
            type: 'info-box',
            boxType: 'info',
            title: 'Where Consistent Hashing Is Used',
            items: [
              '**Amazon DynamoDB**: Partitions data across storage nodes. Uses virtual nodes for even distribution.',
              '**Apache Cassandra**: Token ring determines which node owns each partition key.',
              '**Akamai CDN**: Routes user requests to the nearest edge server that caches the content.',
              '**Discord**: Distributes guilds (servers) across database shards.',
              '**Memcached / Redis Cluster**: Client-side consistent hashing for key distribution.'
            ]
          },
          {
            type: 'tradeoff',
            title: 'Consistent Hashing vs Rendezvous Hashing',
            titleColor: 'blue',
            comparisons: [
              {
                title: 'Consistent Hashing',
                items: ['O(log N) lookup with binary search', 'Virtual nodes needed for balance', 'More memory overhead', 'Better for large N (100s of nodes)']
              },
              {
                title: 'Rendezvous (HRW) Hashing',
                items: ['O(N) lookup — hash key with each server', 'Naturally balanced (no virtual nodes)', 'Minimal memory', 'Better for small N (<50 nodes)']
              }
            ]
          }
        ]
      },
      {
        id: 'takeaways',
        title: 'Key Takeaways',
        icon: 'Lightbulb',
        content: [
          {
            type: 'takeaways',
            columns: [
              {
                title: 'Interview Essentials',
                items: [
                  'Explain why naive hash(key) % N breaks on server changes',
                  'Draw the hash ring and walk through key assignment',
                  'Explain virtual nodes and why they solve hotspots',
                  'Know that only K/N keys move when a server is added'
                ]
              },
              {
                title: 'When to Use It',
                items: [
                  'Distributed caching (Memcached, Redis Cluster)',
                  'Database sharding (DynamoDB, Cassandra)',
                  'CDN routing (Akamai, CloudFront)',
                  'Any system where servers are added/removed dynamically'
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  'database-sharding': {
    title: 'Database Sharding',
    subtitle: 'Horizontally partitioning data across multiple databases to handle massive scale and throughput.',
    category: 'Core Concept',
    difficulty: 'Intermediate',
    readTime: '14 min',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: 'BookOpen',
        content: [
          {
            type: 'paragraph',
            text: 'Database sharding is the practice of splitting a large database into smaller, faster, more manageable pieces called shards. Each shard holds a subset of the total data and runs on its own database server. It is the go-to strategy when a single database can no longer handle the read/write throughput or storage capacity your system demands.'
          },
          {
            type: 'info-box',
            boxType: 'key',
            title: 'Why Shard?',
            items: [
              '**Vertical scaling has a ceiling**: You can only upgrade hardware so much',
              '**Read replicas help reads, not writes**: Write-heavy workloads still bottleneck on primary',
              '**Sharding distributes both reads AND writes** across multiple machines',
              '**Data locality**: Keep geographically relevant data closer to users'
            ]
          },
          {
            type: 'paragraph',
            text: 'Sharding is not free — it introduces significant complexity. You should exhaust vertical scaling, read replicas, caching, and query optimization before reaching for sharding.'
          }
        ]
      },
      {
        id: 'strategies',
        title: 'Sharding Strategies',
        icon: 'Code',
        content: [
          {
            type: 'paragraph',
            text: 'The sharding key (also called partition key) determines which shard a record lives on. Choosing the right strategy is the single most important decision in a sharded architecture.'
          },
          {
            type: 'collapsible',
            id: 'range-sharding',
            title: 'Range-Based Sharding',
            icon: 'Database',
            defaultOpen: true,
            content: [
              {
                type: 'paragraph',
                text: 'Split data by contiguous ranges of the shard key. For example, users A-M go to Shard 1, N-Z to Shard 2. Simple to understand and implement.'
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'range-shard',
                code: 'function getRangeShard(userId) {\n  const firstChar = userId.charAt(0).toUpperCase();\n  if (firstChar <= \'F\') return \'shard-1\';\n  if (firstChar <= \'L\') return \'shard-2\';\n  if (firstChar <= \'R\') return \'shard-3\';\n  return \'shard-4\';\n}\n\n// Pros: Range queries within a shard are fast\n// Cons: Hotspots if data is not uniformly distributed\n//       (far more names start with "S" than "X")'
              },
              {
                type: 'info-box',
                boxType: 'warning',
                title: 'Hotspot Risk',
                text: 'Range sharding is vulnerable to hotspots. If you shard by date, the "current month" shard gets all the writes while older shards sit idle. Always analyze your data distribution before choosing range-based sharding.'
              }
            ]
          },
          {
            type: 'collapsible',
            id: 'hash-sharding',
            title: 'Hash-Based Sharding',
            icon: 'Zap',
            defaultOpen: true,
            content: [
              {
                type: 'paragraph',
                text: 'Apply a hash function to the shard key and use modular arithmetic or consistent hashing to pick the shard. Distributes data evenly regardless of the key distribution.'
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'hash-shard',
                code: 'const NUM_SHARDS = 8;\n\nfunction getHashShard(userId) {\n  let hash = 0;\n  for (let i = 0; i < userId.length; i++) {\n    hash = ((hash << 5) - hash + userId.charCodeAt(i)) >>> 0;\n  }\n  return `shard-${hash % NUM_SHARDS}`;\n}\n\n// Pros: Even distribution, no hotspots\n// Cons: Range queries require scatter-gather across ALL shards\n//       Resharding (changing NUM_SHARDS) remaps most keys\n\n// Better: Use consistent hashing to minimize remapping\n// (see Consistent Hashing article)'
              },
              {
                type: 'info-box',
                boxType: 'tip',
                title: 'Consistent Hashing for Resharding',
                text: 'Use consistent hashing instead of simple modular arithmetic. When you add a new shard, only ~1/N of the data needs to move instead of nearly all of it.'
              }
            ]
          },
          {
            type: 'collapsible',
            id: 'directory-sharding',
            title: 'Directory-Based Sharding',
            icon: 'Database',
            defaultOpen: false,
            content: [
              {
                type: 'paragraph',
                text: 'A lookup table (directory) explicitly maps each key or key range to a shard. The most flexible approach but introduces a single point of failure and an extra hop for every query.'
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'directory-shard',
                code: '// Directory service (backed by a small, highly available DB)\nconst shardDirectory = {\n  \'user:1001\': \'shard-3\',\n  \'user:1002\': \'shard-1\',\n  \'user:1003\': \'shard-7\',\n  // ...\n};\n\nasync function getDirectoryShard(userId) {\n  // Check local cache first\n  const cached = cache.get(`shard:${userId}`);\n  if (cached) return cached;\n\n  // Query the directory service\n  const shard = await directoryDB.get(userId);\n  cache.set(`shard:${userId}`, shard, TTL_1HR);\n  return shard;\n}\n\n// Pros: Complete flexibility, easy resharding\n// Cons: Directory is a bottleneck / SPOF\n//       Extra network hop per query'
              }
            ]
          },
          {
            type: 'tradeoff',
            title: 'Strategy Comparison',
            titleColor: 'emerald',
            table: {
              headers: ['Strategy', 'Distribution', 'Range Queries', 'Resharding', 'Complexity'],
              rows: [
                ['Range', 'Uneven (hotspots)', 'Fast (single shard)', 'Manual rebalance', 'Low'],
                ['Hash', 'Even', 'Slow (scatter-gather)', 'Hard (remaps keys)', 'Medium'],
                ['Directory', 'Flexible', 'Depends on mapping', 'Easy (update directory)', 'High'],
              ]
            }
          }
        ]
      },
      {
        id: 'challenges',
        title: 'Challenges',
        icon: 'AlertCircle',
        content: [
          {
            type: 'paragraph',
            text: 'Sharding is not just "split the data." It introduces a set of hard problems that must be solved at the application layer since the database can no longer handle them transparently.'
          },
          {
            type: 'info-box',
            boxType: 'warning',
            title: 'Cross-Shard Joins',
            text: 'SQL JOINs across shards are impossible at the database level. You must either denormalize data so related records live on the same shard, or perform joins in application code (fetch from both shards, merge in memory). This is the single biggest pain point of sharding.'
          },
          {
            type: 'info-box',
            boxType: 'warning',
            title: 'Distributed Transactions',
            text: 'ACID transactions that span multiple shards require two-phase commit (2PC), which is slow and complex. Most sharded systems choose eventual consistency and use compensating transactions (sagas) instead.'
          },
          {
            type: 'info-box',
            boxType: 'info',
            title: 'Other Challenges',
            items: [
              '**Resharding**: Adding shards means migrating data while the system is live. Consistent hashing helps minimize the blast radius.',
              '**Hotspots**: A celebrity user or viral post can overload a single shard. Solutions: further split the hot shard, or add a caching layer.',
              '**ID Generation**: Auto-increment IDs no longer work across shards. Use UUIDs, Snowflake IDs, or a centralized ID service.',
              '**Operational Complexity**: Backups, schema migrations, and monitoring must now operate across N databases instead of one.'
            ]
          },
          {
            type: 'code',
            language: 'JavaScript',
            id: 'snowflake-id',
            code: '// Snowflake ID: Globally unique, sortable, no coordination\n// | 41 bits: timestamp | 10 bits: machine ID | 12 bits: sequence |\n\nclass SnowflakeIdGenerator {\n  constructor(machineId) {\n    this.machineId = machineId & 0x3FF; // 10 bits\n    this.sequence = 0;\n    this.lastTimestamp = -1;\n    this.epoch = 1704067200000; // Jan 1, 2024\n  }\n\n  nextId() {\n    let timestamp = Date.now() - this.epoch;\n    if (timestamp === this.lastTimestamp) {\n      this.sequence = (this.sequence + 1) & 0xFFF; // 12 bits\n      if (this.sequence === 0) {\n        // Wait for next millisecond\n        while (Date.now() - this.epoch <= this.lastTimestamp) {}\n        timestamp = Date.now() - this.epoch;\n      }\n    } else {\n      this.sequence = 0;\n    }\n    this.lastTimestamp = timestamp;\n\n    // Combine: timestamp(41) | machineId(10) | sequence(12)\n    return (\n      BigInt(timestamp) << 22n |\n      BigInt(this.machineId) << 12n |\n      BigInt(this.sequence)\n    );\n  }\n}\n\n// 4096 IDs/ms/machine, no coordination needed'
          }
        ]
      },
      {
        id: 'choosing-key',
        title: 'Choosing the Shard Key',
        icon: 'Database',
        content: [
          {
            type: 'paragraph',
            text: 'The shard key determines everything: data distribution, query efficiency, and future scalability. A bad shard key can make your system slower than a single unsharded database.'
          },
          {
            type: 'info-box',
            boxType: 'key',
            title: 'Shard Key Selection Criteria',
            items: [
              '**High cardinality**: The key should have many distinct values (user_id > country_code)',
              '**Even distribution**: Values should be roughly uniformly distributed across the key space',
              '**Query alignment**: Most queries should be able to target a single shard (avoid scatter-gather)',
              '**Write distribution**: Writes should spread across shards, not concentrate on one'
            ]
          },
          {
            type: 'tradeoff',
            title: 'Shard Key Examples',
            titleColor: 'blue',
            table: {
              headers: ['Application', 'Good Shard Key', 'Bad Shard Key', 'Why'],
              rows: [
                ['Social Media', 'user_id', 'post_date', 'Queries are per-user; date causes write hotspot on today\'s shard'],
                ['E-Commerce', 'order_id', 'country', 'Orders spread evenly; country creates US/India hotspot'],
                ['Chat App', 'conversation_id', 'user_id', 'Messages in a chat should live together; user_id splits conversations'],
                ['Analytics', 'event_date + user_id', 'event_type', 'Date enables pruning; event_type has low cardinality'],
              ]
            }
          }
        ]
      },
      {
        id: 'migration',
        title: 'Live Migration Strategy',
        icon: 'TrendingUp',
        content: [
          {
            type: 'paragraph',
            text: 'You rarely shard from day one. Most systems start with a single database and shard later when they hit limits. Migrating to a sharded architecture without downtime is one of the hardest problems in distributed systems.'
          },
          {
            type: 'info-box',
            boxType: 'tip',
            title: 'Double-Write Migration Pattern',
            items: [
              '**Phase 1**: Deploy new sharded database alongside the old one. Write to both, read from old.',
              '**Phase 2**: Backfill historical data from old DB to new shards.',
              '**Phase 3**: Verify data consistency between old and new.',
              '**Phase 4**: Switch reads to new sharded DB. Keep writing to both.',
              '**Phase 5**: Stop writing to old DB. Migration complete.'
            ]
          },
          {
            type: 'code',
            language: 'JavaScript',
            id: 'double-write',
            code: '// Phase 1-4: Double-write proxy\nasync function writeUser(user) {\n  // Always write to new sharded DB\n  const shard = getShardForUser(user.id);\n  await shardedDB[shard].users.upsert(user);\n\n  // Also write to old DB (until Phase 5)\n  if (!migrationComplete) {\n    await legacyDB.users.upsert(user);\n  }\n}\n\nasync function readUser(userId) {\n  if (readFromNewDB) {\n    // Phase 4+: read from sharded DB\n    const shard = getShardForUser(userId);\n    return await shardedDB[shard].users.findById(userId);\n  }\n  // Phase 1-3: read from legacy DB\n  return await legacyDB.users.findById(userId);\n}'
          }
        ]
      },
      {
        id: 'takeaways',
        title: 'Key Takeaways',
        icon: 'Lightbulb',
        content: [
          {
            type: 'takeaways',
            columns: [
              {
                title: 'Interview Essentials',
                items: [
                  'Know when to shard (exhaust simpler options first)',
                  'Explain range vs hash vs directory strategies with trade-offs',
                  'Identify cross-shard joins and distributed transactions as the main challenges',
                  'Choose a shard key based on cardinality, distribution, and query patterns'
                ]
              },
              {
                title: 'Production Wisdom',
                items: [
                  'Start with a single DB, add read replicas, then shard',
                  'Use consistent hashing for easier resharding later',
                  'Use Snowflake IDs for globally unique, sortable identifiers',
                  'Double-write migration allows zero-downtime sharding'
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // =============================================
  // NEW CASE STUDIES
  // =============================================
  'rate-limiter': {
    title: 'Design a Rate Limiter',
    subtitle: 'Build a distributed rate limiter to protect APIs from abuse. Token bucket, sliding window, and Redis-based implementations.',
    category: 'Case Study',
    difficulty: 'Intermediate',
    readTime: '18 min',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: 'BookOpen',
        content: [
          {
            type: 'paragraph',
            text: 'A rate limiter controls how many requests a client can make to an API within a given time window. It protects services from abuse, prevents resource starvation, and ensures fair usage. Every major API — Stripe, GitHub, Twitter, AWS — enforces rate limits.'
          },
          {
            type: 'info-box',
            boxType: 'key',
            title: 'Why Rate Limiting Matters',
            items: [
              '**Prevent abuse**: Stop bots, scrapers, and brute-force attacks',
              '**Protect resources**: Keep servers healthy under traffic spikes',
              '**Fair usage**: Ensure no single user degrades service for others',
              '**Cost control**: Prevent runaway API usage from inflating cloud bills',
              '**Compliance**: Many APIs require rate limits contractually (SLAs)'
            ]
          }
        ]
      },
      {
        id: 'requirements',
        title: 'Requirements Gathering',
        icon: 'Code',
        content: [
          {
            type: 'requirements',
            functional: {
              title: 'Functional Requirements',
              color: 'emerald',
              items: [
                'Limit requests per user/API key within a time window',
                'Return HTTP 429 (Too Many Requests) when limit exceeded',
                'Include rate limit headers in every response (X-RateLimit-Remaining, X-RateLimit-Reset)',
                'Support different limits per endpoint (e.g., /login: 5/min, /api: 100/min)',
                'Support both per-user and global rate limits'
              ]
            },
            nonFunctional: {
              title: 'Non-Functional Requirements',
              color: 'purple',
              items: [
                '**Low latency**: Rate check must add <1ms per request',
                '**High availability**: Rate limiter failure should not block legitimate traffic',
                '**Distributed**: Must work across multiple API servers',
                '**Accurate**: Minimal over-counting or under-counting',
                '**Memory efficient**: Must handle millions of users'
              ]
            }
          }
        ]
      },
      {
        id: 'algorithms',
        title: 'Rate Limiting Algorithms',
        icon: 'Zap',
        content: [
          {
            type: 'paragraph',
            text: 'There are four widely used algorithms for rate limiting. Each has different trade-offs around memory, accuracy, and burst handling.'
          },
          {
            type: 'collapsible',
            id: 'token-bucket',
            title: 'Token Bucket (Most Popular)',
            icon: 'Zap',
            defaultOpen: true,
            content: [
              {
                type: 'paragraph',
                text: 'A bucket holds tokens that refill at a steady rate. Each request costs one token. If the bucket is empty, the request is rejected. This is the most commonly used algorithm — used by AWS API Gateway, Stripe, and most cloud providers.'
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'token-bucket-impl',
                code: 'class TokenBucket {\n  constructor(capacity, refillRate) {\n    this.capacity = capacity;     // max tokens\n    this.tokens = capacity;       // current tokens\n    this.refillRate = refillRate; // tokens per second\n    this.lastRefill = Date.now();\n  }\n\n  allowRequest() {\n    this._refill();\n    if (this.tokens >= 1) {\n      this.tokens -= 1;\n      return true;   // Request allowed\n    }\n    return false;    // Rate limited (429)\n  }\n\n  _refill() {\n    const now = Date.now();\n    const elapsed = (now - this.lastRefill) / 1000;\n    const newTokens = elapsed * this.refillRate;\n    this.tokens = Math.min(this.capacity, this.tokens + newTokens);\n    this.lastRefill = now;\n  }\n}\n\n// Example: 10 requests/second, burst up to 20\nconst limiter = new TokenBucket(20, 10);\nlimiter.allowRequest(); // true (19 tokens left)'
              },
              {
                type: 'info-box',
                boxType: 'tip',
                title: 'Why Token Bucket Wins',
                text: 'Token bucket allows controlled bursts (up to bucket capacity) while enforcing a steady average rate. This matches real user behavior — humans don\'t send requests at perfectly even intervals.'
              }
            ]
          },
          {
            type: 'collapsible',
            id: 'sliding-window-log',
            title: 'Sliding Window Log',
            icon: 'Database',
            defaultOpen: false,
            content: [
              {
                type: 'paragraph',
                text: 'Keep a log of all request timestamps. For each new request, remove timestamps older than the window, count remaining entries. Most accurate but uses the most memory.'
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'sliding-log-impl',
                code: 'class SlidingWindowLog {\n  constructor(limit, windowMs) {\n    this.limit = limit;\n    this.windowMs = windowMs;\n    this.logs = new Map(); // userId → [timestamps]\n  }\n\n  allowRequest(userId) {\n    const now = Date.now();\n    const windowStart = now - this.windowMs;\n\n    // Get or create user\'s request log\n    if (!this.logs.has(userId)) {\n      this.logs.set(userId, []);\n    }\n    const userLog = this.logs.get(userId);\n\n    // Remove expired entries\n    while (userLog.length > 0 && userLog[0] <= windowStart) {\n      userLog.shift();\n    }\n\n    if (userLog.length < this.limit) {\n      userLog.push(now);\n      return true;\n    }\n    return false;\n  }\n}\n\n// 100 requests per 60-second window\nconst limiter = new SlidingWindowLog(100, 60_000);'
              },
              {
                type: 'info-box',
                boxType: 'warning',
                title: 'Memory Concern',
                text: 'Storing every timestamp for every user is expensive. For 1M users × 100 requests = 100M timestamps in memory. Consider sliding window counter as a more memory-efficient alternative.'
              }
            ]
          },
          {
            type: 'collapsible',
            id: 'sliding-window-counter',
            title: 'Sliding Window Counter',
            icon: 'TrendingUp',
            defaultOpen: false,
            content: [
              {
                type: 'paragraph',
                text: 'A hybrid approach: divide time into fixed windows, but weight the previous window\'s count proportionally. Nearly as accurate as the sliding log, but uses only 2 counters per user.'
              },
              {
                type: 'code',
                language: 'JavaScript',
                id: 'sliding-counter-impl',
                code: 'class SlidingWindowCounter {\n  constructor(limit, windowMs) {\n    this.limit = limit;\n    this.windowMs = windowMs;\n    this.windows = new Map(); // userId → { prev, curr, prevStart, currStart }\n  }\n\n  allowRequest(userId) {\n    const now = Date.now();\n    const currentWindow = Math.floor(now / this.windowMs);\n\n    let entry = this.windows.get(userId);\n    if (!entry || entry.currStart !== currentWindow) {\n      entry = {\n        prev: entry?.currStart === currentWindow - 1 ? entry.curr : 0,\n        curr: 0,\n        prevStart: currentWindow - 1,\n        currStart: currentWindow,\n      };\n      this.windows.set(userId, entry);\n    }\n\n    // Weight previous window by remaining overlap\n    const elapsedInWindow = (now % this.windowMs) / this.windowMs;\n    const weightedCount = entry.prev * (1 - elapsedInWindow) + entry.curr;\n\n    if (weightedCount < this.limit) {\n      entry.curr++;\n      return true;\n    }\n    return false;\n  }\n}\n\n// Memory: just 2 integers per user (vs N timestamps)'
              }
            ]
          },
          {
            type: 'collapsible',
            id: 'fixed-window',
            title: 'Fixed Window Counter',
            icon: 'Code',
            defaultOpen: false,
            content: [
              {
                type: 'paragraph',
                text: 'The simplest algorithm. Divide time into fixed windows (e.g., 0:00-0:59, 1:00-1:59) and count requests per window. Easy to implement but has a boundary burst problem.'
              },
              {
                type: 'code',
                language: 'text',
                id: 'fixed-window-problem',
                code: '// Problem: Boundary burst\n// Limit: 100 requests per minute\n\n// Window 1 (0:00 - 0:59): User sends 0 requests from 0:00-0:30\n//                          Then 100 requests at 0:31-0:59  ✓\n// Window 2 (1:00 - 1:59): User sends 100 requests at 1:00-1:01  ✓\n\n// Result: 200 requests in a 30-second span!\n// The fixed window boundary let them double the limit.'
              },
              {
                type: 'info-box',
                boxType: 'info',
                title: 'When to Use Fixed Window',
                text: 'Despite the boundary issue, fixed window counters are fine when approximate limiting is acceptable and simplicity matters — e.g., daily API quotas, hourly email sending limits.'
              }
            ]
          },
          {
            type: 'tradeoff',
            title: 'Algorithm Comparison',
            titleColor: 'emerald',
            table: {
              headers: ['Algorithm', 'Memory', 'Accuracy', 'Burst Handling', 'Complexity'],
              rows: [
                ['Token Bucket', 'O(1) per user', 'Good', 'Allows controlled bursts', 'Low'],
                ['Sliding Window Log', 'O(N) per user', 'Exact', 'Strict (no bursts)', 'Medium'],
                ['Sliding Window Counter', 'O(1) per user', 'Near-exact', 'Weighted smoothing', 'Medium'],
                ['Fixed Window', 'O(1) per user', 'Approximate', 'Boundary burst issue', 'Lowest'],
              ]
            }
          }
        ]
      },
      {
        id: 'distributed',
        title: 'Distributed Rate Limiting',
        icon: 'Globe',
        content: [
          {
            type: 'paragraph',
            text: 'In a real system, multiple API servers sit behind a load balancer. If each server maintains its own rate limiter, a user can effectively multiply their limit by the number of servers. The solution: a centralized, shared counter — typically Redis.'
          },
          {
            type: 'info-box',
            boxType: 'key',
            title: 'Why Redis?',
            items: [
              '**In-memory speed**: Sub-millisecond operations (adds <1ms latency)',
              '**Atomic operations**: INCR and EXPIRE are atomic — no race conditions',
              '**TTL support**: Keys auto-expire, no manual cleanup needed',
              '**Cluster mode**: Scales horizontally across multiple nodes',
              '**Lua scripting**: Run complex logic atomically on the server side'
            ]
          },
          {
            type: 'code',
            language: 'JavaScript',
            id: 'redis-token-bucket',
            code: '// Redis-based sliding window counter (production-grade)\n// Uses a single Lua script for atomic check-and-increment\n\nconst RATE_LIMIT_SCRIPT = `\n  local key = KEYS[1]\n  local limit = tonumber(ARGV[1])\n  local window = tonumber(ARGV[2])\n  local now = tonumber(ARGV[3])\n\n  -- Remove timestamps outside the window\n  redis.call(\'ZREMRANGEBYSCORE\', key, 0, now - window)\n\n  -- Count current requests in window\n  local count = redis.call(\'ZCARD\', key)\n\n  if count < limit then\n    -- Add current timestamp and allow\n    redis.call(\'ZADD\', key, now, now .. math.random())\n    redis.call(\'EXPIRE\', key, window / 1000)\n    return { 1, limit - count - 1 }  -- allowed, remaining\n  else\n    -- Reject\n    local oldest = redis.call(\'ZRANGE\', key, 0, 0, \'WITHSCORES\')\n    local resetAt = oldest[2] + window\n    return { 0, 0, resetAt }  -- denied, remaining, reset time\n  end\n`;\n\nasync function rateLimit(userId, limit, windowMs) {\n  const key = `rate:${userId}`;\n  const now = Date.now();\n\n  const [allowed, remaining, resetAt] = await redis.eval(\n    RATE_LIMIT_SCRIPT, 1, key, limit, windowMs, now\n  );\n\n  return {\n    allowed: allowed === 1,\n    remaining,\n    resetAt: resetAt || now + windowMs,\n  };\n}'
          },
          {
            type: 'collapsible',
            id: 'race-conditions',
            title: 'Handling Race Conditions',
            icon: 'AlertCircle',
            defaultOpen: false,
            content: [
              {
                type: 'paragraph',
                text: 'Even with Redis, naive GET-then-SET creates a race condition. Two requests could read the same count, both increment, and both succeed — allowing double the limit.'
              },
              {
                type: 'code',
                language: 'text',
                id: 'race-condition',
                code: '// WRONG: GET → check → SET (race condition)\nThread A: GET counter → 99 (under limit of 100)\nThread B: GET counter → 99 (also under limit!)\nThread A: SET counter → 100 ✓\nThread B: SET counter → 100 ✓  ← should have been 101 → rejected!\n\n// CORRECT: Use atomic Lua script or MULTI/EXEC\n// The Lua script above runs atomically on the Redis server\n// No other command can interleave between the read and write'
              }
            ]
          },
          {
            type: 'collapsible',
            id: 'failover',
            title: 'What If Redis Goes Down?',
            icon: 'AlertCircle',
            defaultOpen: false,
            content: [
              {
                type: 'paragraph',
                text: 'Rate limiting should be fail-open in most cases. If Redis is unavailable, allow requests through rather than blocking all traffic. Some approaches:'
              },
              {
                type: 'info-box',
                boxType: 'tip',
                title: 'Resilience Strategies',
                items: [
                  '**Fail open**: If Redis is down, allow all requests (lose protection briefly, keep service up)',
                  '**Local fallback**: Each server keeps an in-memory rate limiter as backup (limits per-server, not global)',
                  '**Redis Sentinel/Cluster**: Automatic failover to replica in <1 second',
                  '**Circuit breaker**: If Redis latency exceeds 10ms, bypass rate limiting temporarily'
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'api-design',
        title: 'API Design',
        icon: 'Server',
        content: [
          {
            type: 'paragraph',
            text: 'Good rate limiting is transparent — clients always know where they stand via response headers.'
          },
          {
            type: 'code',
            language: 'HTTP',
            id: 'rate-limit-headers',
            code: '# Successful request (200 OK)\nHTTP/1.1 200 OK\nX-RateLimit-Limit: 100\nX-RateLimit-Remaining: 73\nX-RateLimit-Reset: 1707436800\nContent-Type: application/json\n\n# Rate limited request (429 Too Many Requests)\nHTTP/1.1 429 Too Many Requests\nX-RateLimit-Limit: 100\nX-RateLimit-Remaining: 0\nX-RateLimit-Reset: 1707436800\nRetry-After: 47\nContent-Type: application/json\n\n{\n  "error": "rate_limit_exceeded",\n  "message": "Too many requests. Retry after 47 seconds.",\n  "retry_after": 47\n}'
          },
          {
            type: 'code',
            language: 'JavaScript',
            id: 'middleware-impl',
            code: '// Express middleware for rate limiting\nfunction rateLimitMiddleware(config) {\n  return async (req, res, next) => {\n    const userId = req.user?.id || req.ip; // Authenticated or IP-based\n    const endpoint = req.route?.path || \'default\';\n    const { limit, windowMs } = config[endpoint] || config.default;\n\n    const result = await rateLimit(userId, limit, windowMs);\n\n    // Always include rate limit headers\n    res.set({\n      \'X-RateLimit-Limit\': limit,\n      \'X-RateLimit-Remaining\': result.remaining,\n      \'X-RateLimit-Reset\': Math.ceil(result.resetAt / 1000),\n    });\n\n    if (!result.allowed) {\n      const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);\n      res.set(\'Retry-After\', retryAfter);\n      return res.status(429).json({\n        error: \'rate_limit_exceeded\',\n        message: `Too many requests. Retry after ${retryAfter} seconds.`,\n        retry_after: retryAfter,\n      });\n    }\n\n    next();\n  };\n}\n\n// Usage: different limits per endpoint\nconst config = {\n  \'/api/login\':    { limit: 5,   windowMs: 60_000 },    // 5/min\n  \'/api/search\':   { limit: 30,  windowMs: 60_000 },    // 30/min\n  \'/api/data\':     { limit: 100, windowMs: 60_000 },    // 100/min\n  default:         { limit: 60,  windowMs: 60_000 },    // 60/min\n};\n\napp.use(rateLimitMiddleware(config));'
          }
        ]
      },
      {
        id: 'scaling',
        title: 'Scaling & Architecture',
        icon: 'TrendingUp',
        content: [
          {
            type: 'paragraph',
            text: 'In production, rate limiting is deployed as middleware — either in the API gateway (centralized) or in each service (decentralized). Most companies use a hybrid approach.'
          },
          {
            type: 'tradeoff',
            title: 'Where to Place the Rate Limiter',
            titleColor: 'blue',
            comparisons: [
              {
                title: 'API Gateway (Centralized)',
                items: ['Single enforcement point — easy to manage', 'Built into AWS API Gateway, Kong, Envoy', 'Can rate limit before requests reach your services', 'Single point of failure if not HA']
              },
              {
                title: 'Service-Level (Decentralized)',
                items: ['Each service controls its own limits', 'More granular (per-endpoint, per-user-tier)', 'No single point of failure', 'Harder to maintain consistency across services']
              }
            ]
          },
          {
            type: 'stats',
            items: [
              { label: 'Redis Latency', value: '<1ms', desc: 'per rate limit check', color: 'emerald' },
              { label: 'Memory', value: '~1KB', desc: 'per user per rule', color: 'blue' },
              { label: 'Throughput', value: '100K+', desc: 'checks/sec per Redis node', color: 'purple' }
            ]
          },
          {
            type: 'info-box',
            boxType: 'tip',
            title: 'Tiered Rate Limits',
            text: 'Production systems often tier rate limits by user plan: free users get 60 req/min, paid users get 1000 req/min, enterprise gets custom limits. Store limit config in a database, cache in Redis, and look up by API key.'
          }
        ]
      },
      {
        id: 'takeaways',
        title: 'Key Takeaways',
        icon: 'Lightbulb',
        content: [
          {
            type: 'takeaways',
            columns: [
              {
                title: 'Design Principles',
                items: [
                  'Token bucket is the best default algorithm (allows bursts, O(1) memory)',
                  'Use Redis for distributed rate limiting (atomic, fast, TTL)',
                  'Always include rate limit headers in responses',
                  'Fail open — don\'t block all traffic if the rate limiter is down'
                ]
              },
              {
                title: 'Interview Tips',
                items: [
                  'Start with requirements: per-user vs global, accuracy vs simplicity',
                  'Compare at least 2 algorithms with trade-offs',
                  'Address the distributed case (multiple API servers)',
                  'Mention race conditions and how Lua scripts solve them'
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
