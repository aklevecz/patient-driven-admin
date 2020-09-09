import React from "react"
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

export default function Surveys({ doc }) {
    useFirestoreConnect(
        { collection: 'patients', doc, subcollections: [{ collection: "surveys" }], storeAs: "surveys" }
    )
    const surveys = useSelector(state => state.firestore.ordered.surveys)
    console.log(surveys)
    if (!surveys) return <div>dog</div>
    return (<div style={{ color: surveys[0].completed ? "green" : "red" }}>{surveys[0].id}</div>)
}