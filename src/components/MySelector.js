import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
// import DropDownPicker from 'react-native-dropdown-picker';
import RNPicker from "rn-modal-picker";
export default class MySelector extends Component {
    render() {
        return (
            <View style={[{ marginVertical: 8, }, this.props.style]}>
                <Text style={{
                    color: '#000',
                    marginHorizontal: 15,
                    marginVertical: 3,

                    fontSize: Platform.OS == "ios" ? 14 : 13,
                }}>{this.props.label}</Text>



                <RNPicker
                    dataSource={this.props.items}
                    dummyDataSource={this.props.items}
                    // defaultValue={}
                    pickerTitle={this.props.placeholder}
                    showSearchBar={this.props.showSearchBar}
                    disablePicker={false}
                    changeAnimation={"fade"}
                    searchBarPlaceHolder={"Search....."}
                    showPickerTitle={true}
                    selectedLabel={this.props.value}
                    placeHolderLabel={this.props.placeholder}
                    searchBarContainerStyle={Styles.searchBarContainerStyle}
                    pickerStyle={Styles.pickerStyle}
                    itemSeparatorStyle={Styles.itemSeparatorStyle}
                    pickerItemTextStyle={Styles.listTextViewStyle}
                    selectLabelTextStyle={Styles.selectLabelTextStyle}
                    placeHolderTextStyle={Styles.placeHolderTextStyle}
                    dropDownImageStyle={Styles.dropDownImageStyle}
                    selectedValue={(index, item) => this.props.onSelectItem(index, item)}
                />


            </View>

        )
    }
}


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    itemSeparatorStyle: {
        height: 1,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#D3D3D3"
    },
    searchBarContainerStyle: {
        marginBottom: 10,
        flexDirection: "row",
        height: 40,
        shadowOpacity: 1.0,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        backgroundColor: "rgba(255,255,255,1)",
        shadowColor: "#d3d3d3",
        borderRadius: 10,
        elevation: 3,
        marginLeft: 10,
        marginRight: 10
    },

    selectLabelTextStyle: {
        color: "#000",
        textAlign: "left",
        width: "99%",
        padding: 10,
        flexDirection: "row",

        fontSize: Platform.OS == "ios" ? 15 : 14,
    },
    placeHolderTextStyle: {
        color: "#909090",
        padding: 10,
        textAlign: "left",
        width: "99%",
        flexDirection: "row",

        fontSize: Platform.OS == "ios" ? 15 : 14,
    },
    dropDownImageStyle: {
        marginLeft: 10,
        width: 10,
        height: 10,
        alignSelf: "center"
    },
    listTextViewStyle: {
        color: "#000",
        marginVertical: 10,
        flex: 0.9,
        marginLeft: 20,
        marginHorizontal: 10,
        textAlign: "left",

        fontSize: Platform.OS == "ios" ? 15 : 14,
    },
    pickerStyle: {
        marginLeft: 15,
        paddingRight: 30,
        marginRight: 5,
        marginBottom: 2,
        shadowRadius: 10,
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#707070',
    }
});

