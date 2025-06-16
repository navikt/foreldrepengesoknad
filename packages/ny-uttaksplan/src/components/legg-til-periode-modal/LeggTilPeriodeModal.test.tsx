import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import * as stories from './LeggTilPeriodeModal.stories';

const { LeggTilMødrekvote } = composeStories(stories);

describe('<LeggTilPeriodeModal >', () => {
    it.skip('<LeggTilMødrekvote >', async () => {
        render(<LeggTilMødrekvote />);
    });
});
