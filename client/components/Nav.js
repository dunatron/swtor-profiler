import NavStyles from "./styles/NavStyles"
import NavButton from "./styles/NavButton"
import Router from "next/router"

const handleLink = (route = "/", query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  })
}

const Nav = () => (
  <NavStyles>
    <NavButton color="secondary" onClick={() => handleLink("/")}>
      Home
    </NavButton>
    <NavButton color="secondary" onClick={() => handleLink("/characters")}>
      Characters
    </NavButton>
    <NavButton color="secondary" onClick={() => handleLink("/guild")}>
      Guild
    </NavButton>
    <NavButton color="secondary" onClick={() => handleLink("/signup")}>
      Sign In
    </NavButton>
  </NavStyles>
)

export default Nav
