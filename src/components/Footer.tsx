import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');
const BOTTOM_SAFE_AREA = 20;

const Footer = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.textContainer} activeOpacity={0.7}>
        <Text style={styles.bottomText}>Save anyway without collection</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <View style={styles.buttonInner}>
          <View style={styles.iconTextWrapper}>
            <Feather
              name="save"
              size={20}
              color="#ffffff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Save to collection</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(164, 168, 172, 0.1)',
    backgroundColor: '#ffffff',
    paddingTop: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#1d2024', // Dark background for the button
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 50,
    width: width - 40,
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  buttonInner: {
    width: '100%',
    alignItems: 'center',
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#ffffff', // White text for contrast
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  bottomText: {
    color: '#a4a8ac',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
    textDecorationLine: 'underline',
  },
  bottomSpacer: {
    height: BOTTOM_SAFE_AREA,
  },
});

export default Footer;
