export const SimpleChangeTextHelper = (valueText, mention) => {
  let filteredArray = [];
  let splitArr = valueText.split(' ');
  mention.map((item, index) => {
    if (matchSlitValue(splitArr, item?.name)) {
      filteredArray.push(item);
    }
  });
  filteredArray.map((item, index) => {
    valueText = valueText.replaceAll(item?.name, '');
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
