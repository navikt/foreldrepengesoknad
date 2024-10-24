import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';

import * as stories from './SenereUtenlandsoppholdSteg.stories';

const { Default } = composeStories(stories);

describe('<SenereUtenlandsoppholdSteg>', () => {
    it('skal fylle ut fremtidig utenlandsopphold og gå videre til inntektsinformasjon', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

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
            data: SøknadRoute.ARBEIDSFORHOLD_OG_INNTEKT,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til utenlandsforhold-oversikt når en ikke har tidligere opphold i utlandet og går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoute.UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til tidligere utenlandsforhold når en har tidligere opphold i utlandet og går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <Default
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                utenlandsforhold={{
                    harBoddUtenforNorgeSiste12Mnd: true,
                    skalBoUtenforNorgeNeste12Mnd: true,
                }}
            />,
        );

        expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoute.HAR_BODD_I_UTLANDET,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });
});
