import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './SisteUtenlandsopphold.stories';
import dayjs from 'dayjs';
import { DDMMYYYY_DATE_FORMAT } from 'fpcommon/form/Datepicker';

const { Default } = composeStories(stories);

describe('<SisteUtenlandsopphold>', () => {
    it('skal vise feilmeldinger når en prøver å gå videre uten å oppgi obligatoriske felter', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Har bodd i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Steg 5 av 6')).toBeInTheDocument();

        expect(screen.getByText('Hvilket land bodde du i?')).toBeInTheDocument();
        expect(screen.getByText('Fra og med')).toBeInTheDocument();
        expect(screen.getByText('Til og med')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må rette opp i følgende feil:')).toBeInTheDocument();

        expect(screen.getAllByText('Du må velge landet du oppholder deg i')).toHaveLength(2);
        expect(screen.getAllByText('Du må velge en fra og med dato')).toHaveLength(2);
        expect(screen.getAllByText('Du må velge en til og med dato')).toHaveLength(2);

        await userEvent.click(screen.getByText('Legg til flere opphold i utlandet'));

        expect(await screen.findByText('Slett dette oppholdet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må velge landet du oppholder deg i')).toHaveLength(3);
        expect(screen.getAllByText('Du må velge en fra og med dato')).toHaveLength(3);
        expect(screen.getAllByText('Du må velge en til og med dato')).toHaveLength(3);
    });

    it('skal fylle ut to perioder og så gå videre', async () => {
        const nesteStegFn = vi.fn();

        const utils = render(<Default gåTilNesteSide={nesteStegFn} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hvilket land bodde du i?'), 'CA');

        const fraOgMed = utils.getByLabelText('Fra og med');
        await userEvent.type(fraOgMed, dayjs().subtract(30, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMed);

        const tilOgMed = utils.getByLabelText('Til og med');
        await userEvent.type(tilOgMed, dayjs().subtract(25, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMed);

        await userEvent.click(screen.getByText('Legg til flere opphold i utlandet'));

        await userEvent.selectOptions(utils.getAllByLabelText('Hvilket land bodde du i?')[1], 'AS');

        const fraOgMedP2 = utils.getAllByLabelText('Fra og med')[1];
        await userEvent.type(fraOgMedP2, dayjs().subtract(22, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMedP2);

        const tilOgMedP2 = utils.getAllByLabelText('Til og med')[1];
        await userEvent.type(tilOgMedP2, dayjs().subtract(10, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMedP2);

        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(nesteStegFn).toHaveBeenCalledTimes(1));
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                utenlandsoppholdSiste12Mnd: [
                    {
                        landkode: 'CA',
                        fom: '2023-09-03',
                        tom: '2023-09-08',
                    },
                    {
                        landkode: 'AS',
                        fom: '2023-09-11',
                        tom: '2023-09-23',
                    },
                ],
            },
            key: 'UTENLANDSOPPHOLD_SISTE',
            type: 'update',
        });

        expect(await screen.findByText('Neste side: /soknad/oppsummering')).toBeInTheDocument();
    });

    // TODO Legg til denne testen når valideringa er avklart
    it.skip('skal fylle ut to perioder og kryssvalidere', async () => {
        const nesteStegFn = vi.fn();

        const utils = render(<Default gåTilNesteSide={nesteStegFn} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hvilket land bodde du i?'), 'CA');

        const fraOgMed = utils.getByLabelText('Fra og med');
        await userEvent.type(fraOgMed, dayjs().subtract(30, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMed);

        const tilOgMed = utils.getByLabelText('Til og med');
        await userEvent.type(tilOgMed, dayjs().subtract(25, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMed);

        await userEvent.click(screen.getByText('Legg til flere opphold i utlandet'));

        await userEvent.selectOptions(utils.getAllByLabelText('Hvilket land bodde du i?')[1], 'AS');

        const fraOgMedP2 = utils.getAllByLabelText('Fra og med')[1];
        await userEvent.type(fraOgMedP2, dayjs().subtract(25, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMedP2);

        const tilOgMedP2 = utils.getAllByLabelText('Til og med')[1];
        await userEvent.type(tilOgMedP2, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMedP2);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            await screen.findByText('Du har allerede lagt inn utenlandsopphold i denne perioden'),
        ).toBeInTheDocument();
    });

    it('skal legge til periode og så fjerne den', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til flere opphold i utlandet'));

        expect(await screen.findAllByText('Hvilket land bodde du i?')).toHaveLength(2);

        await userEvent.click(screen.getByText('Slett dette oppholdet'));

        expect(await screen.findByText('Hvilket land bodde du i?')).toBeInTheDocument();
    });
});
