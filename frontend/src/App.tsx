import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/new-york/button";
import MailPage from "@/components/mail/page";
// import { Mail } from "./components/mail/components/mail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Set MailPage as the homepage */}
        <Route path="/" element={<MailPage />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
