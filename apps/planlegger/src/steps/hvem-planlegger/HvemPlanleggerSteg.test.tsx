import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';

import * as stories from './HvemPlanleggerSteg.stories';

const { Default } = composeStories(stories);

describe('<HvemPlanleggerSteg>', () => {
    it('skal planlegge for mor og far', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText('Hvem planlegger?')).toHaveLength(2);

        await userEvent.click(screen.getByText('Mor og far'));

        const morNavn = utils.getByLabelText('Hva heter mor? (valgfritt)');
        await userEvent.type(morNavn, 'Helga');

        const farNavn = utils.getByLabelText('Hva heter far? (valgfritt)');
        await userEvent.type(farNavn, 'Espen');

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                navnPåFar: 'Espen',
                navnPåMor: 'Helga',
                type: 'morOgFar',
            },
            key: ContextDataType.HVEM_PLANLEGGER,
            type: 'update',
        });
    });

    it('skal planlegge for mor og medmor', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText('Hvem planlegger?')).toHaveLength(2);

        await userEvent.click(screen.getByText('Mor og medmor'));

        const morNavn = utils.getByLabelText('Hva heter mor? (valgfritt)');
        await userEvent.type(morNavn, 'Helga');

        const farNavn = utils.getByLabelText('Hva heter medmor? (valgfritt)');
        await userEvent.type(farNavn, 'Olga');

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                navnPåMor: 'Helga',
                navnPåMedmor: 'Olga',
                type: 'morOgMedmor',
            },
            key: ContextDataType.HVEM_PLANLEGGER,
            type: 'update',
        });
    });

    it('skal planlegge for far og far', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText('Hvem planlegger?')).toHaveLength(2);

        await userEvent.click(screen.getByText('Far og far'));

        const far1Navn = utils.getAllByLabelText('Hva heter far? (valgfritt)')[0]!;
        await userEvent.type(far1Navn, 'Espen');

        const far2Navn = utils.getAllByLabelText('Hva heter far? (valgfritt)')[1]!;
        await userEvent.type(far2Navn, 'Peder');

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                navnPåFar: 'Espen',
                navnPåMedfar: 'Peder',
                type: 'farOgFar',
            },
            key: ContextDataType.HVEM_PLANLEGGER,
            type: 'update',
        });
    });

    it('skal planlegge for mor, aleneomsorg', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText('Hvem planlegger?')).toHaveLength(2);

        await userEvent.click(screen.getByText('Bare mor med aleneomsorg'));

        const morNavn = utils.getByLabelText('Hva heter mor? (valgfritt)');
        await userEvent.type(morNavn, 'Olga');

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                navnPåMor: 'Olga',
                type: 'mor',
            },
            key: ContextDataType.HVEM_PLANLEGGER,
            type: 'update',
        });
    });

    it('skal planlegge for far, aleneomsorg', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText('Hvem planlegger?')).toHaveLength(2);

        await userEvent.click(screen.getByText('Bare far med aleneomsorg'));

        const farNavn = utils.getByLabelText('Hva heter far? (valgfritt)');
        await userEvent.type(farNavn, 'Espen');

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                navnPåFar: 'Espen',
                type: 'far',
            },
            key: ContextDataType.HVEM_PLANLEGGER,
            type: 'update',
        });
    });
    it('skal vise infoboks for mor med aleneomsorg', async () => {
        render(<Default />);

        expect(await screen.findByText('Bare mor med aleneomsorg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Bare mor med aleneomsorg'));

        expect(await screen.findByText('Aleneomsorg')).toBeInTheDocument();
        expect(screen.getByText(/Å ha aleneomsorg betyr/)).toBeInTheDocument();
    });
});
