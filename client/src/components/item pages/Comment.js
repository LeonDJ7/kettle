import React from 'react'
import arrowUpLight from '../../images/arrow_drop_up_dark.png'
import arrowUpDark from '../../images/arrow_drop_up_light.png'

import {
    makeStyles,createStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column'
        },

        likes: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },

        commentText: {
            color: '#D15E5E'
        }

    }),
)

const Comment = (props) => {

    const classes = useStyles();

    const id = props.id
    const text = props.text
    const [likes, setLikes] = React.useState(props.likes)
    const [liked, setLiked] = React.useState(props.liked)
    const [loading, setLoading] = React.useState(false)
    
    const likeComment = () => {
    
        setLoading(true)

        // send to db

        if (liked === true) {
            setLiked(false)
            setLikes(likes - 1)
        } else {
            setLiked(true)
            setLikes(likes + 1)
        }

        setLoading(false)
    
    }

    return (
        <div class={classes.root} >
            <span class={classes.commentText}> {text} </span>
            <span class={classes.likes}>
                {liked && <img src={arrowUpDark} style={{ cursor: 'pointer' }} alt='' onClick={likeComment} ></img>}
                {!liked && <img src={arrowUpLight} style={{ cursor: 'pointer' }} alt='' onClick={likeComment} ></img>}
                <span style={{ color: '#D15E5E', fontWeight: 800 }} > {likes} </span>
            </span>
        </div>
    )
}

export default Comment