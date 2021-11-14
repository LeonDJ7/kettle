# Overview and Purpose
This microservice handles finding recommendations for users. It recieves input (tags and favorite item ids), and attempts to produce items that the user might enjoy based on these inputs

# API end-points

## /api/discover/top_tags
### produces a total count of the amount of votes present in the tags of the passed in item ids
### parameters: favorites
* e.g: curl -H 'Content-Type: application/json' -X POST -d '{"favorites":["0","1"]}' http://localhost:4001/api/discover/top_tags *

- POST method
 - If success, a **200** status code and a JSON object with the combined vote count of the tags for each locally created item in items object 
 - If an error occurs, a **500** status code and the associated error string is sent back in the response


## /api/discover/recommendations
### produces recommended items based on the passed in tags
### parameters: tags
* curl -H 'Content-Type: application/json' -X POST -d '{"tags":["tag1","tag2"]}' http://localhost:4001/api/discover/recommendations *

- POST method
 - If success, a **200** status code and a JSON object with the tags that were passed in are sent back (for now)
 - If an error occurs, a **500** status code and the associated error string is sent back in the response
