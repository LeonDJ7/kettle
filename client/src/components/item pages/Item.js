import React from 'react'
import {useLocation} from "react-router-dom"

import {
    makeStyles,createStyles
} from '@material-ui/core'

import { Skeleton } from '@mui/material'

import Tag from './Tag'
import Comment from './Comment'
import Links from './Links'
import AddTagForm from './AddTagForm'
import AddCommentForm from './AddCommentForm'

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
    const id = passedData.state.id
    
    const [loading, setLoading] = React.useState(true)
    const [tagModalOpen, setTagModalOpen] = React.useState(false);
    const [commentModalOpen, setCommentModalOpen] = React.useState(false);
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

        // retrieve from items service

        setLoading(true)
        let itemInfo = loadItemData(id)
        setItem(itemInfo)
        setLoading(false)

    }, [])

    const addTag = () => {

        // show add tag ui

        if (window.localStorage.getItem('email')) {
            setTagModalOpen(true)
        }
    
    }

    const addComment = () => {

        // show add comment ui

        if (window.localStorage.getItem('email')) {
            setCommentModalOpen(true)
        }

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
                                        <Tag key={tag.id} id={tag.id} tag={tag.tag} votes={tag.votes} />
                                    )
                                })}
                                <span class={classes.plus} onClick={addTag}> + </span>
                            </span>
                            <span class={classes.commentLabel}> Comments </span>
                            <span class={classes.comments}>
                                { item.comments.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0)).map((comment) => {
                                    return (
                                        <Comment key={comment.id} text={comment.text} id={comment.id} likes={comment.likes} />
                                    )
                                })}
                                <span class={classes.plus} onClick={addComment}> + </span>
                            </span>

                        </span>

                    </span>
                    
                </div>
            }
            
            { loading &&
                <Skeleton />
            }

            <AddTagForm item={item} setModalOpen={setTagModalOpen} modalState={tagModalOpen} />
            <AddCommentForm item={item} setModalOpen={setCommentModalOpen} modalState={commentModalOpen}/>

        </React.Fragment>
        
    )
}

export default Item

const loadItemData = async (id) => {

    let response = await fetch(`http://localhost:4002/api/items/get_item/${id}`)

    if (!response.ok) return

    let data = await response.json()

    return {
        name: data.name,
        artist: data.creator,
        type: data.type,
        id: data.id,
        imageurl: data.imageurl,
        comments: data.comments,
        tags: data.tags,
        links: data.links
    }
}