const { promises: fs, read } = require('fs');
const readme = require('./readme');

const msInOneDay = 1000 * 60 * 60 * 24;

function generateNewREADME() {
  const readmeRow = readme.split('\n');

  // * DBNW = Day Before New Year
  const DBNWIndex = findIdentifierIndex(readmeRow, 'day_before_new_years');
  readmeRow[DBNWIndex] = getDBNWSentence();

  //* AB = Age and birthday
  const ABIndex = findIdentifierIndex(readmeRow, 'age_and_birthday');
  readmeRow[ABIndex] = getAgeAndBirthdaySentence();

  return readmeRow.join('\n');
}

function getAgeAndBirthdaySentence() {
  const birthdate = new Date('2002-05-06T00:00:00.000Z');
  const today = new Date();
  const diff = birthdate - today;

  // to get my current ages
  const age = new Date(diff).getFullYear() - 1970;

  const timeUntilBirthday = birthdate - new Date(String(birthdate.getFullYear + 1));
  const dayUntilBirthday = Math.round(timeUntilNewYear / msInOneDay);

  return `I am ${age} years old... But I will be ${
    age + 1
  } in ${dayUntilBirthday} days 🎉`;
}

function getDBNWSentence() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const nextYearDate = new Date(String(nextYear));

  const timeUntilNewYear = nextYearDate - now;
  const dayUntilNewYear = Math.round(timeUntilNewYear / msInOneDay);

  return `**${dayUntilNewYear} day before ${nextYear} ⏱**`;
}

const findIdentifierIndex = (rows, identifier) =>
  rows.findIndex((r) => Boolean(r.match(new RegExp(`<#${identifier}>`, i))));

const updateREADMEFile = (text) =>
  fs.writeFile('./README.md', text, (e) => console.log(text));

function main() {
  const newREADME = generateNewREADME();
  console.log(newREADME);
  updateREADMEFile(newREADME);
}
main();
