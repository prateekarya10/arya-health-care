import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import ReactQueryProvider from "./context/ReactQueryProvider.jsx";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Router>
			<ReactQueryProvider>
				<AuthProvider>
					<App />
                    <Toaster position="top-center" />
				</AuthProvider>
			</ReactQueryProvider>
		</Router>
	</StrictMode>
);
