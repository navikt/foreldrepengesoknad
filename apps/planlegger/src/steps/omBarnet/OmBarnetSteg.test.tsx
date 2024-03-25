import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './OmBarnetSteg.stories';

const { AleneforsørgerFar } = composeStories(stories);

describe('<OmBarnetSteg>', () => {
    it('skal velge at barnet ikke er født for far som aleneforsørger', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<AleneforsørgerFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Barnet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Fødsel'));

        await userEvent.click(screen.getByText('Ett'));

        await userEvent.click(screen.getByText('Nei'));

        const termindato = utils.getByLabelText('Når er termindato?');
        await userEvent.type(termindato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);

        expect(
            screen.getAllByText('Du kan søke om foreldrepenger nå for å ta permisjon tre uker før termin.'),
        ).toHaveLength(2);

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: '1',
                erBarnetFødt: false,
                erFødsel: true,
                termindato: '2024-03-25',
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
    });

    it('skal velge at barnet er født for far som aleneforsørger', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<AleneforsørgerFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Barnet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Fødsel'));

        await userEvent.click(screen.getByText('Ett'));

        await userEvent.click(screen.getByText('Ja'));

        const fødselsdato = utils.getByLabelText('Når ble barnet født?');
        await userEvent.type(fødselsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        const termindato = utils.getByLabelText('Når var termindato?');
        await userEvent.type(termindato, dayjs().subtract(10, 'days').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);

        expect(
            screen.getByText('Hvis du ikke har søkt om foreldrepenger enda, kan du gjøre det nå.'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: '1',
                erBarnetFødt: true,
                erFødsel: true,
                fødselsdato: '2024-03-25',
                termindato: '2024-03-15',
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
    });

    it('skal velge adopsjon for far som aleneforsørger', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<AleneforsørgerFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Barnet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Adopsjon'));

        await userEvent.click(screen.getByText('Ett'));

        const omsorgsovertakelseDato = utils.getByLabelText('Når tar du over omsorgen for barnet?');
        await userEvent.type(omsorgsovertakelseDato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(omsorgsovertakelseDato);

        const fødselsdato = utils.getByLabelText('Når ble barnet født?');
        await userEvent.type(fødselsdato, dayjs().subtract(10, 'days').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        expect(screen.getByText('Du kan søke om foreldrepenger allerede nå.')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: '1',
                erFødsel: false,
                fødselsdato: '2024-03-15',
                overtakelsesdato: '2024-03-25',
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
    });
});
