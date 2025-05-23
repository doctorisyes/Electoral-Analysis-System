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
    if name[-4:] == str(year):
        return name[:-5]
    
def findElectionYear(election):
    if election["election_range_start_date"] != None:
        return election["election_range_start_date"][:4]
    elif election["election_declared_start_date"] != None:
        return election["election_declared_start_date"][:4]
    elif election["original_election_year"] != None:
        return str(election["original_election_year"])

if __name__ == "__main__":
    print(findElectionYear(getElectionById(3970)))