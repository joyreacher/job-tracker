import React, { lazy, Suspense, useEffect, useState } from "react"
import Moment from 'react-moment';
import styled from "@emotion/styled"
const Card = styled.td`
  cursor: pointer;
  display:grid;
  // background-color: rgba(255,255,255,.5);
  padding: .2em .5em;
  align-self: flex-start;
  border-radius: 4px;
  p {
    display:flex;
    flex-wrap: wrap;
    word-break: break-all;
    white-space:normal;
  }
`
const Container = styled.div`
  display:grid;
  grid-template-rows: 1/-1;
`
const Cell = styled.div`
  text-align:center;
  margin:.5em .3em;
`

function JobCard(props) {
  const date = new Date(props.application.dateAdded)
  return (
    <>
      {/* <Container> */}
      <Cell id={props.application._id}>
        <h1>{props.application.company}</h1>
      </Cell>
      <Cell id={props.application._id}>
        <h2>{props.application.role}</h2>
      </Cell>
      {/* <Cell>
        <p>{props.application.contact}</p>
      </Cell> */}
      {/* <Cell>
        <p>{props.application.location}</p>
      </Cell> */}
      {/* <Cell>
        <p>{props.application.source}</p>
      </Cell> */}
      <Cell id={props.application._id}> 
        <p>{<Moment format="MMM DD">{date}</Moment>}</p>
      </Cell>
      <Cell id={props.application._id}>
        <p>{props.application.link}</p>
      </Cell> 
      {/* <Cell>
        <p>{props.application.notes}</p>
      </Cell> */}
      {/* </Container> */}
    </>
  )
}

export default JobCard