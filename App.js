import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Torch from "react-native-torch";
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons from expo package
import { MaterialCommunityIcons } from '@expo/vector-icons';

const App = () => {
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [statusLite, setStatusLite] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    let intervalId;
    if (statusLite) {
      if (count === 1) {
        Torch.switchState(true);
        setIsTorchOn(true);
      } else {
        intervalId = setInterval(() => {
          Torch.switchState(!isTorchOn);
          setIsTorchOn((prev) => !prev);
        },2000 /count);  
      }
    } else {
      clearInterval(intervalId);
      Torch.switchState(false);
      setIsTorchOn(false);
    }

    return () => clearInterval(intervalId);
  }, [statusLite, count, isTorchOn]);

  const handlePress = () => {
    setStatusLite((prev) => !prev);
  };

  const handleIncrease = () => {
    setCount((prev) => (prev === 25 ? prev : prev + 1));
  };

  const handleMinus = () => {
    setCount((prev) => (prev === 1 ? prev : prev - 1));
  };

  return (
    <SafeAreaView style={{...styles.container,backgroundColor:isTorchOn?"#f99":"#fff"}}>
      <View>
        <Text style={styles.titleText}>
          Turn on/off Flashlight
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",marginVertical:50
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={handleMinus}
          >
            <Text
              style={{
                ...styles.buttonTextStyle,
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...styles.buttonTextStyle,
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {count}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={handleIncrease}
          >
            <Text
              style={{
                ...styles.buttonTextStyle,
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.shadowContainer}>
             <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.buttonMainStyle,backgroundColor:statusLite?"red":"#000"}}
          onPress={handlePress}
        >
          <Text style={{...styles.buttonTextStyle}}>
            {statusLite ? 
             <MaterialCommunityIcons name="flashlight-off" size={60} color="black" /> :
             <MaterialCommunityIcons name="flashlight" size={60} color="white" />}
          </Text>
        </TouchableOpacity>
        </View>
  
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  inputStyle: {
    justifyContent: "center",
    marginTop: 15,
    padding: 10,
    backgroundColor: "#eee",
    marginRight: 2,
    marginLeft: 2,
    borderColor: "#333",
    borderRadius: 25,
  },
  buttonStyle: {
    justifyContent: "center",
    marginTop: 15,
    padding: 25,
    backgroundColor: "#333",
    marginRight: 2,
    marginLeft: 2,
    
    borderRadius:300,shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonMainStyle: {  justifyContent: "center",
  marginTop: 15,
  padding: 25,
  backgroundColor: "#333",
    marginRight: "auto",
    marginLeft: "auto",
    height:150,
    width:150,
    borderRadius:150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
  }, shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

});
