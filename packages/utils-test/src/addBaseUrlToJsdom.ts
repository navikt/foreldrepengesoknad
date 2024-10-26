// TODO: legg til forklaring til hvorfor dette trengs
export const addBaseUrlToJsdom = () => {
    const originalURL = global.URL;

    // @ts-expect-error
    global.URL = class extends originalURL {
        constructor(url: string, base: string) {
            // Supply your own base URL if the base is not provided
            if (!base) {
                base = 'http://localhost:3000'; // Your custom base URL
            }
            super(url, base);
        }
    };
};
