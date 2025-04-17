const data = require('../data/exercises.json')
const { CustomError, statusCodes } = require('./errors')

const isAdmin = true;

async function getAll() {
    return data
}

async function get(id){
    const exercise = data.find((exercise) => exercise.id == id)
    if (!exercise) {
        throw new CustomError('Exercise not found', statusCodes.NOT_FOUND)
    }
    return exercise
}

async function create(exercise){
    if(!isAdmin){
        throw CustomError("Sorry, you are not authorized to create a new item", statusCodes.UNAUTHORIZED)
    }
    const newExercise = {
        id: data.length + 1,
        ...exercise
    }
    data.push(newExercise)
    return newExercise
}

async function update(id, exercise){
    const index = data.findIndex((exercise) => exercise.id == id)
    if (index === -1) {
        return null
    }
    const updatedExercise = {
        ...data[index],
        ...exercise
    }
    data[index] = updatedExercise
    return updatedExercise

}

async function remove(id){
    const index = data.findIndex((exercise) => exercise.id == id)
    if (index === -1) {
        return null
    }
    const deletedExercise = data[index]
    data.splice(index, 1)
    return deletedExercise
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove
}