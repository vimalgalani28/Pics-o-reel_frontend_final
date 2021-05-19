import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SingleRow from '../TableRow/TableRow';

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

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const LeaderBoardTable = ({ sectionEntries, searchText, paintingCheck, photographyCheck, independenceCheck }) => {
    const classes = useStyles();
    const visibleEntries = sectionEntries.filter(({ ownerName, section }) => {
        let bool = true
        if (!paintingCheck) {
            bool = bool && (section !== 'Painting')
        }
        if (!photographyCheck) {
            bool = bool && (section !== 'Photography')
        }
        if (!independenceCheck) {
            bool = bool && (section !== "Independence")
        }
        return ownerName.toLowerCase().includes(searchText.toLowerCase()) && bool && (section !== 'Calligraphy')
    })
    const compare = (a, b) => {
        if (a.voteCount < b.voteCount) {
            return 1
        }
        if (a.voteCount > b.voteCount) {
            return -1
        }
        return 0
    }

    visibleEntries.sort(compare)
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="right">Section&nbsp;</StyledTableCell>
                        <StyledTableCell align="right">Vote Count</StyledTableCell>
                        <StyledTableCell align="right">Owner Name&nbsp;</StyledTableCell>
                        <StyledTableCell align="right">Owner Phone&nbsp;</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleEntries.map((single) => (
                        <SingleRow key={single._id} single={single} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default LeaderBoardTable