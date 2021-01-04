import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Platform,
} from 'react-native';
import {Styles} from './Style/MedicalRecordFormStyle';
import {theme, images} from '../../constants';
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  Button,
  Input,
  IndexPath,
  Select,
  SelectItem,
  Text as Texts,
} from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/_MedicalRecord';
import MedicalRecordsService from '../../services/MedicalRecordsService';
import ClosingHeader from '../../components/header/ClosingHeader';
import * as RootNavigation from '../../navigation/RootNavigation';
import {IMAGE_URL} from '../../API_URI';
import SeededData from '../../services/SeededData';
import {ActivityIndicator} from 'react-native-paper';
import {ScrollView} from 'react-native';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const {icons} = images;
function _MedicalRecordForm(props) {
  const {navigation} = props;
  const {icons, loader} = images;
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [file, setFile] = useState([]);
  const [text, setText] = useState('');
  const [familyMember, setFamilyMember] = useState('');
  const [recordID, setRecordID] = useState(0);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayValue, setDisplay] = useState();
  const [recordLoading, setRecordLoading] = useState(false);
  const [imageloading, setImageLoading] = useState(true);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    getProps();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      let selectedVal = data.filter((d) => {
        return d.id == selectedIndex.row;
      });
      if (selectedVal.length > 0) {
        setDisplay(selectedVal[0]);
      } else {
        setDisplay(data[0]);
      }
    }
  }, [selectedIndex, data]);

  const getProps = () => {
    let service = new SeededData();
    AsyncStorage.getItem('loginData').then((user) => {
      user = JSON.parse(user);
      AsyncStorage.getItem('lang').then((lang) => {
        if (lang == null) {
          lang = 1;
        }
        service
          .get({
            Codes: ['MEDRECTYP'],
            LanguageId: lang,
            token: user.accessToken,
          })
          .then((res) => res.json())
          .then((res) => {
            setData(res.seededDatas[0].options);
            console.warn(res.seededDatas[0].options);
          });
      });
    });

    if (props.route.params.familyMember != undefined) {
      setFamilyMember(props.route.params.familyMember.id);
    }
    if (props.route.params.medicalRecord != undefined) {
      props.navigation.setOptions({
        headerTitle: () => (
          <ClosingHeader {...props} title="Edit Medical Record" />
        ),
      });
      let record = props.route.params.medicalRecord;
      getRecord(record);
    } else {
      props.navigation.setOptions({
        headerTitle: () => (
          <ClosingHeader {...props} title="Create Medical Record" />
        ),
      });
    }
  };

  const updateRecord = (record) => {
    setText(record.description);
    setFamilyMember(record.familyMemberID);
    if (record.medicalRecordTypeSD == null) {
      setSelectedIndex(new IndexPath(0));
    } else {
      setSelectedIndex(new IndexPath(record.medicalRecordTypeSD));
    }
    let f = record.files;
    f.map((fi) => {
      fi.uri = IMAGE_URL + fi.file_src;
    });
    setFile(f);
    setUpdate(true);
    setRecordID(record.id);
  };

  const getRecord = async (record) => {
    if (record != null) {
      setRecordLoading(true);
      let r = record;
      let api = new MedicalRecordsService();
      let user = await AsyncStorage.getItem('loginData');
      let lang = await AsyncStorage.getItem('lang');
      if (lang == null) {
        lang = 1;
      } else {
        lang = JSON.parse(lang);
      }
      user = JSON.parse(user);
      let req = {
        ID: r.id,
        LanguageId: lang,
        token: user.accessToken,
      };
      let res = await api.getById(req).then((res) => res.json());
      updateRecord(res.medicalRecord);
      setRecordLoading(false);
    }
  };

  const LoadingIndicator = (props) => (
    <View style={Styles.indicator}>
      <Image source={loader.white} />
    </View>
  );

  const renderOption = (title, index) => {
    return <SelectItem key={index} title={title.title} />;
  };

  const openImageLibrary = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('selected picture for medical record ', response);

        let f = [...file];
        const source = {
          FileName: response.fileName,
          FileSize: response.fileSize,
          FileType: response.type,
          FileAsBase64: response.data,
        };
        let finalUri =
          Platform.OS === 'ios'
            ? response.uri.replace('file://', '/private')
            : response.uri;
        f.push({File: source, uri: finalUri});
        setFile(f);
        setVisible(false);
      }
    });
  };

  const openCamera = () => {
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let f = [...file];
        const source = {
          FileName: response.fileName,
          FileSize: response.fileSize,
          FileType: response.type,
          FileAsBase64: response.data,
        };
        let finalUri =
          Platform.OS === 'ios'
            ? response.uri.replace('file://', '/private')
            : response.uri;
        f.push({File: source, uri: finalUri});
        setFile(f);
        setVisible(false);
      }
    });
  };

  const createMedicalRecord = () => {
    setLoading(true);
    let formData = {
      MedicalRecord: {
        MedicalRecordTypeSD: displayValue.id,
        Description: text,
        Files: file,
      },
    };

    AsyncStorage.getItem('loginData').then((user) => {
      user = JSON.parse(user);
      let auth = new MedicalRecordsService();
      formData.token = user.accessToken;
      formData.MedicalRecord.UserId = user.currentUserID;
      formData.MedicalRecord.FamilyMemberID = familyMember;
      if (update) {
        formData.MedicalRecord.ID = recordID;

        console.log(
          '\n\n\n\nformdata to update record',
          JSON.stringify(formData.MedicalRecord.Files, null, 4),
        );
        // return
        auth
          .update(formData)
          .then((res) => res.json())
          .then((res) => {
            setLoading(false);
            if (res.id == 0) {
              alert(
                'Some Backed Error Check\n' + res.returnStatus.returnMessage,
              );
            } else {
              alert('Record Updated Successfully!');
              RootNavigation.navigate('MyMedicalRecords');
            }
          });
      } else {
        auth
          .create(formData)
          .then((res) => res.json())
          .then((res) => {
            setLoading(false);
            if (res.id == 0) {
              alert(
                'Some Backed Error Check\n' + res.returnStatus.returnMessage,
              );
            } else {
              alert('Record Added Successfully!');
              RootNavigation.navigate('MyMedicalRecords');
            }
          });
      }
    });
  };

  const removeImage = (image) => {
    let i = file.indexOf(image);
    let f = [...file];
    f.splice(i, 1);
    setFile(f);
  };

  return (
    <ScrollView>
      {recordLoading && (
        <View
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            alignContent: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
      {!recordLoading && (
        <View style={Styles.mainContainer}>
          <View style={Styles.topContainer}>
            <View style={Styles.fieldContainer}>
              <Text
                style={{
                  fontFamily: 'AvenirNextCondensed-Medium',
                  fontSize: 16,
                  lineHeight: 22,
                  marginBottom: 11.86,
                }}>
                Describe Your Medical Record
              </Text>
              <Input
                numberOfLines={7}
                multiline={true}
                textStyle={{
                  color: theme.colors.black,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  textAlignVertical: 'top',
                }}
                onChangeText={(text) => setText(text)}
                style={[
                  Styles.inputBox,
                  {
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    textAlignVertical: 'top',
                  },
                ]}
                value={text}
                type="basic"
                multiline={true}
              />
            </View>
            <View style={Styles.fieldContainer}>
              <Text
                style={{
                  fontFamily: 'AvenirNextCondensed-Medium',
                  fontSize: 16,
                  lineHeight: 22,
                  marginBottom: 11.86,
                }}>
                Select Type
              </Text>
              {data.length > 0 && displayValue != undefined && (
                <Select
                  value={displayValue.title}
                  selectedIndex={selectedIndex}
                  onSelect={(index) => {
                    setSelectedIndex(new IndexPath(data[index - 1].id));
                  }}>
                  {data.map(renderOption)}
                </Select>
              )}
              {data.length == 0 && displayValue == undefined && (
                <>
                  <Select value="Loading...">
                    <SelectItem title={'Loading...'} />
                  </Select>
                </>
              )}
            </View>

            <View style={Styles.fieldContainer}>
              <Text
                style={{
                  fontFamily: 'AvenirNextCondensed-Medium',
                  fontSize: 16,
                  lineHeight: 22,
                  marginBottom: 11.86,
                }}>
                Add File or Photo
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={Styles.addFileContainer}>
                  <TouchableOpacity onPress={() => setVisible(true)}>
                    <AntDesign
                      name="addfile"
                      color={theme.colors.primary}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                {file != '' &&
                  file.map((f) => {
                    return (
                      <TouchableOpacity
                        onPress={() => removeImage(f)}
                        style={Styles.addFileContainer}>
                        <Image
                          onLoadEnd={() => setImageLoading(false)}
                          source={f}
                          style={Styles.file}
                        />
                        <Icon
                          name="close"
                          style={{position: 'absolute', top: 10, right: 5}}
                        />
                        {imageloading && (
                          <ActivityIndicator
                            size="small"
                            color={theme.colors.primary}
                            style={{position: 'absolute', top: '50%'}}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>
          </View>
          <View style={Styles.buttonContainer}>
            <View>
              <Button
                onPress={() => navigation.goBack()}
                appearance="outline"
                status="basic"
                style={Styles.button}
                size="large"
                block>
                Cancel
              </Button>
            </View>
            <View>
              <Button
                accessoryLeft={() => (loading ? LoadingIndicator() : null)}
                onPress={!loading ? createMedicalRecord : null}
                appearance="primary"
                status="primary"
                style={Styles.button}
                disabled={text != '' ? false : true}
                size="large"
                block>
                {!loading ? (update ? 'Update' : 'Create') : ''}
              </Button>
            </View>
          </View>
        </View>
      )}

      <Modal
        transparent={true}
        visible={visible}
        animated={true}
        onRequestClose={() => setVisible(false)}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: hp('20%'),
              width: wp('90%'),
              margin: 20,
              backgroundColor: theme.colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                position: 'absolute',
                top: 0,
                marginTop: 10,
                fontSize: 20,
              }}>
              Add Photo
            </Text>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{alignSelf: 'flex-end', marginTop: 10}}>
              <Icon
                name="close"
                style={{alignSelf: 'center', color: '#000', fontSize: 32}}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignContent: 'space-between',
                justifyContent: 'center',
                height: hp('15%'),
              }}>
              <TouchableOpacity
                onPress={openImageLibrary}
                style={{
                  flex: 1,
                  marginVertical: 25,
                  marginLeft: wp('15%'),
                  marginRight: 13,
                  backgroundColor: '#F8F8FA',
                  borderRadius: 28,
                  justifyContent: 'center',
                }}>
                <Icon
                  name="image"
                  style={{alignSelf: 'center', color: '#000', fontSize: 32}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={openCamera}
                style={{
                  flex: 1,
                  marginVertical: 25,
                  marginRight: wp('15%'),
                  backgroundColor: '#F8F8FA',
                  borderRadius: 28,
                  justifyContent: 'center',
                }}>
                <Icon
                  name="camera"
                  style={{alignSelf: 'center', color: '#000', fontSize: 32}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    _DEVICE_ID: state.DeviceInfoReducer._DEVICE_ID,
    loading: state.LoadingReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMedicalRecords: (formdata) =>
      dispatch(action.CreateUserMedicalRecord(formdata)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(_MedicalRecordForm);
