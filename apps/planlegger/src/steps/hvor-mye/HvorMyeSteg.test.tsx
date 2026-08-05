import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';

import * as stories from './HvorMyeSteg.stories';

const { FlereForsørgere, AleneforsørgerMor } = composeStories(stories);

describe('<HvorMyeSteg>', () => {
    it('skal vises inputfelt for både mor og far', async () => {
        const gåTilNesteSide = vi.fn();
        const utils = render(<FlereForsørgere gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText('Hvor mye')).toHaveLength(2);

        const morLønn = utils.getByLabelText('Hva tjener Klara ca. i måneden? (valgfritt)');
        await userEvent.type(morLønn, '1000');
        const farLønn = utils.getByLabelText('Hva tjener Espen ca. i måneden? (valgfritt)');
        await userEvent.type(farLønn, '70000');

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: { lønnSøker1: '1000', lønnSøker2: '70000' },
            key: ContextDataType.HVOR_MYE,
            type: 'update',
        });
    });

    it('skal kun vise inputfelt for mor', async () => {
        render(<AleneforsørgerMor />);
        expect(await screen.findAllByText('Hvor mye')).toHaveLength(2);
        expect(screen.getByText('Hva tjener du ca. i måneden? (valgfritt)')).toBeInTheDocument();
        expect(screen.queryByText('Hva tjener Espen ca. i måneden? (valgfritt)')).not.toBeInTheDocument();
    });

    it('skal vise infoboks om at man ikke har rett til foreldrepenger når årslønn er under 1/2 G', async () => {
        render(<AleneforsørgerMor />);

        const morLønn = await screen.findByLabelText('Hva tjener du ca. i måneden? (valgfritt)');
        await userEvent.type(morLønn, '4000');

        const satser = stories.AleneforsørgerMor.args!.satser;
        const minÅrslønn = Math.round(satser.grunnbeløp[0]!.verdi / 2);
        const minÅrslønnFormatted = new Intl.NumberFormat('nb-NO', {
            style: 'currency',
            currency: 'NOK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(minÅrslønn);

        expect(
            await screen.findByText(
                (content) =>
                    content.includes(`Med årslønn under ${minÅrslønnFormatted}`) &&
                    content.includes('har du ikke rett til foreldrepenger'),
            ),
        ).toBeInTheDocument();
        expect(screen.getByText(/48\s?000\s?kr i året/)).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes(`${minÅrslønnFormatted} i året`))).toBeInTheDocument();
    });

    it('skal ikke vise infoboks om manglende rett når årslønn er over 1/2 G', async () => {
        render(<AleneforsørgerMor />);

        const morLønn = await screen.findByLabelText('Hva tjener du ca. i måneden? (valgfritt)');
        await userEvent.type(morLønn, '30000');

        expect(
            screen.queryByText('Med årslønn under 68 275 kr har du ikke rett til foreldrepenger'),
        ).not.toBeInTheDocument();
    });
});
