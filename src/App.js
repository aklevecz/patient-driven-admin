import React from "react";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import {
  Button,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Surveys from "./Surveys";
import Checklists from "./Checklists";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

function App() {
  const classes = useStyles();

  const patients = useSelector((state) => state.firestore.ordered.patients);
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
  useFirestoreConnect({ collection: "patients" });

  const login = () => {
    firebase.login({
      provider: "google",
      type: "popup",
      // scopes: ['email'] // not required
    });
  };
  if (patients.length === 0) return <div onClick={login}>Login</div>;
  return (
    <div className={classes.root}>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Surveys</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell align="left">{patient.id}</TableCell>
                <TableCell align="left">
                  {patient.firstName} {patient.lastName}
                </TableCell>
                <TableCell align="left">{patient.email}</TableCell>
                <TableCell align="left">
                  <Surveys doc={patient.id} />
                </TableCell>
                <TableCell align="left">
                  <Checklists doc={patient.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
