let slots = [[null, null, null, null],[null, null, null, null]];

let currentColumn = 0;


class slot {
    constructor(slotRow, slotColumn, title, labels, data, backgroundColor=null, quantityName=null) {
        this.slotRow = slotRow
        this.slotColumn = slotColumn
        this.title = title
        this.labels = labels
        this.data = data
        this.backgroundColor = backgroundColor
        this.quantityName = quantityName

        this.chartType = 'pie'
        this.pieChartAPI(slotRow, slotColumn, title, labels, data, backgroundColor, quantityName)
        slots[slotRow][slotColumn] = this
    }

    pieChartAPI(slotRow, slotColumn, title, labels, data, backgroundColor=null) {
        slotRow = slotRow + 1
        document.getElementById(`visualise-charts-row-${slotRow}`).children[slotColumn].innerHTML = `<canvas id="chart-${slotRow}-${slotColumn}" style="max-width:600px;" canvas>`
        let chosenChart = document.getElementById(`chart-${slotRow}-${slotColumn}`)
        new Chart(chosenChart, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [{
                backgroundColor: backgroundColor,
                borderWidth: 0.5,
                data: data
                }]
            },
            options: {
                legend: {
                    position:'bottom',
                    display: false
                },
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: title
                }
            }
        });
    }

    barChartAPI(slotRow, slotColumn, title, labels, data, backgroundColor=null, quantityName=null) {
        slotRow = slotRow + 1
        document.getElementById(`visualise-charts-row-${slotRow}`).children[slotColumn].innerHTML = `<canvas id="chart-${slotRow}-${slotColumn}" style="max-width:600px;" canvas>`
        let chosenChart = document.getElementById(`chart-${slotRow}-${slotColumn}`)
        new Chart(chosenChart, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: quantityName,
                    backgroundColor: backgroundColor,
                    data: data
                }]
            },
            options: {
                legend: {
                    display: false
                },
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: title
                }
            }
        });
    }

    constructBar() {
        this.barChartAPI(this.slotRow, this.slotColumn, this.title, this.labels, this.data, this.backgroundColor, this.quantityName)
        this.chartType = 'bar'
    }

    constructPie() {
        this.pieChartAPI(this.slotRow, this.slotColumn, this.title, this.labels, this.data, this.backgroundColor, this.quantityName)
        this.chartType = 'pie'

    }

    changeData(data) {
        this.data = data
        if (this.chartType == 'pie') {
            this.constructPie()
        } else if (this.chartType == 'bar') {
            this.constructBar()
        } else {
            console.log("Didn't Construct!")
        }
    }

    resetSlot() {
        document.getElementById(`visualise-charts-row-${this.slotRow + 1}`).children[this.slotColumn].innerHTML = ''
    }

}

function resetAllSlots() {
    currentColumn = 0
    for (column of slots[0]) {
        if (column != null) {
            column.resetSlot()
        }
    }
    for (column of slots[1]) {
        if (column != null) {
            column.resetSlot()
        }
    }
}


function getVotes(x,y) {
    fetch(`/data/election/${chosenElectionId}/votes`)
    .then(response => response.json())
    .then(data => {
        if (data['dataIsPresent']) {
            console.log(currentColumn)
            new slot(x,currentColumn,'Total Votes', data['xValues'], data['yValues'], data['barColours'], 'Votes')
            currentColumn += 1
            return true
        }
        else {
            return false
        }
    });
}

function getSeats(x,y) {
    fetch(`/data/election/${chosenElectionId}/seats`)
    .then(response => response.json())
    .then(data => {
        if (data['dataIsPresent']) {
            console.log(currentColumn)
            new slot(x,currentColumn,'Total Seats', data['xValues'], data['yValues'], data['barColours'], 'Seats')
            currentColumn += 1
            return true
        } else
            return false
    });
}

function getProportionalityError(x,y) {
    fetch(`/data/election/${chosenElectionId}/proportionality-error`)
    .then(response => response.json())
    .then(data => {
        if (data['dataIsPresent']) {
            const error = parseFloat(data['error']).toFixed(2)
            console.log(currentColumn)
            new slot(x,currentColumn,'Proportionality Error', ['Unproportional', 'Proportional'], [error, (100-error)], ['Red', 'Blue'], '%')
            currentColumn += 1
            return true
        } else {
            return false
        }
}
    )
}

function getTurnout(x,y) {
    fetch(`/data/election/${chosenElectionId}/turnout`)
    .then(response => response.json())
    .then(data => {
        if (data['dataIsPresent']) {
            const votes = parseInt(data['votes'])
            const electorate = parseInt(data['electorate'])
            console.log(currentColumn)
            new slot(x,currentColumn,'Voter Turnout', ['Did not vote', 'Did vote'], [(electorate-votes), votes], ['Red', 'Blue'], 'Votes')
            currentColumn += 1
        }  else {
            return false
        }
    }
    )
}

function autoStatsLaunch(button) {
    changeTool(button);
    resetAllSlots();
    getVotes(0,0);
    getSeats(0,1);
    getProportionalityError(0,2);
    getTurnout(0,3);
}

let selectedChartLocation = [null, null]

function selectChart(element) {
    if (element.classList.contains('selected-visualise-chart')) {
        element.classList.remove('selected-visualise-chart')
        selectedChartLocation = [null, null]
        return
    }

    for (chart of document.getElementsByClassName('selected-visualise-chart')) {
        chart.classList.remove('selected-visualise-chart')
    }
    element.classList.add('selected-visualise-chart')
    selectedChartLocation = [parseInt(element.getAttribute('data-row')), parseInt(element.getAttribute('data-column'))]
    console.log(selectedChartLocation)
}

function getSelectedSlot() {
    if (selectedChartLocation == [null, null]) {
        return null
    } else {
        console.log(selectedChartLocation)
        return slots[selectedChartLocation[0]][selectedChartLocation[1]]
    }
}

function changeToBarChart(button) {
    changeTool(button)
    getSelectedSlot().constructBar()
}

function changeToPieChart(button) {
    changeTool(button)
    getSelectedSlot().constructPie()
}