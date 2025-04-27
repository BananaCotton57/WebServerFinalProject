const data = require('../data/activity.json')
const { CustomError, statusCodes } = require('./errors')
const { connect } = require('./supabase');

const TABLE_NAME = 'activities';

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
        throw new CustomError('Could not find post', statusCodes.NOT_FOUND);
    }
    
    return data[0];
}

async function create(activity) {
    // Remove the id to let Supabase handle ID generation
    const { id, ...activityWithoutId } = activity;
    
    const { data, error } = await BaseQuery().insert(activityWithoutId).select('*');
    
    if (error) {
        throw error;
    }
    
    return data[0];
}

async function update(id, activity) {
    const { data, error } = await BaseQuery().update(activity).eq('id', id).select('*');
    
    if (error) {
        throw error;
    }
    
    if (!data.length) {
        return null;
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

async function filterByUsername(username) {
    const { data, error } = await BaseQuery()
        .from('activities')
        .select('activities.*, users.username')
        .eq('users.username', username)
        .join('users', 'activities.user_id', 'users.id'); // Joins the activities and users table
    
    if (error) {
        throw error;
    }

    return data;
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove,
    filterByUsername
};