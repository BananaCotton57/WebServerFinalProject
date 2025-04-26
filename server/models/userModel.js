// Add dotenv config at the top to ensure environment variables are loaded
require('dotenv').config();
const { CustomError, statusCodes } = require('./errors');
const { connect } = require('./supabase');

const TABLE_NAME = 'users';

// Helper function to get the base query
const BaseQuery = () => connect().from(TABLE_NAME);

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
        throw new CustomError('User not found', statusCodes.NOT_FOUND);
    }
    
    return data[0];
}

async function create(user) {
    const { data, error } = await BaseQuery().insert(user).select('*');
    
    if (error) {
        throw error;
    }
    
    return data[0];
}

async function update(id, user) {
    const { data, error } = await BaseQuery().update(user).eq('id', id).select('*');
    
    if (error) {
        throw error;
    }
    
    return data[0];
}

async function remove(id) {
    const { data, error } = await BaseQuery().delete().eq('id', id).select('*');
    
    if (error) {
        throw error;
    }
    
    return data[0];
}

module.exports = { getAll, get, create, update, remove };