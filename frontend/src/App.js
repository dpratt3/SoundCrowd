// function App() {
//   return (
//     <h1>Hello from App</h1>
//   );
// }

// export default App;

// frontend/src/App.js
// import React from "react";
// import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";

// function App() {
//   return (
//     <Switch>
//       <Route path="/login">
//         <h1>You're on the login page</h1>
//         <LoginFormPage />
//       </Route>
//     </Switch>
//   );
// }

// export default App;

// frontend/src/App.js
// frontend/src/App.js
import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
