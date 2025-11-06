declare global {
    interface Window {
        dekoratorenAnalytics: (params?: {
            origin: unknown | string;
            eventName: unknown | string;
            eventData?: unknown;
        }) => Promise<unknown>;
    }
}

export {};
