import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './OmBarnetSteg.stories';

import messages from '../../intl/messages/nb_NO.json';

const { VisSideForAdopsjonKvinne, VisSideForAdopsjonMann, VisSideForFodsel } = composeStories(stories);

describe('<OmBarnetSteg>', () => {
    it('skal vise side for adopsjon for kvinne', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        const utils = render(
            <VisSideForAdopsjonKvinne gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />,
        );
        expect(await screen.findByText(messages['Engangsstønad.Pagetitle'])).toBeInTheDocument();

        expect(screen.getAllByText(messages['OmBarnetOppsummering.tittel'])).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 4')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText(messages['AdopsjonPanel.Spørsmål.Required'])).toHaveLength(2);
        expect(screen.getAllByText(messages['AdopsjonPanel.OvertaOmsorg.DuMåOppgi'])).toHaveLength(2);
        expect(screen.getAllByText(messages['AdopsjonPanel.Antallbarn.Required'])).toHaveLength(2);

        await userEvent.click(screen.getByText('Ja'));

        const adopsjonsdato = utils.getByLabelText(messages['AdopsjonPanel.Spørsmål.Stebarnsadopsjondato']);
        await userEvent.type(adopsjonsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(adopsjonsdato);

        await userEvent.click(screen.getByText(messages['AdopsjonPanel.Radiobutton.Ettbarn']));

        const fødselsdato = utils.getByLabelText(messages['AdopsjonFodselFieldArray.Fødselsdato']);
        await userEvent.type(fødselsdato, dayjs().subtract(10, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                type: 'adopsjon',
                adopsjonAvEktefellesBarn: true,
                adopsjonsdato: dayjs().format(ISO_DATE_FORMAT),
                antallBarn: 1,
                fødselsdatoer: [dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT)],
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.ADOPSJONSBEKREFTELSE,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal vise side for adopsjon for mann', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        const utils = render(
            <VisSideForAdopsjonMann gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />,
        );
        expect(await screen.findByText(messages['Engangsstønad.Pagetitle'])).toBeInTheDocument();

        expect(screen.getAllByText(messages['OmBarnetOppsummering.tittel'])).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 4')).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['AdopsjonPanel.Nei']));

        const adopsjonsdato = utils.getByLabelText(messages['AdopsjonPanel.Spørsmål.Overtaomsorgdato']);
        await userEvent.type(adopsjonsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(adopsjonsdato);

        await userEvent.click(screen.getByText(messages['AdopsjonPanel.Radiobutton.Ettbarn']));

        const fødselsdato = utils.getByLabelText(messages['AdopsjonFodselFieldArray.Fødselsdato']);
        await userEvent.type(fødselsdato, dayjs().subtract(10, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText(messages['AdopsjonPanel.AdoptererDuAlene.Required'])).toHaveLength(2);

        await userEvent.click(screen.getAllByText('Ja')[1]!);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                type: 'adopsjon',
                adopsjonAvEktefellesBarn: false,
                adopsjonsdato: dayjs().format(ISO_DATE_FORMAT),
                antallBarn: 1,
                fødselsdatoer: [dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT)],
                søkerAdopsjonAlene: true,
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.ADOPSJONSBEKREFTELSE,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal adoptere tre barn', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        const utils = render(
            <VisSideForAdopsjonKvinne gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />,
        );
        expect(await screen.findByText(messages['Engangsstønad.Pagetitle'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        const adopsjonsdato = utils.getByLabelText(messages['AdopsjonPanel.Spørsmål.Stebarnsadopsjondato']);
        await userEvent.type(adopsjonsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(adopsjonsdato);

        await userEvent.click(screen.getByText(messages['AdopsjonPanel.Radiobutton.Flere']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText(messages['AdopsjonPanel.Antallbarndropdown.Required'])).toHaveLength(2);

        await userEvent.selectOptions(utils.getByLabelText(messages['AdopsjonPanel.AntallBarn.Omsorgsovertakelse']), '3');

        const fødselsdatoFørsteBarn = utils.getByLabelText(messages['AdopsjonFodselFieldArray.Spørsmål.Fødselsdato.1']);
        await userEvent.type(fødselsdatoFørsteBarn, dayjs().subtract(10, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdatoFørsteBarn);

        const fødselsdatoAndreBarn = utils.getByLabelText(messages['AdopsjonFodselFieldArray.Spørsmål.Fødselsdato.2']);
        await userEvent.type(fødselsdatoAndreBarn, dayjs().subtract(5, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdatoAndreBarn);

        const fødselsdatoTredjeBarn = utils.getByLabelText(messages['AdopsjonFodselFieldArray.Spørsmål.Fødselsdato.3']);
        await userEvent.type(fødselsdatoTredjeBarn, dayjs().subtract(1, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdatoTredjeBarn);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                type: 'adopsjon',
                adopsjonAvEktefellesBarn: true,
                adopsjonsdato: dayjs().format(ISO_DATE_FORMAT),
                antallBarn: 3,
                fødselsdatoer: [
                    dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT),
                    dayjs().subtract(5, 'day').format(ISO_DATE_FORMAT),
                    dayjs().subtract(1, 'day').format(ISO_DATE_FORMAT),
                ],
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.ADOPSJONSBEKREFTELSE,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal søke for født barn', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        const utils = render(
            <VisSideForFodsel gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />,
        );
        expect(await screen.findByText(messages['Engangsstønad.Pagetitle'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText(messages['FødselPanel.Spørsmål.ErBarnetFødt.Required'])).toHaveLength(2);
        expect(screen.getAllByText(messages['FødselPanel.Termindato.DuMåOppgi'])).toHaveLength(2);
        expect(screen.getAllByText(messages['FødselPanel.AntallBarn.Venter.Required'])).toHaveLength(2);

        await userEvent.click(screen.getByText('Ja'));

        const fødselsdato = utils.getByLabelText(messages['AdopsjonFodselFieldArray.Fødselsdato']);
        await userEvent.type(fødselsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        const termindato = utils.getByLabelText(messages['FødselPanel.Termindato']);
        await userEvent.type(termindato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);

        await userEvent.click(screen.getByText(messages['AdopsjonPanel.Radiobutton.Ettbarn']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(3);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                type: 'fødsel',
                antallBarn: 1,
                fødselsdato: dayjs().format(ISO_DATE_FORMAT),
                termindato: dayjs().format(ISO_DATE_FORMAT),
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: ContextDataType.DOKUMENTASJON,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: Path.UTENLANDSOPPHOLD,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal søke for ufødt barn', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        const utils = render(
            <VisSideForFodsel gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />,
        );
        expect(await screen.findByText(messages['Engangsstønad.Pagetitle'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['AdopsjonPanel.Nei']));

        const termindato = utils.getByLabelText(messages['FødselPanel.Termindato']);
        await userEvent.type(termindato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);

        expect(screen.getAllByLabelText('Hvor mange barn venter du?')[0]).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['AdopsjonPanel.Radiobutton.Flere']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText(messages['FødselPanel.AntallBarn.Venter.Required'])).toHaveLength(2);

        await userEvent.selectOptions(utils.getAllByLabelText('Hvor mange barn venter du?')[1]!, '3');

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                type: 'termin',
                antallBarn: 3,
                termindato: dayjs().format(ISO_DATE_FORMAT),
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.TERMINBEKREFTELSE,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });
});
