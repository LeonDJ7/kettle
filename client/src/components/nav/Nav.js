import React from 'react'
import { Link } from "react-router-dom"
import accountBox from '../../images/account_box.png'
import kettleLogo from '../../images/kettle_logo.png'

import {
    Menu,
    Button,
    MenuItem,
    Icon,
    TextField, InputAdornment,
    makeStyles,createStyles, Theme
} from '@material-ui/core'

const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            backgroundColor: 'gray',
            borderBottom: '8px solid lightcoral',
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            height: '70px'
        },
        
        options: {
            float: 'right',
            marginRight: '7vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1rem',
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
            height: '100%'
        },

        optionsButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '28px',
            color: 'white',
            position: 'relative',
            height: '100%'
        },

        selectedIndicator: {
            height: '12px',
            width: '100%',
            backgroundColor: 'white',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '-20px',
        },

        navMenu: {
            display: 'none',
            marginRight: '1.5rem',
            fontSize: '20px',
            float: 'right',
            [theme.breakpoints.down('md')]: {
                display: 'block',
            },
        },

        menuButton: {
            fontWeight: 500,
            color: 'lightcoral'
        },

        logo: {
            width: '58px',
            justifyContent: 'left'
        },

        logoLink: { 
            marginLeft: '2rem',
            flexGrow: 1, 
            display: 'flex'
        }


    }),
)

const Nav = (props) => {

    const classes = useStyles();

    const [pathname, setPathname] = React.useState(window.location.hash)

    const NavOptions = (props) => {

        return (
            <span class={classes.options} >

                <Link to="/" style={{ height: '100%'}}>
                    { pathname !== '#/' && <button class={classes.optionsButton} id='1' onClick={() => {setPathname('#/')}} type='text' size='large' >art</button> }
                    { pathname === '#/' && <button style={{ outline: '8px solid white' }} class={classes.optionsButton} id='1' onClick={() => {setPathname('#/')}} type='text' size='large' >art</button> }
                </Link>

                <Link to="/discover" style={{ height: '100%'}}>
                    
                    { pathname !== '#/discover' && <button class={classes.optionsButton} id='2' onClick={() => {setPathname('#/discover')}} type='text' size='large' >discover</button> }
                    { pathname === '#/discover' && <button style={{ outline: '8px solid white' }} class={classes.optionsButton} id='2' onClick={() => {setPathname('#/discover')}} type='text' size='large' >discover</button> }

                </Link>

                <Link to="/user_profile" style={{ height: '100%'}}>
                    { pathname !== '#/user_profile' && <div class={classes.optionsButton} id='3' onClick={() => {setPathname('#/user_profile')}} >
                        <div style={{ background: 'url(../../images/account_box.png)', width: '48px', height: '48px' }} ></div>
                    </div> }
                    { pathname === '#/user_profile' && <div style={{ outline: '8px solid white' }} class={classes.optionsButton} id='3' onClick={() => {setPathname('#/user_profile')}}> 
                        <div style={{ background: 'url(../../images/account_box.png)', width: '48px', height: '48px' }} ></div>
                    </div> }
                </Link>
                
            </span>
        )
    }

    

    const NavMenu = (props) => {

        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        
        return (
            <span class={classes.navMenu} >

                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                    style: {
                        maxHeight: '4rem',
                        width: '20ch',
                    },
                    }}
                >

                    <MenuItem class={classes.menuButton} {...props} onClick={() => {setPathname('#/')}} key="1" >
                        <Link to="/">art</Link>
                    </MenuItem>

                    <MenuItem class={classes.menuButton} {...props} onClick={() => {setPathname('#/discover')}} key="2">
                        <Link to="/discover">discover</Link>
                    </MenuItem>

                    <MenuItem class={classes.menuButton} {...props} onClick={() => {setPathname('#/profile')}} key="3">
                        <Link to="/profile">profile</Link>
                    </MenuItem>

                </Menu>

            </span>
            
        )
    }

        

    return (
        <div class={classes.root} >

            <Link to="/" class={classes.logoLink} >
                <img class={classes.logo} src={kettleLogo} alt=''/>
            </Link>

            <NavMenu/>
            <NavOptions/>

        </div>
    )
}

export default Nav