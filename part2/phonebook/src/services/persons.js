import axios from "axios";
const baseUrl = 'https://crispy-space-garbanzo-x5vr4vqj7vg4cp7pv-3001.app.github.dev/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
}

export default { getAll, create, update }