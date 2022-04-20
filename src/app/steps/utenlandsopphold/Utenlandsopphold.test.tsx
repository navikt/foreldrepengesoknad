import React from 'react';
import dayjs from 'dayjs';
import Modal from 'react-modal';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/steps/utenlandsopphold/Utenlandsopphold.stories';

const { Default } = composeStories(stories);

const HVOR_SKAL_DU_BO_LABEL = 'Hvor skal du bo de neste 12 månedene?';
const LEGG_TIL_NYTT_UTENLANDSOPPHOLD_KNAPP = 'Legg til nytt utenlandsopphold';
const GÅ_VIDERE_KNAPP = 'Gå videre';

//TODO (TOR) Bør ikkje ligga i test
Modal.setAppElement(document.createElement('div'));

describe('<Utenlandsopphold>', () => {
    it('skal kun bo og har bodd i Norge', async () => {
        render(<Default />);

        expect(await screen.findByText(HVOR_SKAL_DU_BO_LABEL)).toBeInTheDocument();

        userEvent.click(screen.getByText('Kun bo i Norge'));

        expect(await screen.findByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getByText('Kun bodd i Norge'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal bo i utlandet helt eller delvis', async () => {
        const utils = render(<Default />);

        expect(await screen.findByText(HVOR_SKAL_DU_BO_LABEL)).toBeInTheDocument();

        userEvent.click(screen.getByText('Bo i utlandet helt eller delvis'));

        expect(await screen.findByText(LEGG_TIL_NYTT_UTENLANDSOPPHOLD_KNAPP)).toBeInTheDocument();

        userEvent.click(screen.getByText(LEGG_TIL_NYTT_UTENLANDSOPPHOLD_KNAPP));

        expect(await screen.findByText('Tidsrom')).toBeInTheDocument();

        const fraOgMedInput = utils.getByLabelText('Fra og med');
        userEvent.type(fraOgMedInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(fraOgMedInput);

        expect(await screen.findByText('Til og med')).toBeInTheDocument();
        const tilOgMedInput = utils.getByLabelText('Til og med');
        userEvent.type(tilOgMedInput, dayjs().add(1, 'years').format('DD.MM.YYYY'));
        fireEvent.blur(tilOgMedInput);

        expect(await screen.findByText('Hvilket land skal du bo i?')).toBeInTheDocument();
        const hvilkeLandInput = utils.getByLabelText('Hvilket land skal du bo i?');
        userEvent.type(hvilkeLandInput, 'Aruba');

        expect(await screen.findByText('Ok')).toBeInTheDocument();
        userEvent.click(screen.getByText('Ok'));

        expect(await screen.findByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();

        userEvent.click(screen.getByText('Kun bodd i Norge'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal ha bodd i utlandet helt eller delvis', async () => {
        const utils = render(<Default />);

        expect(await screen.findByText(HVOR_SKAL_DU_BO_LABEL)).toBeInTheDocument();

        userEvent.click(screen.getByText('Kun bo i Norge'));

        expect(await screen.findByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();

        userEvent.click(screen.getByText('Bodd i utlandet helt eller delvis'));

        expect(await screen.findByText(LEGG_TIL_NYTT_UTENLANDSOPPHOLD_KNAPP)).toBeInTheDocument();

        userEvent.click(screen.getByText(LEGG_TIL_NYTT_UTENLANDSOPPHOLD_KNAPP));

        expect(await screen.findByText('Tidsrom')).toBeInTheDocument();

        const fraOgMedInput = utils.getByLabelText('Fra og med');
        userEvent.type(fraOgMedInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(fraOgMedInput);

        expect(await screen.findByText('Til og med')).toBeInTheDocument();
        const tilOgMedInput = utils.getByLabelText('Til og med');
        userEvent.type(tilOgMedInput, dayjs().add(1, 'years').format('DD.MM.YYYY'));
        fireEvent.blur(tilOgMedInput);

        expect(await screen.findByText('Hvilket land bodde du i?')).toBeInTheDocument();
        const hvilkeLandInput = utils.getByLabelText('Hvilket land bodde du i?');
        userEvent.type(hvilkeLandInput, 'Aruba');

        expect(await screen.findByText('Ok')).toBeInTheDocument();
        userEvent.click(screen.getByText('Ok'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
});
