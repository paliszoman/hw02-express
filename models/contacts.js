const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const saveContacts = async (contacts) => {
  try {
    const convertedToJSON = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, convertedToJSON);
  } catch (err) {
    console.log(err);
  }
};

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactsAfterRemove = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await saveContacts(contactsAfterRemove);
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const contact = { id: Date.now().toString(), ...body };
    const newContacts = contacts.splice(contacts.length, contact);
    console.log(contact);
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
