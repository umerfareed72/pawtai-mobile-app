import styled from 'styled-components/native';
import {Colors} from '../../../Theme';

export const Wrapper = styled.View`
  background-color: ${Colors.themeColor};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const MainWrapper = styled.View`
  flex: 1;
  justify-content: center;
  padding-horizontal: 10%;
  width: 100%;
`;

export const Welcomelabel = styled.Text`
  margin-top: 5px;
  align-self: center;
  font-size: 16px;
  color: ${Colors.white};
  text-align: center;
`;

export const CameraImage = styled.Image`
  width: 40px;
  height: 40px;
`;
export const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

export const Title = styled.Text`
  align-self: center;
  font-size: 34px;
  color: ${Colors.white};
  font-weight: 700;
`;

export const OrWrapper = styled.Text`
  font-size: 14px;
  align-self: center;
  margin: 10px;
  color: ${Colors.white};
`;

export const GalleryContainer = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${Colors.white};
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 40px;
`;

export const GalleryText = styled.Text`
  font-size: 10px;
`;
