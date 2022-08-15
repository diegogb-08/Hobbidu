import { Outlet } from '@remix-run/react';

const Account = () => {
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center">
      <div className="h-full flex-1 bg-login-background bg-center bg-no-repeat bg-cover" />
      <div className="h-full w-5/12 p-4 pb-8">
        <div className="h-5/6 w-full bg-white p-10 rounded border-[0.5px] border-gray flex flex-col mb-4">
          <Outlet />
        </div>
        <div className="h-1/6 items-stretch w-full bg-white p-10 rounded border-[0.5px] border-gray flex-col">
          Something goes here
        </div>
      </div>
    </div>
  );
};

export default Account;
