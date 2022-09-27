export function addUser(load)
{
    console.log(load)
    return{
        type:'USER_ADD',
        updatePayLoad:load
    };
}