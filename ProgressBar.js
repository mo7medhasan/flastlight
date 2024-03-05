import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';

const ProgressBar = () => {
  const [count, setCount] = useState(0);
  const loaderValue = useRef(new Animated.Value(0)).current;
  const countInterval = useRef(null);

  useEffect(() => {
    countInterval.current = setInterval(() => setCount((old) => old + 5), 1000);
    return () => {
      clearInterval(countInterval.current);
    };
  }, []);

  const load = (count) => {
    Animated.timing(loaderValue, {
      toValue: count, //final value
      duration: 500, //update value in 500 milliseconds
    }).start();
  };

  useEffect(() => {
    load(count);
    if (count >= 100) {
      clearInterval(countInterval.current);
    }
  }, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Loading...</Text>
      <Text style={styles.text2}>Progress: {count}%</Text>
      <View style={styles.progressBar}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: "#46FF33",
            width: loaderValue.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
              extrapolate: "clamp",
            }),
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  text1: {
    fontSize: 34,
  },
  text2: {
    fontSize: 22,
    margin: 5,
  },
  progressBar: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 8,
    borderColor: '#555',
    flexDirection: "row",
  },
});

export default ProgressBar;