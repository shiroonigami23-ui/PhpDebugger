<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-2xl space-y-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-sm font-bold text-slate-900">
          PD
        </div>
        <div>
          <h1 class="text-2xl font-bold">PHP Debugger Forensics</h1>
          <p class="text-sm text-slate-400">Dual-mode extension for backend debugging</p>
        </div>
      </div>

      <div class="bg-slate-800/50 border border-slate-700 rounded p-4 space-y-2 text-sm">
        <p class="text-slate-300">
          This Nuxt scaffold powers the DevTools panel and popup UI for the PHP Debugger Forensics extension.
        </p>
        <ul class="list-disc list-inside text-slate-400 space-y-1">
          <li>Run <code class="bg-slate-950 px-2 py-1 rounded text-cyan-400">npm run dev</code> for UI development</li>
          <li>Run <code class="bg-slate-950 px-2 py-1 rounded text-cyan-400">npm run build</code> to create extension assets</li>
          <li>Load the extension from <code class="text-cyan-400">PhpDebugger/</code> in Chrome DevTools</li>
        </ul>
      </div>
    </div>
  </div>
</template>
