import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import * as stories from './AppContainer.stories';

const { HvorMyeVeiviser } = composeStories(stories);

describe('<AppContainer>', () => {
    it('skal gå gjennom applikasjonen og så tilbake', async () => {
        const utils = render(<HvorMyeVeiviser />);

        expect(await screen.findAllByText('Hvor mye kan jeg få i foreldrepenger?')).toHaveLength(2);
        await userEvent.click(screen.getByText('Start'));

        const forrigeMåned = dayjs().subtract(1, 'month');

        expect(screen.getByText('Hvor mye kan jeg få i foreldrepenger?')).toBeInTheDocument();
        expect(screen.getByText('Hva er din nåværende arbeidssituasjon?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Arbeidstaker eller frilanser'));

        const måned1 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(2, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned1, '10000');
        const måned2 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(1, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned2, '10000');
        const måned3 = utils.getByLabelText(capitalizeFirstLetter(forrigeMåned.format('MMMM YYYY')));
        await userEvent.type(måned3, '10000');

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(screen.getByText('Oppsummering')).toBeInTheDocument();
        expect(screen.getByText('Gjennomsnittlig utbetaling med 100% foreldrepenger i 49 uker')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Tilbake til spørsmålene'));

        expect(screen.getByText('Hvor mye kan jeg få i foreldrepenger?')).toBeInTheDocument();
        expect(screen.getByText('Hva er din nåværende arbeidssituasjon?')).toBeInTheDocument();
    });
});
