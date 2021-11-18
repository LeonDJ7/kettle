import React from 'react'

import {
    makeStyles,createStyles, Checkbox
} from '@material-ui/core'

import dullStar from '../../images/dull_star.png'
import litStar from '../../images/lit_star.png'

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            padding: '2rem 2rem 2rem 2rem'
        },

        itemsList: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '1rem'
        },

        categoryTitle: {
            fontSize: '2rem',
            fontWeight: 800
        },

        item: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '.4rem',
            cursor: 'pointer'
        },

        star: {
            marginRight: '.4rem'
        }

    }),
)

const FavoritesList = (props) => {

    const classes = useStyles();

    const type = props.type
    const items = props.items

    const [checked, setChecked] = React.useState(true)

    const handleChange = (event) => {
        setChecked(event.target.checked);
        // iterate through and uncheck all (handleFavorite)
        items.forEach((item) => {
            item.used = false
        })
    };

    return (
        <div class={classes.root} >

            <span style={{display: 'flex', alignItems: 'center'}}>
                <span class={classes.categoryTitle}> {type} </span>
                <Checkbox onChange={handleChange} checked={checked} color='primary' ></Checkbox>
            </span>

            <span class={classes.itemsList}>
                {items.map((item) => {
                    return (
                        <span onClick={() => { item.used = !item.used }}>

                            { item.used && <div class={classes.item}>
                                <img class={classes.star} src={litStar} alt=''></img>
                                <span> {item.name + ' - ' + item.artist} </span>
                            </div> }

                            { !item.used && <div class={classes.item} style={{ alpha: .6 }}>
                                <img class={classes.star} src={dullStar} alt=''></img>
                                <span> {item.name + ' - ' + item.artist} </span>
                            </div> }
                            
                        </span>
                    )
                })}
            </span>
        </div>
    )
}

export default FavoritesList