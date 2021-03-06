import React, { Component } from "react"
import MaterialForm from "../styles/MaterialForm"
import Button from "../styles/Button"
import FieldSet from "../styles/FieldSet"
import TextField from "@material-ui/core/TextField"
import SelectInput from "../Inputs/SelectInput"
import { CHARACTER_CLASSES, CHARACTER_SUB_CLASSES } from "../../constants"
// graphql
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

const CREATE_CHARACTER_MUTATION = gql`
  mutation createCharacter($input: CharacterCreateInput) {
    createCharacter(input: $input) {
      id
      name
      class
      advancedClass
    }
  }
`

export default class CreateCharacter extends Component {
  state = {
    name: "",
    characterClass: "",
    subClass: "",
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const { name, characterClass, subClass } = this.state
    return (
      <div>
        <Mutation
          mutation={CREATE_CHARACTER_MUTATION}
          variables={{
            input: {
              name: name,
              class: characterClass,
              advancedClass: subClass,
            },
          }}
          // update={this.update}
        >
          {(createCharacter, { error, loading }) => (
            <MaterialForm
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 280,
                margin: "auto",
              }}
              method="post"
              onSubmit={async e => {
                e.preventDefault()
                createCharacter()
                alert("Form submitted")
              }}>
              <FieldSet disabled={loading} aria-busy={loading}>
                {loading ? "LOADING..." : null}
                <TextField
                  style={{ marginTop: 10 }}
                  name="name"
                  label="Character Name"
                  value={name}
                  onChange={this.saveToState}
                />
                <SelectInput
                  name="characterClass"
                  label="_Class"
                  value={characterClass}
                  options={CHARACTER_CLASSES.map(c => ({
                    name: c.name,
                    value: c.value,
                    style: {
                      color: c.allegiance === "REPUBLIC" ? "white" : "black",
                      background: c.allegiance === "REPUBLIC" ? "blue" : "red",
                    },
                  }))}
                  onChange={this.saveToState}
                />
                {characterClass && (
                  <SelectInput
                    name="subClass"
                    label="__Sub Class"
                    value={subClass}
                    options={CHARACTER_SUB_CLASSES.filter(
                      sc => sc.class === characterClass
                    ).map(subClass => ({
                      name: subClass.name,
                      value: subClass.value,
                    }))}
                    onChange={this.saveToState}
                  />
                )}

                <Button
                  type="submit"
                  color="primary"
                  variant="raised"
                  disabled={!this.canSubmit() || loading}>
                  Create
                </Button>
              </FieldSet>
            </MaterialForm>
          )}
        </Mutation>
      </div>
    )
  }
  canSubmit = () => {
    const { name, characterClass, subClass } = this.state
    // name should be greater than 3 characters
    if (name.length < 3) {
      return false
    }
    // class should be selected for character
    if (characterClass.length < 1) {
      return false
    }
    return true
  }
}
