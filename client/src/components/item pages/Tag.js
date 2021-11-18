import React from 'react'

import {
    makeStyles,createStyles
} from '@material-ui/core'

import greenCheck from '../../images/green_check.png'

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
    const [voted, setVoted] = React.useState(props.voted)
    const [loading, setLoading] = React.useState(false)

    const click = () => {
    
        setLoading(true)

        // send to db
        
        if (voted === true) {
            setVoted(false)
            setVotes(votes - 1)
        } else {
            setVoted(true)
            setVotes(votes + 1)
        }

        setLoading(false)
    
    }

        

    return (
        <div class={classes.root} >
            <span class={classes.tag} style={{ backgroundColor: `${random_color()}`}} onClick={click} >
                { voted && <img src={greenCheck} style={{ width: '1rem', height: '1rem', marginRight: '1rem'}} alt=''></img> }
                { tag }
            </span>
            <span style={{ fontWeight: 800, color: '#5E5E5E' }}> 
                { votes }
            </span>
        </div>
    )
}

export default Tag

const random_color = () => {

    let palette = ['#F6F0B3', '#F4C680', '#BAE1B9', '#B9DAE1', '#FACEF0', '#F6B3B7', '#C4BDEF', '#E5F9D5', '#C9C6C8', '#CAEFDD', '#F1D2C0']
    let random = Math.floor(Math.random() * palette.length)

    return palette[random]
}