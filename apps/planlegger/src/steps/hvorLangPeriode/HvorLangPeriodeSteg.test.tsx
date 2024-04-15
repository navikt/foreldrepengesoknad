import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';

import * as stories from './HvorLangPeriodeSteg.stories';

const { FlereForsørgereEttBarnKunMorHarRett } = composeStories(stories);

//TODO Skriv fleire testar

describe('<HvorLangPeriodeSteg>', () => {
    //FIXME Engelske tidspunkt i test. Ser greit ut i storybook
    it.skip('skal vise vise siste dag med feriepenger når kun mor har rett', async () => {
        const gåTilNesteSide = vi.fn();

        render(<FlereForsørgereEttBarnKunMorHarRett gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Hvor lenge')).toBeInTheDocument();

        await userEvent.click(screen.getByText('100 % utbetaling over 49 uker'));

        expect(screen.getByText('Siste dag med foreldrepenger kan bli mandag 28. oktober 2024')).toBeInTheDocument();

        await userEvent.click(screen.getByText('80% utbetaling over 59 uker'));

        expect(screen.getByText('Siste dag med foreldrepenger kan bli mandag 06. januar 2025')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                jobberAnnenPart: true,
                status: 'Jobber',
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });
});
