import { Form } from '@remix-run/react';

const Login = () => {
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center">
      <div className="h-full flex-1 bg-login-background bg-center bg-no-repeat bg-cover" />
      {/* <img
        src={background}
        alt="background"
        className="h-full flex-1 bg-cover bg-no-repeat"
      /> */}
      <div className="h-full w-5/12 p-4">
        <div className="h-full w-full bg-white p-10 rounded border-[0.5px] border-lable6 flex flex-col">
          <h2 className="text-4xl text-center">Login</h2>
          <Form method="post" className="flex flex-1 flex-col items-center">
            <fieldset className="m-4 w-full flex justify-evenly">
              <legend className="sr-only">Login or Register?</legend>
              <label>
                <input type="radio" name="loginType" value="login" /> Login
              </label>
              <label>
                <input type="radio" name="loginType" value="register" />{' '}
                Register
              </label>
            </fieldset>
            <div className="m-4">
              <label htmlFor="username-input" className="m-4">
                Username
              </label>
              <input
                className="border m-4"
                type="text"
                id="username-input"
                name="username"
              />
            </div>
            <div className="m-4">
              <label htmlFor="password-input" className="m-4">
                Password
              </label>
              <input
                className="border m-4"
                id="password-input"
                name="password"
                type="password"
              />
            </div>
            <div id="form-error-message"></div>
            <button type="submit" className="bg-red-300 p-2 rounded">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
