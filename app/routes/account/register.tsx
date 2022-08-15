import { Form } from '@remix-run/react';
import SubmitButton from '~/components/Buttons/SubmitButton';
import TextField from '~/components/Form/TextField';

const Register = () => {
  return (
    <Form
      method="post"
      className="flex flex-1 flex-col items-center justify-center"
    >
      <h2 className="text-4xl text-center">Register</h2>
      <div className="h-8" />
      <TextField
        text="Full Name"
        placeholder="Diego Garcia Brisa"
        type="text"
        name="fullName"
      />
      <div className="h-8" />
      <TextField
        text="User Name"
        placeholder="Diego.08"
        type="text"
        name="userName"
      />
      <div className="h-8" />
      <TextField
        text="Email"
        placeholder="email@email.com"
        type="email"
        name="email"
      />
      <div className="h-8" />
      <TextField text="Password" type="password" name="password" />
      <div className="h-8" />
      <SubmitButton />
    </Form>
  );
};

export default Register;
