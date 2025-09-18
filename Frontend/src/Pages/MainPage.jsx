
// import React, { useEffect } from 'react';
// import "../css/MainPage.css"
// import { useNavigate } from 'react-router-dom';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import {app} from "../Firebase setup/Firebase"
// const MainPage = () => {
//     const navigate = useNavigate();
//     const auth=getAuth(app)

//     useEffect(()=>{
//       const reponce=onAuthStateChanged(auth,(user)=>{
//         if(user){
//           console.log("User is logged in:", user.email)
//         }
//         else{
//           console.log(`no user login`)
//         }
//       })
//       return ()=>reponce()
//     },[])
// const handleProduct = () => {
//   if(!user.email==="guest@gmail.com" && !user.guestPassword==="guest123"){
// navigate("/Product");
//   }
  
// };
//     const handleTodo = () => {
//     navigate("/Todo");
//    };
//    const handleMovie=()=>{
//     if(!user.email==="guest@gmail.com" && !user.guestPassword==="guest123"){
// navigate("/Movie")
//     }
    
//    }
//    const handleToggle = () => {
  
//   document.body.style.backgroundColor =
//     document.body.style.backgroundColor === "black" ? "white" : "black";

  
//   const listItems = document.querySelectorAll("nav li, nav a, nav p");
//   listItems.forEach((el) => {
//     el.style.color = el.style.color === "white" ? "green" : "white";
//   });
// };



//   return (
//     <div className="MainPage">
//       <header>
//         <nav className="navcomponent">
//           <div>
//             <p>Kunal Das</p>
//           </div>
//           <div>
//             <ul>
//               {/* Internal routes */}
//               <li onClick={handleProduct}>Products</li>
//               <li>
//                 <a
//                   href="https://github.com/kunaldas7250"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Github
//                 </a>
//               </li>
//               <li onClick={handleTodo}>Todo</li>

//               {/* External link */}
//               <li onClick={handleMovie}>
                
//                   Movie
                
//               </li>
//               <li onClick={handleToggle} >Toggle</li>
//             </ul>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default MainPage;



import React, { useEffect, useState } from "react";
import "../css/MainPage.css";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Firebase setup/Firebase";

const MainPage = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is logged in:", currentUser.email);
        setUser(currentUser); 
      } else {
        console.log("No user logged in");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleProduct = () => {
   
    if (user && user.email === "guest@gmail.com") {
      alert("Guest cannot access Products");
    } else {
      navigate("/Product");
    }
  };

  const handleTodo = () => {
    navigate("/Todo");
  };

  const handleMovie = () => {
    if (user && user.email === "guest@gmail.com") {
      alert("Guest cannot access Movies");
    } else {
      navigate("/Movie");
    }
  };

  const handleToggle = () => {
    document.body.style.backgroundColor =
      document.body.style.backgroundColor === "black" ? "white" : "black";

    const listItems = document.querySelectorAll("nav li, nav a, nav p");
    listItems.forEach((el) => {
      el.style.color = el.style.color === "white" ? "green" : "white";
    });
  };

  return (
    <div className="MainPage">
      <header>
        <nav className="navcomponent">
          <div>
            <p>{user ? user.email : "Not logged in"}</p>
          </div>
          <div>
            <ul>
              <li onClick={handleProduct}>Products</li>
              <li>
                <a
                  href="https://github.com/kunaldas7250"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
              <li onClick={handleTodo}>Todo</li>
              <li onClick={handleMovie}>Movie</li>
              <li onClick={handleToggle}>Toggle</li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default MainPage;
