import React, { Component } from "react"
import styled from "styled-components"
import Link from "next/link"
import Router from "next/router"
import NProgress from "nprogress"
import Nav from "./Nav"

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const Logo = styled.h1`
  font-size: 2rem;
  margin: 0.5rem 1rem;
  position: relative;
  z-index: 2;
  a {
    border: 3px solid ${props => props.theme.palette.secondary.main};
    /* border-radius: 0 25px 0 25px; */
    padding: 0.5rem 1rem;
    background: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.secondary.main};
  }
  @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
    text-align: center;
  }
`
const StyledHeader = styled.header`
  .bar {
    /* border-bottom: 10px solid ${props =>
      props.theme.palette.common.black}; */
    border-bottom: 10px solid ${props => props.theme.palette.primary.light}; 
    display: grid; 
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.palette.common.lightGrey};
  }
`

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>SWTOR_PROFILER</a>
        </Link>
      </Logo>

      <Nav />
    </div>
    {/* <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div> */}
  </StyledHeader>
)

export default Header
