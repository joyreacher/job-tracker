import React, { useEffect } from "react"
import styled from "@emotion/styled"
import { jsx, css } from "@emotion/react"
const FooterContainer = styled.footer`
  margin-top:-100px;
  background-color: var(--color-navbar);
  padding-top: 3em;
  color: var(--color-main-light);
  font-family: serenity, sans-serif;
`
const FooterInnerContainer = styled.div`
  padding: 3em;
`
const FlexContainer = styled.section`
  display:flex;
  justify-content: center;
`
function Footer() {
  return (
    <FooterContainer>
      <FooterInnerContainer>
        <FlexContainer>
          This is the footer
        </FlexContainer>
      </FooterInnerContainer>
    </FooterContainer>
  )
}

export default Footer