import React, { Component } from "react";
import { View, Modal,  ActivityIndicator } from "react-native";
import {Colors} from "../../Theme/"

class LoadingComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Modal transparent={true} style={styles.flex1} {...this.props} >
                    <View style={styles.Container}>
                        <ActivityIndicator size="large" color={Colors.themeColor} />
                    </View>
                </Modal>
            </>
        );
    }
}
const styles = {
    flex1:{
        flex: 1
    },
    Container:{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' , 
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
};
export default LoadingComponent;