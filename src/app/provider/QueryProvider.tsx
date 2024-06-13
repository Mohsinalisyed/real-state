// _app.tsx
"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />} */}
    </QueryClientProvider>
  );
}

export default QueryProvider;
