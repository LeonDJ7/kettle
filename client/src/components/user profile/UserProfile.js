import React from 'react'

import {
    makeStyles,createStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            
        },

    }),
)

const UserProfile = (props) => {

    const classes = useStyles();

    

        

    return (
        <div class={classes.root} >

        </div>
    )
}

export default UserProfile