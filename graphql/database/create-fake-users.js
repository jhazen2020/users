const { faker } = require('@faker-js/faker');
const fs = require('fs');
const { join } = require('path');

/**
 * creates a json file with fake data.
 * @date 7/31/2023 - 10:47:35 AM
 *
 */
let users = [];
for (let i = 1; i < 150; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const phone = faker.phone.number('+1###555####');

  users.push({
    id: i,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phone,
  });
}
const json = JSON.stringify(users);

fs.writeFile(
  join(process.cwd(), '/database/fake-users.json'),
  json,
  'utf8',
  () => console.log('fake-users.json has been created.'),
);
