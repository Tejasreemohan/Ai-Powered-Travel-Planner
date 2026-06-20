// // // // // import { createContext, useContext, useState, useEffect } from "react";

// // // // // const AuthContext = createContext();

// // // // // export function useAuth() {
// // // // //   return useContext(AuthContext);
// // // // // }

// // // // // export function AuthProvider({ children }) {
// // // // //   const [user, setUser] = useState(null);

// // // // //   // 🔹 Load user if token exists
// // // // //   useEffect(() => {
// // // // //     const token = localStorage.getItem("token");
// // // // //     if (token) {
// // // // //       setUser({ loggedIn: true });
// // // // //     }
// // // // //   }, []);

// // // // //   // 🔹 SIGNUP (Django)
// // // // //   const signup = async (email, password, name) => {
// // // // //     const res = await fetch("http://127.0.0.1:8000/api/signup/", {
// // // // //       method: "POST",
// // // // //       headers: { "Content-Type": "application/json" },
// // // // //       body: JSON.stringify({ email, password, name }),
// // // // //     });

// // // // //     const data = await res.json();

// // // // //     if (res.ok) {
// // // // //       return { success: true, message: "Signup successful. Please login." };
// // // // //     }

// // // // //     return { success: false, message: data.error || "Signup failed" };
// // // // //   };

// // // // //   // 🔹 LOGIN (JWT)
// // // // //   const login = async (email, password) => {
// // // // //     const res = await fetch("http://127.0.0.1:8000/api/token/", {
// // // // //       method: "POST",
// // // // //       headers: { "Content-Type": "application/json" },
// // // // //       body: JSON.stringify({ username: email, password }),
// // // // //     });

// // // // //     const data = await res.json();

// // // // //     if (data.access) {
// // // // //       localStorage.setItem("token", data.access);
// // // // //       setUser({ email });
// // // // //       return { success: true };
// // // // //     }

// // // // //     return { success: false, message: "Invalid credentials" };
// // // // //   };

// // // // //   // 🔹 LOGOUT
// // // // //   const logout = () => {
// // // // //     localStorage.removeItem("token");
// // // // //     setUser(null);
// // // // //   };

// // // // //   return (
// // // // //     <AuthContext.Provider value={{ user, signup, login, logout }}>
// // // // //       {children}
// // // // //     </AuthContext.Provider>
// // // // //   );
// // // // // }


// // // // import { createContext, useContext, useState, useEffect } from "react";

// // // // const AuthContext = createContext();
// // // // export const useAuth = () => useContext(AuthContext);

// // // // export function AuthProvider({ children }) {
// // // //   const [user, setUser] = useState(null);

// // // //   // Load user from localStorage
// // // //   useEffect(() => {
// // // //     const storedUser = localStorage.getItem("user");
// // // //     if (storedUser) {
// // // //       setUser(JSON.parse(storedUser));
// // // //     }
// // // //   }, []);

// // // //   // LOGIN
// // // //   const login = async (email, password) => {
// // // //     const res = await fetch("http://127.0.0.1:8000/api/token/", {
// // // //       method: "POST",
// // // //       headers: { "Content-Type": "application/json" },
// // // //       body: JSON.stringify({ username: email, password }),
// // // //     });

// // // //     const data = await res.json();
// // // //     if (!res.ok) return { success: false };

// // // //     const userData = {
// // // //       name: email.split("@")[0],
// // // //       email,
// // // //       image: null,
// // // //     };

// // // //     localStorage.setItem("token", data.access);
// // // //     localStorage.setItem("user", JSON.stringify(userData));
// // // //     setUser(userData);

// // // //     return { success: true };
// // // //   };

// // // //   // UPDATE PROFILE
// // // //   const updateProfile = (updatedData) => {
// // // //     const updatedUser = { ...user, ...updatedData };
// // // //     setUser(updatedUser);
// // // //     localStorage.setItem("user", JSON.stringify(updatedUser));
// // // //   };

// // // //   // LOGOUT
// // // //   const logout = () => {
// // // //     localStorage.clear();
// // // //     setUser(null);
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
// // // //       {children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // }



// // // import { createContext, useContext, useState, useEffect } from "react";

// // // const AuthContext = createContext();
// // // export const useAuth = () => useContext(AuthContext);

// // // export function AuthProvider({ children }) {
// // //   const [user, setUser] = useState(null);

