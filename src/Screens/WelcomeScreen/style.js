import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {Colors, Constants} from '../../Theme';

export const Wrapper = styled.View`
  background-color: ${Colors.themeColor};
  flex: 1;
`;

export const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
export const CardWrapper = styled.View`
  height: 98%;
  justify-content: space-between;
  align-items: center;
`;

export const Image1 = styled.Image`
  width: ${Dimensions.get('screen').height / 3};
  height: ${Dimensions.get('screen').width};
  align-self: center;
  resize-mode: contain;
`;

export const Image2 = styled.Image`
  margin-top: 100px;
  width: 312px;
  height: 302px;
  align-self: center;
`;

export const Welcomelabel = styled.Text`
  margin-top: 30px;
  align-self: center;
  font-size: 20px;
  color: ${Colors.white};
`;

export const Loginlabel = styled.Text`
  margin-top: 10px;
  align-self: center;
  font-size: 34px;
  color: ${Colors.white};
  font-weight: 700;
`;

export const FooterContaienr = styled.View`
  height: 15%;
`;

export const FooterMainContaienr = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${Constants.windowWidth}px;
  background-color: #fff;
  padding-horizontal: 10%;
`;
