import React from 'react';
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./styles.css";
import "./styles-custom.css";


const SignupForm = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("https://frontend-take-home.fetchrewards.com/form")
      .then(res => res.json())
      .then(
        (data) => {
          setItems(data);
          console.log(items);
        },
      )

  }, [])

  //// Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      FullName: '',
      email: '',
      password: '',
      Occupation: '',
      State: ''
    },

    validationSchema: Yup.object({
      //Regex to match the full name pattern
      FullName: Yup.string().matches(/^([a-zA-Z]+\s{1}|[a-zA-Z]+\s{1}$)/).
        required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
      //Retrieved the array of occupation and added a validation to it
      Occupation: Yup.string().oneOf(['Head of Shrubbery', 'Interim Substitute Teacher', 'Water Softener', 'Listener of the House', 'Really Good Dancer', 'Gainfully Unemployed', 'Alexa Impersonator', 'Chard Farmer', 'Chief Frolicker (Jolly)', 'Entry-level Seat Recliner', 'CEO (Summer Internship)', 'Widget Fabricator', 'Underwater Basket Weaver']).
        required('Required'),
      State: Yup.string().
        required('Required'),

    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));

      fetch("https://frontend-take-home.fetchrewards.com/form", {
        method: 'POST',
        body: JSON.stringify(values, null, 2),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Credentials": true,
        }
      })
        // Converting to JSON
        .then(response => response.json())

        // Displaying results to console
        .then(json => console.log(json));
    }
  });



  return (
    <>
      <h1>Subscribe!</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="FullName">Full name</label>
        <input
          id="FullName"
          type="text"
          {...formik.getFieldProps('FullName')}
        />
        {formik.touched.FullName && formik.errors.FullName ? (
          <div>{formik.errors.FullName}</div>
        ) : null}

        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input id="password" type="text" {...formik.getFieldProps('password')} />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <label htmlFor="Occupation">Occupation</label>
        <input id="Occupation" type="text" {...formik.getFieldProps('Occupation')} />
        {formik.touched.Occupation && formik.errors.Occupation ? (
          <div>{formik.errors.Occupation}</div>
        ) : null}


        <label htmlFor="State">State</label>
        <input id="State" type="text" {...formik.getFieldProps('State')} />
        {formik.touched.State && formik.errors.State ? (
          <div>{formik.errors.State}</div>
        ) : null}


        <button type="submit">Submit</button>
      </form>
    </>
  );
};
function App() {
  return <SignupForm />;
};



//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);

export default SignupForm;