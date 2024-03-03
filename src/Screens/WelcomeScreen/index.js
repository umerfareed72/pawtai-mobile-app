import React, {useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {useTranslation} from '../../LanguageContext';
import {Images, Colors, Constants} from '../../Theme';
import {ButtonComponent} from '../../Components';
import {
  Wrapper,
  MainContainer,
  Image1,
  Welcomelabel,
  Loginlabel,
  FooterContaienr,
  FooterMainContaienr,
  CardWrapper,
} from './style';
import CarouselView, {Pagination} from 'react-native-snap-carousel';
import colors from '../../Theme/Colors';
import MyStatusBar from '../../Components/Header/statusBar';

const WelcomeScreen = props => {
  //Declaration
  const Language = useTranslation();
  const [index, setIndex] = useState(0);
  //Slider Cards
  const slides = [
    {
      key: 1,
      title: Language.WelcomeLabel,
      title2: Language.WelcomeTitle,

      image: Images.WelcomeImage1,
    },
    {
      key: 2,
      title: Language.WelcomeTextJoinPotai,
      title2: Language.WelcomeTextCreatYourPawtai,
      image: Images.WelcomeImage2,
    },
    {
      key: 3,
      title: Language.WelcomeTextAddActivity,
      title2: Language.WelcomeTextRecordActivity,

      image: Images.WelcomeImage3,
    },
  ];
  //Move Next Function
  const _moveToNextprimary = () => {
    _carousel1.snapToNext();
    if (index == 2) {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'HomeScreen'}],
        }),
      );
    }
  };
  //Welcome Cards
  const welcomeCards = ({item}) => {
    return (
      <CardWrapper>
        <View>
          <Image1 source={item.image} />
        </View>
        <View>
          <View style={{paddingVertical: 10}}>
            <Welcomelabel>{item.title}</Welcomelabel>
            <Loginlabel>{item.title2}</Loginlabel>
          </View>
          <View>
            <Pagination
              carouselRef={_carousel1}
              dotsLength={slides.length}
              activeDotIndex={index}
              dotStyle={styles.DotStyle}
              dotColor={colors.input_Black}
              inactiveDotColor={colors.white}
              inactiveDotOpacity={1}
              inactiveDotScale={1}
              tappableDots={true}
            />
          </View>
        </View>
      </CardWrapper>
    );
  };
  return (
    <Wrapper>
      <MyStatusBar
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />
      <MainContainer>
        <CarouselView
          layout="default"
          inactiveSlideOpacity={1}
          ref={c => {
            _carousel1 = c;
          }}
          data={slides}
          renderItem={welcomeCards}
          sliderWidth={Constants.windowWidth}
          itemWidth={Constants.windowWidth}
          onSnapToItem={i => setIndex(i)}
        />
      </MainContainer>
      <FooterContaienr>
        <FooterMainContaienr>
          <ButtonComponent
            buttonText={
              index == 2
                ? Language.WelcomeButtonSubmit
                : Language.WelcomeButtonNext
            }
            buttonOnPress={() => _moveToNextprimary()}
            color={Colors.themeColor}
          />
        </FooterMainContaienr>
      </FooterContaienr>
    </Wrapper>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  DotStyle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 0,
  },
});
