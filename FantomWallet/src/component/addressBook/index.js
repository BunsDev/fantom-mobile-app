import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Share } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import ProgressBar from '../../general/progressBar/index';
import { StatusBar } from 'react-native';
import Address from './address/index';
import QRCode from 'react-native-qrcode';

import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
class AddressBook extends Component {
    state = {
        addOrFavorite: 'add',
        addressList: [{ id: 1, name: 'John Doe', line1Text: '1GWQCH37uJEvDzQkd', rate: false },
        { id: 2, name: 'John Doe', line1Text: '2GWQCH37uJEvDzQkd', rate: false },
        { id: 3, name: 'John Doe', line1Text: '3GWQCH37uJEvDzQkd', rate: false },
        { id: 4, name: 'John Doe', line1Text: '4GWQCH37uJEvDzQkd', rate: false },
        { id: 5, name: 'John Doe', line1Text: '5GWQCH37uJEvDzQkd', rate: false },
        { id: 6, name: 'John Doe', line1Text: '1GWQCH37uJEvDzQkd', rate: false },
        { id: 7, name: 'John Doe', line1Text: '2GWQCH37uJEvDzQkd', rate: false },
        { id: 8, name: 'John Doe', line1Text: '3GWQCH37uJEvDzQkd', rate: false },
        { id: 9, name: 'John Doe', line1Text: '4GWQCH37uJEvDzQkd', rate: false },
        { id: 10, name: 'John Doe', line1Text: '5GWQCH37uJEvDzQkd', rate: false }
        ]
    }
    onLeftIconPress = () => {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
    onRightIconPress = () => {
        this.props.navigation.navigate('EditContact')
    }
    deleteItem = (id) => {
        const index = this.state.addressList.findIndex((el) => el.id === id);
        let newAddressLst = this.state.addressList.slice();
        newAddressLst.splice(index, 1);
        this.setState({ addressList: newAddressLst });
    }
    rateChange = (id) => {
        const index = this.state.addressList.findIndex((el) => el.id === id);
        let newAddressLst = this.state.addressList.slice();
        newAddressLst[index].rate = !newAddressLst[index].rate;
        this.setState({ addressList: newAddressLst });
    }
    
    render() {
        let addColor = style.add;
        let favColor = style.favorites;
        let addColorText = { color: 'black' };
        let favColorText = { color: 'black' };
        let addressListView = null;
        let favoriteListView = null;
        if (this.state.addOrFavorite === 'add') {
            addColor = { ...style.add, backgroundColor: 'rgb(63,62,63)' };
            addColorText = { color: 'rgb(232,232,232)' };
            favColor = style.favorites;
        } else if (this.state.addOrFavorite === 'favorite') {
            favColor = { ...style.favorites, backgroundColor: 'rgb(63,62,63)' };
            favColorText = { color: 'rgb(232,232,232)' }
            addColor = style.add;
        }
        if (this.state.addressList.length) {
            addressListView = this.state.addressList.map((val, index) => <Address key={index} id={val.id} index={index} name={val.name} line1Text={val.line1Text} rate={val.rate} rateChange={this.rateChange} delete={this.deleteItem} />)
        }
        if (this.state.addressList.length) {
            favoriteListView = this.state.addressList.filter((val) => val.rate === true).map((val, index) => <Address key={index} id={val.id} name={val.name} line1Text={val.line1Text} line2Text={val.line2Text} rate={val.rate} rateChange={this.rateChange} delete={this.deleteItem} />)
        }

        return (
            <View style={style.mainContainerStyle}>
                <StatusBar barStyle="light-content" />
                <Header text='Address Book' leftButtonIcon='arrow-back' rightButtonIcon='add' onLeftIconPress={this.onLeftIconPress} onRightIconPress={this.onRightIconPress}leftIconSize={30} rightIconSize={30} headerStyle={{backgroundColor:'rgb(233,177,18)'}} rightButtonStyle={{backgroundColor:'rgb(233,177,18)'}} leftButtonStyle={{backgroundColor:'rgb(233,177,18)'}}/>
                <View style={{ flex: 1,}} >
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={addColor} onPress={() => this.setState({ addOrFavorite: 'add' })}>
                            <Text style={addColorText}>Recent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={favColor} onPress={() => this.setState({ addOrFavorite: 'favorite' })}>
                            <Text style={favColorText}>Favorites</Text>
                        </TouchableOpacity>
                        {/* {this.state.addOrFavorite === 'fa'} */}
                    </View>
                    <View style={{paddingLeft:10,paddingRight:10}} >
                        {this.state.addOrFavorite === 'add' ? <ScrollView
                        showsVerticalScrollIndicator={false}
                        >{addressListView}<View style={{height:50}}/></ScrollView> : null}
                    </View>
                    {this.state.addOrFavorite === 'favorite' ? <ScrollView showsVerticalScrollIndicator={false} >{favoriteListView}</ScrollView> : null}
                    
                </View>
            </View>
        );
    }
}

export default AddressBook;