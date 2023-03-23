import { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput";
import axios from "axios"

const App = () => {
  const [values, setValues] = useState({
    FullName: "",
    email: "",
    password: "",
    ConfirmPassword:"",
  });
  const [status, setStatus] = useState(null);
  const [resp, setResponse] = useState(null);
  const [err, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "Full Name",
      type: "text",
      placeholder: "FullName",
      errorMessage:
        "Full Name should be 3-16 characters and shouldn't include any special character!",
      label: "Full Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
  
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters with atleast 1(letter,number and special character!)",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmpassword",
      type: "password",
      placeholder: "confirm Password",
      errorMessage:
        " Password don't match",
      label: "confirm Password",
      pattern: values.password,
      required: true,
    },
  
  ];

  


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target[1].value
    const username = e.target[0].value
    const password = e.target[2].value
    const confirm_password = e.target[3].value
    const data = {email,username,password,confirm_password}
    console.log(data)
    axios.post('http://localhost:5000/signup', data)
    .then(response => {
      console.log(response)
      setStatus('Success')
      setResponse(response.data.message)
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data.message);
      setStatus('error')
      setError(error.response.data.message)
      setIsLoading(false)
    });
    // setIsLoading(false)
    console.log(resp)
  
    
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
 

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Signup'}</button>
        <p className="mt-3">Already have an account?<h>Login</h></p>
     
      </form>
      {status === 'Success' && <div>{resp}</div>}
      {status === 'error' && <div>{err}</div>}
      

    </div>
  );
};

export default App;
