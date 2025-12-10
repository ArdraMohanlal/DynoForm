// src/templates/formTemplates.js
// Keep ids numeric and unique per template for easier nextId calc

export const jobRegistrationTemplate = [
  {
    id: 1,
    type: "Short Text",
    label: "Full Name",
    placeholder: "Enter your full name",
    validation: { required: true },
  },
  {
    id: 2,
    type: "Email",
    label: "Email",
    placeholder: "Enter your email",
    validation: { required: true },
  },
  {
    id: 3,
    type: "Number",
    label: "Years of Experience",
    placeholder: "e.g. 3",
    validation: { required: true, min: 0 },
  },
];

export const collegeRegistrationTemplate = [
  {
    id: 1,
    type: "Short Text",
    label: "Student Name",
    placeholder: "Enter student name",
    validation: { required: true },
  },
  {
    id: 2,
    type: "Short Text",
    label: "Course",
    placeholder: "Enter course name",
    validation: { required: true },
  },
  {
    id: 3,
    type: "Date",
    label: "Date of Birth",
    validation: { required: true },
  },
];

export const employeeDetailsTemplate = [
  {
    id: 1,
    type: "Short Text",
    label: "Employee Name",
    placeholder: "Enter employee name",
    validation: { required: true },
  },
  {
    id: 2,
    type: "Short Text",
    label: "Position",
    placeholder: "Enter position",
    validation: { required: true },
  },
  {
    id: 3,
    type: "DropDown",
    label: "Department",
    placeholder: "Select department",
    validation: { required: true },
    options: [
      { label: "HR", value: "hr" },
      { label: "Engineering", value: "engineering" },
      { label: "Sales", value: "sales" },
    ],
  },
];

export const templates = [
  {
    id: "job",
    name: "Job Registration",
    description: "Basic job application form with name, email, experience.",
    elements: jobRegistrationTemplate,
  },
  {
    id: "college",
    name: "College Registration",
    description: "Student registration form with course and DOB.",
    elements: collegeRegistrationTemplate,
  },
  {
    id: "employee",
    name: "Employee Details",
    description: "Employee profile with department selection.",
    elements: employeeDetailsTemplate,
  },
];
