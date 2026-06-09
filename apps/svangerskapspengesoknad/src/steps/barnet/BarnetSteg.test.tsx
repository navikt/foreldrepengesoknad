import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './BarnetSteg.stories';

import messages from '../../intl/nb_NO.json';

const { Default } = composeStories(stories);

describe('<BarnetSteg>', () => {
    it('skal ikke måtte oppgi fødselsdato om barnet ikke er født', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
        expect(screen.getByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['nei']));

        expect(screen.queryByText(messages['barnet.fødselsdato'])).not.toBeInTheDocument();
        expect(screen.getByText(messages['barnet.termindato'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText(messages['valideringsfeil.barnet.fødselsdato.duMåOppgi'])).not.toBeInTheDocument();
    });

    it('skal gå til neste og ha korrekt data', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        const fødselsdatoInput = screen.getByLabelText(messages['barnet.fødselsdato']);
        await userEvent.type(fødselsdatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        const termindatoInput = screen.getByLabelText(messages['barnet.termindato']);
        await userEvent.type(termindatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                erBarnetFødt: true,
                fødselsdato: dayjs().format(ISO_DATE_FORMAT),
                termindato: dayjs().format(ISO_DATE_FORMAT),
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoute.UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal måtte oppgi fødselsdato om barnet er født', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
        expect(screen.getByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['barnet.fødselsdato'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.barnet.fødselsdato.duMåOppgi'])[0]).toBeInTheDocument();
    });

    it('validering av for tidlig termindato (lengre enn 1 måned siden)', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
        expect(screen.getByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['nei']));

        expect(screen.queryByText(messages['barnet.fødselsdato'])).not.toBeInTheDocument();
        expect(screen.getByText(messages['barnet.termindato'])).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText(messages['barnet.termindato']);
        await userEvent.type(termindatoInput, dayjs().subtract(1, 'month').subtract(1, 'day').format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.barnet.termindato.vennligstOppgiBarnetsFødselsDato'])[0],
        ).toBeInTheDocument();
    });

    it('validering av for tidlig termindato og manglende fødselsdato', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
        expect(screen.getByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['barnet.fødselsdato'])).toBeInTheDocument();
        expect(screen.getByText(messages['barnet.termindato'])).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText(messages['barnet.termindato']);
        await userEvent.type(termindatoInput, dayjs().subtract(1, 'month').subtract(1, 'day').toString());
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.barnet.fødselsdato.duMåOppgi'])[0]).toBeInTheDocument();
    });

    it('validering av manglende termindato', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
        expect(screen.getByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['nei']));

        expect(screen.queryByText(messages['barnet.fødselsdato'])).not.toBeInTheDocument();
        expect(screen.getByText(messages['barnet.termindato'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.barnet.termindato.duMåOppgi'])[0]).toBeInTheDocument();
    });

    it('validering av for sen termindato', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['nei']));

        const termindatoInput = screen.getByLabelText(messages['barnet.termindato']);
        await userEvent.type(termindatoInput, dayjs().add(9, 'months').add(1, 'days').format('DD.MM.YYYY'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.barnet.termindato.forLangtFremITid'])[0]).toBeInTheDocument();
    });

    it('validering av termindato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['nei']));

        const termindatoInput = screen.getByLabelText(messages['barnet.termindato']);
        await userEvent.type(termindatoInput, 'bla bla');
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.barnet.termindato.ugyldigDatoFormat'])[0]).toBeInTheDocument();
    });

    it('validering av for tidlig termindato', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fødselsdatoInput = screen.getByLabelText(messages['barnet.fødselsdato']);
        const termindatoInput = screen.getByLabelText(messages['barnet.termindato']);
        await userEvent.type(fødselsdatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.type(termindatoInput, dayjs().subtract(2, 'months').format('DD.MM.YYYY'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.barnet.termindato.1mndFørFødsel'])[0],
        ).toBeInTheDocument();
        vi.useRealTimers();
    });

    it('validering av for sen fødselsdato', async () => {
        render(<Default />);
        expect(await screen.findByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fødselsdatoInput = screen.getByLabelText(messages['barnet.fødselsdato']);
        const termindatoInput = screen.getByLabelText(messages['barnet.termindato']);
        await userEvent.type(fødselsdatoInput, dayjs().subtract(6, 'month').subtract(1, 'day').format('DD.MM.YYYY'));
        await userEvent.type(termindatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.barnet.termindato.6mndEtterFødsel'])[0],
        ).toBeInTheDocument();
        vi.useRealTimers();
    });

    it('validering av manglende fødselsdato', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.barnet.fødselsdato.duMåOppgi'])[0]).toBeInTheDocument();
    });

    it('validering av fødselsdato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fødselsdatoInput = screen.getByLabelText(messages['barnet.fødselsdato']);
        await userEvent.type(fødselsdatoInput, 'bla bla');
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.barnet.fødselsdato.ugyldigDatoFormat'])[0],
        ).toBeInTheDocument();
    });
});
