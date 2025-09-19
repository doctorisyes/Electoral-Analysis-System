from . import datapoint_refinement

def calculateProportionalityError(partyVotes, partySeats):
    if type(partySeats) == list and type(partyVotes) == list and partyVotes != [] and partySeats != [] and not (None in partyVotes) and not (None in partySeats):
        totalVotes = sum(partyVotes)
        totalSeats = sum(partySeats)
        if len(partyVotes) == len(partySeats):
            finalSum = 0
            for i in range(len(partyVotes)):
                finalSum += abs((((partySeats[i]) / (totalSeats)) - ((partyVotes[i]) / (totalVotes))))

            return (finalSum/2)*100
    
    else:
        return 'Invalid Input Data'
    
def calculatePercentageVotes(partyVotes, totalVotes):
    return f"{(partyVotes/totalVotes)*100}%"
    
def calculateSeatToVoteRatio(seats, votes):
    oneSeatVotes = int(votes//seats)
    return f"1:{oneSeatVotes}"

def calculateMostOverrepresentedParty(partyVotes, partySeats):
    comparisons = []
    for votes, seats in zip(partyVotes, partySeats):
        comparisons.append((seats/votes))

    count = 0
    for comparison in comparisons:
        if comparison == max(comparisons):
            return count
        count += 1

def calculateMostUnderrepresentedParty(partyVotes, partySeats):
    comparisons = []
    for votes, seats in zip(partyVotes, partySeats):
        comparisons.append((seats/votes))

    count = 0
    for comparison in comparisons:
        if comparison == min(comparisons):
            return count
        count += 1
    


if __name__ == "__main__":
    partyVotes = [25238, 194811, 94779, 117191, 48685, 86861, 1843124, 4117610, 172058, 564042, 210891, 724758, 3519143, 6828925, 9708716]
    partySeats = [1, 4, 1, 1, 1, 2, 4, 5, 5, 6, 7, 9, 72, 121, 411]
    correspondingParties = ['Others', 'Plaid Cymru (Wales)', 'Ulster Unionist Party (Northern Ireland)', 'Alliance Party (Nothern Ireland)', 'TUV (Northern Ireland)', 'SDLP (Northern Ireland)', 'Green Party', 'Reform UK', 'Democratic Unionist Party', 'Independents', 'Sinn Fein (Northern Ireland)', "Scottish National Party", 'Liberal Democrats', 'Conservative Party', 'Labour Party']
    print(f"{correspondingParties[calculateMostOverrepresentedParty(partyVotes, partySeats)]} is the most overrepresented party")
    print(f"{correspondingParties[calculateMostUnderrepresentedParty(partyVotes, partySeats)]} is the most underrepresented party")

    print(calculateProportionalityError(partyVotes, partySeats))

    print(calculateSeatToVoteRatio(sum(partySeats), sum(partyVotes)))