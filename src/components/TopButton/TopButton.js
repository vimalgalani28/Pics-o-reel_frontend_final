import React from 'react'
import { Link as Scroll } from "react-scroll";
import { IconButton, makeStyles, Slide } from "@material-ui/core";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: 10,
        right: 10
    }
})

const TopButton = ({ button }) => {

    const classes = useStyles()

    return (
        <Slide
            in={button}
            direction='up'
        >
            <Scroll to="top" smooth={true} className={classes.root}>
                <IconButton>
                    <ArrowUpwardIcon
                        style={{ fontSize: "50", color: "hsl(42, 78%, 60%)" }}
                    />
                </IconButton>
            </Scroll>
        </Slide>
    )

}

export default TopButton