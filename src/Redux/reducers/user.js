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
        default:
            {
                console.log('runs')
                return state;
            }
    }
}