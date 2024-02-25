import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Signup from "./src/screens/Signup";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthProvider, { AuthContext } from "./src/context/AuthProvider";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="orange" barStyle="light-content" />
      <AuthProvider>
        <Root />
      </AuthProvider>
    </NavigationContainer>
  );
}

const Root = () => {
  const Stack = createNativeStackNavigator();
  const { isAuthenticated } = useContext(AuthContext);
  // console.log(" App isAuthenticated:", isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={Home} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
};
