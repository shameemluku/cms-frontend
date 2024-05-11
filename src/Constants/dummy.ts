export const patentItems = [
  {
    form_id: "pers_1",
    title: "Personal Details",
    description:
      "Personal Details typically refer to information about an individual, such as their name, age, address, contact details, etc...",
    theme: "red",
  },
  {
    form_id: "edu_2",
    title: "Education Details",
    description:
      "Education details typically refer to information about an individual's educational background",
    theme: "green",
  },
  {
    form_id: "pro_3",
    title: "Professional Details",
    description:
      "Professional details encompass information related to an individual's professional background, employment history, etc...",
    theme: "#3d68db",
  },
  {
    form_id: "doc_4",
    title: "Document Upload",
    description:
      "Documents of user to support the entered personal details and professional details",
    theme: "#d96c36",
  },
];

export const fields = [
  {
    parent_id: "pers_1",
    fields: [
      {
        type: "text",
        label: "First Name",
        name: "first_name",
        className: "",
        required: true,
        enabled: true,
      },
      {
        type: "text",
        label: "Last Name",
        name: "last_name",
        className: "",
        required: false,
        enabled: true,
      },
      {
        type: "text_area",
        label: "Address",
        name: "address",
        className: "",
        required: true,
        enabled: true,
      },
      {
        type: "radio",
        label: "Gender",
        name: "gender",
        className: "",
        required: true,
        enabled: true,
        values: [
          {
            value: "male",
            label: "Male",
          },
          {
            value: "female",
            label: "Female",
          },
          {
            value: "other",
            label: "Other",
          },
        ],
      },
      {
        type: "select",
        label: "Identity Proof",
        name: "id_proof",
        className: "",
        required: true,
        enabled: true,
        values: [
          {
            value: "aadhaar",
            label: "Aadhaar",
          },
          {
            value: "voter_id",
            label: "Voter ID",
          },
          {
            value: "driving_license",
            label: "Driving License",
          },
        ],
      },
    ],
    file_included: false,
    other_config: {
      loop: false,
      limit: null,
      max_file_size: null,
      file_types: null,
    },
  },
  {
    parent_id: "edu_2",
    fields: [
      {
        type: "select",
        label: "Education Type",
        name: "education_type",
        className: "",
        required: true,
        enabled: true,
        values: [
          {
            value: "10",
            label: "10th",
          },
          {
            value: "12",
            label: "12th",
          },
          {
            value: "ug",
            label: "UG",
          },
          {
            value: "pg",
            label: "PG",
          },
        ],
      },
      {
        type: "text",
        label: "Name of Institution",
        name: "name_insititution",
        className: "",
        required: true,
        enabled: true,
      },
      {
        type: "number",
        label: "Grade",
        name: "edu_grade",
        className: "",
        required: false,
        enabled: true,
      },
    ],
    file_included: true,
    other_config: {
      loop: true,
      limit: 3,
      max_file_size: null,
      file_types: null,
    },
  },
  {
    parent_id: "pro_3",
    fields: [
      {
        type: "text",
        label: "Company Name",
        name: "company_name",
        className: "",
        required: true,
        enabled: true,
      },
      {
        type: "text",
        label: "Designation",
        name: "designation",
        className: "",
        required: true,
        enabled: true,
      },
    ],
    file_included: false,
    other_config: {
      loop: true,
      limit: 3,
      max_file_size: null,
      file_types: null,
    },
  },
  {
    parent_id: "doc_4",
    fields: [
      {
        type: "document",
        label: "Identity Proof",
        name: "id_proof_upload",
        className: "",
        required: true,
        enabled: true,
      },
      {
        type: "document",
        label: "Job verification",
        name: "job_verification_doc",
        className: "",
        required: true,
        enabled: true,
      },
    ],
    file_included: true,
    other_config: {
      loop: true,
      limit: 3,
      max_file_size: 5,
      file_types: ["JPEG", "PNG", "JPG", "PDF"],
    },
  },
];
