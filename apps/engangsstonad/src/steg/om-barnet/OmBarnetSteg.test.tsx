import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './OmBarnetSteg.stories';

const { VisSideForAdopsjonKvinne, VisSideForAdopsjonMann, VisSideForFodsel } = composeStories(stories);

describe('<OmBarnetSteg>', () => {
    it('skal vise side for adopsjon for kvinne', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        const utils = render(
            <VisSideForAdopsjonKvinne gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />,
        );
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 4')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi om du adopterer ektefelles barn')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi dato for omsorgsovertakelsen')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi antall barn du skal adoptere')).toHaveLength(2);

        await userEvent.click(screen.getByText('Ja'));

        const adopsjonsdato = utils.getByLabelText('Fra hvilken dato adopterer du din ektefelles barn?');
        await userEvent.type(adopsjonsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(adopsjonsdato);

        await userEvent.click(screen.getByText('Ett barn'));

        const fødselsdato = utils.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdato, dayjs().subtract(10, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                adopsjonAvEktefellesBarn: true,
                adopsjonsdato: dayjs().format(ISO_DATE_FORMAT),
                antallBarn: 1,
                fødselsdatoer: [
                    {
                        dato: dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT),
                    },
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

    it('skal vise side for adopsjon for mann', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        const utils = render(
            <VisSideForAdopsjonMann gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />,
        );
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 4')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        const adopsjonsdato = utils.getByLabelText('Når overtar du omsorgen?');
        await userEvent.type(adopsjonsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(adopsjonsdato);

        await userEvent.click(screen.getByText('Ett barn'));

        const fødselsdato = utils.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdato, dayjs().subtract(10, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi om du adopterer alene')).toHaveLength(2);

        await userEvent.click(screen.getAllByText('Ja')[1]);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                adopsjonAvEktefellesBarn: false,
                adopsjonsdato: dayjs().format(ISO_DATE_FORMAT),
                antallBarn: 1,
                fødselsdatoer: [
                    {
                        dato: dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT),
                    },
                ],
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
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        const adopsjonsdato = utils.getByLabelText('Fra hvilken dato adopterer du din ektefelles barn?');
        await userEvent.type(adopsjonsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(adopsjonsdato);

        await userEvent.click(screen.getByText('Tre eller flere barn'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi antall barn du skal overta omsorgen for')).toHaveLength(2);

        await userEvent.selectOptions(utils.getByLabelText('Hvor mange barn overtar du omsorgen for?'), '3');

        const fødselsdatoFørsteBarn = utils.getByLabelText('Når er det første barnet født?');
        await userEvent.type(fødselsdatoFørsteBarn, dayjs().subtract(10, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdatoFørsteBarn);

        const fødselsdatoAndreBarn = utils.getByLabelText('Når er det andre barnet født?');
        await userEvent.type(fødselsdatoAndreBarn, dayjs().subtract(5, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdatoAndreBarn);

        const fødselsdatoTredjeBarn = utils.getByLabelText('Når er det tredje barnet født?');
        await userEvent.type(fødselsdatoTredjeBarn, dayjs().subtract(1, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdatoTredjeBarn);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                adopsjonAvEktefellesBarn: true,
                adopsjonsdato: dayjs().format(ISO_DATE_FORMAT),
                antallBarn: 3,
                fødselsdatoer: [
                    {
                        dato: dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT),
                    },
                    {
                        dato: dayjs().subtract(5, 'day').format(ISO_DATE_FORMAT),
                    },
                    {
                        dato: dayjs().subtract(1, 'day').format(ISO_DATE_FORMAT),
                    },
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
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi om barnet er født')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi termindato')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi hvor mange barn du venter')).toHaveLength(2);

        await userEvent.click(screen.getByText('Ja'));

        const fødselsdato = utils.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        const termindato = utils.getByLabelText('Termindato');
        await userEvent.type(termindato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);

        await userEvent.click(screen.getByText('Ett barn'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(3);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                erBarnetFødt: true,
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
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        const termindato = utils.getByLabelText('Termindato');
        await userEvent.type(termindato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);

        expect(screen.getByText('Hvor mange barn venter du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Tre eller flere barn'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi hvor mange barn du venter')).toHaveLength(2);

        await userEvent.selectOptions(utils.getByLabelText('Hvor mange barn venter du?'), '3');

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: 3,
                erBarnetFødt: false,
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
