const elementSelector = [
    'a[href]',
    'select:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]',
    'button:not([disabled])',
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

export function getFocusableElements(el: Element, onlyTabReachable = true): HTMLElement[] | undefined {
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

export function focusLastElement(el: Element) {
    const elements = getFocusableElements(el);
    if (elements && elements.length > 0) {
        (elements[elements.length - 1] as HTMLElement).focus();
    } else {
        (el as HTMLElement).focus();
    }
}
