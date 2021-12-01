import React from 'react'

import {
    makeStyles,createStyles
} from '@material-ui/core'

import greenCheck from '../../images/green_check.png'
import AuthForm from '../user profile/AuthForm'
import { Skeleton } from '@mui/material'

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            display: 'flex', 
            alignItems: 'center', 
            gap: '.6rem'
        },

        tag: {
            padding: '.5rem 1rem .5rem 1rem',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
        },

    }),
)

const Tag = (props) => {

    const classes = useStyles();
    
    const id = props.id
    const tag = props.tag
    const [votes, setVotes] = React.useState(props.votes)
    const [voted, setVoted] = React.useState(false)
    const [modalOpen, setModalOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {

        // check whether tag has been voted on

        setLoading(true)

        if (window.localStorage.getItem('email')) {
            let votedFor = votedCheck(id)
            setVoted(votedFor)
        }

        setLoading(false)

    }, [])

    
    const vote = async () => {
    
        let userId = window.localStorage.getItem('id')

        if (userId) {
            
            setLoading(true)

            // send to db
            
            if (voted === true) {

                let response = await fetch(`http://localhost:4006/api/tags/set_vote`, {
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

                let response = await fetch(`http://localhost:4006/api/tags/set_vote`, {
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
        <div class={classes.root} >
            <span class={classes.tag} style={{ backgroundColor: `${random_color()}`}} onClick={vote} >
                { voted && <img src={greenCheck} style={{ width: '1rem', height: '1rem', marginRight: '1rem'}} alt=''></img> }
                { tag }
            </span>
            <span style={{ fontWeight: 800, color: '#5E5E5E' }}> 
                { votes }
            </span>
            
            <AuthForm setModalOpen={setModalOpen} modalState={modalOpen} ></AuthForm>

        </div>
    )
}

export default Tag

const random_color = () => {

    let palette = ['#F6F0B3', '#F4C680', '#BAE1B9', '#B9DAE1', '#FACEF0', '#F6B3B7', '#C4BDEF', '#E5F9D5', '#C9C6C8', '#CAEFDD', '#F1D2C0']
    let random = Math.floor(Math.random() * palette.length)

    return palette[random]
}

const votedCheck = async (id) => {
    
    let response = await fetch(`http://localhost:4006/api/has_voted/${id}`)

    if (!response.ok) return

    let data = await response.json()

    return data.has_voted
}