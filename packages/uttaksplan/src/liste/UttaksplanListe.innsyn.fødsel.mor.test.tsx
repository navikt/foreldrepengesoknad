import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './UttaksplanListe.innsyn.fødsel.mor.stories';

const { MorAleneOmOmsorg, PrematurUker } = composeStories(stories);

describe('<UttaksplanListe - innsyn - fødsel mor >', () => {
    it('Mor er alene om omsorg', async () => {
        render(<MorAleneOmOmsorg />);

        expect(screen.getByText('16. sep. 25 - 29. sep. 25')).toBeInTheDocument();
        expect(screen.getByText('30. sep. 25 - 19. jan. 26')).toBeInTheDocument();
        expect(screen.getByText('20. jan. 26 - 23. feb. 26')).toBeInTheDocument();
        expect(screen.getByText('24. feb. 26 - 15. juni 26')).toBeInTheDocument();

        await userEvent.click(screen.getByText('24. feb. 26 - 15. juni 26'));

        expect(screen.getAllByText('Skal ikke jobbe i denne perioden')).toHaveLength(3);

        expect(screen.queryByText('Endre')).not.toBeInTheDocument();
        expect(screen.queryByText('Slett')).not.toBeInTheDocument();
    });

    it('Prematuruker for mor', async () => {
        render(<PrematurUker />);

        expect(screen.getByText('13. aug. 25 - 10. okt. 25')).toBeInTheDocument();
        expect(screen.getByText('11. okt. 25 - 25. nov. 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText('13. aug. 25 - 10. okt. 25'));

        expect(screen.getByText('Denne perioden er endret fra foreldrepenger til pleiepenger.')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Endringen påvirker ikke hvor mye tid du har fått - bare hvilken ytelse som gjelder i denne perioden.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Denne perioden kan ikke endres eller slettes.')).toBeInTheDocument();

        expect(screen.queryByText('Endre')).not.toBeInTheDocument();
        expect(screen.queryByText('Slett')).not.toBeInTheDocument();
    });
});
