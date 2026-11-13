<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <!-- Nav -->
    <nav class="sticky top-0 z-20 backdrop-blur bg-slate-950/70 border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <a href="#" class="flex items-center gap-2 font-semibold">
          <img src="/icon.png" alt="" class="w-8 h-8 rounded-md">
          PHP Debugger Forensics
        </a>
        <div class="flex items-center gap-4 text-sm text-slate-300">
          <a href="#features" class="hidden sm:inline hover:text-white">Features</a>
          <a href="#demo" class="hidden sm:inline hover:text-white">Live demo</a>
          <a href="#install" class="hidden sm:inline hover:text-white">Install</a>
          <a :href="repo" target="_blank" rel="noopener" class="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700">GitHub</a>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <header class="relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.25),transparent_60%)]" />
      <div class="relative max-w-6xl mx-auto px-5 pt-16 pb-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span class="inline-block text-xs font-medium tracking-wide uppercase text-cyan-300 bg-cyan-950/60 border border-cyan-900 rounded-full px-3 py-1 mb-5">Chrome extension · Manifest V3</span>
          <h1 class="text-4xl sm:text-5xl font-bold leading-tight">
            See the backend bugs<br>
            <span class="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">your users can't.</span>
          </h1>
          <p class="mt-5 text-lg text-slate-300 max-w-xl">
            Empty <code class="text-red-300">500</code>s, buried SQL errors, timeouts and auth failures — surfaced in a DevTools panel for developers
            and a one-click <b>Record → Reproduce → Export</b> flow for testers. No backend changes needed.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a :href="zip" class="px-5 py-3 rounded-lg bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:opacity-90 font-semibold shadow-lg shadow-violet-900/40">⬇ Download extension</a>
            <a href="#demo" class="px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold">Try the live demo</a>
          </div>
        </div>
        <img src="/demo.gif" alt="PHP Debugger Forensics in action" class="w-full rounded-2xl border border-slate-800 shadow-2xl shadow-fuchsia-950/50">
      </div>
    </header>

    <!-- Features -->
    <section id="features" class="max-w-6xl mx-auto px-5 py-16">
      <h2 class="text-3xl font-bold mb-2">What it catches</h2>
      <p class="text-slate-400 mb-10">Everything a silent backend failure hides, in one place.</p>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="f in features" :key="f.title" class="rounded-xl bg-slate-900/70 border border-slate-800 p-6 hover:border-violet-700 transition">
          <div class="text-2xl mb-3">{{ f.icon }}</div>
          <h3 class="font-semibold mb-1">{{ f.title }}</h3>
          <p class="text-sm text-slate-400">{{ f.text }}</p>
        </div>
      </div>
    </section>

    <!-- Two modes -->
    <section class="max-w-6xl mx-auto px-5 py-8 grid md:grid-cols-2 gap-6">
      <div class="rounded-2xl p-7 bg-gradient-to-br from-violet-950 to-slate-900 border border-violet-900">
        <h3 class="text-xl font-bold mb-2">🧑‍💻 Developer mode</h3>
        <p class="text-slate-300 text-sm">A DevTools panel with live network forensics, failure classification, TTFB timing and correlation-ID lookup to jump straight to the matching server log line.</p>
      </div>
      <div class="rounded-2xl p-7 bg-gradient-to-br from-cyan-950 to-slate-900 border border-cyan-900">
        <h3 class="text-xl font-bold mb-2">🧪 Tester mode</h3>
        <p class="text-slate-300 text-sm">A simple popup: start recording, reproduce the bug, export a sanitised incident bundle that's safe to attach to any ticket — no passwords, keys or PII.</p>
      </div>
    </section>

    <!-- Live demo -->
    <section id="demo" class="max-w-6xl mx-auto px-5 py-16">
      <h2 class="text-3xl font-bold mb-2">Live demo</h2>
      <p class="text-slate-400 mb-8">These are the real extension screens, running here with sample data. Click around.</p>
      <div class="flex gap-2 mb-4">
        <button v-for="t in tabs" :key="t.id" class="px-4 py-2 rounded-lg text-sm font-medium border transition" :class="tab === t.id ? 'bg-violet-600 border-violet-500' : 'bg-slate-900 border-slate-700 hover:bg-slate-800'" @click="tab = t.id">
          {{ t.label }}
        </button>
      </div>
      <div class="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
        <div class="flex items-center gap-1.5 px-4 py-2 border-b border-slate-800 bg-slate-950">
          <span class="w-3 h-3 rounded-full bg-red-500/80" /><span class="w-3 h-3 rounded-full bg-yellow-500/80" /><span class="w-3 h-3 rounded-full bg-green-500/80" />
          <span class="ml-3 text-xs text-slate-500 font-mono">{{ tab === 'devtools' ? 'DevTools › PHP Debugger' : 'Extension popup' }}</span>
        </div>
        <div class="flex justify-center bg-slate-950" :class="tab === 'popup' ? 'py-8' : ''">
          <iframe :key="tab" :src="`/${tab}`" :title="tab" class="border-0" :class="tab === 'popup' ? 'w-96 h-[560px] rounded-lg border border-slate-800' : 'w-full h-[620px]'" />
        </div>
      </div>
    </section>

    <!-- Install -->
    <section id="install" class="max-w-6xl mx-auto px-5 py-16">
      <h2 class="text-3xl font-bold mb-8">Install in 1 minute</h2>
      <ol class="grid md:grid-cols-4 gap-5">
        <li v-for="(s, i) in steps" :key="i" class="rounded-xl bg-slate-900/70 border border-slate-800 p-5">
          <div class="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center font-bold mb-3">{{ i + 1 }}</div>
          <p class="text-sm text-slate-300" v-html="s" />
        </li>
      </ol>
    </section>

    <section class="max-w-6xl mx-auto px-5 pb-16">
      <img src="/hero.png" alt="PHP Debugger Forensics artwork" class="w-full rounded-2xl border border-slate-800">
    </section>

    <footer class="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
      MIT licensed · Built by <a href="https://github.com/shiroonigami23-ui" class="text-violet-400 hover:text-violet-300">shiroonigami23-ui</a> ·
      <a :href="repo" class="text-violet-400 hover:text-violet-300">Source on GitHub</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
