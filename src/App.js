import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./assets/app.scss";
import CardPhoto from "./components/CardPhoto";
import UploadImageDropzone from "./components/UploadImageDropzone";
import useImages from "./hooks/useImages";
import SimpleReactLightBox, { SRLWrapper } from "simple-react-lightbox";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import AuthContextProvider from "./contexts/AuthContext";
import AuthRoute from "./components/AuthRoute";
import ForgotPassword from "./components/ForgotPassword";
import CreateAlbum from "./components/albums/CreateAlbum";
import Albums from "./components/albums/Albums";
import Album from "./components/albums/Album";

function App() {
  const { images } = useImages();

  return (
    <Router>
      <div className="center">
        <AuthContextProvider>
          <SimpleReactLightBox>
            <NavBar />

            <Container className="container">
              <header className="App-header mb-4 d-flex justify-content-center">
                <h1>Photo review</h1>
              </header>
              <Routes>
                <AuthRoute path="/">
                  <Home />
                </AuthRoute>

                <Route path="/albums">
                  <Route path="/">
                    <Albums />
                  </Route>

                  <AuthRoute path="/create">
                    <CreateAlbum />
                  </AuthRoute>

                  <Route path="/:albumId">
                    <Album />
                  </Route>
                </Route>

                <Route path="/forgot-Password">
                  <ForgotPassword />
                </Route>

                <Route path="/signup">
                  <Signup />
                </Route>

                <Route path="/login">
                  <Login />
                </Route>

                <Route path="/logout">
                  <Logout />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>

            <footer className="bg-dark text-white text-center py-3">
              <span className="text-muted text-small">
                {" "}
                Simple File uploader
              </span>
            </footer>
          </SimpleReactLightBox>
        </AuthContextProvider>
      </div>
    </Router>
  );
}

export default App;
