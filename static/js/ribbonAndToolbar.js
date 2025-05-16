class Tool { // Creates a class for tools
    constructor(name, imageSrc, workspaceId) {
        this.name = name; // Name of the tool that will be displayed on GUI
        this.imageSrc = imageSrc; // Path to the icon used in the GUI
        this.workspaceId = workspaceId; // Id of the dom element that is the corresponding workspace
    }
}

class Toolbar {
    constructor(name, tools, isHidden) {
        this.tools = tools; // Sets the instance variable tools to the tools passed in
        let classes = "toolbar"; 
        if (isHidden) {
            classes += " hidden"; // if the user asked for hidden, it adds the hidden class to the class text
        }
        let innerHTML = `<div class='${classes}' id='${name}'>
            </div>`; // Creates the HTML for the toolbar
        document.getElementById("toolbar-container").innerHTML += innerHTML; // adds the HTML to the toolbar container
        this.DomToolbar = document.getElementById(name); // Gets a DOM reference pointer to the toolbar

        this.renderToolbar() // Calls the renderToolbar function to add the tools to the toolbar
    }
    renderToolbar() {
        let innerHTML = "";
        for (const tool of this.tools) { // Iterates through every tool in the tools array
            let classes = "tool";
            if (tool.imageSrc == "") {
                classes += " placeholder-image"; // Add placeholder-image css class if no image is proviced which makes black square
            }
            let toolHTML = `<div onclick='changeWorkspace(this)' class='${classes}' data-workspace-id='${tool.workspaceId}'>
                <img src='${tool.imageSrc}'>
                <p>${tool.name}</p>
                </div>`; // Creates the HTML for the tool
            innerHTML += toolHTML; // Adds the HTML to the innerHTML variable
        }
        this.DomToolbar.innerHTML = innerHTML; // Sets the innerHTML of the toolbar to the innerHTML variable
    }
    
}





const datasetTools = [
    new Tool("Load Election", `${window.static_folder}images/db.svg`, "load-election-workspace"),
    new Tool("Search Election", `${window.static_folder}images/search.svg`, "search-election-workspace"),
    new Tool("Import Custom", `${window.static_folder}images/file.svg`, "importCustom"),
    new Tool("Select Data", `${window.static_folder}images/point.svg`, "selectData"),
]; // Creates a list of tool objects

const datasetToolbar = new Toolbar("dataset-toolbar", datasetTools, false);
// creates a toolbar object with the list of tools from before

const trendsTools = [
    new Tool("Placeholder", "", ""),
];
const trendsToolbar = new Toolbar("trends-toolbar", trendsTools, true);

const visualiseTools = [
    new Tool("Auto-Stats", `${window.static_folder}/images/wand.svg`, "auto-stats-workspace"),
    new Tool("Swingometer", `${window.static_folder}/images/swingometer.svg`, "swingometer"),
    new Tool("Bar Chart", `${window.static_folder}/images/barChart.svg`, "barChart"),
    new Tool("Pie Chart", `${window.static_folder}/images/pieChart.svg`, "pieChart"),
    new Tool("Change Datapoint", `${window.static_folder}/images/file.svg`, "changeDatapoint"),
];
const visualiseToolbar = new Toolbar("visualise-toolbar", visualiseTools, true);





function hideAllToolbars() { // Goes through all the toolbars with the class toolbar and hides them
    const toolbars = document.getElementsByClassName("toolbar");
    for (const toolbar of toolbars) {
        if (toolbar.classList.contains("hidden") == false) {
            toolbar.classList.add("hidden");
        }
    }
}

function changeToolbar(element) { // Changes the toolbar that is displayed to the one specified in the element
    const toolbarId = element.getAttribute("data-toolbar-id");
    hideAllToolbars();
    hideAllWorkspaces();
    document.getElementById(toolbarId).classList.remove("hidden");

    removeUnderlinesFromRibbons();
    element.classList.add("ribbon-option-underlined");

}

function removeUnderlinesFromRibbons() { // Removes the underlines from all the ribbons
    const ribbons = document.getElementsByClassName("ribbon-option-underlined");
    for (const ribbon of ribbons) {
        ribbon.classList.remove("ribbon-option-underlined");
    }
}