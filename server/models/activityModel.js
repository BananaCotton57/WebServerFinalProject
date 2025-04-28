const { CustomError, statusCodes } = require('./errors')
const { connect } = require('./supabase');

const TABLE_NAME = 'activities';

// Helper function to get the base query
const BaseQuery = () => connect().from(TABLE_NAME);

// Helper function to transform activity data into the desired format
function transformActivityData(activity) {
    return {
        id: activity.id,
        avatar: activity.users?.avatar || null, // Use null if users is null
        name: activity.users?.name || null,
        username: activity.users?.username || null,
        content: activity.content,
        exercise: activity.exercise_id, // Replace with actual exercise name if needed
        created_at: activity.created_at
    };
}

async function getAll() {
    const { data, error } = await BaseQuery().select('*, users(username, name, avatar)');
    
    if (error) {
        throw error;
    }
    
    return data.map(transformActivityData);
}

async function get(id) {
    const { data, error } = await BaseQuery().select('*, users(username, name, avatar)').eq('id', id);
    
    if (error) {
        throw error;
    }
    
    if (!data.length) {
        throw new CustomError('Could not find post', statusCodes.NOT_FOUND);
    }
    
    return transformActivityData(data[0]);
}

async function create(activity) {
    const { id, ...activityWithoutId } = activity;
    
    const { data, error } = await BaseQuery().insert(activityWithoutId).select('*, users(username, name, avatar)');
    
    if (error) {
        throw error;
    }
    
    return transformActivityData(data[0]);
}

async function update(id, activity) {
    const { data, error } = await BaseQuery().update(activity).eq('id', id).select('*, users(username, name, avatar)');
    
    if (error) {
        throw error;
    }
    
    if (!data.length) {
        return null;
    }
    
    return transformActivityData(data[0]);
}

async function remove(id) {
    const { data, error } = await BaseQuery().delete().eq('id', id).select('*, users(username, name, avatar)');
    
    if (error) {
        throw error;
    }
    
    return transformActivityData(data[0]);
}

async function filterByUsername(username) {
    const { data, error } = await BaseQuery()
        .select('*, users(username, name, avatar)')
        .eq('users.username', username)
        .not('users', 'is', null); // Exclude rows where the users relationship is null

    if (error) {
        throw error;
    }

    return data.map(transformActivityData);
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove,
    filterByUsername
};