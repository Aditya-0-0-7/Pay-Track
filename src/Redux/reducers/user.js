export default (state={},action)=>{
    switch (action.type)
    {
        case 'USER_ADD':
            {
                return{
                    ...action.updatePayLoad
                };
            }
        case 'USER_ADD_ID':
            {
                return{
                    ...state,
                    ...action.updatePayLoad
                }
            }
        default:
            {
                return state;
            }
    }
}