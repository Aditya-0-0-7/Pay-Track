export function addUser(load)
{
    return{
        type:'USER_ADD',
        updatePayLoad:load
    };
}

export function addId(load)
{
    return{
        type:'USER_ADD_ID',
        updatePayLoad:load
    }
}