import React from 'react';
import {Wrapper, Input, Icon} from './styles';
import {Colors} from '../../Theme';

const InputField = ({
  placeholder,
  props,
  icon,
  iconStyle,
  onChangeText,
  onBlur,
  blurOnSubmit,
  secureTextEntry,
  keyboardType,
  onSubmitEditing,
  returnKeyType,
}) => {
  return (
    <Wrapper>
      {icon && <Icon source={icon} iconStyle={iconStyle} />}
      <Input
        placeholder={placeholder}
        placeholderTextColor={Colors.themeGreyText}
        onChangeText={onChangeText}
        onBlur={onBlur}
        blurOnSubmit={blurOnSubmit}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        {...props}
      />
    </Wrapper>
  );
};

export default InputField;
