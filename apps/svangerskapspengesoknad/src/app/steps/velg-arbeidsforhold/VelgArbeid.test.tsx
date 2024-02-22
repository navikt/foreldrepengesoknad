import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContextDataType } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';

import * as stories from './VelgArbeid.stories';

const { Default } = composeStories(stories);

describe('<Velg arbeid>', () => {
    it('skal vise feilmelding hvis ingen arbeidsforhold er avhuket', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(
            screen.getByText('Hvor skal du jobbe mindre eller slutte å jobbe midlertidig på grunn av svangerskapet?'),
        ).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Du må velge hvilket arbeidsforhold du ønsker å søke svangerskapspenger for.'),
        ).toHaveLength(2);
    });

    it('skal ikke vise feilmelding', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.queryByText('Du må velge hvilket arbeidsforhold du ønsker å søke svangerskapspenger for.'),
        ).not.toBeInTheDocument();

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: [
                {
                    arbeidsforhold: {
                        arbeidsgiverId: '975326209',
                        navn: 'Sykehuset i Vestfold',
                        sluttdato: undefined,
                        startdato: '2019-06-01T00:00:00.000Z',
                        stillinger: [
                            {
                                fom: '2019-06-01T00:00:00.000Z',
                                stillingsprosent: 85.09,
                                tom: undefined,
                            },
                        ],
                        type: 'virksomhet',
                    },
                    behovForTilretteleggingFom: undefined,
                    delvisTilretteleggingPeriodeType: undefined,
                    enPeriodeMedTilretteleggingFom: undefined,
                    enPeriodeMedTilretteleggingStillingsprosent: undefined,
                    enPeriodeMedTilretteleggingTilbakeIJobbDato: undefined,
                    enPeriodeMedTilretteleggingTomType: undefined,
                    id: '975326209',
                    type: undefined,
                    varierendePerioder: [],
                    vedlegg: [],
                },
            ],
            key: ContextDataType.TILRETTELEGGINGER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: '975326209',
            key: ContextDataType.VALGT_TILRETTELEGGING_ID,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: SøknadRoutes.SKJEMA,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal ikke vise infoboks når kunn ett arbeidsforhold er valgt', async () => {
        render(<Default />);
        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));

        expect(screen.queryByText('Du vil nå gå gjennom hvert arbeidsforhold og gjøre dette:')).not.toBeInTheDocument();
    });

    it('skal vise infoboks når mer enn ett arbeidsforhold er valgt', async () => {
        render(<Default />);
        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));
        await userEvent.click(screen.getByText('Omsorgspartner Vestfold AS'));

        expect(screen.getByText('Du vil nå gå gjennom hvert arbeidsforhold og gjøre dette:')).toBeInTheDocument();
    });
});
