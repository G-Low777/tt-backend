const addresses = ['Баки Урманче 24', 'Шинников 5', 'Кайманова 3', 'Чишмале 5', 'Строителей 54'];
const mfs = [
  'ООО УК «ЖКХ Центр»',
  'ООО УК «ЖКХ Кама»',
  'ООО УК «ЖКХ–8»',
  'ООО УК «ЖКХ Стройхимсервис»',
];
const messages = [
  'Отсутствие подключения с вычислителем',
  'Неполадки с вычислителем',
  'Неполадки с ОДПУ',
];
const devices = ['ВКТ-7', 'ТВ-7', 'КТПТР', 'ТВ-7.04.1', 'ТВ-7.03.1', 'КТСБ'];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTask(id) {
  const today = new Date();

  return {
    id,
    number: getRandomNumber(1e3, 1e6),
    address: addresses[getRandomNumber(0, addresses.length - 1)],
    mf: mfs[getRandomNumber(0, mfs.length - 1)],
    message: messages[getRandomNumber(0, messages.length - 1)],
    device: devices[getRandomNumber(0, devices.length - 1)],
    deviceId: getRandomNumber(1e5, 1e7),
    creationTime: today.toJSON(),
  };
}

export function getTasks() {
  const tasks = Array(50);

  for (let i = 0; i < 50; i++) {
    tasks[i] = generateTask(i + 1);
  }

  return tasks;
}
