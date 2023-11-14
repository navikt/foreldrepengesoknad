import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { setProjectAnnotations } from '@storybook/react';
import { Modal } from '@navikt/ds-react';
import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

expect.extend(matchers);

window.scrollTo = () => undefined;

if (Modal.setAppElement) {
    Modal.setAppElement('body');
}
