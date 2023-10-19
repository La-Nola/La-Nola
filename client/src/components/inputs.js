const inputs = [
  {
    name: "firstName",
    label: "Vorname",
    type: "text",
    placeholder: "First name",
    validation: {
      required: "Please put your first name",
    },
  },
  {
    name: "lastName",
    label: "Nachname",
    type: "text",
    placeholder: "Last name",
    validation: {
      required: "Please put your last name",
    },
  },
  {
    name: "email",
    label: "E-mail",
    type: "email",
    placeholder: "Email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email",
      },
    },
  },
  {
    name: "birthdate",
    label: "Geburtsdatum",
    type: "date",
  },
];
export default inputs;
