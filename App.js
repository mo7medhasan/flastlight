// Turn on/off Flashlight to Make a Torch App in React Native
// https://aboutreact.com/turn-on-off-flashlight-to-make-a-torch-app-in-react-native/

// import React in our code
import React, { useState } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

// import Torch Component
import Torch from "react-native-torch";
import ProgressBar from "./ProgressBar";

const App = () => {
  //Default Keep Awake off
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [statusLite, setStatusLite] = useState(false);
  const [count, setCount] = useState(1);

  const handlePress = () => {
    if (statusLite) {
      Torch.switchState(!isTorchOn);
      setIsTorchOn(!isTorchOn);
      if (count > 1) {
        setTimeout(() => {
          handlePress();
        }, 1000 / count);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>
          Turn on/off Flashlight to Make a Torch App in React Native
        </Text>
        <TextInput
          style={styles.inputStyle}
          value={count}
          onChangeText={setCount}
          keyboardType="numeric"
          maxLength={1}
          inputMode="numeric"
        />
        <ProgressBar />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => {
            setStatusLite((pre) => !pre), handlePress();
          }}
        >
          <Text style={styles.buttonTextStyle}>
            {isTorchOn ? "Turn off the Torch  " : "Turn on the Torch  " + count}
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
    backgroundColor: "#8ad24e",
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
  },
});
