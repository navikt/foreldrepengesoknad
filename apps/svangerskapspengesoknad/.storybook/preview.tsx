//TODO Dette bør ikkje ligga her
(window as any).appSettings = {
    REST_API_URL: '',
    UTTAK_API_URL: 'uttak-url',
};

export const decorators = [
    (Story) => (
        <div id="app" style={{ backgroundColor: 'white', padding: '40px' }}>
            <Story />
        </div>
    ),
];
