import React from 'react'
import {useLocation} from "react-router-dom"

import {
    makeStyles,createStyles
} from '@material-ui/core'

import { Skeleton } from '@mui/material'

import Tag from './Tag'
import Comment from './Comment'
import Links from './Links'

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            display: 'flex',
            flexDirection: 'column',
            padding: '6rem 8rem 8rem 8rem',
            gap: '1rem'
        },

        mainInfo: {
            display: 'flex',
            flexDirection: 'row',
            gap: '8rem',
            alignItems: 'center'
        },

        itemImage: {
            height: '16rem',
            borderRadius: '5px'
        },

        itemName: {
            fontSize: '3rem',
            fontWeight: 800,
            color: '#D98686'
        },

        secondaryInfo: {
            display: 'flex',
            flexDirection: 'column',
        },

        feedbackInfo: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        },

        tags: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center'
        },

        comments: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.3rem',
            alignItems: 'flex-start',
            marginTop: '2rem'
        },

        tagLabel: {
            fontSize: '2rem',
            color: '#4A4A4A',
            fontWeight: 800,
        },

        commentLabel: {
            fontSize: '2rem',
            color: '#4A4A4A',
            fontWeight: 800,
            marginTop: '2rem'
        },

        plus: {
            fontSize: '3rem',
            fontWeight: 600,
            color: '#D98686',
            cursor: 'pointer'
        },

        

    }),
)

const Item = (props) => {

    const classes = useStyles();

    const passedData = useLocation()
    let itemInfo = passedData.state.item_info
    
    const [loading, setLoading] = React.useState(true)
    const [item, setItem] = React.useState({
        name: '',
        artist: '',
        type: '',
        id: 0,
        imageurl: '',
        comments: [],
        tags: [],
        links: []
    })

    React.useEffect(() => {

        // retrieve from db with item_info.id

        setItem({
            name: itemInfo.name,
            artist: itemInfo.artist,
            type: itemInfo.type,
            id: itemInfo.id,
            imageurl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFAAUAMBIgACEQEDEQH/xAAbAAADAQADAQAAAAAAAAAAAAADBAUCAAEGB//EAC4QAAEEAgECBQMDBQEAAAAAAAEAAgMRBCExEkEFEyJRYRRxoSOBkTNCwdHwBv/EABgBAQEBAQEAAAAAAAAAAAAAAAIBAwAE/8QAGhEBAQEBAQEBAAAAAAAAAAAAAAERAiExEv/aAAwDAQACEQMRAD8AAIQHEEFZMGx2VRuP1vDQPUToI0Hh8mQySSNttjFuW9rzyJQh40b+V1I1jRYs/YhMZgc5/lxcXRI7ocuE+GYxSDYNorjEPkOOxRvunGtiAAQY8X+4HQ3tMRwD3/Ci4dgxWkAgaTkeI0jXCDgUwhh4Pv2ViKEUNKLhduK3stDFF8X91RjiBrSKIh2CmliXH/5+cZga2RgLHBxqx0i9Uf4/lVfEpcDGvHyMcv6gHlsYAv8AI3pJ+GNbL6p8l3WD6QTZ/PZOZb8TIjJm/rM2DGaL9cA/4R63fT55meJY8AxsrzJMaLJxX6LfMb6f2/7uiP8AAHZUbvq5iZmu9MtbLfZVsN8DYXTx5D5Wu24vkLun/SJ9RDIAOsbFj5R2l+YhT4McTJImta6g0A0p0sMbieiPy+NA3a9O+N7328NI46uNfZSsnFLHOcwh7fjkJc0euSEcIBFDfsquHZYG1wkw0irG1R8Mb6iCeR7JUcNRR2jsgOvTa3EzpKZY71DSBY8eYx0jaXyeryg3nfBR3EC+9dkGUsd0h5IHx7rUWsKNrmuc6y69NHf7p9peWgSxNpvBvYQ8DoP6dCzu08+GoyTVLO/TjQlJhYCOTS45rS0ARm+5XAf0mX3KaDCW7AUVPkjqqBTOM3Y9wu5mk+lEgZsaS0KcYONIsenBZYOEZg2irw5d6USFmK8H6lryBsFpqkl5mhRRo7cK7LahDmO1jZnPgsxdnF3HwqDZfRTuPlebka6CYSMOgrGHkNlbRO1n1DlPNLCBTr/dHE2kqAO4C7dKBoIGNI8E/KYxti1PiLnuKow6AVA43siNO0BhRQ7aivnlN4tMY54DdrGPjGuqXgdgn4+mNgPT03wAOE70k5DyY+iMl4G+yBjvohzTRTme0yQekdrUuEuaekjlHXYqsnkqrFe6Ix2rvanskAFAIrXucQGhQ1bFOr0m43qdES1lHlGZIPdcmKTZB7ojZNpBkiIH+xXOx//Z',
            comments: [
                { 
                    text: 'hi this is a nostalgiac song',
                    id: 1,
                    likes: 4,
                    liked: false
                },
                { 
                    text: 'hi this is a goofy song',
                    id: 2,
                    likes: 7,
                    liked: true
                },
            ],
            tags: [
                {
                    tag: 'goofy',
                    votes: 1,
                    id: 1,
                    voted: true
                },
                {
                    tag: 'nostalgiac',
                    votes: 4,
                    id: 2,
                    voted: false
                }
            ],
            links: [
                { website: 'apple', url: 'apple.com', imageurl: 'https://www.freepnglogos.com/uploads/mac-cosmetic-png-logo/infinite-island-apple-emblem-mac-cosmetic-png-logo-10.png' },
                { website: 'spotify', url: 'spotify.com', imageurl: 'https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png'}
            ]
        })

        setLoading(false)

    }, [])

    const addTag = () => {

        // show add tag ui

        setLoading(true)

        setLoading(false)
    
    }

    return (
        <React.Fragment>

            { !loading &&
                <div class={classes.root} >

                    <span class={classes.mainInfo}>
                        <img class={classes.itemImage} src={item.imageurl} alt=''></img>
                        <span class={classes.itemName}> {item.name} </span>
                    </span>

                    <span class={classes.secondaryInfo}>

                        <Links links={item.links} />

                        <span class={classes.feedbackInfo}>

                            <span class={classes.tagLabel}> Words that come to mind... </span>
                            <span class={classes.tags}>
                                { item.tags.sort((a,b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0)).map((tag) => {
                                    return (
                                        <Tag key={tag.id} id={tag.id} tag={tag.tag} votes={tag.votes} voted={tag.voted} />
                                    )
                                })}
                                <span class={classes.plus} onClick={addTag}> + </span>
                            </span>
                            <span class={classes.commentLabel}> Comments </span>
                            <span class={classes.comments}>
                                { item.comments.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0)).map((comment) => {
                                    return (
                                        <Comment key={comment.id} text={comment.text} id={comment.id} likes={comment.likes} liked={comment.liked} />
                                    )
                                })}
                            </span>

                        </span>

                    </span>
                    
                </div>
            }
            
            { loading &&
                <Skeleton />
            }

        </React.Fragment>
        
    )
}

export default Item