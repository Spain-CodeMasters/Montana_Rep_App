import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Switch,
  Image,
  TouchableOpacity,
} from 'react-native';

import gear from './assets/gear.png'

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  render() {
    return (
      <View style={styles.settings}>
        {
          this.state.show ? <View style={styles.settingsOpen}>
            {/* <Image style={{ margin: 15, }} source={gear} /> */}
          </View> : null
        }
        <TouchableOpacity style={{ height: 50 }} onPress={() => { this.setState({ show: !this.state.show }) }}>
          <Image style={{ margin: 15,}} source={gear} />
        </TouchableOpacity>

        {/* <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                /> */}
      </View>

    );
  }
}

function settings() {
  console.log("test");
}



const styles = StyleSheet.create({
  settings: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row-reverse',
  },

  settingsOpen: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row-reverse',
    //justifyContent: 'center',
    backgroundColor: 'white',
  }
});

export default Settings;