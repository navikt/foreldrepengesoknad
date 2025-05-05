import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import * as stories from './LeggTilPeriodeModal.stories';

const { LeggTilMødrekvote } = composeStories(stories);

describe('<LeggTilPeriodeModal >', () => {
    it('<LeggTilMødrekvote >', async () => {
        const { container } = render(<LeggTilMødrekvote />);
        expect(container).toBeTruthy();
    });
});
