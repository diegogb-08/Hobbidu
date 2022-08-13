import { Form } from '@remix-run/react';
import SubmitButton from '~/components/Buttons/SubmitButton';
import TextField from '~/components/Form/TextField';

const Login = () => {
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center">
      <div className="h-full flex-1 bg-login-background bg-center bg-no-repeat bg-cover" />
      <div className="h-full w-5/12 p-4 pb-8">
        <div className="h-5/6 w-full bg-white p-10 rounded border-[0.5px] border-gray flex flex-col mb-4">
          <Form
            method="post"
            className="flex flex-1 flex-col items-center justify-center"
          >
            <h2 className="text-4xl text-center">Login</h2>
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
        </div>
        <div className="h-1/6 items-stretch w-full bg-white p-10 rounded border-[0.5px] border-gray flex-col">
          Something goes here
        </div>
      </div>
    </div>
  );
};

export default Login;
