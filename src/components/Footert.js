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
  margin:0 auto;
  padding: 3em;
  max-width: 1024px;
`
const FlexContainer = styled.section`
  display:flex;
  justify-content: space-between;
`
const LinkToPortfolio = styled.a`
  color:var(--colo-main-light);
  text-decoration:none;
  &hover{
    color:var(--color-main-highlight);
  }
`
function Footer() {
  return (
    <FooterContainer>
      <FooterInnerContainer>
        <FlexContainer>
          <LinkToPortfolio href="https://www.brianthomas-develops.com/">To my portfolio</LinkToPortfolio>
          Jobby, 2022
        </FlexContainer>
      </FooterInnerContainer>
    </FooterContainer>
  )
}

export default Footer