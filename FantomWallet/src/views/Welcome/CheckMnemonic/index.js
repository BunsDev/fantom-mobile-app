// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { SafeAreaView } from "react-navigation";

import { NavigationService, routes } from "~/navigation/helpers";
import { generateWallet as generateWalletAction } from "~/redux/keys/actions";
import Button from "~/components/general/Button";
import ProgressBar from "~/components/general/ProgressBar";
import { setDopdownAlert as setDopdownAlertAction } from "~/redux/notification/actions";
import WordItem from "./WordItem";
import styles from "./styles";
import BackgroundFantomIcon from "~/images/BackgroundIcon.png";
import { DEVICE_HEIGHT } from "~/common/constants";
import { ENUM_WORD } from "./helpers";
import { Colors } from "../../../theme";

type ShuffleItem = {
  name: string,
  index: string,
  isClickable: boolean
};

type Props = {
  mnemonic: string,
  navigation: any,
  generateWallet: ({
    mnemonic: string,
    cb: () => void
  }) => any,
  setDopdownAlert: (string, string, { [string]: string }) => void
};

/**
 * This component is designed to check recorded phrases.
 */
export const CheckMnemonicContainer = ({
  navigation,
  generateWallet,
  setDopdownAlert,
  mnemonic
}: Props) => {
  const [shuffledMnemonics, setShuffledMnemonic] = useState<Array<ShuffleItem>>(
    []
  );
  const [verifyMnemonic, setVerifyMnemonic] = useState([]);
  const [isEnable, setEnable] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);
  const [mnemonicWords, setMnemonicWords] = useState([]);
  const [realWord, setRealWord] = useState([]);

  useEffect(() => {
    setShuffledMnemonic(
      mnemonic
        .split(" ")
        .sort(() => Math.random() - 0.5)
        .map((word, index) => ({
          name: word[0].toUpperCase() + word.slice(1),
          index: `${word}_${index}`,
          isClickable: true
        }))
    );
  }, []);

  useEffect(() => {
    if (verifyMnemonic && verifyMnemonic.length > 0) {
      console.log(verifyMnemonic, "*******verifyMnemonic ****");
      let inconsistency = false;

      const verifyMnemonicArr = verifyMnemonic.map(obj =>
        obj.name.toLowerCase()
      );
      const mnemonicString = mnemonic
        .split(" ")
        .slice(0, verifyMnemonicArr.length)
        .join();
      console.log(mnemonicString, verifyMnemonicArr.join(), "asdasd");
      if (mnemonicString === verifyMnemonicArr.join()) setEnable(false);
      else setEnable(true);
      return;
      // mnemonic.split(" ").some((word, index) => {
      //   if (word.toLowerCase() === verifyMnemonicArr[index]) {
      //     console.log("Matched");
      //     setEnable(false);
      //     return true;
      //   }
      //   inconsistency = ENUM_WORD[index];
      //   return false;
      // });

      // if (inconsistency) {
      //   setEnable(true);
      // }
      // return;
    }
    setEnable(false);
  }, [verifyMnemonic]);

  const handleVerify = () => {
    if (!verifyMnemonic) return;
    let inconsistency = false;

    const verifyMnemonicArr = verifyMnemonic.map(obj => obj.name.toLowerCase());

    mnemonic.split(" ").some((word, index) => {
      if (word === verifyMnemonicArr[index]) return false;
      inconsistency = ENUM_WORD[index];
      return true;
    });

    if (inconsistency) {
      setDopdownAlert("custom", `The ${inconsistency} word does not match.`, {
        backgroundColor: "rgb(251,128,0)"
      });
      return;
    }

    generateWallet({
      mnemonic,
      cb: () => NavigationService.navigate(routes.root.HomeScreen)
    });
  };

  const select = ({ name, index }) => () => {
    setVerifyMnemonic([
      ...verifyMnemonic.slice(),
      { name, index, isClickable: false }
    ]);

    setShuffledMnemonic(
      shuffledMnemonics.map(item => ({
        ...item,
        isClickable: item.name !== name ? item.isClickable : false
      }))
    );
  };

  const unSelect = ({ name, index }) => () => {
    setVerifyMnemonic(verifyMnemonic.filter(word => word.index !== index));
    setShuffledMnemonic(
      shuffledMnemonics.map(word => ({
        ...word,
        ...(name === word.name ? { isClickable: true } : {})
      }))
    );
  };

  const behaviour = Platform.OS === "ios" ? "padding" : null;

  return (
    // <KeyboardAvoidingView
    //   behavior={behaviour}
    //   style={styles.mainContainerStyle}
    // >
    //   <View style={styles.mid}>
    //     <View style={styles.progressContainer}>
    //       <ProgressBar completed="2" remaining="0" />
    //     </View>
    //     {/* Go Back icon */}
    //     <View style={styles.arrowContainer}>
    //       <TouchableOpacity onPress={() => navigation.goBack()}>
    //         <Icon name="chevron-left" size={24} color="#fff" />
    //       </TouchableOpacity>
    //     </View>
    //     {/* Background Image */}
    //     <Image
    //       style={styles.backgroundImageStyle}
    //       source={BackgroundFantomIcon}
    //       resizeMode="contain"
    //     />

    //     <ScrollView>
    //       <View style={styles.headerContainer}>
    //         <Text style={styles.captchaText}>Captcha Verification</Text>
    //         <View style={styles.subHeadContainer}>
    //           <Text style={styles.pleaseText}>
    //             Please enter the corresponding phrase out of the 12 back-up
    //             phrases
    //           </Text>
    //         </View>
    //       </View>
    //       <View style={styles.displayMnemonicView}>
    //         <Text style={styles.backupPhrase}>
    //           Let&apos;s verify your backup phrase
    //         </Text>
    //         <View style={styles.textContainer}>
    //           {verifyMnemonic.map(val => (
    //             <WordItem {...val} key={val.index} onClick={unSelect} isTop />
    //           ))}
    //         </View>
    //       </View>

    //       <View style={{ alignItems: "center" }}>
    //         <Text style={styles.orderTextStyle}>
    //           Please tap each word in the correct order
    //         </Text>
    //       </View>
    //       <View style={styles.mnemonicBtnMainView}>
    //         {shuffledMnemonics.map(item => (
    //           <WordItem {...item} key={item.index} onClick={select} />
    //         ))}
    //       </View>
    //       <View style={{ height: DEVICE_HEIGHT * 0.12 }} />
    //     </ScrollView>
    //   </View>
    //   {/* Button container */}
    //   <View style={styles.footerStyle}>
    //     <Button
    //       text="Verify"
    //       onPress={handleVerify}
    //       buttonStyle={{ backgroundColor: "rgb(0,177,251)" }}
    //     />
    //   </View>
    // </KeyboardAvoidingView>

    <View style={styles.mainContainerStyle}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <StatusBar barStyle="light-content" /> */}
          <View style={{ flex: 0.5 }}>
            <View style={styles.mainHeadingContainer}>
              <Text style={styles.mainHeading}>Verify recovery words</Text>
            </View>
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>
                Tap the words to put them in the
              </Text>
              <Text style={styles.subHeading}> correct order.</Text>
            </View>
            <View>
              <View
                style={{
                  ...styles.verfiyContainer,
                  borderColor: isEnable ? Colors.red : "transparent"
                }}
              >
                <View style={styles.textContainer}>
                  {verifyMnemonic.map(val => (
                    <WordItem
                      {...val}
                      key={val.index}
                      onClick={unSelect}
                      isTop
                    />
                  ))}
                  {/* {selectedWords && selectedWords.length ? (
                  selectedWords.map((val, i) => {
                    return (
                      <View key={i} style={styles.wordWrap}>
                        <Text
                          onPress={() => handleSelectedWordClick(val)}
                          style={styles.selectedTextView}
                        >
                          {val}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <Text style={styles.selectedTextView} />
                )} */}
                </View>
                {isEnable && (
                  <Text style={styles.errorText}>
                    Incorrect order. Try again!
                  </Text>
                )}
              </View>
            </View>

            {/* <View style={styles.flex1}> */}
            <View style={styles.textContainer}>
              {shuffledMnemonics.map(item => {
                if (item.isClickable)
                  return (
                    <WordItem {...item} key={item.index} onClick={select} />
                  );
              })}
              {/* {shuffledMnemonics && shuffledMnemonics.length ? (
              shuffledMnemonics.map((val, i) => {
                return (
                  <View key={i} style={styles.wordWrap}>
                    <Text
                      onPress={() => select(val.name, val.index)}
                      style={styles.selectedTextView}
                    >
                      {val.name}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={styles.selectedTextView} />
            )} */}
            </View>

            {/* <View style={{ flex: 0.5 }}> */}
            <Button
              buttonStyle={{
                ...styles.buttonStyle,
                backgroundColor:
                  !isEnable && verifyMnemonic.length === 12
                    ? Colors.royalBlue
                    : Colors.greyOpacity
              }}
              onPress={handleVerify}
              textStyle={styles.buttonText}
              text={"CONTINUE"}
            />
            <View style={{ height: 40 }}></View>
            {/* </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default connect(
  state => ({
    mnemonic: state.keys.mnemonic
  }),
  {
    generateWallet: generateWalletAction,
    setDopdownAlert: setDopdownAlertAction
  }
)(CheckMnemonicContainer);
