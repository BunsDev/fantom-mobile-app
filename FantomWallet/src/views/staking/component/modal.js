import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";

const ModalView = props => {
  const {
    modalText,
    modalTextStyle,
    buttonViewStyle,
    buttons,
    stakingView
  } = props;
  return (
    <View style={styles.backgroundView}>
      <View style={{ ...styles.stakingModalView, ...stakingView }}>
        <Text style={modalTextStyle}>{modalText}</Text>
        <View style={buttonViewStyle}>
          {buttons &&
            buttons.map(b => {
              return (
                <TouchableOpacity
                  onPress={b.onPress}
                  style={{ ...styles.backButtonStyle, ...b.style }}
                >
                  <Text style={{ ...b.textStyle }}>{b.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    </View>
  );
};
export default ModalView;
