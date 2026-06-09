import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './SenereUtenlandsoppholdPanel.stories';

import messages from '../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<SenereUtenlandsoppholdPanel>', () => {
    it('skal vise feilmeldinger når en prøver å gå videre uten å oppgi obligatoriske felter', async () => {
        render(<Default />);

        expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 2')).toBeInTheDocument();

        expect(screen.getByText(messages['SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI'])).toBeInTheDocument();
        expect(screen.getByText(messages['TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed'])).toBeInTheDocument();
        expect(screen.getByText(messages['TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();

        expect(screen.getAllByText(messages['SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved'])).toHaveLength(2);
        expect(screen.getAllByText(messages['TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand']));

        expect(screen.getByText(messages['TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved'])).toHaveLength(3);
        expect(screen.getAllByText(messages['TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved'])).toHaveLength(3);
    });

    it('skal fylle ut to perioder og så gå videre', async () => {
        const saveOnNext = vi.fn();

        const utils = render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);

        await userEvent.selectOptions(utils.getByLabelText(messages['SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI']), 'CA');

        const fraOgMed = utils.getByLabelText(messages['TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed']);
        await userEvent.type(fraOgMed, dayjs().add(1, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMed);

        const tilOgMed = utils.getByLabelText(messages['TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed']);
        await userEvent.type(tilOgMed, dayjs().add(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMed);

        await userEvent.click(screen.getByText(messages['TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand']));

        await userEvent.selectOptions(utils.getAllByLabelText('Hvilket land skal du bo i?')[1]!, 'AS');

        const fraOgMedP2 = utils.getAllByLabelText('Fra og med')[1]!;
        await userEvent.type(fraOgMedP2, dayjs().add(22, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMedP2);

        const tilOgMedP2 = utils.getAllByLabelText('Til og med')[1]!;
        await userEvent.type(tilOgMedP2, dayjs().add(30, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMedP2);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, [
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
        ]);
    });

    it('skal fylle ut to perioder og kryssvalidere', async () => {
        const saveOnNext = vi.fn();

        const utils = render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);

        await userEvent.selectOptions(utils.getByLabelText(messages['SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI']), 'CA');

        const fraOgMed = utils.getByLabelText(messages['TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed']);
        await userEvent.type(fraOgMed, dayjs().add(1, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMed);

        const tilOgMed = utils.getByLabelText(messages['TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed']);
        await userEvent.type(tilOgMed, dayjs().add(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMed);

        await userEvent.click(screen.getByText(messages['TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand']));

        await userEvent.selectOptions(utils.getAllByLabelText('Hvilket land skal du bo i?')[1]!, 'AS');

        const fraOgMedP2 = utils.getAllByLabelText('Fra og med')[1]!;
        await userEvent.type(fraOgMedP2, dayjs().add(15, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fraOgMedP2);

        const tilOgMedP2 = utils.getAllByLabelText('Til og med')[1]!;
        await userEvent.type(tilOgMedP2, dayjs().add(29, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(tilOgMedP2);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText(messages['TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp'])).toHaveLength(5);
    });

    it('skal legge til periode og så fjerne den', async () => {
        render(<Default />);

        expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand']));

        expect(screen.getAllByText(messages['SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold']));

        expect(screen.getByText(messages['SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI'])).toBeInTheDocument();
    });

    it('skal lagre uvalidert data når en går til forrige steg', async () => {
        const saveOnPrevious = vi.fn();
        const goToPreviousStep = vi.fn();

        render(<Default saveOnPrevious={saveOnPrevious} goToPreviousStep={goToPreviousStep} />);

        expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);

        await userEvent.selectOptions(screen.getByLabelText(messages['SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI']), 'CA');

        await userEvent.click(screen.getByText('Forrige steg'));

        expect(saveOnPrevious).toHaveBeenCalledTimes(1);
        expect(saveOnPrevious).toHaveBeenNthCalledWith(1, [
            {
                fom: '',
                landkode: 'CA',
                tom: '',
            },
        ]);

        expect(goToPreviousStep).toHaveBeenCalledTimes(1);
    });

    it('skal avslutte søknad', async () => {
        const onAvsluttOgSlett = vi.fn();

        render(<Default onFortsettSenere={vi.fn()} onAvsluttOgSlett={onAvsluttOgSlett} />);

        expect(await screen.findAllByText('Skal bo i utlandet')).toHaveLength(2);

        await userEvent.click(screen.getAllByText('Slett søknaden')[0]!);
        await userEvent.click(screen.getAllByText('Slett søknaden')[1]!);

        expect(onAvsluttOgSlett).toHaveBeenCalledTimes(1);
    });

    it('skal gå til et tidligere steg', async () => {
        const onStepChange = vi.fn();

        render(<Default onStepChange={onStepChange} />);

        await userEvent.click(screen.getByText('Utenlandsopphold'));

        expect(onStepChange).toHaveBeenCalledTimes(1);
        expect(onStepChange).toHaveBeenNthCalledWith(1, 'UTENLANDSOPPHOLD_PATH');
    });
});
