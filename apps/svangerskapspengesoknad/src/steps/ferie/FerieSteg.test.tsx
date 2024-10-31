import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import * as stories from './FerieSteg.stories';

const { Default } = composeStories(stories);

describe('<FerieSteg>', () => {
    const user = userEvent.setup();

    it('feilmelding når ingenting er utfylt og kan svare nei', async () => {
        const gåTilNesteSide = vi.fn();
        render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Har du planlagt ferie i perioden du skal ha svangerskapspenger?')).toBeInTheDocument();
        await user.click(screen.getByText('Neste steg'));
        expect(screen.getAllByText('Må oppgis')).toHaveLength(2);
        await user.click(screen.getByText('Nei'));
        await user.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                '896929119': {
                    antallFeriePerioder: 1,
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

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Har du planlagt ferie i perioden du skal ha svangerskapspenger?')).toBeInTheDocument();
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText('Hvor mange perioder med ferie skal du ha?')).toBeInTheDocument();
        expect(screen.getByText('1. periode')).toBeInTheDocument();

        await user.click(screen.getByText('Neste steg'));
        expect(screen.getAllByText('Må være etter første fraværsdag')).toHaveLength(2);
        expect(screen.getAllByText('Må være før siste fraværsdag')).toHaveLength(2);

        const fradatoInput = screen.getByText('Første feriedag');
        await user.type(fradatoInput, dayjs('2010-10-30').format('DD.MM.YYYY'));
        await user.tab();

        const tildatoInput = screen.getByText('Siste feriedag');
        await user.type(tildatoInput, dayjs('2030-10-30').format('DD.MM.YYYY'));
        await user.tab();

        // Datoer var utenfor range. Da skal ikke rangedatepicker ha akseptert disse verdiene
        await user.click(screen.getByText('Neste steg'));
        expect(screen.getAllByText('Må være etter første fraværsdag')).toHaveLength(2);
        expect(screen.getAllByText('Må være før siste fraværsdag')).toHaveLength(2);

        await user.type(fradatoInput, dayjs('2024-10-30').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(tildatoInput, dayjs('2024-11-05').format('DD.MM.YYYY'));
        await user.tab();
        await user.click(screen.getByText('Neste steg'));
    });

    it('Svar "ja", fyll ut og gå til neste', async () => {
        const gåTilNesteSide = vi.fn();
        render(<Default gåTilNesteSide={gåTilNesteSide} />);

        await user.click(screen.getByText('Ja'));

        const fradatoInput = screen.getByText('Første feriedag');
        const tildatoInput = screen.getByText('Siste feriedag');

        await user.type(fradatoInput, dayjs('2024-10-30').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(tildatoInput, dayjs('2024-11-05').format('DD.MM.YYYY'));
        await user.tab();
        await user.click(screen.getByText('Neste steg'));
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                '896929119': {
                    antallFeriePerioder: 1,
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

    it('Fyll ut flere perioder', async () => {
        const gåTilNesteSide = vi.fn();
        render(<Default gåTilNesteSide={gåTilNesteSide} />);

        await user.click(screen.getByText('Ja'));

        const antallPerioderInput = screen.getByText('Hvor mange perioder med ferie skal du ha?');
        await user.type(antallPerioderInput, '{backspace}3');

        await user.type(screen.getAllByText('Første feriedag')[0], dayjs('2024-10-30').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(screen.getAllByText('Siste feriedag')[0], dayjs('2024-10-31').format('DD.MM.YYYY'));
        await user.tab();

        expect(screen.getByText('1. periode')).toBeInTheDocument();
        expect(screen.getByText('2. periode')).toBeInTheDocument();
        expect(screen.getByText('3. periode')).toBeInTheDocument();

        await user.type(screen.getAllByText('Første feriedag')[1], dayjs('2024-11-01').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(screen.getAllByText('Siste feriedag')[1], dayjs('2024-11-04').format('DD.MM.YYYY'));
        await user.tab();

        await user.type(screen.getAllByText('Første feriedag')[2], dayjs('2024-11-06').format('DD.MM.YYYY'));
        await user.tab();
        await user.type(screen.getAllByText('Siste feriedag')[2], dayjs('2024-11-08').format('DD.MM.YYYY'));
        await user.tab();

        await user.click(screen.getByText('Neste steg'));
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                '896929119': {
                    antallFeriePerioder: 3,
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
                        {
                            arbeidsforhold: {
                                id: '896929119',
                                type: 'virksomhet',
                            },
                            fom: '2024-11-06',
                            tom: '2024-11-08',
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
