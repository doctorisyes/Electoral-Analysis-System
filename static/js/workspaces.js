function hideAllWorkspaces() { // Hides all elements with the class workspace
    const workspaces = document.getElementsByClassName("workspace");
    for (const workspace of workspaces) {
        if (workspace.classList.contains("hidden") == false) {
            workspace.classList.add("hidden");
        }
    }
}

function changeWorkspace(element) { // Changes the workspace that is displayed to the one specified in the element
    const workspaceId = element.getAttribute("data-workspace-id");
    hideAllWorkspaces();

    const workspace = document.getElementById(workspaceId);
    workspace.classList.remove("hidden");
}

function workspacesInit() { // Initializes the workspaces by hiding all of them
    hideAllWorkspaces();
}

workspacesInit(); // Calls the workspacesInit function to hide all workspaces