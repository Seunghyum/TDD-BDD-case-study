import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';
import reset from 'styled-reset';
import ListPage from './pages/ListPage';

const GlobalStyles = createGlobalStyle`
  ${normalize};
  ${reset};
  html, body, body {
    min-height: 100%;
    width: 100%;
  }
  html, body {
    font-size: 16px;
    font-family: "Helvetica", "Georgia", sans-serif;
  }
  * {
    box-sizing: border-box;
  }
  input {
    max-width: 100%;
  }
`;

const queryClient = new QueryClient();

function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <GlobalStyles />
      <ListPage />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
export default App;
