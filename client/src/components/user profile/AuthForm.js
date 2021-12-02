import React from 'react'
import { useHistory } from 'react-router-dom';

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

        authTypeLbl: {
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '1rem'
        },

        signupForm: {
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '.5rem'
        },

        loginForm: {
            display: 'flex',
            flexDirection: 'column',
            gap: '.5rem'
        }


    }),
)

const AuthForm = (props) => {

    const classes = useStyles();
    const history = useHistory();

    const [signupEmail, setSignupEmail] = React.useState('')
    const [signupPassword, setSignupPassword] = React.useState('')
    const [signupConfirmPassword, setSignupConfirmPassword] = React.useState('')
    const [loginEmail, setLoginEmail] = React.useState('')
    const [loginPassword, setLoginPassword] = React.useState('')
    
    React.useEffect( () => {
        
    }, [])

    const handleSignupSubmit = e => {

        if (signupConfirmPassword !== signupPassword) {
            console.log('password and confirm password do not match')
            return
        }
        
        fetch("http://localhost:4000/api/auth/sign_up", {
            method: "POST",
            body: {
                email: signupEmail,
                pass: signupPassword
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {

            // update localStorage values
            console.log(data)
            let email = signupEmail
            window.localStorage.setItem('email', email)

            // send user to profile page
            history.push({
                pathname: `/user_profile`,
            })

        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    const handleLoginSubmit = e => {
        console.log(e)

        fetch("http://localhost:4000/api/auth/log_in", {
            method: "POST",
            body: {
                email: signupEmail,
                pass: signupPassword
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {

            // update localStorage values
            console.log(data)
            let email = loginEmail
            window.localStorage.setItem('email', email)

            // send user to profile page
            history.push({
                pathname: `/user_profile`,
            })
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
        
    return (
        <Modal class={classes.root} open={props.modalState} onClose={ () => { props.setModalOpen(false) }}>
            <Box class={classes.modalBox}>
                <span class={classes.authTypeLbl}> Signup </span>
                <span class={classes.signupForm} >
                    <TextField value={signupEmail} label="Email" variant='filled' type='email' required onChange={(e) => {setSignupEmail(e.target.value)}} />
                    <TextField value={signupPassword} label="Password" variant='filled' type='password' required onChange={(e) => {setSignupPassword(e.target.value)}} />
                    <TextField value={signupConfirmPassword} label="Confirm Password" variant='filled' type='password' required onChange={(e) => {setSignupConfirmPassword(e.target.value)}} />
                    <Button onClick={handleSignupSubmit}> Signup </Button>
                </span>

                <Divider />

                <span class={classes.authTypeLbl} style={{marginTop: '1rem'}}> Login </span>
                <span class={classes.loginForm}>
                    <TextField value={loginEmail} label="Email" variant='filled' type='email' required onClick={(e) => {setLoginEmail(e.target.value)}} />
                    <TextField value={loginPassword} label="Password" variant='filled' type='password' required onClick={(e) => {setLoginPassword(e.target.value)}} />
                    <Button onClick={handleLoginSubmit} > Login </Button>
                </span>
            </Box>
        </Modal>
    )
}

export default AuthForm
