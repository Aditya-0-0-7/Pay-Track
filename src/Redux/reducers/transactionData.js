export default (state={},action)=>{
    switch (action.type)
    {
        case 'DATA_ADD':
            {
                return(
                    action.payload
                );
            }
        default:
            {
                return(state);
            }
    }
}