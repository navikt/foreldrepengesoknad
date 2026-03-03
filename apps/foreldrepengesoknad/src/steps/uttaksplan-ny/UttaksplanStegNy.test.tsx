import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './UttaksplanStegNy.stories';

const { FødselMorOgFarBeggeHarRett } = composeStories(stories);

describe('<UttaksplanStegNy>', () => {
    it(
        'skal vise feilmelding når en sletter alle perioder og prøver å gå videre',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(FødselMorOgFarBeggeHarRett.parameters.msw);

            render(
                <FødselMorOgFarBeggeHarRett
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            const juni = screen.getByTestId('year:2024;month:5');

            // Start redigeringsmodus
            await userEvent.click(within(juni).getByTestId('day:10;dayColor:BLUE'));

            // Lukk aksjonspanel for dag
            await userEvent.click(within(juni).getByTestId('day:10;dayColor:DARKBLUE'));

            await userEvent.click(screen.getAllByText('Du kan velge datoer i kalenderen')[0]!);

            await userEvent.click(screen.getByText('Fjern alt'));

            expect(await screen.findByText('Vil du fjerne alt i planen?')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ja, fjern alt'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Du har ikke lagt til noen perioder i planen')).toBeInTheDocument();
        }),
    );

    //TODO (TOR) Denne skal slåast på igjen etter ein sluttar å filtrera vekk perioden til annen part fra forslaget til plan
    it.todo(
        'skal vise feilmelding når en prøver å gå videre med stjernemerkede perioder',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(FødselMorOgFarBeggeHarRett.parameters.msw);

            render(
                <FødselMorOgFarBeggeHarRett
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            await userEvent.click(screen.getByText('Neste steg'));

            expect(
                await screen.findAllByText('Du må fylle ut informasjon om mors aktivitet i de markerte periodene'),
            ).toHaveLength(2);
        }),
    );
});
