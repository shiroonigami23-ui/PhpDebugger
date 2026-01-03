<template>
  <div class="h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden font-sans">
    <!-- Header -->
    <header class="px-4 py-3 border-b border-slate-800 bg-slate-900/50 sticky top-0 z-10">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-xs font-bold text-slate-900">
            PD
          </div>
          <div>
            <h1 class="text-sm font-semibold">PHP Debugger Forensics</h1>
            <p class="text-[11px] text-slate-400">DevTools Panel – Network Forensics & Incident Management</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 transition">
            Settings
          </button>
        </div>
      </div>
    </header>

    <!-- Controls -->
    <section class="px-4 py-2 border-b border-slate-800 bg-slate-900/30 flex gap-2 flex-wrap text-xs">
      <button class="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-700 text-slate-950 font-medium transition">
        Start Capture
      </button>
      <button class="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 transition">
        Stop & Analyze
      </button>
      <button class="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 transition">
        Export Bundle
      </button>
      <button class="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 transition ml-auto">
        Clear All
      </button>
    </section>

    <!-- Main Panel (Two-column layout) -->
    <main class="flex-1 flex overflow-hidden">
      <!-- Left: Request List -->
      <div class="w-2/5 border-r border-slate-800 overflow-hidden flex flex-col">
        <div class="px-4 py-2 border-b border-slate-800 bg-slate-900/40 sticky top-0">
          <h2 class="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
            Network Requests
          </h2>
        </div>
        <div class="flex-1 overflow-y-auto">
          <ul class="divide-y divide-slate-800">
            <li class="px-3 py-2 hover:bg-slate-800/50 cursor-pointer border-l-2 border-transparent hover:border-cyan-500 transition group">
              <div class="flex items-start justify-between mb-1 gap-2">
                <span class="text-[10px] px-2 py-0.5 rounded font-mono bg-slate-800 text-cyan-300 group-hover:bg-slate-700">
                  POST
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded font-mono bg-red-950 text-red-300 border border-red-900">
                  500
                </span>
              </div>
              <p class="text-[11px] text-slate-300 font-medium truncate">
                /api/v1/auth/login
              </p>
              <p class="text-[10px] text-slate-500 mt-1">
                ⚠️ Unhandled exception • Correlation ID: <span class="font-mono text-cyan-400">abc123def</span>
              </p>
            </li>
            <li class="px-3 py-2 hover:bg-slate-800/50 cursor-pointer border-l-2 border-transparent hover:border-cyan-500 transition group">
              <div class="flex items-start justify-between mb-1 gap-2">
                <span class="text-[10px] px-2 py-0.5 rounded font-mono bg-slate-800 text-cyan-300 group-hover:bg-slate-700">
                  GET
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded font-mono bg-yellow-950 text-yellow-300 border border-yellow-900">
                  429
                </span>
              </div>
              <p class="text-[11px] text-slate-300 font-medium truncate">
                /api/v1/users/list
              </p>
              <p class="text-[10px] text-slate-500 mt-1">
                ⚠️ Rate limited • Retry-After: 60s
              </p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right: Details & Analysis -->
      <div class="w-3/5 overflow-y-auto flex flex-col">
        <div class="px-4 py-2 border-b border-slate-800 bg-slate-900/40 sticky top-0">
          <h2 class="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
            Details & Analysis
          </h2>
        </div>
        <div class="flex-1 p-4 space-y-4">
          <section>
            <h3 class="text-xs font-semibold text-slate-300 mb-2 uppercase">Request Metadata</h3>
            <div class="bg-slate-900/40 border border-slate-800 rounded p-3 text-[11px] space-y-1 font-mono text-slate-400">
              <div><span class="text-slate-500">Method:</span> POST</div>
              <div><span class="text-slate-500">URL:</span> https://example.com/api/v1/auth/login</div>
              <div><span class="text-slate-500">Status:</span> <span class="text-red-400">500 Internal Server Error</span></div>
              <div><span class="text-slate-500">Timing:</span> 234ms (TTFB: 45ms, Transfer: 189ms)</div>
            </div>
          </section>

          <section>
            <h3 class="text-xs font-semibold text-slate-300 mb-2 uppercase">Likely Causes</h3>
            <ul class="space-y-2 text-[11px] text-slate-300">
              <li class="flex gap-2">
                <span class="text-cyan-400">→</span>
                <span>Unhandled PHP exception. Check server error logs with <span class="font-mono bg-slate-800 px-1 py-0.5 rounded text-cyan-300">Correlation-ID</span></span>
              </li>
              <li class="flex gap-2">
                <span class="text-cyan-400">→</span>
                <span>Database connection failure (check PDO credentials + network)</span>
              </li>
              <li class="flex gap-2">
                <span class="text-cyan-400">→</span>
                <span>Fatally unparseable response (PHP output buffering issue?)</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 class="text-xs font-semibold text-slate-300 mb-2 uppercase">Reproduction</h3>
            <div class="bg-slate-900/60 border border-slate-700 rounded p-2">
              <pre class="text-[10px] text-slate-300 font-mono overflow-auto max-h-40">curl -X POST https://example.com/api/v1/auth/login   -H "Content-Type: application/json"   -d '{"username":"test","password":"..."}'   -v</pre>
            </div>
            <button class="mt-2 text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition">
              Copy cURL
            </button>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>
