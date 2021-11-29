import {
	Routes,
	Route
} from 'react-router-dom';

import {HashRouter} from 'react-router-dom';

// Context
import AuthProvider from "./Context/AuthContext";

// Pages
import Login from './Pages/Login';
import All from './Pages/All';
import Owned from './Pages/Owned';
import Create from './Pages/Create';

// Components
import Layout from "./Components/Layout";
import RequireAuth from './Components/Auth/RequireAuth';

const App = () => {
	return (
		<HashRouter>
			<AuthProvider>
				<Routes>
					<Route exact path="/login" element={<Login />} />
					<Route element={<Layout />}>
						<Route 
							exact path="/my" 
							element={
								<RequireAuth>
									<Owned />
								</RequireAuth>
							}
						/>
						<Route 
							exact path="/create" 
							element={
								<RequireAuth>
									<Create />
								</RequireAuth>
							}
						/>
						<Route 
							exact path="/" 
							element={
								<RequireAuth>
									<All />
								</RequireAuth>
							}
						/>
					</Route>
				</Routes>
			</AuthProvider>
		</HashRouter>
	)
}

export default App;