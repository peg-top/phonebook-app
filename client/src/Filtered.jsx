import React from "react"

const Filtered = ({ filterName, handleFilterInput }) => {
    return (
        <div>
            <label htmlFor="filter">filter shown with: 
                <input type="text" id="filter" name="filter" value={filterName} onChange={handleFilterInput}/>
            </label>
        </div>
    )
}

export default Filtered