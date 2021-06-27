import React, { useContext, useEffect, useState } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    if(current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;

  const onInputChange = e => setContact({
    ...contact,
    [e.target.name]: e.target.value
  });

  const onSubmitContactForm = e => {
    e.preventDefault();
    
    if(current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={ onSubmitContactForm }>
      <h2 className="text-primary">{ current ? "Edit Contact" : "Add Contact" }</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={ name }
        onChange={ onInputChange }
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={ email }
        onChange={ onInputChange }
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={ phone }
        onChange={ onInputChange }
      />
      
      <h5>Contact type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={ type === "personal" }
        onChange={ onInputChange }
      /> Personal {" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={ type === "professional" }
        onChange={ onInputChange }
      /> Professional

      <div>
        <input
          type="submit"
          value={ current ? "Update Contact" : "Add Contact" }
          className="btn btn-primary btn-block"
        />
      </div>
      {
      current &&
        <div>
          <button
            className="btn btn-light btn-block"
            onClick={ clearAll }
          >Clear</button>
        </div>
      }
    </form>
  );
};

export default ContactForm;
