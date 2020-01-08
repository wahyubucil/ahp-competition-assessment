import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(theme => ({
  root: {
    background: "#dbdbdb",
    display: "flex",
    height: "100%",
    padding: "32px"
  },
  tableCell: {
    borderBottom: "1px solid rgba(81, 81, 81, 0.3)"
  }
}));

function RightPanel({ ranks }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Rank</TableCell>
            <TableCell className={classes.tableCell}>Name</TableCell>
            <TableCell className={classes.tableCell}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranks.map((rank, index) => (
            <TableRow key={rank.name}>
              <TableCell className={classes.tableCell}>{index + 1}</TableCell>
              <TableCell className={classes.tableCell}>{rank.name}</TableCell>
              <TableCell className={classes.tableCell}>{rank.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RightPanel;
