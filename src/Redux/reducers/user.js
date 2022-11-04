export default (state={},action)=>{
    switch (action.type)
    {
        case 'USER_ADD':
            {
                console.log('run')
                return{
                    ...action.updatePayLoad
                };
            }
        case 'USER_ADD_ID':
            {
                console.log("balle balle")
                return{
                    ...state,
                    ...action.updatePayLoad
                }
            }
        default:
            {
                console.log('runs')
                return state;
            }
    }
}