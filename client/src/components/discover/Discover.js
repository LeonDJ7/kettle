import React from 'react'

import {
    makeStyles,createStyles, Button, NativeSelect
} from '@material-ui/core'
import FavoritesList from './FavoritesList';

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            padding: '2rem 2rem 2rem 2rem'
        },

        discoverButton: {
            color: 'white',
            fontWeight: 600,
        }

    }),
)

const Discover = (props) => {

    const classes = useStyles();
    const favoriteIds = []
    const [discoverType, setDiscoverType] = React.useState('')

    for (let key in dummyData) {
        dummyData[key].forEach((item) => {
            favoriteIds.push(item.id)
        })
    }

    const discover = async () => {

        if (discoverType === '') return

        let favoriteIds = []

        for (let key in dummyData) {
            dummyData[key].map((item) => item.id)
            favoriteIds.push(dummyData[key].map((item) => item.id))
        }

        // make fetch request to discover service

        let res = await fetch('/api/discover', {
            method: 'POST',
            body: {
                items: favoriteIds,
                type: discoverType
            }
        })

        if (!res.ok) return

        let data = await res.json()

        return data
    }

    return (
        <div class={classes.root} >
            <span class={classes.favoritesContainer}>
                <FavoritesList type='Music' items={dummyData.music}/>
                <FavoritesList type='Books' items={dummyData.books}/>
            </span>
            <Button class={classes.discoverButton} onClick={discover}> discover new...</Button>
            <NativeSelect defaultValue={'select'} onChange={(event) => { setDiscoverType(event.target.value) }} inputProps={{ name: 'age', id: 'uncontrolled-native' }} >
                <option value={'music'}>music</option>
                <option value={'books'}>books</option>
            </NativeSelect>
        </div>
    )
}

export default Discover

let dummyData = {

    music: [
        {
            name: 'Imagine',
            artist: 'John Lennon',
            id: 1,
            imageurl: '',
            description: '',
            links: {
                apple: 'apple.com'
            },
            tags: {
                1: { 
                    votes: 3,
                    name: 'grimy'
                }
            },
            used: true
        },
        {
            name: '4real',
            artist: 'Kenny Mason',
            id: 2,
            imageurl: '',
            description: '',
            links: {
                apple: 'apple.com'
            },
            tags: {
                3: { 
                    votes: 4,
                    name: 'groovy'
                }
            },
            used: true
        }
    ],

    books: [
        {
            name: 'Harry potter book 1',
            artist: 'JK Rowling',
            id: 1,
            imageurl: '',
            description: '',
            links: {
                apple: 'apple.com'
            },
            tags: {
                1: { 
                    votes: 3,
                    name: 'grimy'
                }
            },
            used: true
        }
    ]

}