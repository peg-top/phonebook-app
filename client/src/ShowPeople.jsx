import React from "react"

const ShowPeople = ({ persons, filterName, deletePerson }) => {
    return (
        <ul>
        {persons.map((person) => 
          person.name.includes(filterName)
            ? 
                <li key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => deletePerson(person.id)}>delete</button>
                </li>
            : null
        )}
      </ul>
    )
}

export default ShowPeople