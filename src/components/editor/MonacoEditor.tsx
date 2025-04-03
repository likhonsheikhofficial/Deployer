import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { editorOptions } from '../../../utils/constants';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: string;
  onSave?: () => void;
}

// Define a default HTML snippet and extra snippets for advanced completions
const defaultHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
  </body>
</html>`;

const extraSnippets = [
  {
    label: '!html',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: defaultHTML,
    documentation: 'Basic HTML template'
  },
  {
    label: '!log',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'console.log($1);',
    documentation: 'Console log snippet'
  },
  {
    label: '!func',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'function $1() {\n  $2\n}',
    documentation: 'Function snippet'
  }
];

export const MonacoEditor = ({ value, onChange, language = 'html', theme = 'vs-dark', onSave }: MonacoEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      console.log('Save command triggered.');
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editor.current = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme,
        ...editorOptions,
      });

      editor.current.onDidChangeModelContent(() => {
        onChange(editor.current?.getValue() || '');
      });

      // Add custom command for format
      editor.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
        editor.current?.getAction('editor.action.formatDocument').run();
      });

      // Add custom keyboard shortcut for save
      editor.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        handleSave();
      });

      // Add advanced code completions
      monaco.languages.registerCompletionItemProvider(language, {
        provideCompletionItems: () => ({
          suggestions: extraSnippets
        })
      });

      // Add error checking marker for demonstration/upcoming advanced validations
      monaco.editor.setModelMarkers(editor.current.getModel()!, 'owner', [{
        message: 'Sample error',
        severity: monaco.MarkerSeverity.Error,
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1
      }]);

      return () => editor.current?.dispose();
    }
  }, []);

  useEffect(() => {
    if (editor.current) {
      if (editor.current.getValue() !== value) {
        editor.current.setValue(value);
      }
    }
  }, [value]);

  return (
    <div 
      ref={editorRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        border: '1px solid #2d2d2d',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
};
