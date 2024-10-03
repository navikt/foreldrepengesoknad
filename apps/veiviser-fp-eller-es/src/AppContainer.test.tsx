import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { applyRequestHandlers } from 'msw-storybook-addon';

import * as stories from './AppContainer.stories';

const { FpEllerEsVeiviserMockaStønadskontoerOgSatser } = composeStories(stories);

describe('<AppContainer>', () => {
    it('FP eller ES veiviser: skal gå gjennom app og så tilbake', async () => {
        await applyRequestHandlers(FpEllerEsVeiviserMockaStønadskontoerOgSatser.parameters.msw);
        const utils = render(<FpEllerEsVeiviserMockaStønadskontoerOgSatser />);

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
