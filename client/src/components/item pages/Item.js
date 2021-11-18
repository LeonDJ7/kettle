import React from 'react'
import {useLocation} from "react-router-dom"

import {
    makeStyles,createStyles
} from '@material-ui/core'

import { Skeleton } from '@mui/material'

import Tag from './Tag'
import Comment from './Comment'

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            display: 'flex',
            flexDirection: 'column',
            padding: '6rem 8rem 8rem 8rem',
            gap: '3rem'
        },

        mainInfo: {
            display: 'flex',
            flexDirection: 'row',
            gap: '8rem',
            alignItems: 'center'
        },

        itemImage: {
            height: '16rem',
            width: '16rem',
            borderRadius: '5px'
        },

        itemName: {
            fontSize: '3rem',
            fontWeight: 800,
            color: '#D98686'
        },

        secondaryInfo: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
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
        links: {}
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
                { website: 'apple', url: 'apple.com', imageurl: 'data:image/png;base64,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' },
                { website: 'spotify', url: 'spotify.com', imageurl: 'data:image/png;base64,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'}
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