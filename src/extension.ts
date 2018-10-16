import * as sourcegraph from 'sourcegraph';

import {resolveURI} from './uri';

/**
 * Activate the extension by registering watcher events for updating the
 * context.
 */
export function activate(): void {
  sourcegraph.workspace.onDidOpenTextDocument.subscribe(() => updateContext());
  // TODO: Update context on package navigation.
}

function activeEditor(): sourcegraph.CodeEditor|undefined {
  return sourcegraph.app.activeWindow ?
      sourcegraph.app.activeWindow.visibleViewComponents[0] :
      undefined;
}

/**
 * Update the context to provide values for sourcegraph Contributions/Actions.
 */
async function updateContext() {
  const editor = activeEditor();
  if (!editor) {
    console.warn(
        'godocs updateContext called while editor was undefined. Not updating context.');
    return;
  }
  const uri = resolveURI(editor.document.uri);
  const context: {[key: string]: string|number|boolean|null} = {};

  const parts = uri.path.split('/');
  parts.pop();  // Pop off the filename.
  parts.unshift(uri.repo);

  context['godoc.path'] = parts.join('/');
  sourcegraph.internal.updateContext(context);
}