// // //   // 🔹 Load user from localStorage
// // //   useEffect(() => {
// // //     const storedUser = localStorage.getItem("user");
// // //     if (storedUser) {
// // //       setUser(JSON.parse(storedUser));
// // //     }
// // //   }, []);

// // //   // 🔹 SIGNUP (DJANGO)
// // //   const signup = async (email, password, name) => {
// // //     try {
// // //       const res = await fetch("http://127.0.0.1:8000/api/signup/", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           email: email,
// // //           password: password,
// // //         }),
// // //       });

// // //       const data = await res.json();

// // //       if (!res.ok) {
// // //         return {
// // //           success: false,
// // //           message: data.error || "Signup failed",
// // //         };
// // //       }

// // //       return {
// // //         success: true,
// // //         message: "Signup successful",
// // //       };
// // //     } catch (error) {
// // //       console.error("Signup error:", error);
// // //       return {
// // //         success: false,
// // //         message: "Server not reachable",
// // //       };
// // //     }
// // //   };

// // //   // 🔹 LOGIN (JWT)
// // //   const login = async (email, password) => {
// // //     const res = await fetch("http://127.0.0.1:8000/api/token/", {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({ username: email, password }),
// // //     });

// // //     const data = await res.json();
// // //     if (!res.ok) return { success: false, message: "Invalid credentials" };

// // //     const userData = {
// // //       name: email.split("@")[0],
// // //       email,
// // //       image: null,
// // //     };

// // //     localStorage.setItem("token", data.access);
// // //     localStorage.setItem("user", JSON.stringify(userData));
// // //     setUser(userData);

// // //     return { success: true };
// // //   };

// // //   // 🔹 UPDATE PROFILE
// // //   const updateProfile = (updatedData) => {
// // //     const updatedUser = { ...user, ...updatedData };
// // //     setUser(updatedUser);
// // //     localStorage.setItem("user", JSON.stringify(updatedUser));
// // //   };

// // //   // 🔹 LOGOUT
// // //   const logout = () => {
// // //     localStorage.clear();
// // //     setUser(null);
// // //   };

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{ user, signup, login, logout, updateProfile }}
// // //     >
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // }


// // import { createContext, useContext, useEffect, useState } from "react";

// // const AuthContext = createContext();
// // export const useAuth = () => useContext(AuthContext);

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // 🔹 Load auth on refresh
// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("user");
// //     const token = localStorage.getItem("access");

// //     if (storedUser && token) {
// //       setUser(JSON.parse(storedUser));
// //     } else {
// //       setUser(null);
// //     }

// //     setLoading(false);
// //   }, []);

// //   // 🔹 LOGIN
// //   const login = async (email, password) => {
// //     const res = await fetch("http://127.0.0.1:8000/api/login/", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ email, password }),
// //     });

// //     const data = await res.json();

// //     if (!res.ok || !data.success) {
// //       return { success: false, message: data.message || "Login failed" };
// //     }

// //     const userData = {
// //       email,
// //       name: email.split("@")[0],
// //     };

// //     localStorage.setItem("access", data.access);
// //     localStorage.setItem("user", JSON.stringify(userData));
// //     setUser(userData);

// //     return { success: true };
// //   };

// //   // 🔹 LOGOUT
// //   const logout = () => {
// //     localStorage.removeItem("access");
// //     localStorage.removeItem("user");
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔁 Restore auth on refresh / route change
//   useEffect(() => {
//     const token = localStorage.getItem("access");
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       setUser(null);
//     }

//     setLoading(false);
//   }, []);

//   // 🔐 LOGIN
//   const login = async (email, password) => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/login/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         return { success: false, message: data.message || "Login failed" };
//       }

//       const userData = {
//         email,
//         name: email.split("@")[0],
//       };

//       localStorage.setItem("access", data.access);
//       localStorage.setItem("refresh", data.refresh);
//       localStorage.setItem("user", JSON.stringify(userData));

//       setUser(userData);
//       return { success: true };

//     } catch {
//       return { success: false, message: "Server not reachable" };
//     }
//   };

//   // 🔓 LOGOUT
//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }



import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore auth on refresh / route change
  useEffect(() => {
    const token = localStorage.getItem("access");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Login failed" };
      }

      const userData = {
        email,
        name: email.split("@")[0],
      };

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return { success: true };

    } catch {
      return { success: false, message: "Server not reachable" };
    }
  };

  // 🔓 LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        setUser, // 🔥 IMPORTANT: Add this line
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
