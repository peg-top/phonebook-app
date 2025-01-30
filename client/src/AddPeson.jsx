import React from "react"


const AddPerson = ({ newPersonName, newPersonNumber, handleNameInput, handleNumberInput, addPerson }) => {
    return (
        <form id="phoneBook" onSubmit={addPerson}>
          <div>
          <label htmlFor="phoneBook">name: 
            <input type="text" id="phoneBook" name="phoneBook" value={newPersonName} onChange={handleNameInput}/>
          </label>
          </div>
          <div>
          <label htmlFor="phoneBook">number: 
            <input type="text" id="phoneBook" name="phoneBook" value={newPersonNumber} onChange={handleNumberInput}/>
          </label>
          </div>
          <button type="submit">add</button>
        </form>
    )
}

export default AddPerson