import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/steps/manglende-vedlegg/ManglendeVedlegg.stories';

const { Default, ManglerVedleggForUlikePerioder } = composeStories(stories);

describe('<ManglendeVedlegg>', () => {
    it('skal kreve dokument for Bekreftelse på termindato og datoen du ble alene om omsorgen for barnet', async () => {
        render(<Default />);

        expect(await screen.findByText('Bekreftelse på termindato')).toBeInTheDocument();
        expect(screen.getByText('Dokumentasjon av datoen du ble alene om omsorgen for barnet.')).toBeInTheDocument();
        expect(screen.getAllByText('Last opp dokumentasjon her')).toHaveLength(2);
    });

    it('skal kreve dokument for to inntektskilder', async () => {
        render(<ManglerVedleggForUlikePerioder />);

        expect(await screen.findAllByText('Dokumentasjon av annen inntektskilde')).toHaveLength(2);
        expect(
            screen.getByText('Gjelder Sluttvederlag, sluttpakke eller etterlønn fra 01.08.2021 til -')
        ).toBeInTheDocument();
        expect(
            screen.getByText('Gjelder Sluttvederlag, sluttpakke eller etterlønn fra 01.09.2021 til -')
        ).toBeInTheDocument();
    });
});
