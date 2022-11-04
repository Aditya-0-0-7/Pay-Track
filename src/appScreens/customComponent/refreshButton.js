import { TouchableOpacity} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
export default function RefreshButton({press})
{
    return(<TouchableOpacity
        style={{position:'absolute',top:40,right:20,padding:10,backgroundColor:'white',borderRadius:5}}
        onPress={press}
        >
        <EvilIcons name='refresh' size={22} color="black" />
    </TouchableOpacity>);
}