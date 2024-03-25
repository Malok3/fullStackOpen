// import { createSlice } from '@reduxjs/toolkit'



// const filterSlice = createSlice({
//   name: 'filter',
//   reducers: {
//     filter(state = null, action) {
//       const content = action.payload
//       state.push({
//         content,
//         vote: 0,
//         id: getId(),
//       })
//     },
//     filterChange(state, action) {
//       const id = action.payload
      
//        return updatedAnecdotes;
//     }
//   },
// })


const filterReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload
      default:
        return state
    }
  }

  const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }
  
  
  export { filterReducer, filterChange };