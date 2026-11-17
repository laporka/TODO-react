import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

const queryClient = new QueryClient();
const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: 'https://countries.trevorblades.com/' }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
    </ApolloProvider>
  </StrictMode>
)
