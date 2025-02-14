import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')



export const Styles=StyleSheet.create({

mainContainer:{
    flex:1,
    backgroundColor:theme.colors.background
},
heartContainer:{
    flex:0,
    height:hp('30%'),
    justifyContent:"flex-end",
    alignItems:"center"
},

heart:{
    resizeMode:"contain",
    height:wp('40%'),
    width:wp('40%')
},
addNewMemberContainer:{
    flex:0,
    height:hp('30%'),
    justifyContent:"center",
    alignItems:"center"
},
topText:{
  //  fontFamily:"OpenSans-SemiBold",
    fontFamily:"OpenSans-Bold", 
    fontSize:wp('4.5%'),
    color:theme.colors.black,
    paddingBottom:wp('3%'),
    textAlign:"center"
},
button:{
    borderRadius:25,
    width: wp("70%")
},
memberContainer:{
    flex:1,
},
memberBox:{
    borderTopColor:'#f5f5f5',
    borderTopWidth:1,
    backgroundColor:theme.colors.white,
    paddingHorizontal:wp('5%'),
    paddingVertical:wp('4%'),
    flexDirection:"row",
    alignItems:"center"
},
avatar:{
    flex:0,
/*     height:hp('7%'),
    width:wp('15%'), */
    height:70,
    width:70,
    backgroundColor:theme.colors.background,
    borderRadius:35
},
memberName:{
    fontSize:wp('4%'),
    // fontFamily:"OpenSans-Regular",
    fontFamily:"OpenSans-Regular", 
    color:theme.colors.dark,
    paddingLeft:wp('4%')
}

})