const repo = 'https://github.com/shiroonigami23-ui/PhpDebugger'
const zip = `${repo}/archive/refs/heads/main.zip`
const tab = ref<'devtools' | 'popup'>('devtools')
const tabs = [
  { id: 'devtools' as const, label: 'DevTools panel' },
  { id: 'popup' as const, label: 'Tester popup' }
]
const features = [
  { icon: '🌐', title: 'Network forensics', text: 'Method, URL, status, timing and headers for every request.' },
  { icon: '⏱️', title: 'Timeline & TTFB', text: 'Request waterfall to spot slow queries and stalled responses.' },
  { icon: '🧯', title: 'Failure classification', text: 'Detects 500s, DB connection errors, timeouts and auth failures.' },
  { icon: '🔗', title: 'Correlation IDs', text: 'Match a front-end failure to the exact server log line.' },
  { icon: '🔍', title: 'Payload inspection', text: 'Sanitised response bodies with secrets stripped out.' },
  { icon: '📦', title: 'Incident bundles', text: 'One-click export testers can attach to any bug ticket.' }
]
const steps = [
  'Download the <b>ZIP</b> above and unzip it.',
  'Open <code class="text-cyan-300">chrome://extensions</code> and enable <b>Developer mode</b>.',
  'Click <b>Load unpacked</b> and pick the <code class="text-cyan-300">PhpDebugger</code> folder.',
  'Open DevTools on your PHP site → <b>PHP Debugger</b> tab.'
]
</script>
