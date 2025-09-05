from flask import Blueprint, render_template # Access the Blueprint class and the render_template function from Flask
from . import continent_country_finder # Import the function that gets the list of countries and continents
from . import election_search # Import the function that gets the elections by country code
from . import datapoint_refinement

mainBlueprint = Blueprint('main_blueprint', __name__) # Create an instance of the blueprint class

@mainBlueprint.route('/') # Add the folowing function as the "/" page of the blurprint
def index():
    return render_template('index.html') # Return the rendered HTML file index.html

@mainBlueprint.route('/data/countries')
def fetchCountriesContinents():
    return continent_country_finder.getContinentLists()

@mainBlueprint.route('/data/country_elections/<countryCode>')
def fetchElectionsByCountry(countryCode):
    elections = election_search.getElectionsByCountryCode(countryCode)
    electionOption = []
    for election in elections:
        electionOption.append({
            "election_id": election['election_id'],
            "election_name": election_search.refineElectionName(election['election_name']['en_US'], election_search.findElectionYear(election)),
            "election_year": election_search.findElectionYear(election)
        })
    return electionOption

@mainBlueprint.route('/data/election/<electionId>/datapoints')
def fetchDatapointsByElection(electionId):
    electionId = int(electionId)
    election = election_search.getElectionById(electionId)
    if election != None:
        datapoints = datapoint_refinement.getDatapointsList(election)
        datapoints.insert(0, election['election_name']['en_US'])
        return datapoints
    
@mainBlueprint.route('/data/election/<electionId>/datapoint/<keys>')
def fetchDatapointValue(electionId, keys):
    electionId = int(electionId)
    election = election_search.getElectionById(electionId)
    keysList = keys.split("+")
    keyRoute = election
    for key in keysList:
        keyRoute = keyRoute[key]

    return keyRoute