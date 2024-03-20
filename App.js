import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Torch from "react-native-torch";

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
        }, 1000 / 4);  // Toggles 4 times per second when count is 9
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
    setCount((prev) => (prev === 9 ? prev : prev + 1));
  };

  const handleMinus = () => {
    setCount((prev) => (prev === 1 ? prev : prev - 1));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>
          Turn on/off Flashlight to Make a Torch App in React Native
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
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
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={handlePress}
        >
          <Text style={styles.buttonTextStyle}>
            {isTorchOn ? "Turn off the Torch" : "Turn on the Torch " + count}
          </Text>
        </TouchableOpacity>
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
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
  },
});
