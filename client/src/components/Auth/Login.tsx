import { FormEvent, useEffect, useState } from 'react';
import Logo from '../logo';
import axios from 'axios';
import * as Yup from 'yup';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate({ email, password }, { abortEarly: false });

      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      console.log(response.data);

      localStorage.setItem('@user', JSON.stringify(response.data.userData));
      localStorage.setItem('hospcode', JSON.stringify(response.data.hospcode));

      setIsLoggedIn(true);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: {[key: string]: string} = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        alert('รหัสผ่านไม่ถูกต้อง');
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Redirect to root path after successful login
      window.location.href = '/';
    }
  }, [isLoggedIn]);

  return (
    <div className="flex">
      <div className="hidden w-full md:block">
        <div className="h-full w-full p-8 flex justify-end items-center bg-white drop-shadow-2xl">
          <Logo />
          <div className="flex flex-col justify-end text-right ml-4">
            <div className="text-7xl text-blue-800 font-bold">WELCOME!</div>
            <p className="text-blue-800">Enter Personal Detail For Login</p>
            <p className="text-blue-800">Or Choose Create Account</p>
          </div>
        </div>
      </div>
      <div className="h-full w-full bg-blue-800 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center py-8 mx-auto md:h-screen max-sm:h-screen lg:py-0 w-[80%] lg:w-auto">
          <p className="flex items-center mb-6 text-7xl font-bold text-white dark:text-white">
            Log In
          </p>
          <form className="space-y-4 md:space-y-2" onSubmit={handleLogin}>
            <div className="mb-4 drop-shadow-lg">
              <input
                className={`bg-white text-gray-900 sm:text-md sm:p-4 py-2 px-4 rounded-full block w-full ${errors.email && 'border-red-500'}`}
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-6 drop-shadow-lg">
              <input
                className={`bg-white text-gray-900 sm:text-md sm:p-4 py-2 px-4 rounded-full block w-full ${errors.password && 'border-red-500'}`}
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
