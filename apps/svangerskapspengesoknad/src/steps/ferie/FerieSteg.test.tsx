import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import * as stories from './FerieSteg.stories';

import messages from '../../intl/nb_NO.json';

const { Default } = composeStories(stories);

describe('<FerieSteg>', () => {
    const user = userEvent.setup();

    it('feilmelding når ingenting er utfylt og kan svare nei', async () => {
        const gåTilNesteSide = vi.fn();
        render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
        expect(screen.getByText(messages['ferie.harDuPlanlagtFerie.label'])).toBeInTheDocument();
        await user.click(screen.getByText('Neste steg'));
        expect(screen.getAllByText(messages['ferie.harDuPlanlagtFerie.validering'])).toHaveLength(2);
        await user.click(screen.getByText(messages['nei']));
        await user.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                '896929119': {
                    feriePerioder: [],
                    skalHaFerie: false,
                },
            },
            key: 'FERIE',
            type: 'update',
        });
    });

    it('Svar "ja" med feilmelding sjekker', async () => {
        const gåTilNesteSide = vi.fn();
        render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
        expect(screen.getByText(messages['ferie.harDuPlanlagtFerie.label'])).toBeInTheDocument();
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText(messages['ferie.periode.leggTil'])).toBeInTheDocument();

        await user.click(screen.getByText('Neste steg'));
        expect(screen.getAllByText(messages['ferie.antallPerioder.validering.dato.obligatorisk'])).toHaveLength(3);

        const fradatoInput = screen.getByLabelText(messages['ferie.periode.førsteDag']);
        await user.type(fradatoInput, dayjs('2010-10-30').format('DD.MM.YYYY'));
        await user.tab();
        expect(screen.getAllByText(messages['ferie.antallPerioder.validering.dato.etterFørsteFraværsDag'])).toHaveLength(2);

        const tildatoInput = screen.getByLabelText(messages['ferie.periode.sisteDag']);

        await user.type(tildatoInput, dayjs('2030-10-30').format('DD.MM.YYYY'));
        await user.tab();
        expect(screen.getAllByText(messages['ferie.antallPerioder.validering.dato.førSisteFraværsDag'])).toHaveLength(2);

        await user.clear(fradatoInput);
        await user.clear(tildatoInput);

        await user.type(fradatoInput, 'asd');
        await user.tab();
        await user.type(tildatoInput, 'asd');
        await user.tab();
        expect(screen.getAllByText(messages['ferie.antallPerioder.validering.dato.gyldig'])).toHaveLength(3);

        await user.clear(fradatoInput);
        await user.clear(tildatoInput);

        await user.type(fradatoInput, dayjs('2024-10-30').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(tildatoInput, dayjs('2024-10-29').format('DD.MM.YYYY'));
        await user.tab();
        await user.click(screen.getByText('Neste steg'));
        expect(screen.getAllByText(messages['ferie.antallPerioder.validering.dato.førTilDato'])).toHaveLength(2);

        await user.type(tildatoInput, dayjs('2024-10-31').format('DD.MM.YYYY'));
        await user.tab();
        await user.click(screen.getByText('Neste steg'));
    });

    it('Svar "ja", fyll ut og gå til neste', async () => {
        const gåTilNesteSide = vi.fn();
        render(<Default gåTilNesteSide={gåTilNesteSide} />);

        await user.click(screen.getByText('Ja'));

        const fradatoInput = screen.getByText(messages['ferie.periode.førsteDag']);
        const tildatoInput = screen.getByText(messages['ferie.periode.sisteDag']);

        await user.type(fradatoInput, dayjs('2024-10-30').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(tildatoInput, dayjs('2024-11-05').format('DD.MM.YYYY'));
        await user.tab();
        await user.click(screen.getByText('Neste steg'));
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                '896929119': {
                    feriePerioder: [
                        {
                            arbeidsforhold: {
                                id: '896929119',
                                type: 'virksomhet',
                            },
                            fom: '2024-10-30',
                            tom: '2024-11-05',
                        },
                    ],
                    skalHaFerie: true,
                },
            },
            key: 'FERIE',
            type: 'update',
        });
    });

    it('Skal hindre overlappende perioder', async () => {
        const gåTilNesteSide = vi.fn();
        render(<Default gåTilNesteSide={gåTilNesteSide} />);

        await user.click(screen.getByText('Ja'));

        await user.type(screen.getAllByText(messages['ferie.periode.førsteDag'])[0]!, dayjs('2024-11-01').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(screen.getAllByText(messages['ferie.periode.sisteDag'])[0]!, dayjs('2024-11-05').format('DD.MM.YYYY'));
        await user.tab();

        await user.click(screen.getByText(messages['ferie.periode.leggTil']));
        await user.type(screen.getAllByText(messages['ferie.periode.førsteDag'])[1]!, dayjs('2024-11-03').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(screen.getAllByText(messages['ferie.periode.sisteDag'])[1]!, dayjs('2024-11-08').format('DD.MM.YYYY'));
        await user.tab();
        await user.click(screen.getByText('Neste steg'));
        expect(screen.getAllByText('Overlapper med 1. periode')).toHaveLength(2);

        await user.click(screen.getByText(messages['ferie.periode.leggTil']));
        await user.type(screen.getAllByText(messages['ferie.periode.førsteDag'])[2]!, dayjs('2024-11-06').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(screen.getAllByText(messages['ferie.periode.sisteDag'])[2]!, dayjs('2024-11-12').format('DD.MM.YYYY'));
        await user.tab();
        await user.click(screen.getByText('Neste steg'));
        expect(screen.getAllByText('Overlapper med 2. periode')).toHaveLength(2);

        await user.clear(screen.getAllByLabelText('Første feriedag')[1]!);
        await user.type(screen.getAllByText(messages['ferie.periode.førsteDag'])[1]!, dayjs('2024-11-06').format('DD.MM.YYYY'));
        await user.tab();
        expect(screen.queryAllByText('Overlapper med 1. periode')).toHaveLength(0);
        await user.click(screen.getByText('Neste steg'));
        expect(screen.getAllByText('Overlapper med 2. periode')).toHaveLength(2);

        await user.clear(screen.getAllByLabelText('Første feriedag')[2]!);
        await user.type(screen.getAllByText(messages['ferie.periode.førsteDag'])[2]!, dayjs('2024-11-09').format('DD.MM.YYYY'));
        await user.tab();
        expect(screen.queryAllByText('Overlapper med 2. periode')).toHaveLength(0);

        expect(screen.getAllByText(messages['perioder.varierende.slett'])).toHaveLength(2);
        await user.click(screen.getByLabelText('Fjern 3. periode'));
        await user.click(screen.getByLabelText('Fjern 2. periode'));
        expect(screen.queryAllByText(messages['perioder.varierende.slett'])).toHaveLength(0);

        await user.click(screen.getByText('Neste steg'));
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                '896929119': {
                    feriePerioder: [
                        {
                            arbeidsforhold: {
                                id: '896929119',
                                type: 'virksomhet',
                            },
                            fom: '2024-11-01',
                            tom: '2024-11-05',
                        },
                    ],
                    skalHaFerie: true,
                },
            },
            key: 'FERIE',
            type: 'update',
        });
    });

    it('Fyll ut flere perioder', async () => {
        const gåTilNesteSide = vi.fn();
        render(<Default gåTilNesteSide={gåTilNesteSide} />);

        await user.click(screen.getByText('Ja'));

        await user.type(screen.getAllByText(messages['ferie.periode.førsteDag'])[0]!, dayjs('2024-10-30').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(screen.getAllByText(messages['ferie.periode.sisteDag'])[0]!, dayjs('2024-10-31').format('DD.MM.YYYY'));
        await user.tab();

        await user.click(screen.getByText(messages['ferie.periode.leggTil']));
        await user.click(screen.getByText(messages['ferie.periode.leggTil']));

        expect(screen.getAllByText(messages['perioder.varierende.slett'])).toHaveLength(2);

        await user.type(screen.getAllByText(messages['ferie.periode.førsteDag'])[1]!, dayjs('2024-11-01').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(screen.getAllByText(messages['ferie.periode.sisteDag'])[1]!, dayjs('2024-11-04').format('DD.MM.YYYY'));
        await user.tab();

        await user.type(screen.getAllByText(messages['ferie.periode.førsteDag'])[2]!, dayjs('2024-11-06').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(screen.getAllByText(messages['ferie.periode.sisteDag'])[2]!, dayjs('2024-11-08').format('DD.MM.YYYY'));
        await user.tab();

        await user.click(screen.getByLabelText('Fjern 3. periode'));

        await user.click(screen.getByText('Neste steg'));
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                '896929119': {
                    feriePerioder: [
                        {
                            arbeidsforhold: {
                                id: '896929119',
                                type: 'virksomhet',
                            },
                            fom: '2024-10-30',
                            tom: '2024-10-31',
                        },
                        {
                            arbeidsforhold: {
                                id: '896929119',
                                type: 'virksomhet',
                            },
                            fom: '2024-11-01',
                            tom: '2024-11-04',
                        },
                    ],
                    skalHaFerie: true,
                },
            },
            key: 'FERIE',
            type: 'update',
        });
    });
});
