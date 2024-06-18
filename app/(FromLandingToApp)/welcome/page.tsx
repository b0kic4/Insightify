import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Welcome() {
  return (
    <div className="flex items-center justify-center p-2 h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome to our Application
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            To access the application, you need to be logged in. If you
            don&apos;t have an account, you can sign up.
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            After creating an account or logging in, you will be redirected to
            the application. You may see this page again if your session
            expires, at which point you will need to log in again.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <LoginLink postLoginRedirectURL="/dashboard">
            <span className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </span>
          </LoginLink>
          <RegisterLink postLoginRedirectURL="/dashboard">
            <span className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign Up
            </span>
          </RegisterLink>
        </div>
      </div>
    </div>
  );
}
