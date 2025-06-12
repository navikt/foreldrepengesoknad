import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import dayjs from 'dayjs';

import { FRILANS_ID } from '@navikt/fp-types';

import * as stories from './FrilansSteg.stories';

const { Default } = composeStories(stories);

describe('<FrilansSteg>', () => {
    it('skal gå til neste steg når informasjon er korrekt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Når startet du som frilanser?')).toBeInTheDocument();
        expect(screen.getByText('Jobber du fortsatt som frilanser?')).toBeInTheDocument();

        const frilansStartdatoInput = screen.getByLabelText('Når startet du som frilanser?');
        await userEvent.type(frilansStartdatoInput, dayjs('2023-12-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Jobber du fortsatt som frilanser?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi startdatoen for behov for tilrettelegging.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi hvor mye du kan jobbe.')).not.toBeInTheDocument();

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                jobberFremdelesSomFrilans: true,
                oppstart: '2023-12-30',
            },
            key: ContextDataType.FRILANS,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, FRILANS_ID),
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });
});
