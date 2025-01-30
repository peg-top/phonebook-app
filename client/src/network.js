import axios from "axios"

// const baseUrl = 'http://localhost:3000/persons'
const baseUrl = 'https://phonebook-app-q6i6.onrender.com/api/persons'


export const getAll = () => {
    const request = axios.get(baseUrl)
    console.log('Getall Request', request)
    return request.then(response => response.data)
}

export const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    console.log('Create Request', request)
    return request.then(response => response.data)
}

export const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    console.log('Update Request', request)
    return request.then(response => response.data)
}

export const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log('Delete Request', request)
    return request.then(response => response.data)
}

// export default { getAll, create, update }