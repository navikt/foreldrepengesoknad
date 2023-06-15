const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    REST_API_URL: 'rest-api',
    LOGIN_URL: '',
});
document.head.appendChild(scriptTag);

export const decorators = [
    (Story) => (
        <div id="app" style={{ backgroundColor: 'white', padding: '40px' }}>
            <Story />
        </div>
    ),
];
