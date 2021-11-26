import React from 'react'

import {
    makeStyles,createStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            padding: '1rem 0 2rem 0',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '.5rem'
        },

        linkImage: {
            width: '2rem',
            height: '2rem',
            borderRadius: '5px'
        }

    }),
)

const Links = (props) => {

    const classes = useStyles();

    const links = props.links

    return (
        <div class={classes.root} >
            {links.map((link) => {
                return (
                    <img class={classes.linkImage} src={link.imageurl} onClick={() => {  window.open(link.url) }}></img>
                )
            })}
        </div>
    )
}

export default Links