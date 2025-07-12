function fetchDatapoints(electionId) {
    fetch(`/data/election/${electionId}/datapoints`)
        .then(response => response.json()) // Convert to JSON
        .then(datapoints => { 
            let simpleDatapointsList = createSimpleDatapointsList(datapoints);
            document.getElementById("unselected-datapoints-scroller").innerHTML = ""; // Clear the unselected datapoints scroller
            let selectedDatapointsScroller = document.getElementById("selected-datapoints-scroller")
            while (selectedDatapointsScroller.children.length > 1) {
                selectedDatapointsScroller.removeChild(selectedDatapointsScroller.lastChild);
            }

            selectedDatapointsCounter = 0; // Reset the selected datapoints counter
            if (document.getElementById("no-datapoints-selected").classList.contains('hidden')) {
                document.getElementById("no-datapoints-selected").classList.remove('hidden');
            }

            document.getElementById('select-data-election-name').innerHTML = simpleDatapointsList.shift(); // Remove the first element which is the election name

            for (const datapoint of simpleDatapointsList) {
                document.getElementById("unselected-datapoints-scroller").innerHTML += `
                <p onclick="toggleSelection(this)">${datapoint}</p>
                `
            }
         }) // Return the datapoints
        .catch(error => console.error('Error fetching datapoints:', error));
}

function createSimpleDatapointsList(datapoints) {
    simpleDatapointsList = [];
    
    function recursionGetAllValues(data) {
        if (data !== null) {
            if (Array.isArray(data)) {
                for (const item of data) {
                    recursionGetAllValues(item);
                }
            } else if (typeof data === 'object') {
                for (const value of Object.values(data)) {
                    recursionGetAllValues(value);
                }
            } else {
                simpleDatapointsList.push(data);
            }
        }
    }

    recursionGetAllValues(datapoints);
    return simpleDatapointsList;
}

let selectedDatapointsCounter = 0;

function toggleSelection(element) {
    let temp = element
    if (element.parentElement.id === "unselected-datapoints-scroller") {
        element.parentElement.removeChild(element);
        if (selectedDatapointsCounter === 0) {
            document.getElementById('no-datapoints-selected').classList.add('hidden');
        }
        document.getElementById("selected-datapoints-scroller").appendChild(temp);
        selectedDatapointsCounter = selectedDatapointsCounter + 1;

    } else if (element.parentElement.id === "selected-datapoints-scroller") {
        element.parentElement.removeChild(element);
        document.getElementById("unselected-datapoints-scroller").appendChild(temp);
        selectedDatapointsCounter = selectedDatapointsCounter - 1;
        if (selectedDatapointsCounter === 0) {
            document.getElementById('no-datapoints-selected').classList.remove('hidden');
        }
    }
}