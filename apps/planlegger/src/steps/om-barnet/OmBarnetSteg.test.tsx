import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './OmBarnetSteg.stories';

import messages from '../../intl/messages/nb_NO.json';

const { AleneforsørgerFar, FlereForsørgereMorOgMor } = composeStories(stories);

describe('<OmBarnetPlanleggerSteg>', () => {
    it('skal velge at barnet ikke er født for far som aleneforsørger', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<AleneforsørgerFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['OmBarnetSteg.Fødsel']));

        await userEvent.click(screen.getByText(messages['OmBarnetSteg.Ett']));

        await userEvent.click(screen.getByText(messages['DefaultMessage.Nei']));

        const termindato = utils.getByLabelText(messages['ErIkkeFødtPanel.Termin']);
        await userEvent.type(termindato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);

        expect(
            screen.getByText('Hvis du ikke har søkt om foreldrepenger enda, kan du gjøre det nå.'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: '1',
                erBarnetFødt: false,
                erFødsel: true,
                termindato: dayjs().format(ISO_DATE_FORMAT),
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
    });
    it('skal velge at barnet ikke er født for far som aleneforsørger, termindato har vært', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<AleneforsørgerFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['OmBarnetSteg.Fødsel']));

        await userEvent.click(screen.getByText(messages['OmBarnetSteg.Ett']));

        await userEvent.click(screen.getByText(messages['DefaultMessage.Nei']));

        const termindato = utils.getByLabelText(messages['ErIkkeFødtPanel.Termin']);
        await userEvent.type(termindato, dayjs().subtract(10, 'days').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);

        expect(
            screen.getByText('Hvis du ikke har søkt om foreldrepenger enda, kan du gjøre det nå.'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: '1',
                erBarnetFødt: false,
                erFødsel: true,
                termindato: dayjs().subtract(10, 'days').format(ISO_DATE_FORMAT),
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
    });

    it('skal velge at barnet er født for far som aleneforsørger', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<AleneforsørgerFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['OmBarnetSteg.Fødsel']));

        await userEvent.click(screen.getByText(messages['OmBarnetSteg.Ett']));

        await userEvent.click(screen.getByText('Ja'));

        const fødselsdato = utils.getByLabelText('Når ble barnet født?');
        await userEvent.type(fødselsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        const termindato = utils.getByLabelText(messages['ErFødtPanel.NårVarTermin']);
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
                fødselsdato: dayjs().format(ISO_DATE_FORMAT),
                termindato: dayjs().subtract(10, 'days').format(ISO_DATE_FORMAT),
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
    });

    it('skal velge adopsjon for far som aleneforsørger', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<AleneforsørgerFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['OmBarnetSteg.Adopsjon']));

        await userEvent.click(screen.getByText(messages['OmBarnetSteg.Ett']));

        const omsorgsovertakelseDato = utils.getByLabelText('Når tar du over omsorgen for barnet?');
        await userEvent.type(omsorgsovertakelseDato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(omsorgsovertakelseDato);

        const fødselsdato = utils.getByLabelText('Når ble barnet født?');
        await userEvent.type(fødselsdato, dayjs().subtract(10, 'days').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        expect(
            screen.getByText('Hvis du ikke har søkt om foreldrepenger enda, kan du gjøre det nå.'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: '1',
                erFødsel: false,
                overtakelsesdato: dayjs().format(ISO_DATE_FORMAT),
                fødselsdato: dayjs().subtract(10, 'days').format(ISO_DATE_FORMAT),
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
    });

    it('skal ikke kunne velge adopsjon for mor og medmor', async () => {
        render(<FlereForsørgereMorOgMor />);

        expect(await screen.findAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2);

        expect(screen.getByRole('radio', { name: messages['OmBarnetSteg.Adopsjon'] })).toBeDisabled();
    });
});
