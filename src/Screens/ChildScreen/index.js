import React, { Component } from 'react';
import { View, Text, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ButtonComponent, InputField } from '../../Components';
import SocketIOClient from "socket.io-client";
import { RNLockScreen } from 'react-native-lock-screen';
import { WebView } from 'react-native-webview';

import { captureScreen } from "react-native-view-shot";

import { Wrapper } from './style';
import images from '../../Theme/Images';
/**
 * 
 * this.socket = SocketIOClient('https://socket.thewavesapp.online/', {
            'reconnect\n': true,
            'reconnectionDelay': 500,
            'reconnectionAttempts': Infinity,
            'transports': ['websocket'],
        });
        this.socket.emit('addUser', { username: this.state.myusername });

 * @param {*} props 
 * @returns 
 */
class ChildScreen extends Component {



  constructor(props) {
    super(props)
    this.state = {
      lock: false,
      input: '',
      modal: false,
    }
    this.socket = SocketIOClient('http://44.193.213.73/', {
      'reconnect\n': true,
      'reconnectionDelay': 500,
      'reconnectionAttempts': Infinity,
      'transports': ['websocket'],
    });
    this.socket.emit('addUser', { username: 'child' });
    this.socket.on('message', this.receiveData);

  }
  receiveData = (data) => {
    console.log({ data });
    if (data.type === 'lock') {
      this.setState({
        lock: true
      })
    }
    if (data.type === 'unlock') {
      this.setState({
        lock: false
      })
    }
    if (data.type === 'lock10') {
      setTimeout(() => {
        this.setState({
          lock: true
        })
      }, 10000)
    }
    if (data.type === 'capture') {
      this.capture()
    }
  }
  capture = () => {
    captureScreen({
      format: "jpg",
      quality: 0.5,
      result: 'base64'
    }).then(
      uri => {
        this.socket.emit('sendMessage', {
          username: 'parent', type: 'Image', image: 'data:image/jpeg;base64,' + uri
        })

      },
      error => console.error("Oops, snapshot failed", error)
    );

  }
  textOnchange = (val) => {
    this.setState({
      input: val
    })
  }
  render() {



    if (this.state.modal) {
      return (
        <View style={{ flex: 1, height: '100%', width: '100%', paddingTop: 30, }}>
          <SafeAreaView>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  modal: false
                })
              }}
              style={{
                marginTop: 'auto',
              }}
            >

              <View style={{ backgroundColor: '#fece00', padding: 10, borderRadius: 5, width: 100, marginBottom: 20, }}>

                <Text style={{ fontWeight: '600', color: '#000', fontSize: 18, }} onPress={() => {
                  this.setState({
                    modal: false
                  })
                }}>
                  x=Close
                </Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
          <WebView source={{ uri: 'https://google.com/' }} style={{
            flex: 1,
            height: '100%',
            width: '100%'
          }} />
        </View>
      )
    }
    if (this.state.lock) {
      return <RNLockScreen type={1}
        mode={0}
        onCapture={lock => {
          console.log('lock: ' + lock);
        }}
        onVerified={() => {
          console.log('lock verified');
          this.setState({
            lock: false
          })
        }}
        backgroundImage={images.background}
        lock={"1234"}
      // headerFragmentProps={{
      //   backgroundColor: '#2777ae'
      // }}


      />
    }
    else
      return (
        <Wrapper>




          <Text style={{
            fontSize: 20
          }}>Welcome Child</Text>

          <ButtonComponent
            buttonText={"Open Browser"}
            buttonOnPress={() => {
              this.setState({
                modal: true
              })
            }}
            color={"#000"}

          />
          <InputField
            keyboardType="email-address"
            disableFullscreenUI={true}
            autoCapitalize="none"
            secureTextEntry={false}
            placeholder={'Enter Something'}
            onChangeText={text => this.textOnchange(text)}
          />
        </Wrapper>
      );
  }

};

const mapStateToProps = state => {
  return { UserDetail: state.USER_DETAIL };
};

export default connect(mapStateToProps)(ChildScreen);
