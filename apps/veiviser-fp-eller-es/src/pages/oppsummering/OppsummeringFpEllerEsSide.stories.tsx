/* eslint-disable */
// @ts-nocheck
import { FpEllerEsRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { expect, within } from 'storybook/test';

import { DEFAULT_SATSER } from '@navikt/fp-constants';

import preview from '../../../.storybook/preview';
import { OppsummeringFpEllerEsSide } from './OppsummeringFpEllerEsSide';

const meta = preview.meta({
    title: 'fpEllerEs/OppsummeringFpEllerEsSide',
    component: OppsummeringFpEllerEsSide,
    render: (props) => {
        return (
            <MemoryRouter initialEntries={[FpEllerEsRoutes.SITUASJON]}>
                <OppsummeringFpEllerEsSide {...props} />
            </MemoryRouter>
        );
    },
});
export default meta;

export const MorHarTjentMerEnn200000OgHarRettTilFp = meta.story({
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: true,
            harHattAndreInntekter: true,
            harHattInntekt: true,
            lønnPerMåned: '20000',
            situasjon: 'mor',
            jobberDuINorge: true,
        },
    },
    test: async ({ canvas }) => {
        await expect(canvas.findByText('Resultat')).resolves.toBeInTheDocument();

        expect(canvas.getByText('Du har rett til foreldrepenger')).toBeInTheDocument();
        expect(canvas.getByText(/Når du har rett til foreldrepenger kan du også/)).toBeInTheDocument();
        expect(canvas.getByText('Hvorfor har jeg rett til foreldrepenger?')).toBeInTheDocument();

        const harRettFp = canvas.getAllByTestId('harRettFp');
        expect(within(harRettFp[0]!).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harRettFp[0]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettFp[1]!).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harRettFp[1]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettFp[2]!).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harRettFp[2]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
    },
});
export const MorHarTjentMindreEnn200000OgHarRettTilFpOgEs = meta.story({
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: true,
            harHattAndreInntekter: true,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: 'mor',
            jobberDuINorge: true,
        },
    },
    test: async ({ canvas }) => {
        await expect(canvas.findByText('Resultat')).resolves.toBeInTheDocument();

        expect(canvas.getByText('Du har rett til foreldrepenger eller engangsstønad')).toBeInTheDocument();
        expect(canvas.getByText('Du kan velge mellom engangsstønad eller foreldrepenger')).toBeInTheDocument();
        expect(canvas.getByText('Hva er foreldrepenger?')).toBeInTheDocument();
        expect(canvas.getByText('Hva er engangsstønad?')).toBeInTheDocument();
        expect(canvas.getByText(/Når du har rett til foreldrepenger kan du også ha rett til engangsstønad./)).toBeInTheDocument();
        expect(canvas.getByText('Hvorfor har jeg rett til foreldrepenger?')).toBeInTheDocument();

        const harRettFp = canvas.getAllByTestId('harRettFp');
        expect(within(harRettFp[0]!).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harRettFp[0]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettFp[1]!).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harRettFp[1]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettFp[2]!).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harRettFp[2]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        const harRettEs = canvas.getAllByTestId('harRettEs');
        expect(within(harRettEs[0]!).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harRettEs[0]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(canvas.getByText('Hvorfor har jeg rett til engangsstønad?')).toBeInTheDocument();
    },
});
export const FarKanHaRettTilFp = meta.story({
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: true,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: 'far',
            jobberDuINorge: true,
        },
    },
    test: async ({ canvas }) => {
        await expect(canvas.findByText('Resultat')).resolves.toBeInTheDocument();

        expect(canvas.getByText('Du kan ha rett til foreldrepenger')).toBeInTheDocument();
        expect(canvas.getByText('Hvorfor kan jeg ha rett til foreldrepenger?')).toBeInTheDocument();
    },
});
export const FarKanHaRettTilEs = meta.story({
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: true,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '1000',
            situasjon: 'far',
            jobberDuINorge: true,
        },
    },
});
export const MorHarRettTilEs = meta.story({
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: false,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '1000',
            situasjon: 'mor',
            jobberDuINorge: true,
        },
    },
    test: async ({ canvas }) => {
        await expect(canvas.findByText('Resultat')).resolves.toBeInTheDocument();

        expect(canvas.getByText('Du har rett til engangsstønad')).toBeInTheDocument();
        expect(canvas.getByText('Hva er engangsstønad?')).toBeInTheDocument();
        expect(canvas.getByText('Hvorfor har jeg rett til engangsstønad?')).toBeInTheDocument();

        const harRettEs = canvas.getAllByTestId('harRettEs');
        expect(within(harRettEs[0]!).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harRettEs[0]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        const harIkkeRettFp = canvas.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[1]!).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]!).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(canvas.getByText('Hvorfor har jeg ikke rett til foreldrepenger?')).toBeInTheDocument();
    },
});

export const MorHarRettBorIkkeINorgeMenJobberINorge = meta.story({
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: false,
            erIArbeid: true,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: 'mor',
            jobberDuINorge: true,
        },
    },
});

export const FarHarIkkeRett = meta.story({
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: false,
            erIArbeid: false,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '0',
            situasjon: 'far',
            jobberDuINorge: false,
        },
    },
    test: async ({ canvas }) => {
        await expect(canvas.findByText('Resultat')).resolves.toBeInTheDocument();

        expect(canvas.getByText(/Det ser ut som at du verken har rett til foreldrepenger/)).toBeInTheDocument();
        expect(canvas.getByText(/Du kan ha rett til pengestøtte/)).toBeInTheDocument();
        expect(canvas.getByText('Hvorfor har jeg ikke rett til engangsstønad?')).toBeInTheDocument();

        const harIkkeRettEs = canvas.getAllByTestId('harIkkeRettEs');
        expect(within(harIkkeRettEs[0]!).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettEs[0]!).getByText(/Du oppfyller mest sannsynlig ikke/)).toBeInTheDocument();

        expect(canvas.getByText(/Din situasjon som far eller medmor/)).toBeInTheDocument();

        const harIkkeRettFp = canvas.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[0]!).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[0]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]!).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]!).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText(/Du oppfyller mest sannsynlig ikke/)).toBeInTheDocument();
        expect(canvas.getByText('Hvorfor har jeg ikke rett til foreldrepenger?')).toBeInTheDocument();
    },
});
export const MorHarIkkeRettJobberIkkeINorgeMenIUtlandet = meta.story({
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: false,
            erIArbeid: true,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: 'mor',
            jobberDuINorge: false,
        },
    },
    test: async ({ canvas }) => {
        await expect(canvas.findByText('Resultat')).resolves.toBeInTheDocument();

        expect(canvas.getByText(/Det ser ut som at du verken har rett til foreldrepenger/)).toBeInTheDocument();
        expect(canvas.getByText(/Du kan ha rett til pengestøtte tilsvarende/)).toBeInTheDocument();
        expect(canvas.getByText('Hvorfor har jeg ikke rett til engangsstønad?')).toBeInTheDocument();

        const harIkkeRettEs = canvas.getAllByTestId('harIkkeRettEs');
        expect(within(harIkkeRettEs[0]!).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettEs[0]!).getByText(/Du oppfyller mest sannsynlig ikke/)).toBeInTheDocument();

        const harIkkeRettFp = canvas.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[0]!).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[0]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]!).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]!).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText(/Du oppfyller mest sannsynlig ikke/)).toBeInTheDocument();
        expect(canvas.getByText('Hvorfor har jeg ikke rett til foreldrepenger?')).toBeInTheDocument();
    },
});
