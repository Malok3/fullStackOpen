import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
  const request = axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then(response => response.data)
    .catch(error => {
      console.log('fail to update person')
    })
  return request.then(response => response.data)
}


const removePerson = (id) =>{
    const request = axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log('fail to remove person')
    })
    return request.then(response => response.data)
}

export default { 
  getAll, create, update, removePerson
}