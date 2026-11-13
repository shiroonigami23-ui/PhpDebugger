<div align="center">

<img src="assets/phpdebugger-anim.gif" alt="PHP Debugger Forensics" width="100%">

# 🐞 PHP Debugger Forensics

### Chrome extension that makes silent PHP/SQL backend failures visible — DevTools forensics and tester-friendly bug bundles

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE) ![Last commit](https://img.shields.io/github/last-commit/shiroonigami23-ui/PhpDebugger?style=flat-square) ![Repo size](https://img.shields.io/github/repo-size/shiroonigami23-ui/PhpDebugger?style=flat-square) ![Top language](https://img.shields.io/github/languages/top/shiroonigami23-ui/PhpDebugger?style=flat-square) ![Status](https://img.shields.io/badge/status-active-blueviolet?style=flat-square)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/shiroonigami23-ui/PhpDebugger?quickstart=1) [![Download ZIP](https://img.shields.io/badge/Download-ZIP-2ea44f?style=flat-square&logo=github)](https://github.com/shiroonigami23-ui/PhpDebugger/archive/refs/heads/main.zip)

[**🚀 Live Demo**](https://php-debugger-rj1n.vercel.app) · [**Overview**](#-overview) · [**Features**](#-features) · [**Architecture**](#-architecture) · [**Getting Started**](#-getting-started) · [**Roadmap**](#-roadmap)

</div>

---

<p align="center"><img src="assets/site-landing.png" alt="PHP Debugger Forensics art" width="49%"> <img src="assets/site-popup-demo.png" alt="PHP Debugger Forensics art" width="49%"></p>

## 📸 Preview

<p align="center"><img src="assets/hero.png" alt="PHP Debugger Forensics preview" width="85%"></p>

## 📖 Overview

**PHP Debugger Forensics** is a Chrome extension for the backend bugs users can't see: `500` errors with empty bodies, database connection failures, buried SQL errors, timeouts and auth issues. Developers get a **DevTools panel** with real-time **network forensics**, **failure-pattern classification**, timing/TTFB analysis and **correlation-ID** lookup; non-technical testers get a simple **Record → Reproduce → Export** popup that produces a clean, sanitised incident bundle — all **without modifying your backend**.

### ✨ Highlights

- **Dual-mode UI** — DevTools panel + tester popup
- **Failure classification** for PHP/SQL patterns
- **Sanitised exports** safe to attach to tickets

## 🧩 Features

| Feature | What it does |
|---|---|
| **Network forensics** | Method, URL, status, timing, headers |
| **Timeline** | Request waterfall and TTFB analysis |
| **Payload inspection** | Sanitised response bodies |
| **Failure classification** | Detects 500s, DB errors, timeouts, auth failures |
| **Correlation IDs** | Match front-end failures to server logs |
| **Recorder** | Record → Reproduce → Export for testers |

## 📄 Technical Whitepaper

**[Read the whitepaper (PDF)](docs/WHITEPAPER.pdf)** · [Markdown version](docs/WHITEPAPER.md)

Why I built it, the journey so far, the silent-failure problem, MV3 architecture, failure classification, privacy design and roadmap.

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Extension | Manifest V3, declarative rules |
| UI | Nuxt, TypeScript, Tailwind |
| CI | GitHub Actions |

## 🏗 Architecture



```mermaid
flowchart LR
  PG[Web app] --> NET[Network events]
  NET --> BG[Extension background]
  BG --> CLS[Failure classifier]
  CLS --> DT[DevTools panel]
  CLS --> POP[Popup recorder]
  POP --> EX[Sanitised incident bundle]
```

➡️ Full design notes, data flow and design decisions: **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**

## 📁 Project Structure

```text
PhpDebugger/
├── manifest.json · rules.json
├── src/            # Nuxt app (DevTools panel & popup)
└── icons/
```

## 🚀 Getting Started

### 1. Get the code

Pick whichever method suits you:

| Method | Command |
|---|---|
| **HTTPS** | `git clone https://github.com/shiroonigami23-ui/PhpDebugger.git` |
| **SSH** | `git clone git@github.com:shiroonigami23-ui/PhpDebugger.git` |
| **GitHub CLI** | `gh repo clone shiroonigami23-ui/PhpDebugger` |
| **ZIP** | [Download](https://github.com/shiroonigami23-ui/PhpDebugger/archive/refs/heads/main.zip) and extract |
| **Codespaces** | [Open in browser](https://codespaces.new/shiroonigami23-ui/PhpDebugger?quickstart=1) — zero local setup, dev container preconfigured |

> 🔑 **Using SSH for the first time?** Generate a key with `ssh-keygen -t ed25519 -C "you@example.com"`, add the `.pub` contents at **GitHub → Settings → SSH and GPG keys**, then test with `ssh -T git@github.com`.

### 2. Install & set up

```bash
cd PhpDebugger
cd src && npm install && npm run build
```

### 3. Run

Load the built extension via `chrome://extensions` → **Load unpacked**. Open DevTools → **PHP Debugger** panel.

## 🗺 Roadmap

**v1 (done)**

- [x] DevTools panel, popup recorder, classification, export

**v1.1**

- [ ] Laravel / WordPress specific detectors
- [ ] HAR import
- [ ] Companion PHP middleware that adds correlation IDs

**v2.0**

- [ ] Firefox build
- [ ] Team sharing of incident bundles

➡️ Detailed plan, milestones and long-term vision: **[docs/ROADMAP.md](docs/ROADMAP.md)**

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request against `main`

Check the [issues page](https://github.com/shiroonigami23-ui/PhpDebugger/issues) and the [roadmap](docs/ROADMAP.md) for ideas on where to help.

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for the release history.

## 📄 License

Distributed under the **MIT** license. See [LICENSE](LICENSE) for details.

## 👤 Author

**Aryan Singh Chandel** (Shiro)

[![GitHub](https://img.shields.io/badge/GitHub-shiroonigami23--ui-181717?style=flat-square&logo=github)](https://github.com/shiroonigami23-ui)

<div align="center">

⭐ **If you find this project useful, consider giving it a star!** ⭐

</div>
