import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { Modal } from '@navikt/ds-react';

expect.extend(matchers);

window.scrollTo = () => undefined;

if (Modal.setAppElement) {
    Modal.setAppElement('body');
}
