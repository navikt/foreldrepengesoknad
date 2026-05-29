import { HvorMyeRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { expect, within } from 'storybook/test';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { KontoBeregningDto } from '@navikt/fp-types';

import preview from '../../../.storybook/preview';
import { OppsummeringSide } from './OppsummeringSide';

const STØNADSKVOTER = {
    '100': {
        kontoer: [
            {
                konto: 'MØDREKVOTE',
                dager: 75,
            },
            {
                konto: 'FEDREKVOTE',
                dager: 75,
            },
            {
                konto: 'FELLESPERIODE',
                dager: 80,
            },
            {
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    } satisfies KontoBeregningDto,
    '80': {
        kontoer: [
            {
                konto: 'MØDREKVOTE',
                dager: 95,
            },
            {
                konto: 'FEDREKVOTE',
                dager: 95,
            },
            {
                konto: 'FELLESPERIODE',
                dager: 90,
            },
            {
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    } satisfies KontoBeregningDto,
};

const meta = preview.meta({
    title: 'hvorMye/OppsummeringSide',
    component: OppsummeringSide,
    render: (props) => {
        return (
            <MemoryRouter initialEntries={[HvorMyeRoutes.OPPSUMMERING]}>
                <OppsummeringSide {...props} />
            </MemoryRouter>
        );
    },
});
export default meta;

const baseArgs = {
    stønadskvoter: STØNADSKVOTER,
    satser: DEFAULT_SATSER,
};

export const ArbeidstakerMed20000Imåneden = meta.story({
    args: {
        ...baseArgs,
        arbeidssituasjon: {
            erArbeidstakerEllerFrilanser: true,
            erSelvstendigNæringsdrivende: false,
            harUtbetalingFraNav: false,
            lønnMåned1: '20000',
            lønnMåned2: '20000',
            lønnMåned3: '20000',
        },
    },
    test: async () => {
        const canvas = within(document.body);
        await expect(canvas.findByText('Oppsummering')).resolves.toBeInTheDocument();
        await expect(
            canvas.getByText('Gjennomsnittlig utbetaling med 100 % foreldrepenger i 49 uker'),
        ).toBeInTheDocument();
        await expect(
            canvas.getByText('Gjennomsnittlig utbetaling med 80 % foreldrepenger i 59 uker'),
        ).toBeInTheDocument();
        await expect(canvas.getAllByText('Månedlig før skatt')).toHaveLength(2);
        await expect(canvas.getAllByText('20 000 kr')).toHaveLength(4);
        await expect(canvas.getByText('16 000 kr')).toBeInTheDocument();
        await expect(canvas.getAllByText('Daglig før skatt')).toHaveLength(2);
        await expect(canvas.getByText('923 kr')).toBeInTheDocument();
        await expect(canvas.getByText('738 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Totalt for 25 uker før skatt')).toBeInTheDocument();
        await expect(canvas.getByText('115 375 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Totalt for 30 uker før skatt')).toBeInTheDocument();
        await expect(canvas.getByText('110 700 kr')).toBeInTheDocument();
        await expect(
            canvas.getByText('Mange får lønn utbetalt som vanlig fra arbeidsgiveren sin mens man har permisjon'),
        ).toBeInTheDocument();
        await expect(canvas.getByText('Nåværende arbeidssituasjon')).toBeInTheDocument();
        await expect(canvas.getByText('Arbeidstaker eller frilanser')).toBeInTheDocument();
    },
});

export const ArbeidstakerMed100000Imåneden = meta.story({
    args: {
        ...baseArgs,
        arbeidssituasjon: {
            erArbeidstakerEllerFrilanser: true,
            erSelvstendigNæringsdrivende: false,
            harUtbetalingFraNav: false,
            lønnMåned1: '100000',
            lønnMåned2: '100000',
            lønnMåned3: '100000',
        },
    },
    test: async () => {
        const canvas = within(document.body);
        await expect(canvas.findByText('Oppsummering')).resolves.toBeInTheDocument();
        await expect(canvas.getByText('Du får dekket opptil 819 294 kr av din inntekt')).toBeInTheDocument();
        await expect(
            canvas.getByText('Gjennomsnittlig utbetaling med 100 % foreldrepenger i 49 uker'),
        ).toBeInTheDocument();
        await expect(
            canvas.getByText('Gjennomsnittlig utbetaling med 80 % foreldrepenger i 59 uker'),
        ).toBeInTheDocument();
        await expect(canvas.getAllByText('Månedlig før skatt')).toHaveLength(2);
        await expect(canvas.getByText('68 275 kr')).toBeInTheDocument();
        await expect(canvas.getByText('54 620 kr')).toBeInTheDocument();
        await expect(canvas.getAllByText('Daglig før skatt')).toHaveLength(2);
        await expect(canvas.getByText('3 151 kr')).toBeInTheDocument();
        await expect(canvas.getByText('2 521 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Totalt for 25 uker før skatt')).toBeInTheDocument();
        await expect(canvas.getByText('393 875 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Totalt for 30 uker før skatt')).toBeInTheDocument();
        await expect(canvas.getByText('378 150 kr')).toBeInTheDocument();
        await expect(
            canvas.getByText('Mange får lønn utbetalt som vanlig fra arbeidsgiveren sin mens man har permisjon'),
        ).toBeInTheDocument();
        await expect(canvas.getByText('Nåværende arbeidssituasjon')).toBeInTheDocument();
        await expect(canvas.getByText('Arbeidstaker eller frilanser')).toBeInTheDocument();
        await expect(canvas.getAllByText('100 000 kr')).toHaveLength(3);
    },
});

export const ArbeidstakerMed1000Imåneden = meta.story({
    args: {
        ...baseArgs,
        arbeidssituasjon: {
            erArbeidstakerEllerFrilanser: true,
            erSelvstendigNæringsdrivende: false,
            harUtbetalingFraNav: false,
            lønnMåned1: '1000',
            lønnMåned2: '1000',
            lønnMåned3: '1000',
        },
    },
    test: async () => {
        const canvas = within(document.body);
        await expect(canvas.findByText('Oppsummering')).resolves.toBeInTheDocument();
        await expect(
            canvas.getByText('Med årslønn under 68 274,50 kr har du ikke rett til foreldrepenger'),
        ).toBeInTheDocument();
        await expect(canvas.getByText(/12 000 kr i året/)).toBeInTheDocument();
        await expect(canvas.getByText(/68 274,50 kr i året/)).toBeInTheDocument();
        await expect(canvas.getByText('Hva er engangsstønad?')).toBeInTheDocument();
    },
});

export const ArbeidstakerMed10000IMåneden = meta.story({
    args: {
        ...baseArgs,
        arbeidssituasjon: {
            erArbeidstakerEllerFrilanser: true,
            erSelvstendigNæringsdrivende: false,
            harUtbetalingFraNav: false,
            lønnMåned1: '10000',
            lønnMåned2: '10000',
            lønnMåned3: '10000',
        },
    },
    test: async () => {
        const canvas = within(document.body);
        await expect(canvas.findByText('Oppsummering')).resolves.toBeInTheDocument();
        await expect(canvas.queryByText('Du får dekket opptil 780 960 kr av din inntekt')).not.toBeInTheDocument();
        await expect(
            canvas.getByText('Gjennomsnittlig utbetaling med 100 % foreldrepenger i 49 uker'),
        ).toBeInTheDocument();
        await expect(
            canvas.getByText('Gjennomsnittlig utbetaling med 80 % foreldrepenger i 59 uker'),
        ).toBeInTheDocument();
        await expect(canvas.getAllByText('Månedlig før skatt')).toHaveLength(2);
        await expect(canvas.getAllByText('10 000 kr')).toHaveLength(4);
        await expect(canvas.getByText('8 000 kr')).toBeInTheDocument();
        await expect(canvas.getAllByText('Daglig før skatt')).toHaveLength(2);
        await expect(canvas.getByText('462 kr')).toBeInTheDocument();
        await expect(canvas.getByText('369 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Totalt for 25 uker før skatt')).toBeInTheDocument();
        await expect(canvas.getByText('57 750 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Totalt for 30 uker før skatt')).toBeInTheDocument();
        await expect(canvas.getByText('55 350 kr')).toBeInTheDocument();
        await expect(
            canvas.getByText('Det kan være lurt for deg å sammenligne foreldrepenger og engangsstønad'),
        ).toBeInTheDocument();
        await expect(
            canvas.getByText('Mange får lønn utbetalt som vanlig fra arbeidsgiveren sin mens man har permisjon'),
        ).toBeInTheDocument();
        await expect(canvas.getByText('Nåværende arbeidssituasjon')).toBeInTheDocument();
        await expect(canvas.getByText('Arbeidstaker eller frilanser')).toBeInTheDocument();
    },
});
