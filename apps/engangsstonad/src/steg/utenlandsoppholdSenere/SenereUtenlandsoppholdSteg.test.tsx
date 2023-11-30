import dayjs from 'dayjs';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './SenereUtenlandsoppholdSteg.stories';
import { Path } from 'appData/paths';
import { EsDataType } from 'appData/EsDataContext';

const { Default } = composeStories(stories);

describe('<SenereUtenlandsoppholdSteg>', () => {
    it('skal fylle ut to perioder og så gå videre', async () => {
        const nesteStegFn = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        const utils = render(<Default gåTilNesteSide={nesteStegFn} mellomlagreOgNaviger={mellomlagreOgNaviger} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Skal bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Steg 4 av 5')).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hvilket land skal du bo i?'), 'CA');

        const fraOgMed = utils.getByLabelText('Fra og med');
        await userEvent.type(fraOgMed, dayjs().add(1, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMed);

        const tilOgMed = utils.getByLabelText('Til og med');
        await userEvent.type(tilOgMed, dayjs().add(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMed);

        await userEvent.click(screen.getByText('Legg til flere opphold i utlandet'));

        await userEvent.selectOptions(utils.getAllByLabelText('Hvilket land skal du bo i?')[1], 'AS');

        const fraOgMedP2 = utils.getAllByLabelText('Fra og med')[1];
        await userEvent.type(fraOgMedP2, dayjs().add(22, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMedP2);

        const tilOgMedP2 = utils.getAllByLabelText('Til og med')[1];
        await userEvent.type(tilOgMedP2, dayjs().add(30, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMedP2);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(nesteStegFn).toHaveBeenCalledTimes(2);
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                utenlandsoppholdNeste12Mnd: [
                    {
                        landkode: 'CA',
                        fom: dayjs().add(1, 'day').format(ISO_DATE_FORMAT),
                        tom: dayjs().add(20, 'day').format(ISO_DATE_FORMAT),
                    },
                    {
                        landkode: 'AS',
                        fom: dayjs().add(22, 'day').format(ISO_DATE_FORMAT),
                        tom: dayjs().add(30, 'day').format(ISO_DATE_FORMAT),
                    },
                ],
            },
            key: EsDataType.UTENLANDSOPPHOLD_SENERE,
            type: 'update',
        });

        expect(nesteStegFn).toHaveBeenNthCalledWith(2, {
            data: Path.OPPSUMMERING,
            key: EsDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });
});
