import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './SenereUtenlandsoppholdSteg.stories';

const { Default } = composeStories(stories);

describe('<SenereUtenlandsoppholdSteg>', () => {
    it(
        'skal fylle ut fremtidig utenlandsopphold og gå videre til inntektsinformasjon',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(Default.parameters.msw);
            render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

            expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);

            await userEvent.selectOptions(screen.getByLabelText('Hvilket land skal du bo i?'), 'CA');

            const fraOgMed = screen.getByLabelText('Fra og med');
            await userEvent.type(fraOgMed, dayjs().add(1, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(fraOgMed);

            const tilOgMed = screen.getByLabelText('Til og med');
            await userEvent.type(tilOgMed, dayjs().add(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(tilOgMed);

            await userEvent.click(screen.getByText('Neste steg'));

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

            expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: [
                    {
                        landkode: 'CA',
                        fom: dayjs().add(1, 'day').format(ISO_DATE_FORMAT),
                        tom: dayjs().add(20, 'day').format(ISO_DATE_FORMAT),
                    },
                ] satisfies UtenlandsoppholdPeriode[],
                key: ContextDataType.UTENLANDSOPPHOLD_SENERE,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.ARBEID_OG_INNTEKT,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        }),
    );

    it(
        'skal gå til utenlandsforhold-oversikt når en ikke har tidligere opphold i utlandet og går til forrige steg',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(Default.parameters.msw);
            render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

            expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);
            await userEvent.click(screen.getByText('Forrige steg'));

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

            expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: SøknadRoutes.UTENLANDSOPPHOLD,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        }),
    );

    it(
        'skal gå til tidligere utenlandsforhold når en har tidligere opphold i utlandet og går til forrige steg',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(Default.parameters.msw);
            render(
                <Default
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    utenlandsopphold={{
                        skalBoUtenforNorgeNeste12Mnd: true,
                        harBoddUtenforNorgeSiste12Mnd: true,
                    }}
                />,
            );

            expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);
            await userEvent.click(screen.getByText('Forrige steg'));

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

            expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        }),
    );
});
