import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { ContextDataType } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';

import * as stories from './Barnet.stories';

const { Default } = composeStories(stories);

describe('<Barnet>', () => {
    it('skal ikke måtte oppgi fødselsdato om barnet ikke er født', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Er barnet født?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.queryByText('Fødselsdato')).not.toBeInTheDocument();
        expect(screen.getByText('Termindato')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi fødselsdato.')).not.toBeInTheDocument();
    });

    it('skal gå til neste og ha korrekt data', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        const fødselsdatoInput = screen.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        const termindatoInput = screen.getByLabelText('Termindato');
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
            data: SøknadRoutes.UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal måtte oppgi fødselsdato om barnet er født', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Er barnet født?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Fødselsdato')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi fødselsdato.')[0]).toBeInTheDocument();
    });

    it('validering av for tidlig termindato (lengre enn 1 måned siden)', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Er barnet født?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.queryByText('Fødselsdato')).not.toBeInTheDocument();
        expect(screen.getByText('Termindato')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Termindato');
        await userEvent.type(termindatoInput, dayjs().subtract(1, 'month').subtract(1, 'day').format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Termindato er mer enn 1 måned siden. Vennligst oppgi barnets/barnas fødselsdato.')[0],
        ).toBeInTheDocument();
    });

    it('validering av for tidlig termindato og manglende fødselsdato', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Er barnet født?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Fødselsdato')).toBeInTheDocument();
        expect(screen.getByText('Termindato')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Termindato');
        await userEvent.type(termindatoInput, dayjs().subtract(1, 'month').subtract(1, 'day').toString());
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi fødselsdato.')[0]).toBeInTheDocument();
    });

    it('validering av manglende termindato', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Er barnet født?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.queryByText('Fødselsdato')).not.toBeInTheDocument();
        expect(screen.getByText('Termindato')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi termindato.')[0]).toBeInTheDocument();
    });

    it('validering av for sen termindato', async () => {
        render(<Default />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        const termindatoInput = screen.getByLabelText('Termindato');
        await userEvent.type(termindatoInput, dayjs().add(9, 'months').add(1, 'days').format('DD.MM.YYYY'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du kan ikke søke så langt frem i tid.')[0]).toBeInTheDocument();
    });

    it('validering av termindato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        const termindatoInput = screen.getByLabelText('Termindato');
        await userEvent.type(termindatoInput, 'bla bla');
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Termindato må være en gyldig dato på formatet dd.mm.åååå.')[0]).toBeInTheDocument();
    });

    it('validering av for tidlig fødselsdato', async () => {
        render(<Default />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fødselsdatoInput = screen.getByLabelText('Fødselsdato');
        const termindatoInput = screen.getByLabelText('Termindato');
        await userEvent.type(fødselsdatoInput, dayjs('2024-05-19').format('DD.MM.YYYY'));
        await userEvent.type(termindatoInput, dayjs('2023-10-18').format('DD.MM.YYYY'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Termindatoen kan ikke være tidligere enn 1 måned før fødselsdatoen.')[0],
        ).toBeInTheDocument();
        vi.useRealTimers();
    });

    it('validering av for sen fødselsdato', async () => {
        render(<Default />);
        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fødselsdatoInput = screen.getByLabelText('Fødselsdato');
        const termindatoInput = screen.getByLabelText('Termindato');
        await userEvent.type(fødselsdatoInput, dayjs('2023-10-18').format('DD.MM.YYYY'));
        await userEvent.type(termindatoInput, dayjs('2024-05-19').format('DD.MM.YYYY'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Termindatoen kan ikke være senere enn 6 måneder etter fødselsdatoen.')[0],
        ).toBeInTheDocument();
        vi.useRealTimers();
    });

    it('validering av manglende fødselsdato', async () => {
        render(<Default />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi fødselsdato.')[0]).toBeInTheDocument();
    });

    it('validering av fødselsdato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fødselsdatoInput = screen.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdatoInput, 'bla bla');
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Fødselsdato må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
});
