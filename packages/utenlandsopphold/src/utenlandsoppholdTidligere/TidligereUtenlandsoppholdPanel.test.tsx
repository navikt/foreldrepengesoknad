import dayjs from 'dayjs';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import * as stories from './TidligereUtenlandsoppholdPanel.stories';

const { Default } = composeStories(stories);

describe('<TidligereUtenlandsoppholdPanel>', () => {
    it('skal vise feilmeldinger når en prøver å gå videre uten å oppgi obligatoriske felter', async () => {
        render(<Default />);

        expect(await screen.findByText('Har bodd i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 1')).toBeInTheDocument();

        expect(screen.getByText('Hvilket land bodde du i?')).toBeInTheDocument();
        expect(screen.getByText('Fra og med')).toBeInTheDocument();
        expect(screen.getByText('Til og med')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();

        expect(screen.getAllByText('Du må oppgi landet du oppholder deg i')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi en fra og med dato')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi en til og med dato')).toHaveLength(2);

        await userEvent.click(screen.getByText('Legg til flere opphold i utlandet'));

        expect(screen.getByText('Slett dette oppholdet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi landet du oppholder deg i')).toHaveLength(3);
        expect(screen.getAllByText('Du må oppgi en fra og med dato')).toHaveLength(3);
        expect(screen.getAllByText('Du må oppgi en til og med dato')).toHaveLength(3);
    });

    it('skal fylle ut to perioder og så gå videre', async () => {
        const saveOnNext = vi.fn();

        const utils = render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findByText('Har bodd i utlandet')).toBeInTheDocument();

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

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            utenlandsoppholdSiste12Mnd: [
                {
                    landkode: 'CA',
                    fom: dayjs().subtract(30, 'day').format(ISO_DATE_FORMAT),
                    tom: dayjs().subtract(25, 'day').format(ISO_DATE_FORMAT),
                },
                {
                    landkode: 'AS',
                    fom: dayjs().subtract(22, 'day').format(ISO_DATE_FORMAT),
                    tom: dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT),
                },
            ],
        });
    });

    it('skal fylle ut to perioder og kryssvalidere', async () => {
        const saveOnNext = vi.fn();

        const utils = render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findByText('Har bodd i utlandet')).toBeInTheDocument();

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

        expect(screen.getAllByText('Det kan ikke være flere utenlandsopphold i samme periode')).toHaveLength(5);
    });

    it('skal legge til periode og så fjerne den', async () => {
        render(<Default />);

        expect(await screen.findByText('Har bodd i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til flere opphold i utlandet'));

        expect(screen.getAllByText('Hvilket land bodde du i?')).toHaveLength(2);

        await userEvent.click(screen.getByText('Slett dette oppholdet'));

        expect(screen.getByText('Hvilket land bodde du i?')).toBeInTheDocument();
    });

    it('skal lagre uvalidert data når en går til forrige steg', async () => {
        const saveOnPrevious = vi.fn();
        const goToPreviousStep = vi.fn();

        render(<Default saveOnPrevious={saveOnPrevious} goToPreviousStep={goToPreviousStep} />);

        expect(await screen.findByText('Har bodd i utlandet')).toBeInTheDocument();

        await userEvent.selectOptions(screen.getByLabelText('Hvilket land bodde du i?'), 'CA');

        await userEvent.click(screen.getByText('Forrige steg'));

        expect(saveOnPrevious).toHaveBeenCalledTimes(1);
        expect(saveOnPrevious).toHaveBeenNthCalledWith(1, {
            utenlandsoppholdSiste12Mnd: [
                {
                    fom: '',
                    landkode: 'CA',
                    tom: '',
                },
            ],
        });

        expect(goToPreviousStep).toHaveBeenCalledTimes(1);
    });

    it('skal avslutte søknad', async () => {
        const cancelApplication = vi.fn();

        render(<Default cancelApplication={cancelApplication} />);

        expect(await screen.findByText('Har bodd i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Avslutt'));

        expect(screen.getByText('Slett søknaden')).toBeInTheDocument();
    });
});
