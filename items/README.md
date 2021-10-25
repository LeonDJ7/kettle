# Items

## author: Sam Cox

  

# Overview and Purpose

This microservice handles the creation, accessing, and changing of art items. 

  

# API end-points

  

## /items/get_item

### Obtains an item from the database by item_id

### parameters: item_id

- GET method

- If the item exists, a **200** status code and a JSON object of the item is sent.

- If the item does not exist, a **404** status code is sent. 

  

## /items/new_item

### Creates a new item.

### parameters: imageURL, name, description, creator, yearCreated  

- POST method

- If all of the fields are included, a **201** status code and a JSON object `{items[itemID]} is sent.

- If a field is left empty, a **400** status code is sent back.
  

## /items/:item_id/add_tag

### Adds a tag to an existing item

### parameters: itemID, userID, tag

 
- POST method

- If the item exists, the tag passes moderation and the fields have been filled out, a **201** status code and the item's tags are sent. 

- If the item does not exist, a **404** status code is sent.

- If the tag fails moderation, a **400** status code is sent.

- If the fields haven't been filled out, a **400** status code is sent. 
- 
## /items/:item_id/add_comment

### Adds a comment to an existing item

### parameters: itemID, userID, text

 
- POST method

- If the item exists, the text passes moderation and the fields have been filled out, a **201** status code and the item's comments are sent. 

- If the item does not exist, a **404** status code is sent.

- If the tag fails moderations, a **400** status code is sent.

- If the fields haven't been filled out, a **400** status code is sent. 
