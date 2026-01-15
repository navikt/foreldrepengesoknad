import type { ReactRenderer } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import type { DecoratorFunction } from 'storybook/internal/types';

export const withQueryClient: DecoratorFunction<ReactRenderer> = (Story) => {
    const Wrapper = () => {
        const [queryClient] = useState(
            () =>
                new QueryClient({
                    defaultOptions: {
                        queries: {
                            retry: false,
                        },
                    },
                }),
        );

        useEffect(() => {
            // cleanup on unmount
            return () => {
                queryClient.clear();
                queryClient.removeQueries();
            };
        }, [queryClient]);

        return (
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <Story />
            </QueryClientProvider>
        );
    };

    return <Wrapper />;
};
