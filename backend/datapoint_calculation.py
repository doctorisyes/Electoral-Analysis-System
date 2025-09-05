def calculateProportionalityError(totalVotes, totalSeats, partyVotes, partySeats):
    if len(partyVotes) == len(partySeats):
        sum = 0
        for i in range(len(partyVotes) - 1):
            sum += abs((((partySeats[i]) / (totalSeats)) - ((partyVotes[i]) / (totalVotes))))

        return (sum/2)*100
    
    else:
        return 'Invalid Input Data'
    
if __name__ == "__main__":
    totalVotes = 28925403
    totalSeats = 650
    partySeats = [411,121,72,9,7,6,5,5,4,2,1,1,1,4,1]
    partyVotes = [9708716,6828925,3519143,724758,210891,564042,172058,4117610,1843124,86861,48685,117191,94779,194811,25238]
    print(calculateProportionalityError(totalVotes, totalSeats, partyVotes, partySeats))