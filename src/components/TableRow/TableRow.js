import React, { useState } from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Collapse, IconButton } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

const useStyles = makeStyles({
    withIcon: {
        display: 'flex'
    }
})

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        width: '20%',
        textAlign: 'center'
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const SingleRow = ({ single }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    return (
        <>
            <StyledTableRow key={single._id}>
                <StyledTableCell component="th" scope="row" className={classes.withIcon}>

                    {open ?
                        <IconButton onClick={() => setOpen(false)}>
                            <KeyboardArrowUp className={classes.arrowIcon} />
                        </IconButton>
                        :
                        <IconButton onClick={() => setOpen(true)}>
                            <KeyboardArrowDown className={classes.arrowIcon} />
                        </IconButton>

                    }


                    {single.title}
                </StyledTableCell>
                <StyledTableCell align="center">{single.section}</StyledTableCell>
                <StyledTableCell align="center">{single.voteCount}</StyledTableCell>
                <StyledTableCell align="center">{single.ownerName}</StyledTableCell>
                <StyledTableCell align="center">{single.ownerPhone}</StyledTableCell>
            </StyledTableRow>
            <Collapse
                in={open}
                direction='down'
                unmountOnExit
            >

                <div style={{
                    background: `url('${single.imageThumbLink}')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '200px',
                    minWidth: '150px',
                    marginLeft: '30px',
                    marginTop: '20px'
                }}></div>

            </Collapse>
        </>
    )
}

export default SingleRow