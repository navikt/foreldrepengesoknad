let visIntlKoder = false;

const toggleDevBar = () => {
    const cls = 'devMode';
    visIntlKoder = !visIntlKoder;
    if (visIntlKoder) {
        window.document.body.classList.add(cls);
    } else {
        window.document.body.classList.remove(cls);
    }
};

const handleKeyDown = (evt: any) => {
    const event = evt as KeyboardEvent;
    if (event.altKey && event.shiftKey && event.keyCode === 68) {
        toggleDevBar();
    }
};

export const registerDevUtils = () => {
    if (window.document.body.classList) {
        window.addEventListener('keydown', (evt) => {
            handleKeyDown(evt);
        });
    }
};
