import Runner from 'jscodeshift/src/Runner';

import { transformFilePath } from '../transforms';

export type ParserKind = 'tsx' | 'jsx';

const JSCODESHIFT_PARSER: Record<ParserKind, 'tsx' | 'babel'> = {
  tsx: 'tsx',
  jsx: 'babel',
};

export async function runTransformAsync({
  files,
  parser,
  transform,
}: {
  files: string[];
  parser: ParserKind;
  transform: string;
}): Promise<void> {
  await Runner.run(transformFilePath(transform), files, {
    // Transforms are pre-compiled to JS by our build, so jscodeshift's @babel/register hook is unnecessary.
    babel: false,
    parser: JSCODESHIFT_PARSER[parser],
    verbose: 0,
  });
}
