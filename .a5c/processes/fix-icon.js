/**
 * @process fix-icon
 * @description Add missing icon paths to AICommandCenter Icon component
 * @inputs { projectRoot: string, missingIcons: string[] }
 * @outputs { success: boolean, fileChanged: string }
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

export async function process(inputs, ctx) {
  const { projectRoot, missingIcons } = inputs;

  ctx.log('info', `Adding missing icons: ${missingIcons.join(', ')}`);

  const result = await ctx.task(addIconPathsTask, { projectRoot, missingIcons });

  return { success: true, fileChanged: result.fileChanged };
}

const addIconPathsTask = defineTask('add-icon-paths', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Add missing icon paths to Icon component',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior React engineer',
      task: 'Add missing SVG icon paths to the Icon component in AICommandCenter.jsx',
      context: {
        projectRoot: args.projectRoot,
        file: 'src/islands/AICommandCenter.jsx',
        missingIcons: args.missingIcons,
        currentPathsObject: 'The paths object in the Icon component (lines ~18-34) maps icon name strings to JSX SVG elements. Only icons listed there render correctly; anything else falls back to a plain circle.',
        lucideDollarSign: '<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>',
      },
      instructions: [
        'Read src/islands/AICommandCenter.jsx',
        'Find the `paths` const inside the Icon function — it is an object mapping string keys to JSX',
        'Add entries for each icon in missingIcons:',
        '  dollarSign: <>  <line x1="12" y1="1" x2="12" y2="23"/>  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>  </>',
        'Add the new entry after the last existing entry in the paths object, before the closing brace',
        'Do NOT change anything else in the file',
        'Write the updated file',
        'Return JSON with fileChanged field',
      ],
      outputFormat: 'JSON: { "fileChanged": "src/islands/AICommandCenter.jsx" }',
    },
    outputSchema: {
      type: 'object',
      required: ['fileChanged'],
      properties: { fileChanged: { type: 'string' } },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));
