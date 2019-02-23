import Button from "../components/styles/Button"
import Router from "next/router"

const handleLink = (route = "/", query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  })
}

const CharactersPage = props => (
  <div>
    <Button
      onClick={() => handleLink("/create-character")}
      color="primary"
      variant="raised">
      New Character
    </Button>
  </div>
)

export default CharactersPage
