import { TOOLS } from './tools';

// Curated step templates with tool affinities
const STEP_TEMPLATES = [
  {
    id: 'lit-review',
    name: 'Literature review',
    description: 'Find, screen, and synthesize relevant research',
    icon: '📚',
    preferredTools: ['elicit', 'perplexity', 'notebooklm'],
  },
  {
    id: 'data-collection',
    name: 'Data collection',
    description: 'Gather, organize, and structure your raw data',
    icon: '🗂️',
    preferredTools: ['notebooklm', 'notion-ai', 'claude'],
  },
  {
    id: 'analysis',
    name: 'Analysis & synthesis',
    description: 'Identify patterns, themes, and insights',
    icon: '🔍',
    preferredTools: ['claude', 'chatgpt', 'notebooklm'],
  },
  {
    id: 'writing',
    name: 'Writing & drafting',
    description: 'Draft sections, arguments, and narrative',
    icon: '✍️',
    preferredTools: ['claude', 'chatgpt', 'grammarly'],
  },
  {
    id: 'editing',
    name: 'Editing & polish',
    description: 'Refine clarity, tone, and academic style',
    icon: '✨',
    preferredTools: ['grammarly', 'claude', 'chatgpt'],
  },
  {
    id: 'coding',
    name: 'Coding & analysis scripts',
    description: 'Write and debug data processing code',
    icon: '💻',
    preferredTools: ['cursor', 'copilot', 'chatgpt'],
  },
  {
    id: 'organization',
    name: 'Notes & organization',
    description: 'Structure ideas, meeting notes, and references',
    icon: '📝',
    preferredTools: ['notion-ai', 'notebooklm', 'claude'],
  },
  {
    id: 'presentation',
    name: 'Presentation & visuals',
    description: 'Create figures, diagrams, and slides',
    icon: '🎨',
    preferredTools: ['midjourney', 'chatgpt', 'notion-ai'],
  },
];

// Picks 2 tools per step (primary + secondary), avoiding repeats across steps
function assignTools(steps, seed = 0) {
  const usedPrimary = new Set();
  return steps.map((step, i) => {
    const template = STEP_TEMPLATES.find(t => t.id === step.id);
    const pool = [...(template?.preferredTools || ['claude', 'chatgpt'])];
    // Rotate the pool based on seed to enable "Try again"
    for (let j = 0; j < (seed % pool.length); j++) pool.push(pool.shift());

    const tools = [];
    for (const toolId of pool) {
      if (tools.length >= 2) break;
      if (!usedPrimary.has(toolId) || tools.length === 1) {
        tools.push(toolId);
        if (tools.length === 1) usedPrimary.add(toolId);
      }
    }
    return { ...step, tools };
  });
}

// Heuristic: pick steps based on keywords in the project description
export function generateBreakdown(projectName, projectDesc, seed = 0) {
  const text = (projectName + ' ' + projectDesc).toLowerCase();

  const hasKeyword = (...words) => words.some(w => text.includes(w));

  let stepIds = ['lit-review', 'analysis', 'writing'];

  if (hasKeyword('interview', 'qualitative', 'transcript', 'participant')) {
    stepIds = ['lit-review', 'data-collection', 'analysis', 'writing'];
  } else if (hasKeyword('code', 'python', 'script', 'data', 'ml', 'model', 'algorithm')) {
    stepIds = ['lit-review', 'coding', 'analysis', 'writing'];
  } else if (hasKeyword('survey', 'quantitative', 'statistical')) {
    stepIds = ['lit-review', 'data-collection', 'analysis', 'writing'];
  } else if (hasKeyword('design', 'visual', 'figma', 'ux', 'ui')) {
    stepIds = ['lit-review', 'analysis', 'presentation', 'writing'];
  } else if (hasKeyword('thesis', 'dissertation')) {
    stepIds = ['lit-review', 'data-collection', 'analysis', 'editing'];
  } else if (hasKeyword('conference', 'paper', 'journal')) {
    stepIds = ['lit-review', 'analysis', 'writing', 'editing'];
  }

  const steps = stepIds.map(id => {
    const t = STEP_TEMPLATES.find(s => s.id === id);
    return { id: t.id, name: t.name, description: t.description, icon: t.icon, tools: [] };
  });

  return assignTools(steps, seed);
}

// Get alternative tools for a step (excludes currently assigned)
export function getAlternativeTools(stepId, currentToolIds) {
  const template = STEP_TEMPLATES.find(t => t.id === stepId);
  const allOptions = TOOLS.map(t => t.id);
  // prefer step's tools first, then others
  const ordered = [
    ...(template?.preferredTools || []),
    ...allOptions.filter(id => !template?.preferredTools?.includes(id)),
  ];
  return ordered.filter(id => !currentToolIds.includes(id));
}
