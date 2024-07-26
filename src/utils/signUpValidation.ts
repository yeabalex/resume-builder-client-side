import * as Yup from 'yup'

const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "First name can't contain numbers")
    .required('First name is required'),

  lastName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Last name can't contain numbers")
    .required('Last name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .required("Password can't be empty")
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, 'Password must contain at least one number and one special symbol'),
});

export default validationSchema;
