const data = require('../data/users.json');
const { CustomError, statusCodes } = require('./errors');
const { connect } = require("./supabase")

connect()

async function getAll() {
    return data;
}

async function get(id) {
    const user = data.find(u => u.id == id);
    if (!user) {
        throw new CustomError('User not found', statusCodes.NOT_FOUND);
    }
    return user;
}

async function create(user) {
    const newUser = {
        id: data.length + 1,
        ...user
    };
    data.push(newUser);
    return newUser;
}

async function update(id, user) {
    const index = data.findIndex(u => u.id == id);
    if (index === -1) return null;
    const updatedUser = { ...data[index], ...user };
    data[index] = updatedUser;
    return updatedUser;
}

async function remove(id) {
    const index = data.findIndex(u => u.id == id);
    if (index === -1) return null;
    const deletedUser = data.splice(index, 1);
    return deletedUser;
}

module.exports = { getAll, get, create, update, remove };
