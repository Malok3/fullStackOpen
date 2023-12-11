
const Filter = (props) => {
    const newSearch = props.newSearch
    const onChangeFilter = props.onChangeFilter
    
  
    return (
      <>
        Filter shown with <input value={newSearch} onChange={onChangeFilter} />
      </>
    )
  }

  
export default Filter