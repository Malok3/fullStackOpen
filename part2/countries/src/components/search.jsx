const Search = (props) => {
    const search = props.newSearch
    const handleSearchChange = props.onChangeFilter

    return <>
    
        Find countries <input value={search} onChange={handleSearchChange} />
    
    </>
}

export default Search