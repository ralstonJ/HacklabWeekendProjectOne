
import React from 'react';
import PropTypes  from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
 head: {
   backgroundColor: theme.palette.common.black,
   color: theme.palette.common.white,
 },
 body: {
   fontSize: 14,
 },
}))(TableCell);

const styles = theme => ({
 root: {
   width: '100%',
   marginTop: theme.spacing.unit * 3,
   overflowX: 'auto',
 },
 table: {
   minWidth: 700,
 },
 row: {
   '&:nth-of-type(odd)': {
     backgroundColor: theme.palette.background.default,
   },
 },
});

let id = 0;
function createData(name, calories, fat) {
 id += 1;
 return { id, name, calories, fat};
}

const rows = [
 createData('0x362f03a4a65162ba13a74b97cd8c921ed38757fb', 1, 'peace out')
];

function CustomizedTable(props) {
 const { classes } = props;

 return (
   <Paper className={classes.root}>
     <Table className={classes.table}>
       <TableHead>
         <TableRow>
           <CustomTableCell>address</CustomTableCell>
           <CustomTableCell numeric>donation</CustomTableCell>
           <CustomTableCell numeric>message of peace</CustomTableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {rows.map(row => {
           return (
             <TableRow className={classes.row} key={row.id}>
               <CustomTableCell component="th" scope="row">
                 {row.name}
               </CustomTableCell>
               <CustomTableCell numeric>{row.calories}</CustomTableCell>
               <CustomTableCell numeric>{row.fat}</CustomTableCell>
             </TableRow>
           );
         })}
       </TableBody>
     </Table>
   </Paper>
 );
}

CustomizedTable.propTypes = {
 classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);