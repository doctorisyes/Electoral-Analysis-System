from api_requests import read_api_data # Import api_requests script

def getElectionById(electionId):
    mainDb = read_api_data() # Get the dictionary of the cached API DB
    for election in mainDb:
        if electionId == election['election_id']: # If the id matches with the one on the DB
            return election
        
def getElectionsByCountryCode(countryCode):
    mainDb = read_api_data() # Get the dictionary of the cached API DB
    matchingElections = [] # Make an empty list
    for election in mainDb:
        if countryCode == election['district']['district_country']: # If the ditrict code matches
            matchingElections.append(election) # Add the election to the matchingElections list
    return matchingElections

if __name__ == "__main__":
    print(getElectionsByCountryCode("US"))