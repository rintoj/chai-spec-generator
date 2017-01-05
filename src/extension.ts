'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function getProperties(array) {
    var object = {};
    array.map((item) => {
        Object.keys(item).map((key) => {
            object[key] = true;
        });
    });
    return Object.keys(object);
}

function generateSpec(target, context, specs) {
    if (target instanceof Array) {
        specs.push(context + '.be.a(\'array\');');
        specs.push(context + '.be.length(' + target.length + ');');
        target.map(function (item, index) {
            generateSpec(item, context.replace(/\)$/, '') + '[' + index + '])', specs);
        });
    } else if (typeof target === 'object') {
        specs.push(context + '.be.a(\'object\');');
        Object.keys(target).map(function (key) {
            specs.push(context + '.have.property(\'' + key + '\');');
            if (target[key] instanceof Array) {
                generateSpec(target[key], context.replace(/\)$/, '') + '.' + key + ')', specs);
            } else if (typeof target[key] === 'object') {
                generateSpec(target[key], context.replace(/\)$/, '') + '.' + key + ')', specs);
            } else if (isNaN(target[key])) {
                specs.push(context.replace(/\)$/, '') + '.' + key + ')' + '.be.equal(\'' + target[key] + '\');');
            } else {
                specs.push(context.replace(/\)$/, '') + '.' + key + ')' + '.be.equal(' + target[key] + ');');
            }
        });
    }

    return specs;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.generate-test-spec', () => {
        // The code you place here will be executed every time your command is executed

        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        var selection = editor.selection;
        var text = editor.document.getText(selection);

        try {
            let target = eval('(' + text + ')');
            let specs = generateSpec(target, 'expect(result)', []);
            editor.edit((edit) => {
                edit.replace(editor.selection, specs.join('\n'));
            });
        } catch (e) {

        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}