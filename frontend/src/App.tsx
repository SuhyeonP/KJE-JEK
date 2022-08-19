import normalize from 'emotion-normalize';
import { css, Global } from '@emotion/react';
import { Router } from 'pages/Routes';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Global
          styles={css`
            ${normalize}
            h1, h2, h3, h4, h5, h6 {
              font-size: 1em;
              font-weight: normal;
              margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
            }
            * {
              box-sizing: border-box;
              padding: 0;
              margin: 0;
            }

            html,
            body,
            #root {
              height: 100%;
            }
          `}
        />
        <Layout>
          <Router />
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        max-width: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        height: auto;
      `}
    >
      <div css={css``}>{children}</div>
    </div>
  );
}
