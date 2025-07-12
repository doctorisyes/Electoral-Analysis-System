class continentOption {
    constructor(name, code, icon) {
        this.myHTML = `<div onclick="chooseContinent(this)" data-code="${code}" class="continent-option">
                    <img src="${window.static_folder}/images/${icon}.svg" class="continent-icon">
                    <h3>${name}</h3>
                </div>`; // Create the HTML for the continent option

        this.parentDom = document.getElementById("continent-section"); // Get the Dom ref to the parent element
        this.parentDom.innerHTML += this.myHTML; // Add the HTML to the parent element's innner HTML
    }
}

function chooseContinent(element) {
    let continent = element.getAttribute("data-code"); // Get the continent code from clicked element
    if (document.getElementsByClassName("continent-option-chosen").length > 0) { 
        document.getElementsByClassName("continent-option-chosen")[0].classList.remove("continent-option-chosen");
        // Only remove the class of the existing chosen continent option if there is one
    }
    element.classList.add("continent-option-chosen");
    // Add the class to the clicked element to mark it as chosen

    getCountryOptions(continent);
    // Run the procedure to fill the country scroll section
}

new continentOption("Africa", "AF", "africa");
new continentOption("Asia", "AS", "asia");
new continentOption("Europe", "EU", "europe");
new continentOption("North America", "NA", "northAmerica");
new continentOption("Oceania", "OC", "oceania");
new continentOption("South America", "SA", "southAmerica");
// Create Continent options, P1: Name, P2: Continent Code, p3: Image name

function createCountryOption(name, code) {
    this.code = code.toLowerCase();

    let optionHTML = `<div onclick="chooseCountry(this)" class="country-option" data-code="${code}">
                        <img src="https://flagcdn.com/${this.code}.svg" class="country-icon">
                        <h3>${name}</h3>
                    </div>` // Create the HTML for the country option
    return optionHTML;
}

function chooseCountry(element) {
    let continent = element.getAttribute("data-code"); // Get the country code from clicked element
    if (document.getElementsByClassName("country-option-chosen").length > 0) {
        document.getElementsByClassName("country-option-chosen")[0].classList.remove("country-option-chosen");
        // Only remove the class of the existing chosen country option if there is one
    }
    element.classList.add("country-option-chosen");
    // Add the class to the clicked element to mark it as chosen

    getElectionOptions(continent);
    // Run the procedure to fill the election scroll section
}

function clearCountryOptions() {
    let scrollSectionDom = document.getElementById(`country-scroll-section`);
    // Get the scroll section DOM element for countries
    scrollSectionDom.innerHTML = "";
    // Clear the inner HTML of the scroll section to remove previous options
}

function getCountryOptions(continent) {
    clearCountryOptions();
    fetch("/data/countries")
        .then(response => response.json()) // Convert to JSON
        .then(data => data[continent]) // Extract the countries for the selected continent
        .then(countries => { let theHTML = "";
            for (let country of countries) {
                 theHTML += createCountryOption(country[1], country[0]); // Add the HTML for each country option
            }
            document.getElementById(`country-scroll-section`).innerHTML = theHTML; // Add HTML to the scroll section
        })
        .catch(error => console.error('Error fetching countries:', error));

}

function createElectionOption(name, year, electionId) {

    let optionHTML = `<div onclick="chooseElection(this)" class="election-option" data-election-id="${electionId}">
                        <h3>${year}</h3>
                        <span>${name}</h3>
                    </div>` // Create the HTML for the election option
    return optionHTML;
}

function clearElectionOptions() {
    let scrollSectionDom = document.getElementById(`election-scroll-section`); // Get the scroll section DOM element for elections
    scrollSectionDom.innerHTML = ""; // Clear the inner HTML of the scroll section to remove previous options
}

function getElectionOptions(code) {
    clearElectionOptions();
    if (code == "GB-SCT") { // Special case for Scotland
        code = "Z2"
    } else if (code == "XK") { // Special case for Kosovo
        code = "KS"
    }
    fetch(`/data/country_elections/${code}`)
        .then(response => response.json()) // Convert to JSON
        .then(elections => { let theHTML = "";
            for (let election of elections) {
                 theHTML += createElectionOption(election['election_name'], election['election_year'], election['election_id']);
                 // Add the HTML for each election option
            }
            document.getElementById(`election-scroll-section`).innerHTML = theHTML;
            // Add HTML to the scroll section
        })
        .catch(error => console.error('Error fetching elections:', error));

}

let chosenElectionId = 4446;

function chooseElection(element) {
    chosenElectionId = element.getAttribute("data-election-id");

    if (document.getElementsByClassName("election-option-chosen").length > 0) {
        document.getElementsByClassName("election-option-chosen")[0].classList.remove("election-option-chosen");
        // Only remove the class of the existing chosen election option if there is one
    }
    element.classList.add("election-option-chosen"); // Add the class to the clicked element to mark it as chosen
    fetchDatapoints(chosenElectionId);
}