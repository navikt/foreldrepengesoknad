/* eslint-disable */
// @ts-nocheck
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect, userEvent } from 'storybook/test';

import preview from '../.storybook/preview';
import { AppContainer } from './AppContainer';

const meta = preview.meta({
    title: 'AppContainer',
    component: AppContainer,
    render: () => {
        return (
            <StrictMode>
                <MemoryRouter>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
});
export default meta;

export const FpEllerEsVeiviser = meta.story({});

export const FpEllerEsVeiviserMockaStønadskvoterOgSatser = meta.story({
    test: async ({ canvas }) => {
        await expect(canvas.findAllByText('Foreldrepenger eller engangsstønad?')).resolves.toHaveLength(2);
        await userEvent.click(canvas.getByText('Start'));

        await expect(canvas.findByText('Hvem er du?')).resolves.toBeInTheDocument();
        await userEvent.click(canvas.getByText('Mor'));

        await expect(
            canvas.findByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
            ),
        ).resolves.toBeInTheDocument();
        await userEvent.click(canvas.getByText('Ja'));

        await expect(canvas.findByText('Har du hatt inntekt 6 av de 10 siste månedene?')).resolves.toBeInTheDocument();
        await userEvent.click(canvas.getAllByText('Ja')[1]!);

        const hvorMye = canvas.getByLabelText('Omtrent hvor mye tjener du i måneden før skatt?');
        await userEvent.type(hvorMye, '50000');

        await expect(canvas.findByText('Bor du i Norge?')).resolves.toBeInTheDocument();
        await userEvent.click(canvas.getAllByText('Ja')[2]!);

        await userEvent.click(canvas.getByText('Se resultatet'));

        await expect(canvas.findByText('Resultat')).resolves.toBeInTheDocument();
        expect(canvas.getByText('Du har rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Tilbake til spørsmålene'));

        expect(canvas.getByText(/Foreldrepenger eller engangsstønad/)).toBeInTheDocument();
        expect(canvas.getByText('Hvem er du?')).toBeInTheDocument();
    },
});
