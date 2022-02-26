import React, { Component } from 'react';
import { css, jsx } from '@emotion/react'
import { usePromiseTracker } from "react-promise-tracker";
import ClipLoader from 'react-spinners/ClipLoader'

export const LoadingSpinnerComponent = (props) => {
const { promiseInProgress } = usePromiseTracker();
const override = css`
  margin: 0 auto;
  border-color: red;
`;
const color = css`color: var(--main-color-light);`
  return (
    <div
      css={css`
          margin:0 auto;
          `}
    >
    {
      (promiseInProgress === true) ?
      <ClipLoader color={color} css={override} size={50} />
      :
        null
    }
  </div>
  )
};