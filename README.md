# Local Concept Explainer

A tiny on-device AI tool that explains any concept in plain language.

Powered by **Tether QVAC SDK**. The model runs entirely on your machine — no API keys, no cloud, no data leaving the device.

## What it does

You give it a topic. It loads a small local LLM (Llama 3.2 1B) and returns a short, clear explanation suitable for a 12-year-old.

## Requirements

- Node.js ≥ 22.17
- npm ≥ 10.9
- ~1–2 GB free disk space for the model (downloaded once)

## Install

```bash
git clone https://github.com/maanizozo9/qvac-local-concept-explainer.git
cd qvac-local-concept-explainer
npm install
```

## Run

```bash
node index.js "black holes"
# or
npm start -- "how does photosynthesis work"
```

First run downloads the model. After that it works fully offline.

## QVAC functions used

- `loadModel`
- `completion`
- `unloadModel`

SDK version: `@qvac/sdk` ^0.19.0

## Why this exists

Most AI tools send your questions to a server. This one keeps everything local so you can explore ideas privately.

## License

MIT
