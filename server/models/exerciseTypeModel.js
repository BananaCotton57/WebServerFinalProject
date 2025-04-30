require('dotenv').config()
const data = require('../data/exercises.json')
const { CustomError, statusCodes } = require('./errors')
const { connect } = require('./supabase')

const TABLE_NAME = 'exercises';

const BaseQuery = () => connect().from(TABLE_NAME);

const isAdmin = true;

async function getAll() {
    const { data, error } = await BaseQuery().select('*');
    
    if (error) {
        throw error;
    }
    
    return data;
}

async function get(id) {
    const { data, error } = await BaseQuery().select('*').eq('id', id);
    
    if (error) {
        throw error;
    }
    
    if (!data.length) {
        throw new CustomError('Exercise not found', statusCodes.NOT_FOUND);
    }
    
    return data[0];
}

async function create(exercise) {
    if (!isAdmin) {
        throw new CustomError("Sorry, you are not authorized to create a new item", statusCodes.UNAUTHORIZED);
    }
    
    // Remove the id if it's present to let Supabase generate it
    const { id, ...exerciseWithoutId } = exercise;
    
    const { data, error } = await BaseQuery().insert(exerciseWithoutId).select('*');
    
    if (error) {
        throw error;
    }
    
    return data[0];
}

async function update(id, exercise) {
    if (!isAdmin) {
        throw new CustomError("Sorry, you are not authorized to update this item", statusCodes.UNAUTHORIZED);
    }
    
    const { data, error } = await BaseQuery().update(exercise).eq('id', id).select('*');
    
    if (error) {
        throw error;
    }
    
    if (!data.length) {
        return null;
    }
    
    return data[0];
}

async function remove(id) {
    if (!isAdmin) {
        throw new CustomError("Sorry, you are not authorized to delete this item", statusCodes.UNAUTHORIZED);
    }
    
    const { data, error } = await BaseQuery().delete().eq('id', id).select('*');
    
    if (error) {
        throw error;
    }
    
    return data[0];
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove
};