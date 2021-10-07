// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "markdown-snippet" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('markdown-snippet.surround', () => {
		interface CommandQuickPickItem extends vscode.QuickPickItem {
			command: () => any;
		}
	
		let items: CommandQuickPickItem[] = [];
		items.push({ description: '选中-加粗', label: 'Font Bold', command: surroundWithBold });
		items.push({ description: '选中-删除线', label: 'Font Strike-through', command: surroundWithStrikeThrough });
		items.push({ description: '选中-斜体', label: 'Font Italic', command: surroundWithItalic });
		items.push({ description: '选中-代码', label: 'Font Code', command: surroundWithCode });

		// TODO: 需要一种通用逻辑, 选中"改变选中颜色"后, 能够输入#fffff(eg)来插入css样式
	
		vscode.window.showQuickPick(items, { matchOnDetail: true, matchOnDescription: true }).then(selectedItem => {
			if (selectedItem && typeof selectedItem.command === 'function') {
				selectedItem.command();
			}
		});
	});

	context.subscriptions.push(disposable);
}

function surroundWithBold() {
	let msg = '**';
	let snippet = msg + '${TM_SELECTED_TEXT}' + msg;
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': snippet} )
}

function surroundWithStrikeThrough() {
	let msg = '~~';
	let snippet = msg + '${TM_SELECTED_TEXT}' + msg;
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': snippet} )
}

function surroundWithItalic() {
	let msg = '*';
	let snippet = msg + '${TM_SELECTED_TEXT}' + msg;
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': snippet} )
}

function surroundWithCode() {
	let msg = '`';
	let snippet = msg + '${TM_SELECTED_TEXT}' + msg;
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': snippet} )
}


// this method is called when your extension is deactivated
export function deactivate() {}
