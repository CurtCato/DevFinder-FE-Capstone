import React from "react"
import {Dropdown} from "semantic-ui-react"

const options = [
    {
    "key": "Python",
    "text": "Python",
    "value": "Python",
    "id": 1
  },
  {
    "key": "Django",
    "text": "Django",
    "value": "Django",
    "id": 2
  },
  {
    "key": "JSX",
    "text": "JSX",
    "value": "JSX",
    "id": 3
  },
  {
    "key": "C-Sharp",
    "text": "C-Sharp",
    "value": "C-Sharp",
    "id": 4
  },
  {
    "key": "Angular",
    "text": "Angular",
    "value": "Angular",
    "id": 5
  }]


  const DropdownExampleMultipleSelection = () => (
    <Dropdown placeholder='Languages Known' fluid multiple selection options={options} />
  )

  export default DropdownExampleMultipleSelection
