import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';

import * as stories from './CalendarLabels.stories';

const { MorSøkerMedTapteDager, MorSøkerUtenTapteDager } = composeStories(stories);

describe('<CalendarLabels - Tapte dager>', () => {
    it('skal vise tapte dager som calenderlabel når planen inneholder tapte dager', async () => {
        render(<MorSøkerMedTapteDager />);

        const sortSirkel = document.querySelector('[class*="blackCircle"]');
        expect(sortSirkel).toBeInTheDocument();
    });

    it('skal ikke vise tapte dager som calenderlabel når planen ikke inneholder tapte dager', async () => {
        render(<MorSøkerUtenTapteDager />);
        const sortSirkel = document.querySelector('[class*="blackCircle"]');
        expect(sortSirkel).not.toBeInTheDocument();
    });
});
