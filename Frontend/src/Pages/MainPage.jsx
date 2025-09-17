
import React from 'react';
import "../css/MainPage.css"
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

const handleProduct = () => {
  navigate("/Product");
};
    const handleTodo = () => {
    navigate("/Todo");
   };
   const handleMovie=()=>{
    navigate("/Movie")
   }
  return (
    <div className="MainPage">
      <header>
        <nav className="navcomponent">
          <div>
            <p>Kunal Das</p>
          </div>
          <div>
            <ul>
              {/* Internal routes */}
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

              {/* External link */}
              <li onClick={handleMovie}>
                
                  Movie
                
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default MainPage;
