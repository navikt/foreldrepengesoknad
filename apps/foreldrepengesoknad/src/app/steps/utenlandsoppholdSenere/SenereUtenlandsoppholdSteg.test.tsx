import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';
import * as stories from './SenereUtenlandsoppholdSteg.stories';
import SøknadRoutes from 'app/routes/routes';
import { FpDataType } from 'app/context/FpDataContext';
import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';

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
                            fom: '2023-11-24',
                            tom: '2023-12-13',
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
});
