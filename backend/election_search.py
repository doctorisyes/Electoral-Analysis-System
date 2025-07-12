from . import api_requests # Import api_requests script

def getElectionById(electionId):
    mainDb = api_requests.read_api_data() # Get the dictionary of the cached API DB
    for election in mainDb:
        if electionId == election['election_id']: # If the id matches with the one on the DB
            return election
        
def getElectionsByCountryCode(countryCode):
    mainDb = api_requests.read_api_data() # Get the dictionary of the cached API DB
    matchingElections = [] # Make an empty list
    for election in mainDb:
        if countryCode == election['district']['district_country']: # If the ditrict code matches
            matchingElections.append(election) # Add the election to the matchingElections list
    return matchingElections

def refineElectionName(name, year):
    if str(year) in name: # If the year is in the name
        name = name.replace(str(year), "")
        name = ' '.join(name.split())
        return name
    else:
        return name
    
def findElectionYear(election):
    electionStatus = election["election_status"] # Get the election status from the election dictionary
    if electionStatus["election_range"]["election_range_start_date"] != None:
        return electionStatus["election_range"]["election_range_start_date"][:4]
    elif electionStatus["election_delared"]["election_declared_start_date"] != None:
        return electionStatus["election_delared"]["election_declared_start_date"][:4]

if __name__ == "__main__":
    print(getElectionById(4446))