// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('markdown-snippet.surround', () => {
		interface CommandQuickPickItem extends vscode.QuickPickItem {
			command: () => any;
		}
	
		let items: CommandQuickPickItem[] = [];
		items.push({label: 'break point', description: 'insert break point', command: insertBreakpoint });
	
		vscode.window.showQuickPick(items, { matchOnDetail: true, matchOnDescription: true }).then(selectedItem => {
			if (selectedItem && typeof selectedItem.command === 'function') {
				selectedItem.command();
			}
		});
	});

	context.subscriptions.push(disposable);
}

function insertBreakpoint() {
	let msg = '**';
	let snippet = msg + '${TM_SELECTED_TEXT}' + msg;
	const editor = vscode.window.activeTextEditor;
	const selection = editor.selection;
	const currentLineRange = editor.document.lineAt(selection.active.line).range;
	// editor.edit(edit => edit.replace(currentLineRange, "my new text"));
	// let singleRange: vscode.Range = new vscode.Range(startPos, endPos);
	let ranges: vscode.Range[] = [];
	const todoStyle = {
		// text: "TODO:",
		// color: '#fff',
		isWholeLine: true,
		backgroundColor: '#4b4b18',
		overviewRulerColor: 'rgba(255, 0, 0, 1)',
		dark: {
			gutterIconPath: path.join(__filename, '..', '..', 'images', 'bug.png')
		}
	}
	const fontColorDecorator = vscode.window.createTextEditorDecorationType(todoStyle);
	ranges.push(currentLineRange);
	editor.setDecorations(fontColorDecorator, ranges);

	// vscode.commands.executeCommand('editor.action.insertSnippet', 
	// 	{'snippet': snippet} )
}