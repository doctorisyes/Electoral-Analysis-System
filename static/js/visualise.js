let slots = [[null, null, null, null],[null, null, null, null]];

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


}

function getVotes(x,y) {
    fetch(`/data/election/${chosenElectionId}/votes`)
    .then(response => response.json())
    .then(data => {
        new slot(x,y,'Total Votes', data['xValues'], data['yValues'], data['barColours'], 'Votes')
    });
}

function getSeats(x,y) {
    fetch(`/data/election/${chosenElectionId}/seats`)
    .then(response => response.json())
    .then(data => {
        new slot(x,y,'Total Seats', data['xValues'], data['yValues'], data['barColours'], 'Seats')
    });
}



function autoStatsLaunch(button) {
    changeTool(button)
    fetch(`/data/election/${chosenElectionId}/votes`)
    .then(response => response.json())
    .then(data => {
        new slot(0,0,'Total Votes', data['xValues'], data['yValues'], data['barColours'], 'Votes')
    });
    fetch(`/data/election/${chosenElectionId}/seats`)
    .then(response => response.json())
    .then(data => {
        new slot(0,1,'Total Seats', data['xValues'], data['yValues'], data['barColours'], 'Seats')
    });
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