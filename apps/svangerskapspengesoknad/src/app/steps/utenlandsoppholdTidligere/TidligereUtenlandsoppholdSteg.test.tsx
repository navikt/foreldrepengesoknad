import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';
import * as stories from './TidligereUtenlandsoppholdSteg.stories';
import SøknadRoutes from 'app/routes/routes';
import { ContextDataType } from 'app/context/SvpDataContext';
import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

const { Default } = composeStories(stories);

describe('<TidligereUtenlandsoppholdSteg>', () => {
    it('skal fylle ut tidligere utenlandsopphold og gå videre til inntektsinformasjon når en ikke har fremtidige utenlandsopphold', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Har bodd i utlandet')).toBeInTheDocument();

        await userEvent.selectOptions(screen.getByLabelText('Hvilket land bodde du i?'), 'CA');

        const fraOgMed = screen.getByLabelText('Fra og med');
        await userEvent.type(fraOgMed, dayjs().subtract(30, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMed);

        const tilOgMed = screen.getByLabelText('Til og med');
        await userEvent.type(tilOgMed, dayjs().subtract(25, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMed);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                tidligereOpphold: [
                    {
                        land: 'CA',
                        tidsperiode: {
                            fom: dayjs().subtract(30, 'day').format(ISO_DATE_FORMAT),
                            tom: dayjs().subtract(25, 'day').format(ISO_DATE_FORMAT),
                        },
                    },
                ],
            },
            key: ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ARBEID,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal fylle ut tidligere utenlandsopphold og gå videre til senere utenlandsopphold når en har indikert at en har dette', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <Default
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                utenlandsopphold={{ iNorgeSiste12Mnd: false, iNorgeNeste12Mnd: false }}
            />,
        );

        expect(await screen.findByText('Har bodd i utlandet')).toBeInTheDocument();

        await userEvent.selectOptions(screen.getByLabelText('Hvilket land bodde du i?'), 'CA');

        const fraOgMed = screen.getByLabelText('Fra og med');
        await userEvent.type(fraOgMed, dayjs().subtract(30, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMed);

        const tilOgMed = screen.getByLabelText('Til og med');
        await userEvent.type(tilOgMed, dayjs().subtract(25, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMed);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                tidligereOpphold: [
                    {
                        land: 'CA',
                        tidsperiode: {
                            fom: dayjs().subtract(30, 'day').format(ISO_DATE_FORMAT),
                            tom: dayjs().subtract(25, 'day').format(ISO_DATE_FORMAT),
                        },
                    },
                ],
            },
            key: ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.SKAL_BO_I_UTLANDET,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal lagre route når en går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Har bodd i utlandet')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });
});
