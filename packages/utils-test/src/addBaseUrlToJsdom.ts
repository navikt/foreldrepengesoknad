/**
 * Vitest kjører i jsdom, og ikke i browser. Som følge av det så finnes ikke en location.
 * Det gjør at new URL() kall vil feile.
 * Denne funksjonen overskriver new URL() konstruktøren til å legge på en base hvis den ikke finnes.
 */
export const addBaseUrlToJsdom = () => {
    const originalURL = global.URL;

    // @ts-expect-error
    global.URL = class extends originalURL {
        constructor(url: string, base: string) {
            if (!base) {
                base = 'http://localhost:3000'; // Ikke så farlig hva denne er. Poenet er at det må finnes en baseUrl
            }
            super(url, base);
        }
    };
};
