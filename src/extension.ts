// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

const insertText = (val: string) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage(
      "Can't insert log because no document is open"
    );
    return;
  }

  const selection = editor.selection;
  const range = new vscode.Range(selection.start, selection.end);
  editor.edit((editBuilder) => {
    editBuilder.replace(range, val);
  });
};

const getSelectedText = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage(
      "Can't insert log because no document is open"
    );
    return "";
  }

  const selection = editor.selection;
  let text = editor.document.getText(selection);

  if (!text) {
    let cursorPos = selection.start;
    let wordRange = editor.document.getWordRangeAtPosition(cursorPos);
    let wordBelowCursor = editor.document.getText(wordRange);
    text = wordBelowCursor;
  }

  return text;
};

const getLogText = (text: string, language: string) => {
  switch (language) {
    case "javascript":
    case "typescript":
    case "typescriptreact":
      return `console.log("${text}: ", ${text});`;
    case "python":
    case "mojo":
      return `print("${text}: ", ${text})`;
    case "dart":
      return `print('${text}: $${text}');`;
    case "go":
      return `fmt.Printf("${text}: %+v\\n", ${text})`;
    case "rust":
      return `println!("${text}: {:?}", ${text});`;
    case "elixir":
      return `IO.inspect(${text}, label: "${text}")`;
    case "php":
      return `dd(${text});`;
    default:
      return `${language} not yet supported`;
  }
};

const getErrorText = (text: string, language: string) => {
  switch (language) {
    case "javascript":
    case "typescript":
    case "typescriptreact":
      return `console.error("${text}: ", ${text});`;
    case "python":
    case "mojo":
      return `print("error - ${text}: ", ${text})`;
    case "dart":
      return `print('error - ${text}: $${text}');`;
    case "go":
      return `fmt.Printf("${text}: %+v\\n", ${text})`;
    case "rust":
      return `eprintln!("${text}: {:?}", ${text});`;
    case "elixir":
      return `IO.inspect(${text}, label: "ERROR - ${text}")`;
    case "php":
      return `dd("ERROR", ${text});`;
    default:
      return `${language} not yet supported`;
  }
};

export function activate(context: vscode.ExtensionContext) {
  //   console.log('Congratulations, your extension "multi-logger" is now active!');
  let logHandler = vscode.commands.registerCommand("multi-logger.log", () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const language = editor.document.languageId;
      const textToInsert = getLogText(getSelectedText(), language);

      vscode.commands
        .executeCommand("editor.action.insertLineAfter")
        .then(() => {
          insertText(textToInsert);
        });
    }
  });

  context.subscriptions.push(logHandler);

  let errorHandler = vscode.commands.registerCommand(
    "multi-logger.error",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const language = editor.document.languageId;
        const textToInsert = getErrorText(getSelectedText(), language);

        if (language === "go") {
          vscode.commands
            .executeCommand("editor.action.insertLineAfter")
            .then(() => {
              insertText(`if err != nil {\n\t\treturn nil, err\n\t}`);
            });
        } else {
          vscode.commands
            .executeCommand("editor.action.insertLineAfter")
            .then(() => {
              insertText(textToInsert);
            });
        }
      }
    }
  );

  context.subscriptions.push(errorHandler);
}

// This method is called when your extension is deactivated
export function deactivate() {}
