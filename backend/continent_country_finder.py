import json # Import JSON for data handling
from pathlib import Path # Import Path for file path handling
from . import api_requests 

def findCountries():
    localDb = api_requests.read_api_data() # Gets locally caches API data
    countries = set() # Uses set to prevent repetition of countrues
    for election in localDb:
        countries.add((election['district']['district_country'], election['district']['district_name'])) 
        # Adds a tuple containing country name and code for every election

    return countries

def getContinentLists():
    allCountries = findCountries() # Get a list of all the countries that could be found

    file_path = Path(__file__).resolve().parent.parent / 'resources' / 'country_metadata' / 'continents.json' 
    with open(file_path, "r", encoding='utf-8') as file:
        continentMapper = json.load(file) # Get the dictionary map for continents stored in the filepath

    continentLists = {}

    for continent in continentMapper['Continents']:
        continentLists[continent] = [] # Create an empty list and eky for every continent

    for country in allCountries:
        if country[0] != "" and country[0] != "Z2" and country[0] != "KS": # If the code isn't empty or doesnt have an exception code then
            try:
                continentLists[continentMapper[country[0]]].append(country) # Add the country to their corresponding continent
            except KeyError:
                print("Country could not be added. Map needs to be updated")
        elif country[0] == "Z2":
            continentLists[continentMapper['GB-SCT']].append(["GB-SCT", country[1]]) # Use a custom code for Scotland
        elif country[0] == "KS":
            continentLists[continentMapper['XK']].append(["XK", country[1]]) # Use a custom code for Kosovo

    for continent in continentMapper['Continents']:
        continentLists[continent] = sorted(continentLists[continent], key=lambda x: x[1]) 
        # Sort each dictionary value which is a list by the tuples inside of them with index no.1

    return continentLists

if __name__ == "__main__":
    print(getContinentLists())