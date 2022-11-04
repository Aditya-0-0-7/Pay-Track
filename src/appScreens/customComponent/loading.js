import { ActivityIndicator, View } from "react-native";

export default function Loading()
{
    return(<View>
        <ActivityIndicator color='#999999' size='large'/>
    </View>);
}