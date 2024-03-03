import styled from 'styled-components/native';
import colors from '../../../Theme/Colors';

export const Wrapper = styled.View`
  background-color: ${colors.white};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled.Text`
  color: palevioletred;
`;
export const InsideWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;
export const ButtonWrapper = styled.TouchableOpacity`
  align-items: flex-end;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
  right: 20px;
  border-radius: 100px;
  padding-horizontal: 20px;
  padding-vertical: 20px;
  background-color: ${colors.themeColor};
`;
export const ImageCard = styled.Image`
  height: 15px;
  width: 15px;
  resize-mode: contain;
  tint-color: ${colors.white};
`;
