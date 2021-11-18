# Users

## author: Jack D'Atri

  

# Overview and Purpose

This microservice handles the adding and removing items from users' favorites. 

  

# API end-points


## /api/users/favorites

### Gets a list of the user's favorite items

### parameters: username

- GET method

- If the user exists, it asks for the user's favorites.

- If the user does not exist, a **404** status code is sent

  

## /api/users/favorite_item

### Adds an item to the user's favorites list

### parameters: username, item_id

- POST method

- If the user exists and the item is not alredy in their favorites list, the item is added and a **201** status code is sent.

- If the user does not exist or the item is already in the user's list, a **404** status code is sent. 

- If the user or the item is passed in as undefined, a **400** status code is sent.

  

## /api/users/unfavorite_item

### Removes an item from a user's favorites list.

### parameters: username, item_id  

- POST method

- If the user exists and the item exists in the user's favorites list, the item is removed from the list and a **201** status code is sent.

- If the user does not exist or the item is not in the user's favorites list, a **404** status code is sent.