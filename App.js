
import { Provider } from 'react-redux';
import configStore from './src/Redux/store/configStore';
import { RootSiblingParent } from 'react-native-root-siblings';
import Apps from './Apps';
const store=configStore();
export default function App()
{
    return(
    <RootSiblingParent>
        <Provider store={store}>
            <Apps />
        </Provider>
    </RootSiblingParent>
    );
}