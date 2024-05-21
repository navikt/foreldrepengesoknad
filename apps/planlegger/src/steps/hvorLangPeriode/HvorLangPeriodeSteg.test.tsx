import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { useNavigate } from 'react-router-dom';
import { Dekningsgrad } from 'types/Dekningsgrad';

import * as stories from './HvorLangPeriodeSteg.stories';

const { FlereForsørgereEttBarnKunMorHarRett, FarOgFarBeggeHarRett } = composeStories(stories);

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        // @ts-ignore
        ...actual,
        useNavigate: vi.fn(),
    };
});

const useNavigateMock = vi.mocked(useNavigate);

describe('<HvorLangPeriodeSteg>', () => {
    it('skal sjekke at siste dag med foreldrepenger blir vist korrekt ved valg av dekningsgrader', async () => {
        const navigateMock = vi.fn();
        useNavigateMock.mockReturnValue(navigateMock);
        const gåTilNesteSide = vi.fn();

        render(<FlereForsørgereEttBarnKunMorHarRett gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Hvor lenge')).toBeInTheDocument();

        await userEvent.click(screen.getByText('100 % utbetaling over 49 uker'));

        expect(screen.getByText('Siste dag med foreldrepenger kan bli fredag 15. november 2024')).toBeInTheDocument();

        await userEvent.click(screen.getByText('80 % utbetaling over 59 uker'));

        expect(screen.getByText('Siste dag med foreldrepenger kan bli fredag 24. januar 2025')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
            },
            key: ContextDataType.HVOR_LANG_PERIODE,
            type: 'update',
        });

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(expect.stringMatching(PlanleggerRoutes.FORDELING));
    });

    it('skal gå til oversikt ved far og far og begge foreldre har rett', async () => {
        const navigateMock = vi.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        const gåTilNesteSide = vi.fn();

        render(<FarOgFarBeggeHarRett gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Hvor lenge')).toBeInTheDocument();

        await userEvent.click(screen.getByText('100 % utbetaling over 46 uker'));

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
            },
            key: ContextDataType.HVOR_LANG_PERIODE,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: ContextDataType.FORDELING,
            type: 'update',
        });

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(expect.stringMatching(PlanleggerRoutes.OVERSIKT));
    });
});
