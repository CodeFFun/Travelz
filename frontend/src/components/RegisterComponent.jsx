import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function RegisterComponent() {

    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        console.log(data);
    }
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
                        <h1 className="text-4xl font-bold my-10">Register</h1>
                        <form className="flex flex-col gap-5 lg:px-5 h-full" onSubmit={onSubmit}>
                            <input 
                                type="email"
                                name="email" 
                                className="p-3 rounded-md text-xl bg-gray-200" 
                                placeholder="visit@travel.com"
                                onChange={handleChange}
                            />
                            <input 
                                type="password" 
                                className="p-3 rounded-md text-xl bg-gray-200"
                                name="password" 
                                placeholder="********"
                                onChange={handleChange}
                            />
                            <div className="flex items-center justify-between p-3 rounded-md text-xl">
                                <label className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="USER" 
                                        className="hidden peer"
                                        onChange={handleChange}
                                    />
                                    <span className="peer-checked:bg-cyan-500 peer-checked:text-white bg-white text-gray-700 px-4 py-2 rounded-md cursor-pointer transition">
                                        Traveler
                                    </span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="GUIDE" 
                                        className="hidden peer"
                                        onChange={handleChange}
                                    />
                                    <span className="peer-checked:bg-cyan-500 peer-checked:text-white bg-white text-gray-700 px-4 py-2 rounded-md cursor-pointer transition">
                                        Guide
                                    </span>
                                </label>
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
                                onClick={() => navigate('/login')}
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
