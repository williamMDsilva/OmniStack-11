import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import App from "../App";

const AppStack = createStackNavigator();

import Incidents from "./pages/incidents";
import Detail from "./pages/detail";

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        ScreenOptions={{
          headerShown: false,
        }}
      >
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
