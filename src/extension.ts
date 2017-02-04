'use strict';

import * as vscode from 'vscode';

import { Options, generateSpec } from './spec-generator'

// constance
const NAME = 'specGenerator';
const COMMAND = 'generate';

// this extension's configuration
interface ExtensionConfig {
  variableName: string
  doubleQuote: boolean
  semicolon: boolean
  style: string
  es6: boolean
}

// default configuration
let config: ExtensionConfig = {
  variableName: 'result',
  doubleQuote: true,
  semicolon: true,
  style: 'chai',
  es6: true
};

// read extension configuration
function readConfig() {
  let settings = vscode.workspace.getConfiguration(NAME);
  config = Object.assign({}, config, settings);
}

function toSpecGeneratorOption(config: ExtensionConfig, special: boolean = false): Options {
  return {
    variableName: config.variableName,
    specs: [],
    special: special,
    quote: config.doubleQuote ? '"' : '\'',
    semicolon: config.semicolon,
    style: config.style,
    es6: config.es6,
  }
}

export function activate(context: vscode.ExtensionContext) {

  // initialize configuration
  readConfig();

  // reload configuration on change
  vscode.workspace.onDidChangeConfiguration(readConfig);

  let disposable = vscode.commands.registerCommand(`${NAME}.${COMMAND}`, () => {

    var editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }

    var selection = editor.selection;
    var text = editor.document.getText(selection);

    try {
      let target = eval('(' + text + ')');
      let specs = generateSpec(target, toSpecGeneratorOption(config, false));
      editor.edit((edit) => {
        edit.replace(editor.selection, specs.join('\n'));
      });
    } catch (e) {
      let specs = generateSpec(text, toSpecGeneratorOption(config, true));
      if (specs.length != 0) {
        editor.edit((edit) => {
          edit.replace(editor.selection, specs.join('\n'));
        });
      }
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
}