// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const axios = require('axios');
// const stub = require('jstest')

const app = express()
const port = process.env.REVIEW_PORT || 4002

app.use(express.urlencoded())
app.use(cors())
app.use(express.json())

// just in case :), we really don't want duplicate imposters running around!
// axios.delete('http://localhost:2525/imposters/4545');
// axios.delete('http://localhost:2525/imposters/5555');

// making stubs
let postBody = {
    "port": 4545,
    "protocol": "http",
    "stubs": [
      {
        "predicates": [
          {
            "equals": {
              "method": "POST",
              "path": "/moderation/new_tag"
            }
          }
        ],
        "responses": [
          {
            "is": {
              "statusCode": 201,
              "headers": {
                "Location": "http://localhost:4545/moderation/new_tag",
                "Content-Type": "application/json"
              },
              "body": {
                    passed_moderation: "OK"
                }
            }
          },
        ]
      }
    ]
  };

let secondPost = {
    "port": 5555,
    "protocol": "http",
    "stubs": [
      {
        "predicates": [
          {
            "equals": {
              "method": "POST",
              "path": "/moderation/new_comment"
            }
          }
        ],
        "responses": [
          {
            "is": {
              "statusCode": 201,
              "headers": {
                "Location": "http://localhost:5555/moderation/new_comment",
                "Content-Type": "application/json"
              },
              "body": {
                    passed_moderation: "OK"
                }
            }
          },
        ]
      }
    ]
  };
  // make the imposters, I know its messy but I want it all here. 
axios.post('http://localhost:2525/imposters', postBody)
  .catch(function (error) {
    console.log(error);
  });

axios.post('http://localhost:2525/imposters', secondPost)
  .catch(function (error) {
    console.log(error);
  });

// example item structures.
const items = {
    "0": {
        imageURL: "https://ychef.files.bbci.co.uk/976x549/p03lcphh.jpg",
        name: "A songname",
        description: "A song",
        creator: "Sam",
        yearCreated: 1900,
        comments: [
            {
                text: 'haha funny comment',
                likes: 2,
                dislikes: 6,
                userID: 1,
                commentID: 0
            }
        ],
        tags: [
            {
                votes: 10,
                tag: 'funny',
                tagID: 0
            },
            {
                votes: 1,
                tag: 'morose',
                tagID: 1
            }
        ]
    },
    "1": {
        imageUrl: "https://i.guim.co.uk/img/media/8a840f693b91fe67d42555b24c6334e9298f4680/0_1476_2429_1456/master/2429.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=aa2c4c7cf002ac04f03012008fbdffa3",
        name: "Scream closer",
        description: "Another painting",
        creator: "Mas",
        yearCreated: 1901,
        comments: [
            {
                text: 'haha funny comment',
                likes: 2,
                dislikes: 6,
                userID: 1,
                commentID: 0
            }
        ],
        tags: [
            {
                votes: 1,
                tag: 'goofy',
                tagID: 0
            }
        ]
    }
}

app.get('/items/get_item', (req, res) => {
    let itemID = String(req.query.item_id);
    if (items.hasOwnProperty(itemID)) {
        res.send(items[itemID]);
    } else {
        res.end();
    }
})

app.post('/items/new_item', (req, res) => {
    let imageURL = req.body.imageURL;
    let name = req.body.name;
    let description = req.body.description;
    let creator = req.body.creator;
    let yearCreated = req.body.yearCreated;
    let itemID = String(Object.keys(items).length);

    items[itemID] = {
        imageURL: imageURL,
        name: name, 
        description: description, 
        creator: creator,
        yearCreated: yearCreated,
        comments: [],
        tags: []
    };

    // this one isn't moderated. once the page is created,
    // users can report it. there is too much art with
    // otherwise reportable names

    res.send(items[itemID]);
})

app.post('/items/:item_id/add_tag', async (req, res) => {
    let userID = req.body.userID;
    let tag = req.body.tag;
    let itemID = req.params.item_id;

    if (items.hasOwnProperty(itemID)) {
      const response = await axios.post('http://localhost:4545/moderation/new_tag', { 
          tag 
        })
      console.log(response.data);
      if (response.data.passed_moderation == "OK") {
                    items[itemID].tags.push(
                        { 
                            votes: 1,
                            tag, // moderate the tag
                            tagID: items[itemID].tags.length
                        });
        } else {
          console.log("Tag failed moderation");
        }
    }

    res.send(items);
})

app.post('/items/:item_id/add_comment', async (req, res) => {
    let userID = req.body.userID;
    let text = req.body.text;
    let itemID = String(req.params.item_id);
    if (items.hasOwnProperty(itemID)) {

      const response = await axios.post('http://localhost:5555/moderation/new_comment', {
            text,
        });
      console.log(response.data);
      if (response.data.passed_moderation == "OK") {
        items[itemID].comments.push({ 
          text,  
          likes: 0,
          dislikes: 0,
          userID,
          commentID: items[itemID].comments.length
        });
      }
    }

    res.send(items); 
})

// the below code is copied from stackoverflow!
// it makes it so that I can control c out of the 
// process while running it on windows, which was
// working fine on ubuntu for me but not on windows
if (process.platform === "win32") {
    var rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    rl.on("SIGINT", function () {
      process.emit("SIGINT");
    });
  }
  
  process.on("SIGINT", async function () {
    //graceful shutdown
    await axios.delete('http://localhost:2525/imposters/4545');
    await axios.delete('http://localhost:2525/imposters/5555');
    process.exit();
  });

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})