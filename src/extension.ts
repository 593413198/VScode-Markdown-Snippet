// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('markdown-snippet.surround', () => {
		interface CommandQuickPickItem extends vscode.QuickPickItem {
			command: () => any;
		}
	
		let items: CommandQuickPickItem[] = [];
		items.push({label: 'Font: Bold', description: '选中-加粗', command: surroundWithBold });
		items.push({label: 'Font: Strike-through', description: '选中-删除线', command: surroundWithStrikeThrough });
		items.push({label: 'Font: Italic', description: '选中-斜体', command: surroundWithItalic });
		items.push({label: 'Font: Code', description: '选中-代码', command: surroundWithCode });

		items.push({label: 'Color: Red', description: '改变字体：红色',  command: changeColorRed });
		items.push({label: 'Color: Green', description: '改变字体：绿色',  command: changeColorGreen });
		items.push({label: 'Color: Blue', description: '改变字体：蓝色',  command: changeColorBlue });

		items.push({label: 'Type: KeyWords', description: '改变字体：关键字',  command: changeColorKeyWord });

		items.push({label: 'CSS: Image', description: '插入图片',  command: insertImage });
		items.push({label: 'CSS: Table', description: '插入表格',  command: insertTable });

		items.push({label: 'LaTeX: fraction', description: 'LaTeX：分式',  command: laTexFraction });
		items.push({label: 'LaTeX: sub-tag', description: 'LaTeX：下标', command: laTexSubtag });
		items.push({label: 'LaTeX: matrix44', description: 'LaTeX：矩阵4x4', command: laTexMatrix44 });
		items.push({label: 'LaTeX: matrix33', description: 'LaTeX：矩阵3x3', command: laTexMatrix33 });

		// items.push({label: 'LaTeX: 矩阵3x3',  command: insertTable });
		// items.push({label: 'LaTeX: 矩阵4x4',  command: insertTable });

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

function changeColorRed() {
	let color:string = '#FF1E10';
	let snippet = '<font color=' + color + '>**${TM_SELECTED_TEXT}**</font>';
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': snippet} )
}

function changeColorGreen() {
	let color:string = '#1AAD19';
	let snippet = '<font color=' + color + '>**${TM_SELECTED_TEXT}**</font>';
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': snippet} )
}

function changeColorBlue() {
	let color:string = '#1A9BFF';
	let snippet = '<font color=' + color + '>**${TM_SELECTED_TEXT}**</font>';
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': snippet} )
}


function changeColorKeyWord() {
	let color:string = '#ef6d3b';
	let snippet = '<font color=' + color + '>**${TM_SELECTED_TEXT}**</font>';
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': snippet} )
}

// ---------- Insert ---------
function insertImage() {
	let str:string = '<img src="http://www.luhao.wiki/images/xxx.png" alt="" width="500">'
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': str} )
}

function insertTable() {
	let str:string = '\n' + 
'| t1   | t2   | t3   |\n' +
'| :--: | :--: | :--: |\n' +
'| | | |\n'
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': str} )
}

function laTexFraction() {
	let str = '$\\frac{1}{a}$'
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': str} )
}

function laTexSubtag() {
	let str = '$$a_{1}$'
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': str} )
}

function laTexMatrix44() {
	let str = '\n' +
'$$\n' +
'\\left[\n' +
'\\begin{matrix}\n' +
	'0 & 0 & 0 & 0\\\\\\\n' +
	'0 & 0 & 0 & 0\\\\\\\n' +
	'0 & 0 & 0 & 0\\\\\\\n' +
	'0 & 0 & 0 & 0\n' +
'\\end{matrix}\n' +
'\\right]\n' +
'$$\n'
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': str} )
}

function laTexMatrix33() {
	let str = '\n' +
'$$\n' +
'\\left[\n' +
'\\begin{matrix}\n' +
	'0 & 0 & 0\\\\\\\n' +
	'0 & 0 & 0\\\\\\\n' +
	'0 & 0 & 0\n' +
'\\end{matrix}\n' +
'\\right]\n' +
'$$\n'
	vscode.commands.executeCommand('editor.action.insertSnippet', 
		{'snippet': str} )
}

// this method is called when your extension is deactivated
export function deactivate() {}
