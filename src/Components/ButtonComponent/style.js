import styled from 'styled-components/native';
import {Colors} from '../../Theme';
import colors from '../../Theme/Colors';

export const Input = styled.TextInput`
  flex: 1;
  margin-left: 5px;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  background-color: ${props => (props.color ? props.color : '#FFFFFF47')};
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-top: 10px;
  width: 100%;
  height: 50px;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  color: ${props => (props.textcolor ? props.textcolor : colors.white)};
  font-weight: 700;
`;
