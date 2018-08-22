import React from 'react';
import { StackNavigator } from 'react-navigation';

import SplashScreen from './src/general/splashScreen/';
import CreateWallet from './src/component/createWallet/';
import PrivacyPolicy from './src/component/privacyPolicy/';
import TermsConditions from './src/component/termsConditions/';
import CaptionOutput from './src/component/captionOutput/index';
import HomeScreen from './src/component/homeScreen/';
import CaptchaVerification from './src/component/captchaVerification/index';
import AddressBook from './src/component/addressBook/index';
import QRScanner from './src/component/qr/scanner/view';
import QRGenerator from './src/component/qr/generator/';
import EditContact from './src/component/editContact/index';
import SendMoney from './src/component/sendMoney/index';
import Settings from './src/component/homeScreen/settings/index';
import AboutApp from './src/component/homeScreen/settings/aboutApp/index';
import CustomerSupport from './src/component/homeScreen/settings/customerSupport/index';

const Routing = StackNavigator({
    SplashScreen: { screen: SplashScreen },
    CreateWallet: { screen: CreateWallet },
    Terms: { screen: TermsConditions },
    PrivacyPolicy: { screen: PrivacyPolicy },
    CaptionOutput: { screen: CaptionOutput },
    HomeScreen: { screen: HomeScreen },
    CaptchaVerification: { screen: CaptchaVerification },
    AddressBook: { screen: AddressBook },
    QRScanner: { screen: QRScanner },
    QRGenerator: { screen: QRGenerator },
    EditContact: { screen: EditContact },
    SendMoney: { screen: SendMoney },
    Settings: { screen: Settings },
    AboutApp: { screen: AboutApp },
    CustomerSupport: { screen: CustomerSupport }
},
    {
        headerMode: 'none',
    });

export default class Router extends React.Component {
    render() {
        return (
            <Routing />
        );
    }
}
