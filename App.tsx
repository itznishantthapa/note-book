import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './src/screens/dashboard';
import CollectionNotes from './src/screens/collection_notes';
import AddNote from './src/screens/add_note';
import ViewNote from './src/screens/view_note';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CollectionNotes" component={CollectionNotes} />
        <Stack.Screen name="AddNote" component={AddNote} />
        <Stack.Screen name="ViewNote" component={ViewNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
