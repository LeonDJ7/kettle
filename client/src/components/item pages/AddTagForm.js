import React from 'react'

import {
    makeStyles,createStyles, TextField, Button, Divider, Modal
} from '@material-ui/core'
import { Box } from '@mui/system';

const useStyles = makeStyles((theme) =>
    createStyles({

        modalBox: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            backgroundColor: 'white',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            padding: '2rem 2rem 2rem 2rem'
        },


    }),
)

const AddTagForm = (props) => {

    const classes = useStyles();

    const item = props.item
    const [tag, setTag] = React.useState('')
    
    React.useEffect( () => {
        
    }, [])

    const addTag = () => {

        let userId = window.localStorage.getItem('id')

        for (let i = 0; i < item.tags.length; i++) {
            if (item.tags[i].tag === tag) return
        }

        let response = fetch('http://localhost:4006/api/add_tag', {
            method: 'POST',
            body: {
                tag: tag,
                user_id: userId
            }
        })

        if (response.ok) {
            props.setModalOpen(false)
        }

    }
        
    return (
        <Modal class={classes.root} open={props.modalState} onClose={ () => { props.setModalOpen(false) }}>
            <Box class={classes.modalBox}>
                <TextField value={tag} label="what word fits??" variant='filled' required onChange={(e) => { setTag(e.target.value) }} />
                <Button onClick={addTag}> add! </Button>
            </Box>
        </Modal>
    )
}

export default AddTagForm
