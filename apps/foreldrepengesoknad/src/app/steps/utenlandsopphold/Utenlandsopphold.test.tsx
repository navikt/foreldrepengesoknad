import dayjs from 'dayjs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Utenlandsopphold.stories';

const { Default } = composeStories(stories);

describe('<Utenlandsopphold>', () => {
    it('skal kun bo og har bodd i Norge', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvor skal du bo de neste 12 månedene?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Kun bo i Norge'));

        expect(screen.getByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Kun bodd i Norge'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal bo i utlandet helt eller delvis', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvor skal du bo de neste 12 månedene?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Bo i utlandet helt eller delvis'));

        expect(screen.getByText('Legg til nytt utenlandsopphold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til nytt utenlandsopphold'));

        expect(screen.getByText('Tidsrom')).toBeInTheDocument();

        const fraOgMedInput = screen.getByLabelText('Fra og med');
        await userEvent.type(fraOgMedInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Til og med')).toBeInTheDocument();
        const tilOgMedInput = screen.getByLabelText('Til og med');
        await userEvent.type(tilOgMedInput, dayjs().add(1, 'years').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Hvilket land skal du bo i?')).toBeInTheDocument();
        const hvilkeLandInput = screen.getByLabelText('Hvilket land skal du bo i?');
        await userEvent.type(hvilkeLandInput, 'Aruba');

        expect(screen.getByText('Legg til')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legg til'));

        expect(screen.getByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Kun bodd i Norge'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal ha bodd i utlandet helt eller delvis', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvor skal du bo de neste 12 månedene?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Kun bo i Norge'));

        expect(screen.getByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Bodd i utlandet helt eller delvis'));

        expect(screen.getByText('Legg til nytt utenlandsopphold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til nytt utenlandsopphold'));

        expect(screen.getByText('Tidsrom')).toBeInTheDocument();

        const fraOgMedInput = screen.getByLabelText('Fra og med');
        await userEvent.type(fraOgMedInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Til og med')).toBeInTheDocument();
        const tilOgMedInput = screen.getByLabelText('Til og med');
        await userEvent.type(tilOgMedInput, dayjs().add(1, 'years').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Hvilket land bodde du i?')).toBeInTheDocument();
        const hvilkeLandInput = screen.getByLabelText('Hvilket land bodde du i?');
        await userEvent.type(hvilkeLandInput, 'Aruba');

        expect(screen.getByText('Legg til')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legg til'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
});
