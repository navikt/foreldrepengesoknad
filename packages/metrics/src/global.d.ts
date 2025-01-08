declare global {
    interface Window {
        dekoratorenAmplitude: (params?: {
            origin: unknown | string;
            eventName: unknown | string;
            eventData?: unknown;
        }) => Promise<unknown>;
    }
}

export {};
