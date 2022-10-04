const fs = require("fs");
const validator = require("validator");
const Readline = require("readline");
const { exit } = require("process");
// const allContact = [];
const file = fs.readFileSync("data/contacts.json", "utf-8");
const contacts = JSON.parse(file);

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const goToMainMenu = () => {
  rl.question("1. Exit\n\t", (exit) => {
    if (exit == 1) mainMenu();
  });
};

const validation = () => {
  rl.question("1. Add new contact\n2. Main menu\n3. Exit\nYour answer (1 or 2...): ", (number) => {
    if (number == 1) {
      newContact();
    } else if (number == 2) {
      mainMenu();
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

const getAllContact = () => {
  for (let i = 0; i < contacts.length; i++) {
    console.log("Name: " + contacts[i].name + "\nPhone Number: " + contacts[i].phoneNumber + "\nEmail: " + contacts[i].email + "\n********************************************************");
  }
};

const searchContactName = () => {
  let isExist = true;
  rl.question("Search contact nama: ", (nameContact) => {
    for (let i = 0; i < contacts.length; i++) {
      if (nameContact.toLocaleLowerCase() === contacts[i].name.toLocaleLowerCase()) {
        console.log("Name: " + contacts[i].name + "\nPhone Number: " + contacts[i].phoneNumber + "\nEmail: " + contacts[i].email + "\n********************************************************");
        isExist = false;
      }
    }
    if (isExist) {
      console.log("There's no contact named " + nameContact + " in your phone");
      rl.question("1. Search again\n2. Back to main menu\t", (exit) => {
        if (exit == 1) {
          searchContactName();
        } else {
          mainMenu();
        }
      });
    }
    goToMainMenu();
  });
};

const mainMenu = () => {
  rl.question("1. Add new contact\n2. Get all contact\n3. Search contact\n4. Exit\n\t", (mainOptions) => {
    if (mainOptions == 1) {
      newContact();
    } else if (mainOptions == 2) {
      getAllContact();
      goToMainMenu();
    } else if (mainOptions == 3) {
      searchContactName();
    } else if (mainOptions == 4) {
      rl.close();
    }
  });
};

mainMenu();
