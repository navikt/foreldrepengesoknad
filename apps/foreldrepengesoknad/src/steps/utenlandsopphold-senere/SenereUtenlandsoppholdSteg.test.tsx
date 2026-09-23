import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Action, ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { Skjemautkast } from '@navikt/fp-form-hooks';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';

import * as stories from './SenereUtenlandsoppholdSteg.stories';

const { Default } = composeStories(stories);

describe('<SenereUtenlandsoppholdSteg>', () => {
    it('gjenoppretter land og et ufullstendig datointervall etter fortsett senere', async () => {
        let skjemautkast: Skjemautkast | undefined;
        const gåTilNesteSide = vi.fn((action: Action) => {
            if (action.type === 'update' && action.data && typeof action.data === 'object' && 'skjema' in action.data) {
                skjemautkast = action.data;
            }
        });
        const mellomlagreSøknadOgNaviger = vi.fn(() => new Promise<void>(() => {}));
        const visning = render(
            <Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />,
        );
        await userEvent.selectOptions(screen.getByLabelText('Hvilket land skal du bo i?'), 'CAN');
        await userEvent.type(screen.getByLabelText('Fra og med'), '12.0');
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett senere' }));
        await userEvent.click(screen.getByRole('button', { name: 'Ok' }));

        expect(skjemautkast?.verdier).toMatchObject({
            utenlandsoppholdNeste12Mnd: [{ landkode: 'CAN', fom: '12.0' }],
        });
        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
        visning.unmount();

        render(<Default skjemautkast={skjemautkast} />);
        expect(screen.getByLabelText('Hvilket land skal du bo i?')).toHaveValue('CAN');
        expect(screen.getByLabelText('Fra og med')).toHaveValue('12.0');
        expect(screen.getByLabelText('Til og med')).toHaveValue('');
        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));
        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
    });

    it('skal fylle ut fremtidig utenlandsopphold og gå videre til inntektsinformasjon', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        await Default.run({
            args: {
                ...Default.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

        expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);

        await userEvent.selectOptions(screen.getByLabelText('Hvilket land skal du bo i?'), 'CAN');

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
                    landkode: 'CAN',
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
    });

    it('skal gå til utenlandsforhold-oversikt når en ikke har tidligere opphold i utlandet og går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        await Default.run({
            args: {
                ...Default.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

        expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til tidligere utenlandsforhold når en har tidligere opphold i utlandet og går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        await Default.run({
            args: {
                ...Default.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
                utenlandsopphold: {
                    skalBoUtenforNorgeNeste12Mnd: true,
                    harBoddUtenforNorgeSiste12Mnd: true,
                },
            },
        });

        expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });
});
