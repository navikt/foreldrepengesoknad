import ReactDOM from 'react-dom';

const elementSelector = [
    'a[href]',
    'select:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])'
];

function nodelistToArray(nodes: NodeList): HTMLElement[] {
    const arr: HTMLElement[] = [];
    for (let i = nodes.length; i--; ) {
        arr.unshift(nodes.item(i) as HTMLElement);
    }
    return arr;
}

const tabEnabledSelectors = [`[tabIndex='0']`].concat(elementSelector);

const allTabIndexEnabledSelectors = [`[tabIndex]`].concat(elementSelector);

export function focusElement(el: any) {
    if (!el) {
        return;
    }
    if (typeof el === 'object') {
        const node = ReactDOM.findDOMNode(el);
        if (node) {
            (node as HTMLElement).focus();
        }
    } else {
        const domElement = document.getElementById(el);
        if (domElement) {
            domElement.focus();
        }
    }
}

export function getFocusableElements(el: Element, onlyTabReachable: boolean = true): HTMLElement[] | undefined {
    if (!el) {
        return undefined;
    }
    if (onlyTabReachable) {
        return nodelistToArray(el.querySelectorAll(tabEnabledSelectors.join(',')));
    } else {
        return nodelistToArray(el.querySelectorAll(allTabIndexEnabledSelectors.join(',')));
    }
}

export function focusFirstElement(el: Element) {
    const elements = getFocusableElements(el);
    if (elements && elements.length > 0) {
        (elements[0] as HTMLElement).focus();
    } else {
        (el as HTMLElement).focus();
    }
}
