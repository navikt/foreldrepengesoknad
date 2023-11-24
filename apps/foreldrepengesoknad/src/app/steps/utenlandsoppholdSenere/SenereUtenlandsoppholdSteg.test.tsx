import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';
import * as stories from './SenereUtenlandsoppholdSteg.stories';
import SøknadRoutes from 'app/routes/routes';
import { FpDataType } from 'app/context/FpDataContext';
import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

const { Default } = composeStories(stories);

describe('<SenereUtenlandsoppholdSteg>', () => {
    it('skal fylle ut fremtidig utenlandsopphold og gå videre til inntektsinformasjon', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknad = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknad={mellomlagreSøknad} />);

        expect(await screen.findByText('Skal bo i utlandet')).toBeInTheDocument();

        await userEvent.selectOptions(screen.getByLabelText('Hvilket land skal du bo i?'), 'CA');

        const fraOgMed = screen.getByLabelText('Fra og med');
        await userEvent.type(fraOgMed, dayjs().add(1, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMed);

        const tilOgMed = screen.getByLabelText('Til og med');
        await userEvent.type(tilOgMed, dayjs().add(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMed);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknad).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                senereOpphold: [
                    {
                        land: 'CA',
                        tidsperiode: {
                            fom: dayjs().add(1, 'day').format(ISO_DATE_FORMAT),
                            tom: dayjs().add(20, 'day').format(ISO_DATE_FORMAT),
                        },
                    },
                ],
            },
            key: FpDataType.UTENLANDSOPPHOLD_SENERE,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.INNTEKTSINFORMASJON,
            key: FpDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til utenlandsforhold-oversikt når en ikke har tidligere opphold i utlandet og går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknad = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknad={mellomlagreSøknad} />);

        expect(await screen.findByText('Skal bo i utlandet')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknad).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.UTENLANDSOPPHOLD,
            key: FpDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til tidligere utenlandsforhold når en har tidligere opphold i utlandet og går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknad = vi.fn();

        render(
            <Default
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknad={mellomlagreSøknad}
                utenlandsforhold={{
                    iNorgeNeste12Mnd: false,
                    iNorgeSiste12Mnd: false,
                }}
            />,
        );

        expect(await screen.findByText('Skal bo i utlandet')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknad).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD,
            key: FpDataType.APP_ROUTE,
            type: 'update',
        });
    });
});
