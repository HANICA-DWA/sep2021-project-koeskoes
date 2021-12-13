import { Selector } from 'testcafe';

const checkoutFixture = (skip = false) => {
  const page = `http://localhost:3000/checkout`;
  if (skip) {
    fixture.skip(`Giftle`).page(page);
  }
  else {
    fixture(`Giftle`).page(page);
  }
}

checkoutFixture();

test("Create new order (happy path)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('h1').innerText).eql(`Bedankt voor het kopen van een Giftle!`);
});

checkoutFixture();

test("Create new order (no e-mail)", async (test) => {
  await test
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('div.alert').find('div').innerText).eql(`E-mailadres mag niet leeg zijn!`);
});

checkoutFixture();

test("Create new order (no firstname)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#lastname", "lastname")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('div.alert').find('div').innerText).eql(`De voor- en achternaam moeten ingevuld worden!`);
});

checkoutFixture();

test("Create new order (no lastname)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "firstname")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('div.alert').find('div').innerText).eql(`De voor- en achternaam moeten ingevuld worden!`);
});

checkoutFixture();

test("Create new order (firstname to long > 300 characters)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "ibhjasfeijhbawedijbjbiawjbawjibadefwaefuiiuwadkhjbadwkhbaewfbseafbjikesbfibeihjkfbasjkefdbiukajwbndkjawbvkjda ihfdbnawjkbfiuabfdhkjabkjdbaiwudnbjkhabidawnihdhakwjbdiuasbdchjasbkjdbaiudbnwakhbdkjabidbakjwbdkajwbdkujabnkjdwbakjdbakwjhbdkjawbdkjasbjhkdbakjsdbkjasndkjasnkjdabnskjdbakjsbdkjahbsdjkabjkwdbk")
    .typeText("#lastname", "lastname")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('div.alert').find('div').innerText).eql(`De voor- en/of achternaam die je hebt ingevuld is te lang! De naam mag maximaal 300 karakters lang zijn.`);
});

checkoutFixture();

test("Create new order (lastname to long > 300 characters)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "ibhjasfeijhbawedijbjbiawjbawjibadefwaefuiiuwadkhjbadwkhbaewfbseafbjikesbfibeihjkfbasjkefdbiukajwbndkjawbvkjda ihfdbnawjkbfiuabfdhkjabkjdbaiwudnbjkhabidawnihdhakwjbdiuasbdchjasbkjdbaiudbnwakhbdkjabidbakjwbdkajwbdkujabnkjdwbakjdbakwjhbdkjawbdkjasbjhkdbakjsdbkjasndkjasnkjdabnskjdbakjsbdkjahbsdjkabjkwdbk")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('div.alert').find('div').innerText).eql(`De voor- en/of achternaam die je hebt ingevuld is te lang! De naam mag maximaal 300 karakters lang zijn.`);
});

checkoutFixture();

test("Create new order (firstname empty string)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", " ")
    .typeText("#lastname", "lastname")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('div.alert').find('div').innerText).eql(`De voor- en achternaam moeten ingevuld worden!`);
});

checkoutFixture();

test("Create new order (lastname empty string)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", " ")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('div.alert').find('div').innerText).eql(`De voor- en achternaam moeten ingevuld worden!`);
});

checkoutFixture();

test("Create new order (e-mail empty string)", async (test) => {
  await test
    .typeText("#email", " ")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('div.alert').find('div').innerText).eql(`E-mailadres mag niet leeg zijn!`);
});

checkoutFixture();

test("Create new order (wrong e-mail format without @)", async (test) => {
  await test
    .typeText("#email", "mailmail.com")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('div.alert').find('div').innerText).eql(`Vul een geldig e-mailadres in.`);
});

checkoutFixture();

test("Create new order (wrong e-mail format without .)", async (test) => {
  await test
    .typeText("#email", "mail@mailcom")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('div.alert').find('div').innerText).eql(`Vul een geldig e-mailadres in.`);
});

checkoutFixture();

test("Create new order (checkbox not checked)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click(`div[id="createOrder"] button`)
    .expect(Selector('h1').innerText).eql(`Bedankt voor het plaatsen van een bestelling bij onze webshop!`);
});
