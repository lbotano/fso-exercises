import React from 'react'

const Filter = ({ searchValue, setSearchValue }) => {
    function onSearchByName(event) {
        setSearchValue(event.target.value)
    }

    return (
        <div>
            filter shown with <input value={searchValue} onChange={onSearchByName} />
        </div>
    )
}

export default Filter
