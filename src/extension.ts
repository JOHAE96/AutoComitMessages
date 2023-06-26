// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as git from "isomorphic-git";
import * as fs from "fs";
import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git";

// const gitSCM = vscode.scm.createSourceControl('git', 'Git');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "autoCommitMessages" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let helloWorldDisposable = vscode.commands.registerCommand(
    "autoCommitMessages.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      console.log("helloWorldDisposable");
      vscode.window.showInformationMessage(
        "Hello World from autoCommitMessages!"
      );
    }
  );

  let generateCommitMessage = vscode.commands.registerCommand(
    "autoCommitMessages.generateCommitMessage",
    async () => {
      // get staged git changes
      const currentWorkspacePath = getCurrentWorkspacePath();

      if (currentWorkspacePath) {
        const options: Partial<SimpleGitOptions> = {
          baseDir: currentWorkspacePath,
          maxConcurrentProcesses: 6,
          trimmed: false,
        };
        const sGit: SimpleGit = simpleGit(options); //.clean(CleanOptions.FORCE);

        const status = JSON.stringify(sGit.status());
        const diff = JSON.stringify(sGit.diff(["--staged"]));

        const statusMatrix = await git.statusMatrix({
          fs,
          dir: currentWorkspacePath,
        });

        // git diff --staged

        vscode.window.showInformationMessage(`path - ${currentWorkspacePath} `);
        vscode.window.showInformationMessage(
          `status matrix  - ${statusMatrix} `
        );
        vscode.window.showInformationMessage(
          `generate a commit message - ${status} --> ${diff} `
        );

        //   vscode.extensions
        //     .getExtension("vscode.git")
        //     ?.exports.getAPI(1)
        //     .then((api: any) => {
        //       const repo = api.repositories[0];
        //       const status = repo.state.workingTreeChanges;
        //       console.log(status);
        //     });
      } else {
        vscode.window.showInformationMessage("error no path found");
      }
    }
  );
  context.subscriptions.push(helloWorldDisposable);
  // context.subscriptions.push(generateCommitMessage);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function getCurrentWorkspacePath() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    return workspaceFolders[0].uri.fsPath;
  }
  return undefined;
}
