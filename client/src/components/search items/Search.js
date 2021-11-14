import React from 'react'
import { useHistory } from 'react-router-dom';

import {
    makeStyles,
    createStyles,
} from '@material-ui/core'

import {
    Stack,
    TextField,
    Autocomplete,
} from '@mui/material'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10rem 1rem 1rem 1rem',
        },
        
        requestItem: {
            color: '#D15E5E',
            cursor: 'pointer',
            marginTop: '1rem'
        }

    }),
)

const Search = (props) => {

    const classes = useStyles();
    const history = useHistory();
    
    const handleChange = (selectedValue) => {

        let id = ''

        dummyData.every((item) => {

            if (selectedValue === item.name + ' - ' + item.artist) { 
                id = item.id
                return false
            }

            return true
        })

        history.push(`/${id}`)
    }

    return (
        <div class={classes.root} >

            <Stack spacing={2} sx={{ width: '32rem', background: 'rgba(255, 255, 255, .2)'}}>
            
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={dummyData.map((item) => item.name + ' - ' + item.artist)}
                    onChange={(event, selectedValue) => handleChange(selectedValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Items"
                            InputProps={{ ...params.InputProps, type: 'search', }}
                            size='small'
                            variant="filled"
                        />
                    )}
                />

            </Stack>
            
            <Link class={classes.requestItem} to='/request'>
                <span >
                    cant find something?... click here to request a page for it 
                </span>
            </Link>

        </div>
    )
}

export default Search

const dummyData = [
    {
        id: 1,
        name: "harry potter: the first book",
        artist: "JK Rowling"
    },
    {
        id: 2,
        name: "harry potter: the second book",
        artist: "JK Rowling"
    },
    {
        id: 3,
        name: "harry potter: the second book",
        artist: "JK Rowling"
    }
]