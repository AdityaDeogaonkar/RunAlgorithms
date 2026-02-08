import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Copy, Check, Info, Zap, Database, Server, Globe, Lock, TrendingUp, Clock, Code, BookOpen, Lightbulb, AlertCircle } from 'lucide-react';

const UrlShortenerSystemDesign = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});
  const [copiedCode, setCopiedCode] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef(null);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const element = contentRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const progress = (element.scrollTop / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const CodeBlock = ({ code, language, id }) => (
    <div className="relative group my-6 rounded-lg overflow-hidden border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/50">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-emerald-400 transition-colors rounded-md hover:bg-slate-700/50"
        >
          {copiedCode === id ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-slate-200 font-mono leading-relaxed">{code}</code>
      </pre>
    </div>
  );

  const CollapsibleSection = ({ title, children, id, icon: Icon, defaultOpen = false }) => {
    const isExpanded = expandedSections[id] ?? defaultOpen;
    
    return (
      <div className="my-8 border border-slate-700/30 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800/20 to-slate-900/20 backdrop-blur-sm">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-all group"
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-5 h-5 text-emerald-400" />}
            <h3 className="text-lg font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors">
              {title}
            </h3>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-slate-400 transition-transform" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400 transition-transform" />
          )}
        </button>
        {isExpanded && (
          <div className="px-6 py-4 border-t border-slate-700/30 animate-slideDown">
            {children}
          </div>
        )}
      </div>
    );
  };

  const InfoBox = ({ type = 'info', title, children }) => {
    const styles = {
      info: 'border-blue-500/30 bg-blue-500/5',
      tip: 'border-emerald-500/30 bg-emerald-500/5',
      warning: 'border-amber-500/30 bg-amber-500/5',
      key: 'border-purple-500/30 bg-purple-500/5'
    };

    const icons = {
      info: Info,
      tip: Lightbulb,
      warning: AlertCircle,
      key: Lock
    };

    const Icon = icons[type];

    return (
      <div className={`my-6 p-4 rounded-lg border ${styles[type]} backdrop-blur-sm`}>
        <div className="flex gap-3">
          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-slate-300" />
          <div className="flex-1">
            {title && <h4 className="font-semibold text-slate-200 mb-2">{title}</h4>}
            <div className="text-slate-300 text-sm leading-relaxed">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  const TableOfContents = () => {
    const sections = [
      { id: 'overview', label: 'Overview', icon: BookOpen },
      { id: 'requirements', label: 'Requirements', icon: Code },
      { id: 'capacity', label: 'Capacity Planning', icon: TrendingUp },
      { id: 'architecture', label: 'Architecture', icon: Globe },
      { id: 'database', label: 'Database Design', icon: Database },
      { id: 'api', label: 'API Design', icon: Server },
      { id: 'scaling', label: 'Scaling Strategy', icon: Zap },
      { id: 'tradeoffs', label: 'Trade-offs', icon: AlertCircle }
    ];

    return (
      <div className="sticky top-6 space-y-2">
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Reading Progress
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 rounded-full"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          On This Page
        </div>
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              setActiveSection(id);
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2.5 group ${
              activeSection === id
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    );
  };

  const ArchitectureDiagram = () => (
    <div className="my-8 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700/50 overflow-x-auto">
      <svg viewBox="0 0 800 500" className="w-full h-auto">
        {/* Client */}
        <g transform="translate(50, 50)">
          <rect width="120" height="80" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
          <text x="60" y="35" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="600">Client</text>
          <text x="60" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Browser/App</text>
        </g>

        {/* Load Balancer */}
        <g transform="translate(280, 50)">
          <rect width="140" height="80" rx="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
          <text x="70" y="35" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="600">Load Balancer</text>
          <text x="70" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">NGINX/ALB</text>
        </g>

        {/* App Servers */}
        <g transform="translate(260, 180)">
          <rect width="80" height="70" rx="8" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
          <text x="40" y="30" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">API</text>
          <text x="40" y="48" textAnchor="middle" fill="#94a3b8" fontSize="10">Server 1</text>
        </g>
        <g transform="translate(360, 180)">
          <rect width="80" height="70" rx="8" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
          <text x="40" y="30" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">API</text>
          <text x="40" y="48" textAnchor="middle" fill="#94a3b8" fontSize="10">Server 2</text>
        </g>

        {/* Cache */}
        <g transform="translate(520, 50)">
          <rect width="120" height="80" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
          <text x="60" y="35" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="600">Redis</text>
          <text x="60" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Cache Layer</text>
        </g>

        {/* Database */}
        <g transform="translate(520, 180)">
          <rect width="120" height="70" rx="8" fill="#0f172a" stroke="#ec4899" strokeWidth="2"/>
          <text x="60" y="30" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="600">PostgreSQL</text>
          <text x="60" y="48" textAnchor="middle" fill="#94a3b8" fontSize="11">Primary DB</text>
        </g>

        {/* Replica */}
        <g transform="translate(520, 280)">
          <rect width="120" height="70" rx="8" fill="#0f172a" stroke="#ec4899" strokeWidth="2" strokeDasharray="4"/>
          <text x="60" y="30" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="600">PostgreSQL</text>
          <text x="60" y="48" textAnchor="middle" fill="#94a3b8" fontSize="11">Read Replica</text>
        </g>

        {/* Analytics */}
        <g transform="translate(520, 380)">
          <rect width="120" height="70" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
          <text x="60" y="30" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="600">Analytics</text>
          <text x="60" y="48" textAnchor="middle" fill="#94a3b8" fontSize="11">Clickstream</text>
        </g>

        {/* Arrows */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
          </marker>
        </defs>
        
        <line x1="170" y1="90" x2="280" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="420" y1="90" x2="520" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="350" y1="130" x2="320" y2="180" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="350" y1="130" x2="380" y2="180" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="440" y1="215" x2="520" y2="215" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="580" y1="250" x2="580" y2="280" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="440" y1="230" x2="520" y2="415" stroke="#10b981" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)"/>
      </svg>
      <div className="mt-6 text-center text-sm text-slate-400">
        High-level system architecture for URL shortener service
      </div>
    </div>
  );

  const DatabaseSchema = () => (
    <div className="my-6 overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* URLs Table */}
          <div className="border border-slate-700/50 rounded-lg overflow-hidden bg-slate-900/30">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700/50">
              <h4 className="font-semibold text-slate-100 flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" />
                urls
              </h4>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Column</th>
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Type</th>
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">id</td>
                  <td className="px-4 py-2 text-slate-300">BIGINT</td>
                  <td className="px-4 py-2 text-slate-400">PK, Auto</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">short_code</td>
                  <td className="px-4 py-2 text-slate-300">VARCHAR(10)</td>
                  <td className="px-4 py-2 text-slate-400">Unique, Indexed</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">original_url</td>
                  <td className="px-4 py-2 text-slate-300">TEXT</td>
                  <td className="px-4 py-2 text-slate-400">Required</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">user_id</td>
                  <td className="px-4 py-2 text-slate-300">BIGINT</td>
                  <td className="px-4 py-2 text-slate-400">FK, Nullable</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">created_at</td>
                  <td className="px-4 py-2 text-slate-300">TIMESTAMP</td>
                  <td className="px-4 py-2 text-slate-400">Default NOW()</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">expires_at</td>
                  <td className="px-4 py-2 text-slate-300">TIMESTAMP</td>
                  <td className="px-4 py-2 text-slate-400">Nullable</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Analytics Table */}
          <div className="border border-slate-700/50 rounded-lg overflow-hidden bg-slate-900/30">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700/50">
              <h4 className="font-semibold text-slate-100 flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                url_clicks
              </h4>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Column</th>
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Type</th>
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">id</td>
                  <td className="px-4 py-2 text-slate-300">BIGINT</td>
                  <td className="px-4 py-2 text-slate-400">PK, Auto</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">url_id</td>
                  <td className="px-4 py-2 text-slate-300">BIGINT</td>
                  <td className="px-4 py-2 text-slate-400">FK</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">clicked_at</td>
                  <td className="px-4 py-2 text-slate-300">TIMESTAMP</td>
                  <td className="px-4 py-2 text-slate-400">Indexed</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">ip_address</td>
                  <td className="px-4 py-2 text-slate-300">INET</td>
                  <td className="px-4 py-2 text-slate-400">-</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">user_agent</td>
                  <td className="px-4 py-2 text-slate-300">TEXT</td>
                  <td className="px-4 py-2 text-slate-400">-</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 font-mono text-emerald-400">referrer</td>
                  <td className="px-4 py-2 text-slate-300">TEXT</td>
                  <td className="px-4 py-2 text-slate-400">Nullable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" 
           style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-16 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">System Design</span>
            </div>
            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Intermediate</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
            Design a URL Shortener
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed mb-8">
            Learn how to design a scalable URL shortening service like Bit.ly or TinyURL. 
            This comprehensive guide covers architecture, database design, API endpoints, and scaling strategies.
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>25 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>7 key sections</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>12,847 learners</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block">
            <TableOfContents />
          </aside>

          {/* Main Content */}
          <main 
            ref={contentRef}
            className="lg:col-span-3 space-y-12 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
          >
            {/* Overview */}
            <section id="overview">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-emerald-400" />
                Overview
              </h2>
              <div className="prose prose-invert prose-slate max-w-none">
                <p className="text-slate-300 leading-relaxed text-lg mb-4">
                  A URL shortener is a service that creates short aliases for long URLs. When users visit the short URL, 
                  they are redirected to the original long URL. This is commonly used in social media, marketing campaigns, 
                  and anywhere character count matters.
                </p>
                
                <InfoBox type="key" title="Key Learning Objectives">
                  <ul className="space-y-2 ml-4 list-disc">
                    <li>Design a system that handles billions of URLs with low latency</li>
                    <li>Implement efficient URL encoding/decoding algorithms</li>
                    <li>Build scalable storage and caching strategies</li>
                    <li>Handle analytics and click tracking at scale</li>
                  </ul>
                </InfoBox>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-200">Real-World Examples</h3>
                <ul className="space-y-2 text-slate-300">
                  <li><strong className="text-emerald-400">Bit.ly:</strong> 600M+ links created monthly, handling billions of redirects</li>
                  <li><strong className="text-emerald-400">TinyURL:</strong> One of the first URL shorteners, simple and reliable</li>
                  <li><strong className="text-emerald-400">Rebrandly:</strong> Custom branded short links for marketing</li>
                </ul>
              </div>
            </section>

            {/* Requirements */}
            <section id="requirements">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Code className="w-8 h-8 text-blue-400" />
                Requirements Gathering
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-4 text-emerald-400 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Functional Requirements
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Generate a unique short URL for a given long URL</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Redirect users from short URL to original URL</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Support custom short URLs (optional)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Provide analytics (clicks, geography, referrers)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Support URL expiration</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Non-Functional Requirements
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>High availability:</strong> 99.99% uptime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Low latency:</strong> Redirects under 100ms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Scalability:</strong> Handle billions of URLs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Durability:</strong> URLs should not be lost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Security:</strong> Prevent URL abuse</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Capacity Estimation */}
            <section id="capacity">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-amber-400" />
                Capacity Estimation
              </h2>

              <InfoBox type="info" title="Traffic Assumptions">
                Let's assume our service has Bit.ly-like scale with the following estimates.
              </InfoBox>

              <div className="grid md:grid-cols-3 gap-6 my-6">
                <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl">
                  <div className="text-sm text-emerald-400 mb-2 font-semibold uppercase tracking-wide">Write QPS</div>
                  <div className="text-3xl font-bold text-slate-100 mb-1">500</div>
                  <div className="text-sm text-slate-400">new URLs per second</div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl">
                  <div className="text-sm text-blue-400 mb-2 font-semibold uppercase tracking-wide">Read QPS</div>
                  <div className="text-3xl font-bold text-slate-100 mb-1">50,000</div>
                  <div className="text-sm text-slate-400">redirects per second</div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl">
                  <div className="text-sm text-purple-400 mb-2 font-semibold uppercase tracking-wide">Read:Write</div>
                  <div className="text-3xl font-bold text-slate-100 mb-1">100:1</div>
                  <div className="text-sm text-slate-400">ratio (read-heavy)</div>
                </div>
              </div>

              <CollapsibleSection 
                id="storage-calc" 
                title="Storage Calculations" 
                icon={Database}
                defaultOpen={true}
              >
                <div className="space-y-4 text-slate-300">
                  <div className="font-mono text-sm bg-slate-800/50 p-4 rounded-lg border border-slate-700/30">
                    <div className="text-emerald-400 mb-2">// Storage over 10 years</div>
                    <div>URLs per day = 500 QPS × 86,400 seconds = <span className="text-amber-400">43.2M URLs/day</span></div>
                    <div>URLs per year = 43.2M × 365 = <span className="text-amber-400">15.8B URLs/year</span></div>
                    <div>URLs in 10 years = 15.8B × 10 = <span className="text-amber-400">158B URLs</span></div>
                    <div className="mt-3">Average URL size = 500 bytes (URL + metadata)</div>
                    <div>Total storage = 158B × 500 bytes = <span className="text-emerald-400 font-bold">79 TB</span></div>
                  </div>

                  <InfoBox type="tip" title="Storage Optimization">
                    With compression and efficient indexing, actual storage will be lower. Consider using columnar storage 
                    for analytics data and time-series databases for click tracking.
                  </InfoBox>
                </div>
              </CollapsibleSection>

              <CollapsibleSection id="bandwidth-calc" title="Bandwidth Calculations" icon={Globe}>
                <div className="space-y-4 text-slate-300">
                  <div className="font-mono text-sm bg-slate-800/50 p-4 rounded-lg border border-slate-700/30">
                    <div className="text-emerald-400 mb-2">// Incoming traffic (writes)</div>
                    <div>500 URLs/sec × 500 bytes = <span className="text-amber-400">250 KB/sec = 0.25 MB/sec</span></div>
                    
                    <div className="mt-3 text-emerald-400">// Outgoing traffic (reads)</div>
                    <div>50,000 redirects/sec × 500 bytes = <span className="text-amber-400">25 MB/sec</span></div>
                    
                    <div className="mt-3 text-slate-400">// Total bandwidth</div>
                    <div>Ingress + Egress = <span className="text-emerald-400 font-bold">~25 MB/sec</span></div>
                  </div>
                </div>
              </CollapsibleSection>
            </section>

            {/* Architecture */}
            <section id="architecture">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8 text-cyan-400" />
                System Architecture
              </h2>

              <p className="text-slate-300 leading-relaxed mb-6">
                Our architecture follows a standard three-tier design with specialized components for URL generation, 
                caching, and analytics. The system prioritizes read performance given the 100:1 read-to-write ratio.
              </p>

              <ArchitectureDiagram />

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <InfoBox type="key" title="Key Design Decisions">
                  <ul className="space-y-2 ml-4 list-disc">
                    <li>Redis for caching hot URLs (80/20 rule)</li>
                    <li>Read replicas for scaling read operations</li>
                    <li>Separate analytics pipeline to avoid blocking writes</li>
                    <li>Load balancer with health checks and auto-scaling</li>
                  </ul>
                </InfoBox>

                <InfoBox type="warning" title="Bottlenecks to Watch">
                  <ul className="space-y-2 ml-4 list-disc">
                    <li>Database write contention during peak hours</li>
                    <li>Cache invalidation strategy</li>
                    <li>Analytics write throughput</li>
                    <li>Short code generation at scale</li>
                  </ul>
                </InfoBox>
              </div>
            </section>

            {/* Database Design */}
            <section id="database">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Database className="w-8 h-8 text-purple-400" />
                Database Design
              </h2>

              <p className="text-slate-300 leading-relaxed mb-6">
                We use PostgreSQL for ACID compliance and strong consistency. The schema is optimized for fast lookups 
                on the short_code column with proper indexing.
              </p>

              <DatabaseSchema />

              <CollapsibleSection id="indexing-strategy" title="Indexing Strategy" icon={Zap} defaultOpen={true}>
                <div className="space-y-4">
                  <CodeBlock 
                    language="SQL" 
                    id="indexes"
                    code={`-- Primary indexes for fast lookups
CREATE UNIQUE INDEX idx_short_code ON urls(short_code);
CREATE INDEX idx_user_urls ON urls(user_id, created_at DESC);
CREATE INDEX idx_expiration ON urls(expires_at) WHERE expires_at IS NOT NULL;

-- Analytics indexes
CREATE INDEX idx_url_clicks_url_id ON url_clicks(url_id, clicked_at DESC);
CREATE INDEX idx_clicks_time ON url_clicks(clicked_at);

-- Partial index for active URLs
CREATE INDEX idx_active_urls ON urls(created_at) 
WHERE expires_at IS NULL OR expires_at > NOW();`}
                  />

                  <InfoBox type="tip" title="Index Performance">
                    The partial index on active URLs significantly improves query performance for common lookups. 
                    Regularly analyze query patterns and update indexes accordingly.
                  </InfoBox>
                </div>
              </CollapsibleSection>
            </section>

            {/* API Design */}
            <section id="api">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Server className="w-8 h-8 text-blue-400" />
                API Design
              </h2>

              <CollapsibleSection id="create-url" title="POST /api/shorten - Create Short URL" icon={Code} defaultOpen={true}>
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-200">Request:</h4>
                  <CodeBlock 
                    language="JSON" 
                    id="create-request"
                    code={`{
  "original_url": "https://www.example.com/very/long/url/with/many/parameters",
  "custom_alias": "my-link",  // optional
  "expires_at": "2026-12-31T23:59:59Z"  // optional
}`}
                  />

                  <h4 className="font-semibold text-slate-200 mt-6">Response (201 Created):</h4>
                  <CodeBlock 
                    language="JSON" 
                    id="create-response"
                    code={`{
  "short_url": "https://short.ly/abc123",
  "short_code": "abc123",
  "original_url": "https://www.example.com/very/long/url/with/many/parameters",
  "created_at": "2026-02-08T10:30:00Z",
  "expires_at": "2026-12-31T23:59:59Z"
}`}
                  />

                  <h4 className="font-semibold text-slate-200 mt-6">Implementation:</h4>
                  <CodeBlock 
                    language="JavaScript" 
                    id="create-implementation"
                    code={`async function createShortUrl(req, res) {
  const { original_url, custom_alias, expires_at } = req.body;
  
  // Validate URL
  if (!isValidUrl(original_url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  
  // Generate or use custom short code
  const shortCode = custom_alias || await generateUniqueShortCode();
  
  // Check if custom alias already exists
  if (custom_alias && await shortCodeExists(shortCode)) {
    return res.status(409).json({ error: 'Alias already taken' });
  }
  
  // Store in database
  const url = await db.urls.create({
    short_code: shortCode,
    original_url,
    user_id: req.user?.id,
    expires_at: expires_at || null
  });
  
  return res.status(201).json({
    short_url: \`https://short.ly/\${shortCode}\`,
    short_code: shortCode,
    original_url: url.original_url,
    created_at: url.created_at,
    expires_at: url.expires_at
  });
}`}
                  />
                </div>
              </CollapsibleSection>

              <CollapsibleSection id="redirect-url" title="GET /:shortCode - Redirect to Original URL" icon={Globe}>
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-200">Response (301 Moved Permanently):</h4>
                  <CodeBlock 
                    language="HTTP" 
                    id="redirect-response"
                    code={`HTTP/1.1 301 Moved Permanently
Location: https://www.example.com/very/long/url/with/many/parameters
Cache-Control: public, max-age=3600`}
                  />

                  <h4 className="font-semibold text-slate-200 mt-6">Implementation with Caching:</h4>
                  <CodeBlock 
                    language="JavaScript" 
                    id="redirect-implementation"
                    code={`async function redirect(req, res) {
  const { shortCode } = req.params;
  
  // Try cache first (Redis)
  let url = await cache.get(\`url:\${shortCode}\`);
  
  if (!url) {
    // Cache miss - query database
    url = await db.urls.findOne({
      where: { short_code: shortCode }
    });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    
    // Check expiration
    if (url.expires_at && new Date(url.expires_at) < new Date()) {
      return res.status(410).json({ error: 'URL has expired' });
    }
    
    // Cache for 1 hour
    await cache.set(\`url:\${shortCode}\`, url.original_url, 3600);
  }
  
  // Track analytics asynchronously (non-blocking)
  trackClick(shortCode, req);
  
  // Redirect with 301 (permanent) or 302 (temporary for custom analytics)
  return res.redirect(301, url.original_url || url);
}`}
                  />

                  <InfoBox type="key" title="301 vs 302 Redirects">
                    Use 301 (permanent) for better SEO and caching, but use 302 (temporary) if you need to track every 
                    click accurately, as browsers may cache 301 redirects.
                  </InfoBox>
                </div>
              </CollapsibleSection>

              <CollapsibleSection id="analytics-api" title="GET /api/analytics/:shortCode - Get URL Analytics" icon={TrendingUp}>
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-200">Response (200 OK):</h4>
                  <CodeBlock 
                    language="JSON" 
                    id="analytics-response"
                    code={`{
  "short_code": "abc123",
  "total_clicks": 15847,
  "clicks_by_date": [
    { "date": "2026-02-01", "clicks": 1234 },
    { "date": "2026-02-02", "clicks": 1456 }
  ],
  "top_referrers": [
    { "referrer": "twitter.com", "clicks": 5230 },
    { "referrer": "facebook.com", "clicks": 3120 }
  ],
  "geographic_distribution": [
    { "country": "US", "clicks": 7500 },
    { "country": "UK", "clicks": 2300 }
  ],
  "devices": {
    "mobile": 9500,
    "desktop": 5347,
    "tablet": 1000
  }
}`}
                  />
                </div>
              </CollapsibleSection>
            </section>

            {/* Scaling */}
            <section id="scaling">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-400" />
                Scaling Strategy
              </h2>

              <CollapsibleSection id="url-generation" title="URL Short Code Generation" icon={Code} defaultOpen={true}>
                <div className="space-y-4">
                  <p className="text-slate-300">
                    Two main approaches for generating unique short codes: Base62 encoding and pre-generated key ranges.
                  </p>

                  <h4 className="font-semibold text-slate-200 mt-6">Approach 1: Base62 Encoding</h4>
                  <CodeBlock 
                    language="JavaScript" 
                    id="base62"
                    code={`const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encodeBase62(num) {
  if (num === 0) return BASE62[0];
  
  let encoded = '';
  while (num > 0) {
    encoded = BASE62[num % 62] + encoded;
    num = Math.floor(num / 62);
  }
  return encoded;
}

async function generateUniqueShortCode() {
  // Use auto-increment ID from database
  const id = await getNextSequenceValue();
  
  // Encode to base62 (7 chars supports 62^7 = 3.5 trillion URLs)
  return encodeBase62(id).padStart(7, '0');
}

// Example: ID 125837 -> base62 -> "w7D"
// 62^7 = 3,521,614,606,208 possible combinations`}
                  />

                  <h4 className="font-semibold text-slate-200 mt-6">Approach 2: Key Range Distribution</h4>
                  <CodeBlock 
                    language="JavaScript" 
                    id="key-range"
                    code={`// Key Generation Service (separate microservice)
class KeyGenerationService {
  constructor() {
    this.serverIds = 1000; // 1000 application servers
    this.serverId = getServerId(); // Unique ID per server
    this.counter = 0;
  }
  
  generateKey() {
    const timestamp = Date.now();
    const serverPart = this.serverId;
    const counterPart = this.counter++;
    
    // Combine: timestamp + serverId + counter
    const uniqueId = (timestamp * 1000000) + (serverPart * 1000) + counterPart;
    
    return encodeBase62(uniqueId);
  }
}

// Guarantees uniqueness across distributed servers without coordination`}
                  />

                  <InfoBox type="tip" title="Trade-offs">
                    <strong>Base62:</strong> Simple but requires sequence coordination. 
                    <strong>Key Range:</strong> No coordination needed but slightly longer codes. 
                    For massive scale, use Snowflake-like IDs or ZooKeeper for coordination.
                  </InfoBox>
                </div>
              </CollapsibleSection>

              <CollapsibleSection id="caching-strategy" title="Caching Strategy" icon={Zap}>
                <div className="space-y-4">
                  <p className="text-slate-300">
                    Implement a multi-level caching strategy to handle 50K QPS read traffic efficiently.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg">
                      <h4 className="font-semibold text-emerald-400 mb-3">Cache Layer 1: CDN</h4>
                      <ul className="space-y-2 text-sm text-slate-300 ml-4 list-disc">
                        <li>Cache redirect responses at edge</li>
                        <li>Handles ~80% of traffic</li>
                        <li>TTL: 1 hour for popular URLs</li>
                        <li>CloudFront, Cloudflare, Fastly</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg">
                      <h4 className="font-semibold text-blue-400 mb-3">Cache Layer 2: Redis</h4>
                      <ul className="space-y-2 text-sm text-slate-300 ml-4 list-disc">
                        <li>In-memory cache for hot URLs</li>
                        <li>Handles ~15% of traffic</li>
                        <li>TTL: 24 hours</li>
                        <li>LRU eviction policy</li>
                      </ul>
                    </div>
                  </div>

                  <CodeBlock 
                    language="JavaScript" 
                    id="cache-implementation"
                    code={`// Cache hierarchy implementation
async function getUrl(shortCode) {
  // L1: Check Redis
  const cached = await redis.get(\`url:\${shortCode}\`);
  if (cached) {
    return cached;
  }
  
  // L2: Query database
  const url = await db.urls.findOne({ 
    where: { short_code: shortCode } 
  });
  
  if (url) {
    // Populate cache with TTL based on access pattern
    const ttl = calculateTTL(url);
    await redis.setex(\`url:\${shortCode}\`, ttl, url.original_url);
  }
  
  return url?.original_url;
}

function calculateTTL(url) {
  // Hot URLs (accessed frequently) get longer TTL
  const accessCount = url.total_clicks || 0;
  
  if (accessCount > 10000) return 86400;  // 24 hours
  if (accessCount > 1000) return 3600;    // 1 hour
  return 600;  // 10 minutes for cold URLs
}`}
                  />
                </div>
              </CollapsibleSection>

              <CollapsibleSection id="database-scaling" title="Database Scaling" icon={Database}>
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-200">Sharding Strategy</h4>
                  <p className="text-slate-300">
                    Horizontal partitioning based on short_code hash to distribute load across multiple database instances.
                  </p>

                  <CodeBlock 
                    language="JavaScript" 
                    id="sharding"
                    code={`// Hash-based sharding
const NUM_SHARDS = 16;

function getShardId(shortCode) {
  // Consistent hashing based on first characters
  const hash = shortCode.charCodeAt(0) + shortCode.charCodeAt(1);
  return hash % NUM_SHARDS;
}

async function getUrlFromShard(shortCode) {
  const shardId = getShardId(shortCode);
  const shard = dbShards[shardId];
  
  return await shard.query(
    'SELECT original_url FROM urls WHERE short_code = $1',
    [shortCode]
  );
}

// Each shard handles ~6.25% of total traffic
// Supports horizontal scaling by adding more shards`}
                  />

                  <InfoBox type="warning" title="Sharding Considerations">
                    Resharding is expensive. Plan shard count based on 5-10 year growth projections. Use virtual shards 
                    (e.g., 256 virtual shards mapped to 16 physical shards) for easier future rebalancing.
                  </InfoBox>
                </div>
              </CollapsibleSection>
            </section>

            {/* Trade-offs */}
            <section id="tradeoffs">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-orange-400" />
                Design Trade-offs
              </h2>

              <div className="space-y-6">
                <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-400">SQL vs NoSQL</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-3">PostgreSQL (Chosen)</h4>
                      <ul className="space-y-2 text-sm text-slate-300 ml-4 list-disc">
                        <li>ACID compliance for data integrity</li>
                        <li>Strong consistency guarantees</li>
                        <li>Excellent for analytics queries</li>
                        <li>Mature ecosystem and tooling</li>
                        <li>Good enough performance with proper indexing</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-3">Cassandra/DynamoDB</h4>
                      <ul className="space-y-2 text-sm text-slate-300 ml-4 list-disc">
                        <li>Better write scalability</li>
                        <li>Easier horizontal scaling</li>
                        <li>Higher throughput potential</li>
                        <li>Eventually consistent (trade-off)</li>
                        <li>More complex analytics queries</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Short Code Length</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-700/30">
                        <tr>
                          <th className="px-4 py-3 text-left text-slate-300">Length</th>
                          <th className="px-4 py-3 text-left text-slate-300">Combinations (Base62)</th>
                          <th className="px-4 py-3 text-left text-slate-300">Good For</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/30">
                        <tr>
                          <td className="px-4 py-3 font-mono text-emerald-400">6 chars</td>
                          <td className="px-4 py-3 text-slate-300">56.8 billion</td>
                          <td className="px-4 py-3 text-slate-400">Small to medium services</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-emerald-400">7 chars</td>
                          <td className="px-4 py-3 text-slate-300">3.5 trillion</td>
                          <td className="px-4 py-3 text-slate-400">Large scale (recommended)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-emerald-400">8 chars</td>
                          <td className="px-4 py-3 text-slate-300">218 trillion</td>
                          <td className="px-4 py-3 text-slate-400">Massive scale, future-proof</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">301 vs 302 Redirects</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-3">301 Permanent</h4>
                      <ul className="space-y-2 text-sm text-slate-300 ml-4 list-disc">
                        <li>Better for SEO (link equity transfer)</li>
                        <li>Browsers/CDNs cache aggressively</li>
                        <li>Reduced server load</li>
                        <li>May miss some analytics data</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-3">302 Temporary</h4>
                      <ul className="space-y-2 text-sm text-slate-300 ml-4 list-disc">
                        <li>Every click hits your server</li>
                        <li>More accurate analytics</li>
                        <li>Higher server load</li>
                        <li>Better for A/B testing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section className="mt-16 p-8 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Lightbulb className="w-7 h-7 text-emerald-400" />
                Key Takeaways
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-200 mb-3">Core Design Principles</h3>
                  <ul className="space-y-2 text-slate-300 ml-4 list-disc">
                    <li>Read-heavy systems need aggressive caching</li>
                    <li>Short code generation must be collision-free at scale</li>
                    <li>Separate analytics pipeline from critical path</li>
                    <li>Plan for horizontal scaling from day one</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 mb-3">Production Considerations</h3>
                  <ul className="space-y-2 text-slate-300 ml-4 list-disc">
                    <li>Monitor cache hit rates and adjust TTLs</li>
                    <li>Implement rate limiting to prevent abuse</li>
                    <li>Set up automated URL expiration cleanup</li>
                    <li>Use CDN for global low-latency redirects</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="mt-12 p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-slate-200">Continue Learning</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="#" className="p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-600/30 hover:border-emerald-500/30">
                  <div className="text-sm font-semibold text-emerald-400 mb-1">Next Topic</div>
                  <div className="text-slate-200">Design Instagram</div>
                </a>
                <a href="#" className="p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-600/30 hover:border-blue-500/30">
                  <div className="text-sm font-semibold text-blue-400 mb-1">Related</div>
                  <div className="text-slate-200">Rate Limiting</div>
                </a>
                <a href="#" className="p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-600/30 hover:border-purple-500/30">
                  <div className="text-sm font-semibold text-purple-400 mb-1">Deep Dive</div>
                  <div className="text-slate-200">Caching Strategies</div>
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #0f172a;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
};

export default UrlShortenerSystemDesign;