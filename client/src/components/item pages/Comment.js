import React from 'react'
import arrowUpLight from '../../images/arrow_drop_up_dark.png'
import arrowUpDark from '../../images/arrow_drop_up_light.png'

import {
    makeStyles,createStyles
} from '@material-ui/core'
import AuthForm from '../user profile/AuthForm'
import { Skeleton } from '@mui/material'

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
    const [votes, setVotes] = React.useState(props.likes)
    const [voted, setVoted] = React.useState(props.liked)
    const [loading, setLoading] = React.useState(false)
    const [modalOpen, setModalOpen] = React.useState(false);

    const vote = async () => {

        let userId = window.localStorage.getItem('id')
    
        if (userId) {
            
            setLoading(true)

            // send to db
            
            if (voted === true) {

                let response = await fetch(`http://localhost:4006/api/comments/set_vote`, {
                    method: 'POST',
                    body: {
                        tag_id: id,
                        user_id: userId,
                        voted: false
                    }
                })

                if (response.ok) {
                    setVoted(false)
                    setVotes(votes - 1)
                }

            } else {

                let response = await fetch(`http://localhost:4006/api/comments/set_vote`, {
                    method: 'POST',
                    body: {
                        tag_id: id,
                        user_id: userId,
                        voted: true
                    }
                })

                if (response.ok) {
                    setVoted(true)
                    setVotes(votes + 1)
                }

            }

            setLoading(false)

        } else {

            setModalOpen(true)

        }
    
    }

    return (
        <React.Fragment>
            
            <div class={classes.root} >
                <span class={classes.commentText}> {text} </span>
                <span class={classes.likes}>
                    {voted && <img src={arrowUpDark} style={{ cursor: 'pointer' }} alt='' onClick={vote} ></img>}
                    {!voted && <img src={arrowUpLight} style={{ cursor: 'pointer' }} alt='' onClick={vote} ></img>}
                    <span style={{ color: '#D15E5E', fontWeight: 800 }} > {votes} </span>
                </span>
            </div>
            
            <AuthForm setModalOpen={setModalOpen} modalState={modalOpen} ></AuthForm>

        </React.Fragment>
        
    )
}

export default Comment