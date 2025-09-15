import requests, json # Import Requests for HTTP and JSON for data handling
from pathlib import Path # Import Path for file path handling
def request_api(): # Function to request data from the ElectionGuide API
    domain = "https://electionguide.org/" # Domain of the API provider
    path = "api/v2/elections_demo/?format=json" # Path to the specific API endpoint
    path = "api/v3/election_details/?format=json" # Path to the specific API endpoint

    token = "CANNOT BE SHARED" # Secret API token for authentication

    url = domain + path # Combination of domain and path for request

    myHeaders = {'Authorization': 'Token ' + token} # Header to store information regarding the request sent

    response = requests.get(url, headers=myHeaders) # Send a HTTP request to the URL with the header defined

    print(f"Status Code: {response.status_code}") # Print the Status code to show outcome

    jsonData = response.json() # Cast the dictionary into JSON format

    file_path = Path(__file__).resolve().parent.parent / 'resources' / 'api_data' / 'main_db.json'  # File path to DB

    with open(file_path, 'w') as file: # open file from filepath in write mode
        json.dump(jsonData, file) # Dump the JSON data fetched into the file

def read_api_data():
    file_path = Path(__file__).resolve().parent.parent / 'resources' / 'api_data' / 'main_db.json' # File path to DB
    
    with open(file_path, 'r', encoding='utf-8') as file: # Open file at filepath in read mode
        data = json.load(file) # Load the JSON data into variable

    return data # Return the JSON data

if __name__ == "__main__":
    print(request_api()) # If this file is run directly, call the request_api function