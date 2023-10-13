import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './UtenlandsoppholdPeriodeSteg.stories';
import dayjs from 'dayjs';
import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

const { Default } = composeStories(stories);

describe('<UtenlandsoppholdPeriodeSteg>', () => {
    it('skal vise feilmeldinger når en prøver å gå videre uten å oppgi obligatoriske felter', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Bo-opphold i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Steg 4 av 5')).toBeInTheDocument();

        expect(screen.getByText('Hvilket land?')).toBeInTheDocument();
        expect(screen.getByText('Flyttet du til landet for mer enn et år siden?')).toBeInTheDocument();
        expect(screen.getByText('Skal du bo i landet mer enn et år frem i tid?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må velge land')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi om du har flyttet til landet for mer enn et år siden')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi om du skal bo i landet mer enn et år frem i tid')).toHaveLength(2);

        await userEvent.click(screen.getByText('Legg til flere opphold i utlandet'));

        expect(await screen.findByText('Slett dette oppholdet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må velge land')).toHaveLength(3);
        expect(screen.getAllByText('Du må oppgi om du har flyttet til landet for mer enn et år siden')).toHaveLength(3);
        expect(screen.getAllByText('Du må oppgi om du skal bo i landet mer enn et år frem i tid')).toHaveLength(3);
    });

    it('skal fylle ut to perioder og så gå videre', async () => {
        const nesteStegFn = vi.fn();

        const utils = render(<Default gåTilNesteSide={nesteStegFn} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hvilket land?'), 'CA');

        await userEvent.click(screen.getAllByText('Nei')[0]);

        const fraOgMed = utils.getByLabelText('Når flyttet eller flytter du til landet?');
        await userEvent.type(fraOgMed, dayjs().add(1, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMed);

        await userEvent.click(screen.getAllByText('Nei')[1]);

        const tilOgMed = utils.getByLabelText('Når flyttet eller flytter du fra landet?');
        await userEvent.type(tilOgMed, dayjs().add(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMed);

        await userEvent.click(screen.getByText('Legg til flere opphold i utlandet'));

        await userEvent.selectOptions(utils.getAllByLabelText('Hvilket land?')[1], 'AS');

        await userEvent.click(screen.getAllByText('Nei')[2]);

        const fraOgMedP2 = utils.getAllByLabelText('Når flyttet eller flytter du til landet?')[1];
        await userEvent.type(fraOgMedP2, dayjs().add(22, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMedP2);

        await userEvent.click(screen.getAllByText('Nei')[3]);

        const tilOgMedP2 = utils.getAllByLabelText('Når flyttet eller flytter du fra landet?')[1];
        await userEvent.type(tilOgMedP2, dayjs().add(30, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMedP2);

        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(nesteStegFn).toHaveBeenCalledTimes(1));
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                perioder: [
                    {
                        harFlyttetUtForMerEnn12MånderSiden: false,
                        skalBoIUtlandetMerEnEttÅrFremover: false,
                        landkode: 'CA',
                        fom: dayjs().add(1, 'day').format(ISO_DATE_FORMAT),
                        tom: dayjs().add(20, 'day').format(ISO_DATE_FORMAT),
                    },
                    {
                        harFlyttetUtForMerEnn12MånderSiden: false,
                        skalBoIUtlandetMerEnEttÅrFremover: false,
                        landkode: 'AS',
                        fom: dayjs().add(22, 'day').format(ISO_DATE_FORMAT),
                        tom: dayjs().add(30, 'day').format(ISO_DATE_FORMAT),
                    },
                ],
            },
            key: 'UTENLANDSOPPHOLD_PERIODER',
            type: 'update',
        });

        expect(await screen.findByText('Neste side: /soknad/oppsummering')).toBeInTheDocument();
    });

    it('skal fylle ut to perioder og kryssvalidere', async () => {
        const nesteStegFn = vi.fn();

        const utils = render(<Default gåTilNesteSide={nesteStegFn} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hvilket land?'), 'CA');

        await userEvent.click(screen.getAllByText('Nei')[0]);

        const fraOgMed = utils.getByLabelText('Når flyttet eller flytter du til landet?');
        await userEvent.type(fraOgMed, dayjs().add(1, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMed);

        await userEvent.click(screen.getAllByText('Nei')[1]);

        const tilOgMed = utils.getByLabelText('Når flyttet eller flytter du fra landet?');
        await userEvent.type(tilOgMed, dayjs().add(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMed);

        await userEvent.click(screen.getByText('Legg til flere opphold i utlandet'));

        await userEvent.selectOptions(utils.getAllByLabelText('Hvilket land?')[1], 'AS');

        await userEvent.click(screen.getAllByText('Nei')[2]);

        const fraOgMedP2 = utils.getAllByLabelText('Når flyttet eller flytter du til landet?')[1];
        await userEvent.type(fraOgMedP2, dayjs().add(15, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMedP2);

        await userEvent.click(screen.getAllByText('Nei')[3]);

        const tilOgMedP2 = utils.getAllByLabelText('Når flyttet eller flytter du fra landet?')[1];
        await userEvent.type(tilOgMedP2, dayjs().add(29, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMedP2);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Det kan ikke være flere utenlandsopphold i samme periode')).toHaveLength(5);
    });

    it('skal legge til periode og så fjerne den', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til flere opphold i utlandet'));

        expect(await screen.findAllByText('Hvilket land?')).toHaveLength(2);

        await userEvent.click(screen.getByText('Slett dette oppholdet'));

        expect(await screen.findByText('Hvilket land?')).toBeInTheDocument();
    });
});
