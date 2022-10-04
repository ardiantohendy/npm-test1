const fs = require("fs");
const validator = require("validator");
const Readline = require("readline");

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const validation = () => {
  rl.question("1. Add new contact\n2. Exit\nYour answer (1 or 2): ", (number) => {
    if (number == 1) {
      newContact();
    } else {
      rl.close();
    }
  });
};

const newContact = () => {
  rl.question("Insert name: ", (name) => {
    rl.question("Insert phone number: ", (phoneNumber) => {
      if (validator.isMobilePhone(phoneNumber, "id-ID")) {
        rl.question("Insert email: ", (email) => {
          if (validator.isEmail(email)) {
            const person = {
              name,
              phoneNumber,
              email,
            };
            const file = fs.readFileSync("data/contacts.json", "utf-8");
            const contacts = JSON.parse(file);
            contacts.push(person);
            fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
            console.log("Contact successfully added to phone!!!");
            validation();
          } else {
            console.log("Please insert correct email!!!");
            newContact();
          }
        });
      } else {
        console.log("Please insert correct number!!!");
        newContact();
      }
    });
  });
};

newContact();
