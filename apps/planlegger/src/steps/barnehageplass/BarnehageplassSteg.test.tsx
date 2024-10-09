import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './BarnehageplassSteg.stories';

const { FlereForsørgereBarnTerminDesemberStartAugustOmToÅr } = composeStories(stories);

// TODO Skriv fleire testar når dette steget blir inkludert

describe('<BarnehageplassSteg>', () => {
    it('skal vise barnehageplass i august', async () => {
        render(<FlereForsørgereBarnTerminDesemberStartAugustOmToÅr />);

        expect(await screen.findAllByText('Barnehageplass')).toHaveLength(2);

        expect(screen.getByText('Dere har rett på barnehageplass fra august 2026')).toBeInTheDocument();
    });
});
