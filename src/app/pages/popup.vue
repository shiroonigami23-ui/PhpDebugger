<template>
  <div class="w-96 min-h-96 bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
    <!-- Header -->
    <header class="px-4 py-3 border-b border-slate-800 bg-slate-900/50">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-xs font-bold text-slate-900">
          PD
        </div>
        <div>
          <h1 class="text-sm font-semibold">PHP Debugger</h1>
          <p class="text-[10px] text-slate-400">User Mode – Bug Reporter</p>
        </div>
      </div>
    </header>

    <!-- Mode Toggle -->
    <div class="px-4 py-2 border-b border-slate-800 bg-slate-900/30 text-[11px]">
      <div class="flex items-center gap-2">
        <span class="text-slate-400">Mode:</span>
        <button class="px-2 py-1 rounded bg-cyan-600 text-slate-950 font-medium text-xs">User</button>
        <button class="px-2 py-1 rounded bg-slate-800 text-slate-300 font-medium text-xs hover:bg-slate-700 transition">DevTools</button>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 px-4 py-4 overflow-y-auto space-y-4">
      <div>
        <h2 class="text-sm font-semibold mb-2">Record a Bug Report</h2>
        <p class="text-xs text-slate-400 mb-3">
          1. Click <span class="font-semibold text-slate-300">Start Recording</span><br>
          2. Use the app and reproduce the issue<br>
          3. Click <span class="font-semibold text-slate-300">Stop & Export</span><br>
          4. Share the bundle with the developer
        </p>
      </div>

      <div class="flex gap-2">
        <button class="flex-1 px-3 py-2 rounded bg-cyan-600 hover:bg-cyan-700 text-slate-950 font-medium text-xs transition">
          Start Recording
        </button>
        <button class="flex-1 px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium text-xs transition" disabled>
          Stop & Export
        </button>
      </div>

      <div class="bg-slate-900/50 border border-slate-800 rounded p-3 text-[11px] space-y-2">
        <h3 class="text-xs font-semibold text-slate-300">What Gets Captured?</h3>
        <ul class="text-slate-400 space-y-1 list-disc list-inside">
          <li>Network requests & timing</li>
          <li>HTTP status codes & headers</li>
          <li>Page URL & user environment</li>
          <li>No passwords, keys, or PII</li>
        </ul>
      </div>

      <div class="bg-slate-900/50 border border-slate-800 rounded p-3 text-[11px]">
        <p class="text-slate-400">
          💡 <span class="text-slate-300">Tip:</span> The exported bundle includes everything needed for the dev team to reproduce and fix the issue.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <footer class="px-4 py-2 border-t border-slate-800 bg-slate-900/30 text-[10px] text-slate-500 flex justify-between">
      <span>v0.1.0</span>
      <a href="#" class="text-cyan-400 hover:text-cyan-300">Report Bug</a>
    </footer>
  </div>
</template>
