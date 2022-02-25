import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">My React App</div>
		</QueryClientProvider>
	);
}

export default App
