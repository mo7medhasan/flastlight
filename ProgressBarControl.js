import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const ProgressBarControl = ({count, setCount}) => {
  const [progress, setProgress] = useState(50);

  // useEffect(() => {
  //   Animated.timing(progress, {
  //     toValue: 75,
  //     duration: 2000,
  //   }).start();
  // }, []);

  // Convert progress value to a string before rendering
  // const progressValue = progress.interpolate({
  //   inputRange: [0, 75],
  //   outputRange: ['0%', '75%'],
  //   extrapolate: 'clamp',
  // }).toString();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { width: `${count*10}%`}]} />
      <View style={styles.control}>

{[...Array(11)].map((i,item)=>(
   <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyleMain}
            onPress={()=>setCount(item)}
          >
            <Text
              style={{
                ...styles.buttonStyle,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>) )   }
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    position: 'relative',
    margin: 10,
  },
  bar: {
    height: 20,
    backgroundColor: '#333',
    borderRadius: 10,
  }, control: {
   width:"100%",
    height: "auto",
    position: 'absolute',
    bottom: -10,
    display:"flex",
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"flex-end",
  
  },buttonStyleMain:{
    flex:1,
    justifyContent: "center",
    display:"flex",
    alignItems: "center",
   
  },
  
  buttonStyle:{
    // flex:1,
    justifyContent: "center",
    display:"flex",
    alignItems: "center",
    backgroundColor: '#ccc',

    paddingHorizontal: 5,
    borderRadius:15,shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  
  }
});

export default ProgressBarControl;
