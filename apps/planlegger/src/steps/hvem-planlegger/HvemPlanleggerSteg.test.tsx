import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';

import * as stories from './HvemPlanleggerSteg.stories';

import messages from '../../intl/messages/nb_NO.json';

const { Default, MedEksisterendeData } = composeStories(stories);

describe('<HvemPlanleggerSteg>', () => {
    it('skal planlegge for mor og far', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['HvemPlanleggerSteg.MorOgFar']));

        const morNavn = utils.getByLabelText(messages['HvemPlanleggerSteg.Mor']);
        await userEvent.type(morNavn, 'Helga');

        const farNavn = utils.getByLabelText(messages['HvemPlanleggerSteg.Far']);
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

        expect(await screen.findAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['HvemPlanleggerSteg.MorOgMedmor']));

        const morNavn = utils.getByLabelText(messages['HvemPlanleggerSteg.Mor']);
        await userEvent.type(morNavn, 'Helga');

        const farNavn = utils.getByLabelText(messages['HvemPlanleggerSteg.Medmor']);
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

        expect(await screen.findAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['HvemPlanleggerSteg.FarOgFar']));

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

        render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['HvemPlanleggerSteg.BareMor']));

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                type: 'mor',
            },
            key: ContextDataType.HVEM_PLANLEGGER,
            type: 'update',
        });
    });

    it('skal planlegge for far, aleneomsorg', async () => {
        const gåTilNesteSide = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['HvemPlanleggerSteg.BareFar']));

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                type: 'far',
            },
            key: ContextDataType.HVEM_PLANLEGGER,
            type: 'update',
        });
    });
    it('skal vise infoboks for mor med aleneomsorg', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['HvemPlanleggerSteg.BareMor'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['HvemPlanleggerSteg.BareMor']));

        expect(await screen.findByText(messages['HvemPlanleggerSteg.Infoboks'])).toBeInTheDocument();
        expect(screen.getByText(/Å ha aleneomsorg betyr/)).toBeInTheDocument();
    });

    it('skal slette all kontekstdata når hvem-type endres', async () => {
        const gåTilNesteSide = vi.fn();

        render(<MedEksisterendeData gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['HvemPlanleggerSteg.MorOgMedmor']));

        await userEvent.click(screen.getByText('Neste'));

        const dispatchedActions = gåTilNesteSide.mock.calls.map((call) => call[0]);

        expect(dispatchedActions).toContainEqual({ type: 'update', key: ContextDataType.OM_BARNET, data: undefined });
        expect(dispatchedActions).toContainEqual({
            type: 'update',
            key: ContextDataType.ARBEIDSSITUASJON,
            data: undefined,
        });
        expect(dispatchedActions).toContainEqual({
            type: 'update',
            key: ContextDataType.HVOR_LANG_PERIODE,
            data: undefined,
        });
        expect(dispatchedActions).toContainEqual({ type: 'update', key: ContextDataType.FORDELING, data: undefined });
        expect(dispatchedActions).toContainEqual({ type: 'update', key: ContextDataType.HVOR_MYE, data: undefined });
        expect(dispatchedActions).toContainEqual({ type: 'update', key: ContextDataType.UTTAKSPLAN, data: undefined });
    });
});
