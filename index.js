#!/usr/bin/env node
/**
 * Local Concept Explainer
 * A simple on-device AI tool that explains any concept in plain language.
 * Powered by Tether QVAC SDK – all inference runs locally on your machine.
 *
 * Usage: node index.js "your concept here"
 * or:    npm start -- "quantum entanglement"
 */

import { loadModel, LLAMA_3_2_1B_INST_Q4_0, completion, unloadModel } from '@qvac/sdk';

const concept = process.argv.slice(2).join(' ').trim() || 'artificial intelligence';

async function explainConcept(topic) {
  console.log(`\n🧠 Loading local model (first run downloads ~1GB, then fully offline)...\n`);

  const modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    modelType: 'llm',
    onProgress: (p) => {
      if (p.percentage !== undefined) {
        const mb = (n) => (n / 1e6).toFixed(1);
        process.stderr.write(`\r▸ Downloading ${p.percentage.toFixed(0)}% (${mb(p.downloaded)}/${mb(p.total)} MB)`);
        if (p.percentage >= 100) process.stderr.write('\n');
      }
    },
  });

  const history = [
    {
      role: 'system',
      content: 'You are a clear, concise teacher. Explain concepts in simple everyday language. Keep answers under 120 words. No jargon unless you define it.',
    },
    {
      role: 'user',
      content: `Explain this concept simply so a 12-year-old can understand it: ${topic}`,
    },
  ];

  console.log(`\n📖 Explaining: "${topic}"\n`);
  console.log('─'.repeat(50));

  const result = completion({ modelId, history, stream: true });
  for await (const token of result.tokenStream) {
    process.stdout.write(token);
  }

  console.log('\n' + '─'.repeat(50));
  console.log('\n✅ Done. Model stayed on your device the whole time.\n');

  await unloadModel({ modelId });
}

explainConcept(concept).catch((err) => {
  console.error('❌ Error:', err.message || err);
  process.exit(1);
});
