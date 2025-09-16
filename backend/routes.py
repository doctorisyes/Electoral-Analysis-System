from flask import Blueprint, render_template # Access the Blueprint class and the render_template function from Flask
from . import continent_country_finder # Import the function that gets the list of countries and continents
from . import election_search # Import the function that gets the elections by country code
from . import datapoint_refinement
from . import datapoint_calculation

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

@mainBlueprint.route('/data/election/<electionId>/votes')
def fetchElectionVotes(electionId):
    electionId = int(electionId)
    election = election_search.getElectionById(electionId)
    return datapoint_refinement.getVotes(election)

@mainBlueprint.route('/data/election/<electionId>/seats')
def fetchElectionseats(electionId):
    electionId = int(electionId)
    election = election_search.getElectionById(electionId)
    return datapoint_refinement.getSeats(election)

@mainBlueprint.route('/data/election/<electionId>/proportionality-error')
def fetchProportionalityError(electionId):
    electionId = int(electionId)
    election = election_search.getElectionById(electionId)
    partySeats = datapoint_refinement.getSeats(election)['yValues']
    partyVotes = datapoint_refinement.getVotes(election)['yValues']
    return {'error':datapoint_calculation.calculateProportionalityError(partyVotes, partySeats)}

@mainBlueprint.route('/data/election/<electionId>/turnout')
def fetchVoterTurnout(electionId):
    electionId = int(electionId)
    election = election_search.getElectionById(electionId)

    votesOption1 = election['results']['valid_votes'] is not None
    votesOption2 = election['results']['cast_votes'] is not None
    electorateOption1 = election['voting_and_voters']['registered_voters'] is not None
    electorateOption2 = election['voting_and_voters']['eligible_voters'] is not None

    votes = None
    electorate = None

    if votesOption1:
        votes = election['results']['valid_votes']
    elif votesOption2:
        votes = election['results']['cast_votes']

    if electorateOption1:
        electorate = election['voting_and_voters']['registered_voters']
    elif electorateOption2:
        electorate = election['voting_and_voters']['eligible_voters']

    if (votes is not None) and (electorate is not None):
        turnout = (votes/electorate)*100
        return {
            'votes': votes,
            'electorate': electorate,
            'turnout': f"{round(turnout,2)}%"
        }
    else:
        return {
            'error': 'Insufficient data to calculate turnout.',
            'hadVotes': votes is not None,
            'hadElectorate': electorate is not None
        }
