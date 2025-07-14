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
    datapointsStruct = datapointKeysRecusrion(election)

    simplifiedDatapointsStruct = []

    # Case parties
    counter = 0
    for datapoint in datapointsStruct:
        if type(datapoint) == dict:
            if list(datapoint.keys())[0] == 'parties' or list(datapoint.keys())[0] == 'voting_methods' or list(datapoint.keys())[0] == 'candidates' or list(datapoint.keys())[0] == 'third_party_verification' or list(datapoint.keys())[0] == 'legal_environment':
                simplifiedDatapointsStruct.append(list(datapoint.keys())[0])
            else:
                simplifiedDatapointsStruct.append(datapoint)
        else:
            simplifiedDatapointsStruct.append(datapoint)
            

        counter += 1

    datapointsStruct = simplifiedDatapointsStruct

    extraDatapoints = determineExtraDatapoints(election)
    if extraDatapoints != []:
        datapointsStruct.append({"eas_calculated": extraDatapoints})


    return datapointsStruct

def datapointKeysRecusrion(thing):
    if type(thing) == str:
        if thing == "":
            return None
    elif thing is None:
        return None

    datapoints = []

    if (type(thing) == dict):

        for key in thing.keys():
            temp = datapointKeysRecusrion(thing[key])
            if temp != None:
                if temp == 'oneThingInside':
                    datapoints.append(key)
                else:
                    datapoints.append({key: temp})

        if datapoints != None and datapoints != []:
            return datapoints
        else:
            return None
    

    elif (type(thing) == list) or (type(thing) == tuple):

        tempDatapoints = []
        for item in thing:
            tempDatapoints.append(datapointKeysRecusrion(item))

        


        datapoints.extend(tempDatapoints)

        if datapoints != None and datapoints != []:
            return datapoints
        else:
            return None
    
    elif (type(thing) == str) or (type(thing) == int) or (type(thing) == float) or (type(thing) == bool) :
        return 'oneThingInside'



if __name__ == "__main__":
    print(getDatapointsList(election_search.getElectionById(4446)))