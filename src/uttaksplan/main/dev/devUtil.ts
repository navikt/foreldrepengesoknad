let devToolbarActive = false;

const toggleDevToolbar = () => {
    const cls = 'devToolbar--active';
    devToolbarActive = !devToolbarActive;
    if (devToolbarActive) {
        window.document.body.classList.add(cls);
    } else {
        window.document.body.classList.remove(cls);
    }
};

const handleKeyDown = (evt: any) => {
    const event = evt as KeyboardEvent;
    if (event.altKey && event.shiftKey && event.keyCode === 68) {
        toggleDevToolbar();
    }
};

export const registerDevUtils = () => {
    if (window.document.body.classList) {
        window.addEventListener('keydown', (evt) => {
            handleKeyDown(evt);
        });
    }
};

// toggleDevToolbar();
registerDevUtils();
