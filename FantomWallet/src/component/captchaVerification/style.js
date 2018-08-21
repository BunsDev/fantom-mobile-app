import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
   mainContainerStyle: {
       flex: 1,
       backgroundColor:'#fff'
   },
   progressContainer:{
       marginTop: deviceHeight * 0.05
   },
   arrowContainer:{
       marginTop: deviceHeight * 0.02,
       marginLeft: deviceHeight * 0.02,
   },
   headerContainer:{
       alignItems:'center'
   },
   mid : {
       padding: deviceHeight * 0.03
   },
   textBox:{
       marginBottom: deviceHeight * 0.03,
   },
   footerStyle: {
       position: 'absolute',
       bottom: 0,
       flexDirection: 'row',
   },
}

export default style;