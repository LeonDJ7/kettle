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

const Discover = (props) => {

    const classes = useStyles();

    

        

    return (
        <div class={classes.root} >

        </div>
    )
}

export default Discover