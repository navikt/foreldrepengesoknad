import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './Uttaksplan.innsyn.fødsel.mor.stories';

const { MorAleneOmOmsorg } = composeStories(stories);

describe('<Uttaksplan - innsyn - fødsel mor >', () => {
    it('<BeggeRettMorLedigeDager >', async () => {
        render(<MorAleneOmOmsorg />);

        expect(screen.getByText('16. Sep - 29. Sep')).toBeInTheDocument();
        expect(screen.getByText('30. Sep - 19. Jan')).toBeInTheDocument();
        expect(screen.getByText('20. Jan - 23. Feb')).toBeInTheDocument();
        expect(screen.getByText('24. Feb - 15. Jun')).toBeInTheDocument();

        await userEvent.click(screen.getByText('24. Feb - 15. Jun'));

        expect(screen.getAllByText('Skal ikke jobbe i denne perioden')).toHaveLength(3);

        expect(screen.queryByText('Endre')).not.toBeInTheDocument();
        expect(screen.queryByText('Slett')).not.toBeInTheDocument();
    });
});
