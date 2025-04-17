const data = require('../data/activity.json')
const { CustomError, statusCodes } = require('./errors')

const isAdmin = true;

async function getAll() {
    return data
}

async function get(id){
    const activity = data.find((activity) => activity.id == id)
    if (!activity) {
        throw new CustomError('Could not find post', statusCodes.NOT_FOUND)
    }
    return activity
}

async function create(activity){
    const newActivity = {
        id: data.length + 1,
        ...activity
    }
    data.push(newActivity)
    return newActivity
}

async function update(id, activity){
    const index = data.findIndex((activity) => activity.id == id)
    if (index === -1) {
        return null
    }
    const updatedActivity = {
        ...data[index],
        ...activity
    }
    data[index] = updatedActivity
    return updatedActivity

}

async function remove(id){
    const index = data.findIndex((activity) => activity.id == id)
    if (index === -1) {
        return null
    }
    const deletedActivity = data[index]
    data.splice(index, 1)
    return deletedActivity
}

async function filterByUsername(username) {
    return data.filter(activity => activity.username === username);
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove,
    filterByUsername
}