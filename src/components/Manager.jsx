import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const copyText = useRef();
  const ref2 = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArr, setPasswordArr] = useState([]);

  useEffect(() => {
    try {
      console.log("Fetching passwords from localStorage");
      let passwords = localStorage.getItem("passwords");
      if (passwords) {
        const parsedPasswords = JSON.parse(passwords);
        if (Array.isArray(parsedPasswords)) {
          console.log("Parsed passwords:", parsedPasswords);
          setPasswordArr(parsedPasswords);
        } else {
          console.error("Passwords data is not an array");
          setPasswordArr([]);
        }
      }
    } catch (error) {
      console.error("Failed to parse passwords from localStorage:", error);
      setPasswordArr([]);
    }
  }, []);

  const showPassword = () => {
    try {
      console.log("Toggling password visibility");
      if (ref.current.src.includes("/public/show.png")) {
        ref.current.src = "/public/hidden.png";
        ref2.current.type = "password";
      } else {
        ref.current.src = "/public/show.png";
        ref2.current.type = "text";
      }
    } catch (error) {
      console.error("Failed to toggle password visibility:", error);
    }
  };

  const deletePassword = (id) => {
    console.log("deleting" + id);
    if (confirm("Are you Sure?")) {
      setPasswordArr(passwordArr.filter(item => item.id !== id));
      localStorage.setItem("passwords", JSON.stringify(passwordArr.filter(item => item.id !== id)));
      toast.success("Password Deleted Successfully!!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
    } else {
      alert("Action stopped!!");
    }
  };

  const editPassword = (id) => {
    console.log("editing" + id);
    setForm(passwordArr.filter(i => i.id === id)[0]);
    setPasswordArr(passwordArr.filter(item => item.id !== id));
  };

  const savePassword = () => {
    try {
      console.log("Saving password:", form);
      setPasswordArr([...passwordArr, { ...form, id: uuidv4() }]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArr, { ...form, id: uuidv4() }]));
      toast.success("Password Saved Successfully!!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
    } catch (error) {
      console.error("Failed to save password:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyToClipboard = (text) => {
    toast.success(text + " " + "📋 Copied to Clipboard", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: "Bounce",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />

      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-gradient-to-r from-green-700 to-green-400 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] bg-cover"></div>

      <div className="mt-5 rounded-xl bg-gray-500 mx-4 md:mx-auto md:mycontainer bg-gradient-to-r from-slate-700 to-green-700">
        <h1 className="font-bold text-center text-4xl text-white">
          <span className="text-green-400">&lt;</span>
          Dev
          <span className="text-green-400">Pass/&gt;</span>
        </h1>
        <p className="font-semibold text-center text-green-400 text-lg">
          Developer's Password Manager
        </p>
        <div className="text-white flex flex-col p-4 gap-6 items-center">
          <input
            className="rounded-full text-black border border-green-400 w-full px-4 py-1"
            type="text"
            placeholder="Website URL"
            name="site"
            required
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-3">
            <input
              className="rounded-full text-black border border-green-400 w-full md:w-1/2 px-4 py-1"
              type="text"
              name="username"
              required
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />

            <div className="relative w-full md:w-1/2">
              <input
                className="rounded-full text-black border border-green-400 w-full px-4 py-1"
                type="text"
                ref={ref2}
                required
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black p-1 pr-2 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} className="w-7" src="./public/show.png" alt="" />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="bg-green-400 rounded-full text-white flex px-2 py-2 gap-1 items-center justify-center hover:bg-green-300 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords max-h-80">
          <h2 className="font-bold text-left text-2xl text-white py-4">
            Your Passwords
          </h2>
          {passwordArr.length === 0 && (
            <div className="text-white animate-bounce duration-100">
              No Passwords
            </div>
          )}
          {passwordArr.length !== 0 && (
            <div className="tableDiv custom-scrollbar overflow-auto max-h-64 w-full">
              <table className="table-auto w-full text-black overflow-hidden rounded-md">
                <thead className="bg-green-400 text-white w-full">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-200">
                  {passwordArr.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center min-w-32 py-2 w-1/2">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="lordIcon cursor-pointer"
                          onClick={() => copyToClipboard(item.site)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="text-center min-w-32 py-2">
                        {item.username}
                        <div
                          className="lordIcon cursor-pointer"
                          onClick={() => copyToClipboard(item.username)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="text-center min-w-32 py-2">
                        {item.password}
                        <div
                          className="lordIcon cursor-pointer"
                          onClick={() => copyToClipboard(item.password)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="text-center min-w-32 py-2">
                        <span className="cursor-pointer mx-1" onClick={() => editPassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1" onClick={() => deletePassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="morph"
                            stroke="bold"
                            state="morph-trash-in"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
