export default async function getData()
{
    try
    {
      const jsonValue = await AsyncStorage.getItem('@AccessId')
      console.log(jsonValue)
      jsonValue=jsonValue !== null ? JSON.parse(jsonValue) : null;
      return(jsonValue);
    } 
    catch(e)
    {
      console.log(e);
    }
}