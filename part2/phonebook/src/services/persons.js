import axios from 'axios'

const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => 
    axios.get(baseUrl)

const create = newPerson =>
    axios.post(baseUrl, newPerson)

const remove = person =>
    axios.delete(`${baseUrl}/${person.id}`)

const update = (id, newPerson) =>
    axios.put(`${baseUrl}/${id}`, newPerson)

export default {
    getAll,
    create,
    remove,
    update
}
