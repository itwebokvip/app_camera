import {
    StatusBar
} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
//import fonts from "./config/fonts";

import Navigation from "./navigation";

export default function App() {
    //const [fontsLoaded] = useFonts(fonts);

    return <SafeAreaProvider>
        <Navigation />
        <StatusBar />
    </SafeAreaProvider>
}