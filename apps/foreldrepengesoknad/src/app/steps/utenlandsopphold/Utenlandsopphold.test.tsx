import React from 'react';
import dayjs from 'dayjs';
import Modal from 'react-modal';
import { render, screen } from '@testing-library/react';
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
        const user = userEvent.setup();
        render(<Default />);

        expect(await screen.findByText(HVOR_SKAL_DU_BO_LABEL)).toBeInTheDocument();

        await user.click(screen.getByText('Kun bo i Norge'));

        expect(await screen.findByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        await user.click(screen.getByText('Kun bodd i Norge'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal bo i utlandet helt eller delvis', async () => {
        render(<Default />);

        expect(await screen.findByText(HVOR_SKAL_DU_BO_LABEL)).toBeInTheDocument();

        await userEvent.click(screen.getByText('Bo i utlandet helt eller delvis'));

        expect(await screen.findByText(LEGG_TIL_NYTT_UTENLANDSOPPHOLD_KNAPP)).toBeInTheDocument();

        await userEvent.click(screen.getByText(LEGG_TIL_NYTT_UTENLANDSOPPHOLD_KNAPP));

        expect(await screen.findByText('Tidsrom')).toBeInTheDocument();

        const fraOgMedInput = screen.getByLabelText('Fra og med');
        await userEvent.type(fraOgMedInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Til og med')).toBeInTheDocument();
        const tilOgMedInput = screen.getByLabelText('Til og med');
        await userEvent.type(tilOgMedInput, dayjs().add(1, 'years').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Hvilket land skal du bo i?')).toBeInTheDocument();
        const hvilkeLandInput = screen.getByLabelText('Hvilket land skal du bo i?');
        await userEvent.type(hvilkeLandInput, 'Aruba');

        expect(await screen.findByText('Ok')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ok'));

        expect(await screen.findByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Kun bodd i Norge'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal ha bodd i utlandet helt eller delvis', async () => {
        render(<Default />);

        expect(await screen.findByText(HVOR_SKAL_DU_BO_LABEL)).toBeInTheDocument();

        await userEvent.click(screen.getByText('Kun bo i Norge'));

        expect(await screen.findByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Bodd i utlandet helt eller delvis'));

        expect(await screen.findByText(LEGG_TIL_NYTT_UTENLANDSOPPHOLD_KNAPP)).toBeInTheDocument();

        await userEvent.click(screen.getByText(LEGG_TIL_NYTT_UTENLANDSOPPHOLD_KNAPP));

        expect(await screen.findByText('Tidsrom')).toBeInTheDocument();

        const fraOgMedInput = screen.getByLabelText('Fra og med');
        await userEvent.type(fraOgMedInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Til og med')).toBeInTheDocument();
        const tilOgMedInput = screen.getByLabelText('Til og med');
        await userEvent.type(tilOgMedInput, dayjs().add(1, 'years').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Hvilket land bodde du i?')).toBeInTheDocument();
        const hvilkeLandInput = screen.getByLabelText('Hvilket land bodde du i?');
        await userEvent.type(hvilkeLandInput, 'Aruba');

        expect(await screen.findByText('Ok')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ok'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
});
