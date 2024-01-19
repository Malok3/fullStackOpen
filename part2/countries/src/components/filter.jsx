const Filter = (props) => {
    const search = props.newSearch
    const handleSearchChange = props.onChangeFilter

    return (
        <div className="filter">
        Find countries <input value={search} onChange={handleSearchChange} />
        </div>
    )
        
        
    
    
}

export default Filter