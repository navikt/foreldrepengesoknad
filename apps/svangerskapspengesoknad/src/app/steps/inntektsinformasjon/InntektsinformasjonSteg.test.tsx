import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContextDataType } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';

import * as stories from './InntektsinformasjonSteg.stories';

const { Default } = composeStories(stories);

describe('<InntektsinformasjonSteg>', () => {
    it('skal gå til neste steg når informasjon er korrekt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]);

        await userEvent.click(screen.getAllByText('Nei')[1]);

        await userEvent.click(screen.getAllByText('Ja')[2]);
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                harHattArbeidIUtlandet: true,
                harJobbetSomFrilans: false,
                harJobbetSomSelvstendigNæringsdrivende: false,
            },
            key: ContextDataType.INNTEKTSINFORMASJON,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: ContextDataType.FRILANS,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: undefined,
            key: ContextDataType.EGEN_NÆRING,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(4, {
            data: SøknadRoutes.ARBEID_I_UTLANDET,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });
});
