import React from 'react';
import firebase from 'firebase/app'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { Button, Typography, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Surveys from './Surveys';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  header: {
    display: "flex",
    justifyContent: "space-around"
  }
}))

function App() {
  const classes = useStyles()
  useFirestoreConnect(
    { collection: 'patients' }
  )

  const patients = useSelector((state) => state.firestore.ordered.patients)
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)

  const login = () => {
    firebase.login({
      provider: 'google',
      type: 'popup',
      // scopes: ['email'] // not required
    })
  }
  if (patients.length === 0) return <div>loading</div>
  console.log(patients)
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
            <TableRow key={'row.name'}>
              <TableCell align="left">{patients[0].id}</TableCell>
              <TableCell align="left">{patients[0].firstName} {patients[0].lastName}</TableCell>
              <TableCell align="left">{patients[0].email}</TableCell>
              <TableCell align="left"><Surveys doc={patients[0].id} /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>)

}

export default App;
