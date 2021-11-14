# Moderation

## author: Ruby Ramsay

  

# Overview and Purpose

This microservice moderates item descriptions, tags, and comments to make sure that are not inappropriate or hateful. 

(NOTE: as of right now, this microservice only moderates tags and comments)


//  description - for unrelated, false info NOT DOING THIS YET
//  tags - inappropriate, hateful descriptors
//  comments - inappropriate, hateful comments
  

# API end-points

  

## /moderation/new_tag

### Monitors tags to make sure they are not inappropriate or hateful

### parameters: listOfBadWords, tag

- POST method

  

## /moderation/new_comment

### Monitors tags to make sure they are not inappropriate or hateful

### parameters: listOfBadWords, comment, bad

- POST method