import React from 'react'

import {
    makeStyles,createStyles, Button, TextField
} from '@material-ui/core'

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            padding: '2rem 14rem 2rem 14rem',
            display: 'flex',
            flexDirection: 'column'
        },

        formControl: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginTop: '6rem'
        },

        requestButton: {
            alignSelf: 'flex-end',
            backgroundColor: '#E5B1B1',
            border: 'none',
            width: '10rem',
            height: '2.6rem',
            cursor: 'pointer',
            borderRadius: '3px',
            color: 'white',
            fontWeight: 800,
            fontSize: '1rem'
        }

    }),
)

const Request = (props) => {

    const classes = useStyles();
        

    return (
        <div class={classes.root} >

            <span class={classes.formControl}>
                <TextField multiline fullWidth rows={1} label="what's it called" variant="filled" sx={{ background: 'rgba(255, 255, 255, .6)'}}>
                </TextField>
                
                <TextField multiline fullWidth rows={12} label="anything else important?" variant="filled" sx={{ background: 'rgba(255, 255, 255, .6)'}}>
                </TextField>

                <Button class={classes.requestButton} onClick={() => {
                    // make request to moderator
                }}>
                    request
                </Button>
            </span>
            
        </div>
    )
}

export default Request