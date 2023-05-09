import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CamScreen from './Components/CamScreen';
import BlogScreen from './Components/BlogScreen.js';
// import {Ionicons} from '@expo/vector-icons';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
// import {Foundation} from '@expo/vector-icons';
import {AssistantScreen} from './Components/AssistantScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      ScreenOptions={{
        activeTintColor: '#4CAF50',
        inactiveTintColor: 'gray',
        showLabel: true,
        style: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f1f1f1',
        },
      }}>
      <Tab.Screen
        name="Assistant"
        component={AssistantScreen}
        options={
          {
            // tabBarIcon: ({color, size}) => (
            // <MaterialCommunityIcons
            //   name="home-assistant"
            //   color={color}
            //   size={size}
            // />
            // ),
          }
        }
      />

      <Tab.Screen
        name="Camera"
        component={CamScreen}
        options={
          {
            // tabBarIcon: ({color, size}) => (
            // <Ionicons name="md-camera" color={color} size={size} />
            // ),
          }
        }
      />

      <Tab.Screen
        name="Blog"
        component={BlogScreen}
        options={
          {
            // tabBarIcon: ({color, size}) => (
            // <Foundation name="indent-more" color={color} size={size} />
            // ),
          }
        }
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
