import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {Colors} from '../../../Theme';

export const Wrapper = styled.View`
  background-color: ${Colors.themeColor};
  flex: 1;
  padding-bottom: 10px;
  padding-horizontal: 10%;
`;

export const CredientialsWrapper = styled.View`
  flex: 1;
`;

export const LogoImage = styled.Image`
  margin-top: 100px;
  width: 100px;
  height: 160px;
  align-self: center;
`;

export const Welcomelabel = styled.Text`
  margin-top: 30px;
  align-self: center;
  font-size: 24px;
  color: ${Colors.white};
`;

export const Loginlabel = styled.Text`
  margin-top: 10px;
  align-self: center;
  font-size: 34px;
  color: ${Colors.white};
  font-weight: 700;
`;

export const ForgetPasswordWrapper = styled.Text`
  font-size: 11px;
  align-self: flex-end;
  margin: 10px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #000;
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
