// Kopierte fra navikt/nav-dekoratoren-moduler/src/csr/typings.d.ts
declare global {
    var dekoratorenAnalytics:
        | ((params?: { origin: string; eventName: string; eventData?: Record<string, unknown> }) => Promise<unknown>)
        | undefined;
}

export {};
