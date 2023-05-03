//TODO Dette bør ikkje ligga her
(window as any).appSettings = {
    REST_API_URL: 'api-url',
    UTTAK_API_URL: 'api-url',
};

export const decorators = [
    (Story) => (
        <div id="app" style={{ backgroundColor: 'white', padding: '40px' }}>
            <Story />
        </div>
    ),
];
