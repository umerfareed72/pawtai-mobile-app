import styled from 'styled-components/native';
import {Colors} from '../../../Theme';
import {Dimensions} from 'react-native';
export const Wrapper = styled.View`
  background-color: ${Colors.themeColor};
  flex: 1;
  padding-bottom: 10px;
  padding-horizontal: 8%;
`;

export const CredientialsWrapper = styled.View`
  flex: 1;
`;

export const LogoImage = styled.Image`
  margin-top: 20;
  width: 100px;
  height: 140px;
  align-self: center;
`;

export const Welcomelabel = styled.Text`
  margin-top: 30px;
  align-self: center;
  font-size: 24px;
  color: ${Colors.white};
`;

export const Titlelabel = styled.Text`
  margin-top: 10px;
  align-self: center;
  margin-bottom: 30px;
  font-size: 34px;
  color: ${Colors.white};
  font-weight: 700;
`;

export const ForgetPasswordWrapper = styled.TouchableOpacity`
  margin: 10px;
  align-self: flex-end;
  font-size: 11px;
`;

export const ForgetPasswordText = styled.Text`
  font-size: 11px;
`;

export const OrWrapper = styled.Text`
  font-size: 14px;
  align-self: center;
  margin: 10px;
  color: ${Colors.white};
`;

export const ErrorView = styled.View`
  margin-top: 10;
  padding-left: 10;
`;

export const ErrorText = styled.Text`
  color: ${Colors.Red};
`;
