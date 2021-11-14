import React from 'react'

import {
    makeStyles,createStyles, Button, TextField
} from '@material-ui/core'

import { height } from '@mui/system'

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            padding: '2rem 2rem 2rem 2rem',
            display: 'flex',
            flexDirection: 'column'
        },

        nameInput: {
            width: '42rem',
            height: '32rem'
        },

        descriptionInput: {
            width: '42rem',
            height: '32rem'
        },

        submitButton: {

        }

    }),
)

const Request = (props) => {

    const classes = useStyles();
        

    return (
        <div class={classes.root} >

            <TextField class={classes.nameInput} label="Filled" variant="filled">
            </TextField>
            
            <TextField class={classes.descriptionInput} label="Filled" variant="filled">
            </TextField>

            <Button onClick={() => {
                // make request to moderator
            }}>

            </Button>
        </div>
    )
}

export default Request