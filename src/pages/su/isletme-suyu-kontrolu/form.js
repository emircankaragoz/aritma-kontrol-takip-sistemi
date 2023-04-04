import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "@/mock-data.json";
import styles from "@/styles/Form.module.css";
import ReadOnlyRow from "@/components/ReadOnlyRow.js";
import EditableRow from "@/components/EditableRow.js";


export default function form() {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    ph: "",
    sertlik: "",
    bikarbonat: "",
  });

  const [editFormData, setEditFormData] = useState({
    ph: "",
    sertlik: "",
    bikarbonat: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("ph");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("ph");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      ph: addFormData.ph,
      sertlik: addFormData.sertlik,
      bikarbonat: addFormData.bikarbonat,
      
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      ph: editFormData.ph,
      sertlik: editFormData.sertlik,
      bikarbonat: editFormData.bikarbonat,
      
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {      
      ph: contact.ph,
      sertlik: contact.sertlik,
      bikarbonat: contact.bikarbonat,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <>
      
      <div className={styles.appcontainer}>
              <h2>Add a Contact</h2>
              <form onSubmit={handleAddFormSubmit} className={styles.form}>
                <input
                  type="text"
                  name="ph"
                  required="required"
                  placeholder="Enter a ph"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="sertlik"
                  required="required"
                  placeholder="Enter an sertlik"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <input
                  type="text"
                  name="bikarbonat"
                  required="required"
                  placeholder="Enter bikarbonat"
                  onChange={handleAddFormChange}
                />
                <button type="submit">Add</button>
              </form>

              <form onSubmit={handleEditFormSubmit} className={styles.form}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.th}>Name</th>
                      <th className={styles.th}>Address</th>
                      <th className={styles.th}>Phone Number</th>
                      <th className={styles.th}>Email</th>
                      <th className={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <Fragment>
                        {editContactId === contact.id ? (
                          <EditableRow
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                          />
                        ) : (
                          <ReadOnlyRow
                            contact={contact}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                          />
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </form>
            </div>
      
    </>
  );
}
