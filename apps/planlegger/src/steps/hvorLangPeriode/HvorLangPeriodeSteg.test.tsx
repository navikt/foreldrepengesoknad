import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';
import { Dekningsgrad } from 'types/Dekningsgrad';

import * as stories from './HvorLangPeriodeSteg.stories';

const { FlereForsørgereEttBarnKunMorHarRett } = composeStories(stories);

describe('<HvorLangPeriodeSteg>', () => {
    it('skal vise vise siste dag med feriepenger når kun mor har rett', async () => {
        const gåTilNesteSide = vi.fn();

        render(<FlereForsørgereEttBarnKunMorHarRett gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Hvor lenge')).toBeInTheDocument();

        await userEvent.click(screen.getByText('100 % utbetaling over 49 uker'));

        expect(screen.getByText('Siste dag med foreldrepenger kan bli Friday 15. November 2024')).toBeInTheDocument();

        await userEvent.click(screen.getByText('80 % utbetaling over 59 uker'));

        expect(screen.getByText('Siste dag med foreldrepenger kan bli Friday 24. January 2025')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
            },
            key: ContextDataType.HVOR_LANG_PERIODE,
            type: 'update',
        });
    });
});
