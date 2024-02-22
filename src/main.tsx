import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./app/Store.ts";
import InternetConnection from "./Provider/InternetConnection.tsx";
import Theme from "./theme/ExtendTheme.tsx";
import React from "react";
// import ScrollToTop from './Components/ScrollToTop.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <InternetConnection>
        <Router basename="/Tott">
          {/* <ScrollToTop/> */}
          <ChakraProvider theme={Theme}>
            <App />
          </ChakraProvider>
        </Router>
      </InternetConnection>
    </Provider>
  </React.StrictMode>
);
