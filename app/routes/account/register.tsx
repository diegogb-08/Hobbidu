import { Form, useActionData } from '@remix-run/react';
import type { ActionFunction } from '@remix-run/node';
import SubmitButton from '~/components/Buttons/SubmitButton';
import TextField from '~/components/Form/TextField';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  return formData;
};

const Register = () => {
  const actionData = useActionData();
  console.log(actionData);
  return (
    <Form
      method="post"
      action="/account/register"
      className="flex flex-1 flex-col items-center justify-center"
    >
      <h2 className="text-4xl text-center">Register</h2>
      <div className="h-8" />
      <TextField
        text="Full Name"
        placeholder="Diego Garcia Brisa"
        type="text"
        name="fullName"
        defaultValue={actionData?.values?.fullName}
      />
      <div className="h-8" />
      <TextField
        text="User Name"
        placeholder="Diego.08"
        type="text"
        name="userName"
        defaultValue={actionData?.values?.userName}
      />
      <div className="h-8" />
      <TextField
        text="Email"
        placeholder="email@email.com"
        type="email"
        name="email"
        defaultValue={actionData?.values?.email}
      />
      <div className="h-8" />
      <TextField
        text="Password"
        type="password"
        name="password"
        defaultValue={actionData?.values?.password}
      />
      <div className="h-8" />
      <SubmitButton />
    </Form>
  );
};

export default Register;
