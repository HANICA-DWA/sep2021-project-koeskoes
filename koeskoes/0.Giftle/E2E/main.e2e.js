import { Selector } from 'testcafe';

fixture`Giftle`.page`http://localhost:3000/checkout`;

test("Submit a form", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click(`input[id="checkBoxGiftle"]`)
    .click(`div[id="createOrder"] button`)
    .expect(Selector('h1').innerText).eql(`Bedankt voor het kopen van een Giftle!`);
});
