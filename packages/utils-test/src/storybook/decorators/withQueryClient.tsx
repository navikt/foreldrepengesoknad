import { type ReactRenderer } from '@storybook/react';
import type { DecoratorFunction } from '@storybook/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';

export const withQueryClient: DecoratorFunction<ReactRenderer> = (Story) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    useEffect(() => {
        return () => {
            queryClient.clear();
            queryClient.removeQueries();
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Story />
        </QueryClientProvider>
    );
};
