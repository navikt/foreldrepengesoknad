import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { applyRequestHandlers } from 'msw-storybook-addon';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import * as stories from './AppContainer.stories';

const { HvorMyeVeiviserMockaStønadskontoerOgSatser, FpEllerEsVeiviserMockaStønadskontoerOgSatser } =
    composeStories(stories);

describe('<AppContainer>', () => {
    it('Hvor Mye veiviser: skal gå gjennom app og så tilbake', async () => {
        await applyRequestHandlers(HvorMyeVeiviserMockaStønadskontoerOgSatser.parameters.msw);
        const utils = render(<HvorMyeVeiviserMockaStønadskontoerOgSatser />);

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

    it('FP eller ES veiviser: skal gå gjennom app og så tilbake', async () => {
        await applyRequestHandlers(FpEllerEsVeiviserMockaStønadskontoerOgSatser.parameters.msw);
        const utils = await render(<FpEllerEsVeiviserMockaStønadskontoerOgSatser />);

        expect(await screen.findAllByText('Foreldrepenger eller engangsstønad?')).toHaveLength(2);
        await userEvent.click(screen.getByText('Start'));

        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(
            screen.getByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra NAV?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har du hatt inntekt 6 av de 10 siste månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        const hvorMye = utils.getByLabelText('Omtrent hvor mye tjener du i måneden før skatt?');
        await userEvent.type(hvorMye, '50000');

        expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]);

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(screen.getByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du har rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Tilbake til spørsmålene'));

        expect(screen.getByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
    });
});
