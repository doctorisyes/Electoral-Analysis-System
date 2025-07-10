from . import election_search

def determineExtraDatapoints(election):
    extraDatapoints = []

    isReferendum = (lambda election: election['basic_data']['election_type'] == 'Referendum')(election)
    isPresidential = (lambda election: election['basic_data']['election_type'] == 'Presidential')(election)
    isGeneralElection = not (isReferendum and isPresidential)

    hasTotalVotes = (election['results']['valid_votes'] is not None) or (election['results']['cast_votes'] is not None)
    hasElectoratePopulation = (election['voting_and_voters']['registered_voters'] is not None) or (election['voting_and_voters']['eligible_voters'] is not None)

    if hasTotalVotes and hasElectoratePopulation:
        extraDatapoints.append("voter_turnout")


    if isGeneralElection:
        if election['parties'] is not None:
            if (election['parties'][0]['seats_won'] is not None) and ((election['parties'][0]['votes'] is not None) or (election['parties'][0]['percentage'] is not None)):
                extraDatapoints.append("proportionality_error")
                extraDatapoints.append("percentage_votes")
                extraDatapoints.append("seat_to_vote_ratio")
                extraDatapoints.append("most_overrepresented")
                extraDatapoints.append("most_underrepresented")



    return extraDatapoints

def getDatapointsList(election):
    datapointsList = determineExtraDatapoints(election)

    for datapoint in election.keys():
        print(datapoint)

    return datapointsList

if __name__ == "__main__":
    print(getDatapointsList(election_search.getElectionById(4446)))