export const EmojiHelper = val => {
  var valueText = val;
  const EmojisArray = [
    //Poop
    'poop',
    'pooped',
    'poopes',
    'poops',
    'pooping',

    'shit',
    'dump',
    'number two',
    'number 2',
    '#2',
    'doo',
    'poo',
    //Eat
    'eat',
    'ate',
    'dinner',
    'lunch',
    'breakfast',
    'meal',
    'food',
    'fed',
    'feed',
    'eating',
    'eaten',
    'eats',
    // Drink
    'water',
    'drink',
    'drank',
    // EarDrops
    'ear drops',
    'eardrops',
    'ear med',
    //Medicine
    'medicine',
    'med',
    'pill',
    'supplement',
    //Sleep
    'sleep',
    'slept',
    'nap',
    'rest',
    'slept',
    'sleeping',
    //pee
    'pee',
    'piss',
    'peed',
    'pees',
    'peeing',
    'urinate',
    'number one',
    'number 1',
    '#1',
    'tinkle',
    //Train
    'train',
    'instruct',
    'teach',
    'taught',
    //Walk
    'walk',
    'walked',
    'walks',
    'walking',

    'stroll',
    //Fetch
    'fetch',
    //Accident
    'accident',
    //Bone
    'treat',
    'bone',
    //Teeth
    'teeth',
    'tooth',
    //Bath
    'bath',
    'wash',
    //haircut
    'haircut',
    'groom',
    //
    'doctor',
    'dr.',
    'vet',
    'dr',
    //
    'bad',
    'naughty',
    //
    'feeling good',
    //
    'cute',
    //
    'start',
    'begin',
    'began',
    //
    'end',
    'finish',
    'complete',
    'stop',
    //
    'love',
    'kiss',
    // 'p',
  ];
  const EmojArray = {
    poo: '💩',
    poop: '💩',
    pooped: '💩',
    poopes: '💩',
    poops: '💩',
    pooping: '💩',
    shit: '💩',
    dump: '💩',
    'number two': '💩',
    'number 2': '💩',
    '#2': '💩',
    doo: '💩',
    //Eat
    eat: '🍲',
    ate: '🍲',
    dinner: '🍲',
    lunch: '🍲',
    breakfast: '🍲',
    meal: '🍲',
    food: '🍲',
    fed: '🍲',
    feed: '🍲',

    eating: '🍲',
    eaten: '🍲',
    eats: '🍲',
    //Bone
    treat: '🦴',
    bone: '🦴',
    //Drink
    water: '🚰',
    drink: '🚰',
    drank: '🚰',
    //EarDrops
    'ear drops': '👂💦',
    eardrops: '👂💦',
    'ear med': '👂💦',
    //Medicine
    medicine: '💊',
    med: '💊',
    pill: '💊',
    supplement: '💊',
    //Fetch
    fetch: '🥏',
    //Train
    train: '🚆',
    instruct: '🚆',
    teach: '🚆',
    taught: '🚆',
    //Sllep
    sleep: '💤',
    slept: '💤',
    nap: '💤',
    rest: '💤',

    slept: '💤',
    sleeping: '💤',
    //Pee
    pee: '🍋',
    piss: '🍋',
    urinate: '🍋',

    peed: '🍋',
    pees: '🍋',
    peeing: '🍋',
    'number one': '🍋',
    'number 1': '🍋',
    '#1': '🍋',
    tinkle: '🍋',
    //Wlak
    walk: '🐾',

    walked: '🐾',
    walks: '🐾',
    walking: '🐾',

    stroll: '🐾',
    accident: '🚨',
    //Teeth
    teeth: '🦷',
    tooth: '🦷',
    //Bath
    bath: '🛁',
    wash: '🛁',
    //Haircut
    haircut: '✂️',
    groom: '✂️',
    //
    doctor: '🩺',
    'dr.': '🩺',
    vet: '🩺',
    dr: '🩺',
    //
    bad: '😈',
    naughty: '😈',
    //
    'feeling good': '😌',
    //
    cute: '🐣',
    //
    start: '🏁',
    begin: '🏁',
    began: '🏁',
    //
    end: '🔚',
    finish: '🔚',
    complete: '🔚',
    stop: '🔚',
    //
    love: '❤️',
    kiss: '❤️',
    // p: '🍋',
  };
  const emojiScale = {
    poo: 0,
    poop: 0,
    pooped: 0,
    poopes: 0,
    poops: 0,
    pooping: 0,

    shit: 0,
    dump: 0,
    'number two': 0,
    'number 2': 0,
    '#2': 0,
    doo: 0,

    eat: 1,
    ate: 1,
    dinner: 1,
    lunch: 1,
    breakfast: 1,
    meal: 1,
    food: 1,
    fed: 1,
    feed: 1,

    eating: 1,
    eaten: 1,
    eats: 1,

    nap: 2,
    rest: 2,
    sleep: 2,
    slept: 2,
    slept: 2,
    sleeping: 2,

    pee: 3,
    piss: 3,
    urinate: 3,

    peed: 3,
    pees: 3,
    peeing: 3,
    'number one': 3,
    'number 1': 3,
    '#1': 3,
    tinkle: 3,

    walk: 4,
    walked: 4,
    walks: 4,
    walking: 4,

    stroll: 4,
    water: 5,
    drink: 5,
    drank: 5,
    // EarDrops
    'ear drops': 6,
    eardrops: 6,
    'ear med': 6,
    //Medicine
    medicine: 7,
    med: 7,
    pill: 7,
    supplement: 7,
    train: 8,
    instruct: 8,
    teach: 8,
    taught: 8,
    fetch: 9,
    treat: 10,
    bone: 10,
    accident: 11,
    //
    teeth: 12,
    tooth: 12,
    //Bath
    bath: 13,
    wash: 13,
    //haircut
    haircut: 14,
    groom: 14,
    //
    doctor: 15,
    'dr.': 15,
    vet: 15,
    dr: 15,
    //
    bad: 16,
    naughty: 16,
    //
    'feeling good': 17,
    //
    cute: 17,
    //
    start: 17,
    begin: 17,
    began: 17,
    //
    end: 18,
    finish: 18,
    complete: 18,
    stop: 18,
    //
    love: 19,
    kiss: 19,
    // p: 20,
  };
  // valueText=valueText.replaceAll('poop')
  let splitArr = valueText.split(' ');
  let filterEmojiArray = [];
  let filterEmojiScale = [];

  EmojisArray?.map(item => {
    if (
      matchSlitValue(splitArr, item) &&
      !filterEmojiScale?.includes(emojiScale[item])
    ) {
      filterEmojiArray?.push(item);
      filterEmojiScale?.push(emojiScale[item]);
    }
  });
  valueText = valueText + ' ';
  // define anything to remove the duplicates

  if (filterEmojiArray?.length == 0) {
    return valueText + '♥️';
  } else {
    for (let i = 0; i < filterEmojiArray?.length; i++) {
      valueText = valueText + EmojArray[filterEmojiArray[i]];
    }
  }

  return valueText;
};
const matchSlitValue = (splitArr, value) => {
  for (let i = 0; i < splitArr.length; i++) {
    if (splitArr[i].toLowerCase().match(value) ) {
      return true;
    }
  }
  return false;
};
