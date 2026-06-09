import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import { TilOgMedDatoType } from 'types/Tilrettelegging';

import * as stories from './VelgArbeidSteg.stories';

import messages from '../../intl/nb_NO.json';

const { Default } = composeStories(stories);

describe('<VelgArbeidSteg>', () => {
    it('skal vise feilmelding hvis ingen arbeidsforhold er avhuket', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
        expect(
            screen.getByText(messages['velgArbeid.hvor']),
        ).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.tilrettelegging.påkrevd']),
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
            screen.queryByText(messages['valideringsfeil.tilrettelegging.påkrevd']),
        ).not.toBeInTheDocument();

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: ['975326209'],
            key: ContextDataType.VALGTE_ARBEIDSFORHOLD,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, '975326209'),
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal ikke vise infoboks når kunn ett arbeidsforhold er valgt', async () => {
        render(<Default />);
        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));

        expect(screen.queryByText(messages['velgArbeid.guidepanel.tekst'])).not.toBeInTheDocument();
    });

    it('skal vise infoboks når mer enn ett arbeidsforhold er valgt', async () => {
        render(<Default />);
        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));
        await userEvent.click(screen.getByText('Omsorgspartner Vestfold AS'));

        expect(screen.getByText(messages['velgArbeid.guidepanel.tekst'])).toBeInTheDocument();
    });

    it('skal fjerne tilrettelegging når en har gått tilbake og valgt bort tilrettelegging', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <Default
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                valgteArbeidsforhold={['975326209', '990322244']}
                tilrettelegginger={{
                    '975326209': {
                        behovForTilretteleggingFom: '2024-01-01',
                        type: 'ingen',
                        enPeriodeMedTilretteleggingFom: '2024-01-01',
                        enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                    },
                    '990322244': {
                        behovForTilretteleggingFom: '2024-10-01',
                        type: 'ingen',
                        enPeriodeMedTilretteleggingFom: '2024-11-01',
                        enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                    },
                }}
            />,
        );

        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: ['990322244'],
            key: ContextDataType.VALGTE_ARBEIDSFORHOLD,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: {
                '990322244': {
                    behovForTilretteleggingFom: '2024-10-01',
                    type: 'ingen',
                    enPeriodeMedTilretteleggingFom: '2024-11-01',
                    enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                },
            },
            key: ContextDataType.TILRETTELEGGINGER,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, '990322244'),
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });
});
