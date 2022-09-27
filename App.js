
import { Provider } from 'react-redux';
import configStore from './src/Redux/store/configStore';
import Apps from './Apps';
const store=configStore();
export default function App()
{
    return(
        <Provider store={store}>
        <Apps />
    </Provider>
    );
}