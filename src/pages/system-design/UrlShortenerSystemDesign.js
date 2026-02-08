import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Server, Database, Globe, Lock, Clock, Zap, 
  ChevronDown, ChevronRight, Copy, Check, Hash, 
  Layers, Cpu, ArrowRight, BookOpen, AlertCircle
} from 'lucide-react';

// --- Design System Constants ---
const THEME = {
  bg: "bg-[#0a0a0a]", // Deepest void
  bgSec: "bg-[#111111]", // Slightly lighter void
  text: "text-[#e5e5e5]",
  textDim: "text-[#a3a3a3]",
  accent: "text-[#3b82f6]", // Electric Blue
  accentBg: "bg-[#3b82f6]",
  success: "text-[#10b981]",
  warning: "text-[#f59e0b]",
  border: "border-[#262626]",
  codeBg: "bg-[#171717]",
  fontHeading: "font-serif", // Placeholder for actual serif font class
  fontMono: "font-mono", // Placeholder for mono font class
};

// --- Helper Components ---

const SectionHeading = ({ children, id }) => (
  <motion.h2 
    id={id}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={`text-3xl md:text-4xl font-bold mt-16 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 scroll-mt-24`}
  >
    {children}
  </motion.h2>
);

const CodeBlock = ({ code, language = "json" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-6 border border-[#333] shadow-2xl">
      <div className="flex justify-between items-center px-4 py-2 bg-[#1a1a1a] border-b border-[#333]">
        <span className="text-xs uppercase tracking-wider text-gray-500 font-mono">{language}</span>
        <button 
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-[#0f0f0f] text-sm font-mono leading-relaxed">
        <code className="text-gray-300">{code}</code>
      </pre>
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, children }) => (
  <div className="p-6 rounded-xl bg-[#111] border border-[#262626] hover:border-gray-600 transition-colors duration-300 group">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-lg bg-[#1a1a1a] group-hover:bg-[#252525] transition-colors">
        <Icon size={24} className="text-blue-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-100">{title}</h3>
        <div className="text-gray-400 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  </div>
);

// --- Content Sections ---

const ArchitectureDiagram = () => {
  return (
    <div className="my-12 p-8 bg-[#111] border border-[#262626] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Client */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Globe className="text-white" size={32} />
          </div>
          <span className="mt-2 text-sm font-mono text-gray-400">Client</span>
        </div>

        {/* Load Balancer */}
        <div className="h-12 w-0.5 bg-gradient-to-b from-gray-700 to-gray-700"></div>
        <div className="px-6 py-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-sm">
          Load Balancer
        </div>
        <div className="h-12 w-0.5 bg-gray-700"></div>

        {/* Services */}
        <div className="flex gap-4 md:gap-12 flex-wrap justify-center">
          <div className="flex flex-col items-center p-4 border border-[#333] bg-[#1a1a1a] rounded-lg w-40">
            <Server className="mb-2 text-purple-400" />
            <span className="font-semibold text-sm">App Service</span>
            <span className="text-xs text-gray-500 mt-1">Shorten/Redirect</span>
          </div>
          <div className="flex flex-col items-center p-4 border border-[#333] bg-[#1a1a1a] rounded-lg w-40">
            <Hash className="mb-2 text-green-400" />
            <span className="font-semibold text-sm">KGS</span>
            <span className="text-xs text-gray-500 mt-1">Key Generation</span>
          </div>
        </div>

        {/* Data Layer */}
        <div className="flex w-full justify-center gap-12 mt-4">
          <div className="h-12 w-0.5 bg-gray-700"></div>
          <div className="h-12 w-0.5 bg-gray-700"></div>
        </div>

        <div className="flex gap-4 md:gap-12 flex-wrap justify-center">
          <div className="flex flex-col items-center p-4 border border-orange-500/20 bg-orange-500/5 rounded-lg w-40">
            <Zap className="mb-2 text-orange-400" />
            <span className="font-semibold text-sm">Cache</span>
            <span className="text-xs text-gray-500 mt-1">Redis Cluster</span>
          </div>
          <div className="flex flex-col items-center p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg w-40">
            <Database className="mb-2 text-blue-400" />
            <span className="font-semibold text-sm">Database</span>
            <span className="text-xs text-gray-500 mt-1">NoSQL (Cassandra)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizComponent = () => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const question = {
    text: "Why is a NoSQL database generally preferred over SQL for a URL shortener?",
    options: [
      { id: 0, text: "It supports complex joins between tables." },
      { id: 1, text: "It provides easier horizontal scaling and faster lookups for key-value data." },
      { id: 2, text: "It guarantees strict ACID compliance for every transaction." },
      { id: 3, text: "It uses less disk space automatically." }
    ],
    correct: 1
  };

  return (
    <div className="mt-12 p-8 bg-[#111] border border-[#262626] rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-purple-400" />
        <h3 className="text-xl font-bold">Concept Check</h3>
      </div>
      <p className="text-lg mb-6">{question.text}</p>
      <div className="space-y-3">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => { setSelected(opt.id); setShowResult(true); }}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
              showResult 
                ? opt.id === question.correct 
                  ? "bg-green-500/10 border-green-500/50 text-green-400" 
                  : opt.id === selected 
                    ? "bg-red-500/10 border-red-500/50 text-red-400" 
                    : "bg-[#1a1a1a] border-[#333] opacity-50"
                : "bg-[#1a1a1a] border-[#333] hover:border-gray-500 hover:bg-[#222]"
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {showResult && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm"
        >
          <strong>Explanation:</strong> Correct! URL shorteners are read-heavy systems requiring massive scale. The data model is simple (Key-Value), and relationships (Joins) are rarely needed. NoSQL databases like Cassandra or DynamoDB scale horizontally much easier than relational DBs.
        </motion.div>
      )}
    </div>
  );
};

// --- Main Page Component ---

const UrlShortenerSystemDesign = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = [
    { id: "requirements", title: "Requirements" },
    { id: "capacity", title: "Capacity Estimation" },
    { id: "architecture", title: "High-Level Design" },
    { id: "encoding", title: "Core Logic: Encoding" },
    { id: "database", title: "Data Model" },
    { id: "scaling", title: "Scaling & Trade-offs" }
  ];

  return (
    <div className={`min-h-screen ${THEME.bg} ${THEME.text} font-sans selection:bg-blue-500/30`}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-20 pb-32">
        
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 relative">
          <div className="sticky top-32 space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 pl-4">Contents</h4>
            {sections.map((section) => (
              <a 
                key={section.id} 
                href={`#${section.id}`}
                className="block pl-4 py-2 text-sm text-gray-400 hover:text-white hover:border-l-2 border-blue-500 transition-all duration-200 border-l-2 border-transparent"
              >
                {section.title}
              </a>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-1 lg:col-span-9">
          
          {/* Hero Section */}
          <header className="mb-20 relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]"></div>
            <div className="absolute top-20 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]"></div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-6">
              <Cpu size={14} /> System Design Series
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Design a URL Shortener
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Explore the architecture behind scalable link management systems like Bit.ly. 
              From capacity planning to collision-free hashing algorithms.
            </p>
          </header>

          {/* 1. Requirements */}
          <section>
            <SectionHeading id="requirements">Requirements Gathering</SectionHeading>
            <div className="grid md:grid-cols-2 gap-6">
              <InfoCard icon={Check} title="Functional">
                <ul className="space-y-2 list-disc list-inside marker:text-blue-500">
                  <li>Given a long URL, return a unique short URL.</li>
                  <li>Clicking the short URL redirects to the original.</li>
                  <li>Users can optionally pick a custom alias.</li>
                  <li>Links expire after a default timespan.</li>
                </ul>
              </InfoCard>
              <InfoCard icon={Lock} title="Non-Functional">
                <ul className="space-y-2 list-disc list-inside marker:text-purple-500">
                  <li><strong>High Availability:</strong> System must not go down.</li>
                  <li><strong>Low Latency:</strong> Redirection must happen in milliseconds.</li>
                  <li><strong>Read-Heavy:</strong> 100:1 Read/Write ratio.</li>
                </ul>
              </InfoCard>
            </div>
          </section>

          {/* 2. Capacity Estimation */}
          <section>
            <SectionHeading id="capacity">Capacity Estimation (Back-of-Envelope)</SectionHeading>
            <div className="bg-[#111] border border-[#262626] rounded-xl p-6 md:p-8 font-mono text-sm md:text-base">
              <div className="grid gap-6">
                <div className="border-b border-[#262626] pb-4">
                  <div className="text-gray-500 mb-1">Traffic Estimates</div>
                  <div className="flex justify-between items-center">
                    <span>Write QPS</span>
                    <span className="text-blue-400">1,160 / sec</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">100M new URLs/month / (30 * 24 * 3600)</div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span>Read QPS (100:1 ratio)</span>
                    <span className="text-purple-400">116,000 / sec</span>
                  </div>
                </div>

                <div>
                  <div className="text-gray-500 mb-1">Storage Estimates (5 Years)</div>
                  <div className="flex justify-between items-center">
                    <span>Total Records</span>
                    <span className="text-gray-300">6 Billion</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Storage Size</span>
                    <span className="text-green-400">3 TB</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">6B records * 500 bytes/record</div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Architecture */}
          <section>
            <SectionHeading id="architecture">High-Level Architecture</SectionHeading>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We separate the system into distinct microservices. The <strong className="text-white">App Service</strong> handles the logic, 
              while the <strong className="text-white">KGS (Key Generation Service)</strong> pre-generates unique tokens to ensure instant writes without collision checks.
            </p>
            <ArchitectureDiagram />
          </section>

          {/* 4. Deep Dive: Encoding */}
          <section>
            <SectionHeading id="encoding">Core Logic: Base62 Encoding</SectionHeading>
            <p className="text-gray-400 mb-6">
              Why Base62? It uses characters <code className="bg-[#1a1a1a] px-1 rounded text-blue-300">[A-Z, a-z, 0-9]</code>. 
              A 7-character string gives us <strong>62⁷ ≈ 3.5 Trillion</strong> combinations, which is sufficient for decades.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Hash size={20} className="text-blue-500" /> 
                  The Algorithm
                </h4>
                <ol className="space-y-4 text-gray-400 list-decimal list-inside">
                  <li>Take a unique numeric ID (from DB or distributed counter).</li>
                  <li>Map the number to Base62 characters recursively.</li>
                  <li>Reverse the result string.</li>
                </ol>
              </div>
              <CodeBlock 
                language="javascript"
                code={`const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encode(num) {
  let str = "";
  if (num === 0) return BASE62[0];
  
  while (num > 0) {
    str = BASE62[num % 62] + str;
    num = Math.floor(num / 62);
  }
  return str;
}

// Example:
// encode(125) -> "21"
// encode(999999) -> "4c91"`} 
              />
            </div>
          </section>

          {/* 5. Data Model */}
          <section>
            <SectionHeading id="database">Data Model Schema</SectionHeading>
            <div className="overflow-hidden rounded-xl border border-[#262626]">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-[#1a1a1a] text-gray-200 uppercase font-mono text-xs">
                  <tr>
                    <th className="px-6 py-4">Column Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626] bg-[#111]">
                  <tr>
                    <td className="px-6 py-4 font-mono text-blue-400">id</td>
                    <td className="px-6 py-4 font-mono">BIGINT</td>
                    <td className="px-6 py-4">Primary Key (Auto-incrementing or Snowflake ID)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-purple-400">short_url</td>
                    <td className="px-6 py-4 font-mono">VARCHAR(7)</td>
                    <td className="px-6 py-4">The Base62 encoded string (Indexed)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono">original_url</td>
                    <td className="px-6 py-4 font-mono">VARCHAR(2048)</td>
                    <td className="px-6 py-4">The actual destination URL</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono">created_at</td>
                    <td className="px-6 py-4 font-mono">TIMESTAMP</td>
                    <td className="px-6 py-4">For expiration logic</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. Scaling */}
          <section>
            <SectionHeading id="scaling">Scaling & Trade-offs</SectionHeading>
            <div className="grid md:grid-cols-3 gap-6">
              <InfoCard icon={Layers} title="Database Sharding">
                Partition data based on the first character of the hash or short key. This distributes the load across multiple DB nodes.
              </InfoCard>
              <InfoCard icon={Zap} title="Caching (Redis)">
                Cache the top 20% of hot URLs. Use an eviction policy like LRU (Least Recently Used) to keep memory efficient.
              </InfoCard>
              <InfoCard icon={AlertCircle} title="Race Conditions">
                If users pick custom URLs, multiple requests might try to claim "google". Use DB unique constraints or distributed locks.
              </InfoCard>
            </div>
          </section>

          {/* Quiz & Footer */}
          <QuizComponent />

          <div className="mt-20 pt-10 border-t border-[#262626] flex justify-between items-center">
            <div>
              <h4 className="text-gray-200 font-bold mb-1">Next Topic</h4>
              <p className="text-gray-500 text-sm">Design a Rate Limiter</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
              Continue <ArrowRight size={18} />
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};

export default UrlShortenerSystemDesign;
