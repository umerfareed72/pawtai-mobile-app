export const UserNameHelper = (userList, valueText) => {
  let filteredArray = [];
  let splitArr = valueText?.split(' ');
  userList.map((item, index) => {
    if (matchSlitValue(splitArr, '@' + item?.id + '@')) {
      filteredArray.push(item);
    }
  });
  filteredArray.map((item, index) => {
    valueText = valueText.replaceAll('@' + item?.id + '@', item?.username);
  });
  return valueText;
};

const matchSlitValue = (splitArr, value) => {
  for (let i = 0; i < splitArr.length; i++) {
    if (splitArr[i] === value) {
      return true;
    }
  }
  return false;
};
