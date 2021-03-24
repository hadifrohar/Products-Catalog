/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import {productStore} from './src/redux/store'
import CatalogComponent from "./src/components/catalogComponent";
import ProductComponent from "./src/components/productComponent";

const StackNavigator = createStackNavigator()

const App: () => Node = () => {


  return (
      <Provider store={productStore}>
          <NavigationContainer>
            <StackNavigator.Navigator screenOptions={{headerTitleAlign: 'center'}}>
                <StackNavigator.Screen name="Products" component={CatalogComponent}/>
                <StackNavigator.Screen name="Product" component={ProductComponent}/>
            </StackNavigator.Navigator>
          </NavigationContainer>
      </Provider>
  );
};

export default App;
