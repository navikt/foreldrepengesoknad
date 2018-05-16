let visIntlKoder = false;

const toggleIntlKeys = () => {
    const cls = 'visIntlKoder';
    visIntlKoder = !visIntlKoder;
    if (visIntlKoder) {
        window.document.body.classList.add(cls);
    } else {
        window.document.body.classList.remove(cls);
    }
};

const handleKeyDown = (evt: any) => {
    const event = evt as KeyboardEvent;
    if (event.altKey && event.shiftKey && event.keyCode === 84) {
        toggleIntlKeys();
    }
};

export const registerDevUtils = () => {
    if (window.document.body.classList) {
        window.addEventListener('keydown', (evt) => {
            handleKeyDown(evt);
        });
    }
};
