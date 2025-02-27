import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


export default function LoginComponent() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.status === 200) {
        navigate('/');
        toast("Signed in successfully");
      } else {
        toast(data.message || "Login failed");
      }
    } catch (error) {
      toast("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-cyan-50">
        <div className="flex justify-center items-center h-full w-full">
          <div className="hidden bg-[url('/signup.svg')] bg-cover bg-no-repeat bg-center h-[80vh] w-[30vw] rounded-xl z-50 text-white lg:flex flex-col justify-end px-10 py-10">
            <h1 className="text-4xl font-bold my-5">
              Join The <br /> Adventure
            </h1>
            <p className="text-xl">
              Get started with your amazing adventure
            </p>
          </div>
          <div className="bg-white w-full h-fit lg:w-[40vw] rounded-xl p-10 lg:p-20">
            <h1 className="text-4xl font-bold my-10">Sign In</h1>
            <form className="flex flex-col gap-5 lg:px-5 h-full" onSubmit={onSubmit}>
              <div className="flex flex-col">
                <input 
                  type="email"
                  name="email" 
                  className={`p-3 rounded-md text-xl ${errors.email ? 'border-2 border-red-500 bg-red-50' : 'bg-gray-200'}`}
                  placeholder="visit@travel.com"
                  onChange={handleChange}
                  value={formData.email || ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
                )}
              </div>
              
              <div className="flex flex-col">
                <input 
                  type="password" 
                  className={`p-3 rounded-md text-xl ${errors.password ? 'border-2 border-red-500 bg-red-50' : 'bg-gray-200'}`}
                  name="password" 
                  placeholder="********"
                  onChange={handleChange}
                  value={formData.password || ''}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                className="bg-cyan-500 p-3 rounded-2xl text-white text-xl font-bold hover:bg-cyan-700 hover:cursor-pointer"
              >
                Get Started
              </button>
              <button disabled className="text-gray-500">Or</button>
              <button 
                type="button" 
                className="bg-cyan-50 p-3 rounded-2xl text-cyan-500 text-xl hover:bg-cyan-100 hover:cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}