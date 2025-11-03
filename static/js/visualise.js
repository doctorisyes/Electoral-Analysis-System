let slots = [[null, null, null, null],[null, null, null, null]];

let currentColumn = 0;
let currentRow = 0;

function currentColumnIncrement() {
    if (currentColumn < 3) {
        currentColumn += 1
    } else {
        currentColumn = 0
        currentRow += 1
    }
}

class slot {
    constructor(slotRow, slotColumn, title) {
        this.slotRow = slotRow
        this.slotColumn = slotColumn
        this.title = title

        slots[slotRow][slotColumn] = this
    }

    resetSlot() {
        document.getElementById(`visualise-charts-row-${this.slotRow + 1}`).children[this.slotColumn].innerHTML = ''
    }

}

function resetAllSlots() {
    currentColumn = 0
    currentRow = 0
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


function getVotes() {
    fetch(`/data/election/${chosenElectionId}/votes`)
    .then(response => response.json())
    .then(data => {
        if (data['dataIsPresent']) {
            barColours = data['barColours']
            if (data['isReferendum'] && data['xValues'].length == 2) {
                barColours = ['Blue', 'Red']
            }
            new chartSlot(currentRow,currentColumn,'Total Votes', data['xValues'], data['yValues'], barColours, 'Votes')
            currentColumnIncrement()
            return true
        }
        else {
            return false
        }
    });
}

function getSeats() {
    fetch(`/data/election/${chosenElectionId}/seats`)
    .then(response => response.json())
    .then(data => {
        if (data['dataIsPresent']) {
            console.log(currentColumn)
            new chartSlot(currentRow,currentColumn,'Total Seats', data['xValues'], data['yValues'], data['barColours'], 'Seats')
            currentColumnIncrement()
            return true
        } else
            return false
    });
}

function getProportionalityError() {
    fetch(`/data/election/${chosenElectionId}/proportionality-error`)
    .then(response => response.json())
    .then(data => {
        if (data['dataIsPresent']) {
            const error = parseFloat(data['error']).toFixed(2)
            console.log(currentColumn)
            new chartSlot(currentRow,currentColumn,'Proportionality Error', ['Unproportional', 'Proportional'], [error, (100-error)], ['Red', 'Blue'], '%')
            currentColumnIncrement()
            return true
        } else {
            return false
        }
}
    )
}

function getMostOverrepresentedParty() {
    fetch(`/data/election/${chosenElectionId}/most-overrepresented-party`)
    .then(response => response.json())
    .then(data => {
        if (data['dataIsPresent']) {
            const party = data['party']
            console.log(party)
            new stringDataSlot(currentRow,currentColumn,'Most Overrepresented Party', party)
            currentColumnIncrement()
            return true
        } else {
            return false
        }
}
    )
}

function getMostUnderrepresentedParty() {
    fetch(`/data/election/${chosenElectionId}/most-underrepresented-party`)
    .then(response => response.json())
    .then(data => {
        if (data['dataIsPresent']) {
            const party = data['party']
            console.log(party)
            new stringDataSlot(currentRow,currentColumn,'Most Underrepresented Party', party)
            currentColumnIncrement()
            return true
        } else {
            return false
        }
}
    )
}

function getSeatToVoteRatio() {
    fetch(`/data/election/${chosenElectionId}/seat-vote-ratio`)
    .then(response => response.json())
    .then(data => {
        if (data['dataIsPresent']) {
            const ratio = data['ratio']
            console.log(ratio)
            new stringDataSlot(currentRow,currentColumn,'Seat to Vote Ratio', ratio)
            currentColumnIncrement()
            return true
        } else {
            return false
        }
}
    )
}

function getTurnout() {
    fetch(`/data/election/${chosenElectionId}/turnout`)
    .then(response => response.json())
    .then(data => {
        if (data['dataIsPresent']) {
            const votes = parseInt(data['votes'])
            const electorate = parseInt(data['electorate'])
            console.log(currentColumn)
            new chartSlot(currentRow,currentColumn,'Voter Turnout', ['Did not vote', 'Did vote'], [(electorate-votes), votes], ['Red', 'Blue'], 'Votes')
            currentColumnIncrement()
        }  else {
            return false
        }
    }
    )
}

function autoStatsLaunch(button) {
    changeTool(button);
    resetAllSlots();
    getVotes();
    getSeats();
    getProportionalityError();
    getTurnout();
    getMostOverrepresentedParty();
    getMostUnderrepresentedParty();
    getSeatToVoteRatio();
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

class chartSlot extends slot {
    constructor(slotRow, slotColumn, title, labels, data, backgroundColor=null, quantityName=null) {
        super(slotRow, slotColumn, title);
        this.labels = labels
        this.data = data
        this.backgroundColor = backgroundColor
        this.quantityName = quantityName

        this.chartType = 'pie'
        this.pieChartAPI(slotRow, slotColumn, title, labels, data, backgroundColor, quantityName)
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

}

class stringDataSlot extends slot {
    constructor(slotRow, slotColumn, title, theString) {
        super(slotRow, slotColumn, title);
        this.theString = theString
        this.constructString()
    }
    stringSlotAPI(slotRow, slotColumn, title, theString) {
        slotRow = slotRow + 1
        document.getElementById(`visualise-charts-row-${slotRow}`).children[slotColumn].innerHTML = `<div class="string-data-slot">
                        <h3>${title}</h3>
                        <p>${theString}</p>
                    </div>`
    }
    constructString() {
        this.stringSlotAPI(this.slotRow, this.slotColumn, this.title, this.theString)
    }
}