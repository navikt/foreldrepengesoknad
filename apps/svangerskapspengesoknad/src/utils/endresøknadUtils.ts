import { ContextDataMap } from 'appData/SvpDataContext';
import { AvtaltFeriePerArbeidsgiver } from 'types/AvtaltFerie';
import { Barn } from 'types/Barn';
import {
    Arbeidsforholdstype,
    DelivisTilretteleggingPeriodeType,
    DelvisTilrettelegging,
    IngenTilrettelegging,
    TilOgMedDatoType,
    Tilretteleggingstype,
} from 'types/Tilrettelegging';

import { ArbeidsforholdOgInntektSvp, EGEN_NÆRING_ID, FRILANS_ID, SvpArbeidsforhold, SvpSak } from '@navikt/fp-types';

export const tilSkjematilstandFraEksisterendeSak = (svpSak: SvpSak) => {
    const valgteArbeidsforhold = svpSak.gjeldendeVedtak?.arbeidsforhold
        .map((a) => finnTilretteleggingsnøkkel(a.aktivitet))
        .filter((s) => s !== undefined);

    return {
        OM_BARNET: tilBarnetSkjema(svpSak),
        VALGTE_ARBEIDSFORHOLD: valgteArbeidsforhold,
        FERIE: tilFerie(svpSak),
        TILRETTELEGGINGER: tilTilrettelegginger(svpSak),
        ARBEIDSFORHOLD_OG_INNTEKT: finnArbeidsforholdOgInntektSkjemaverdier(
            svpSak.gjeldendeVedtak?.arbeidsforhold ?? [],
        ),
    } satisfies ContextDataMap;
};

const tilBarnetSkjema = (svpSak: SvpSak) => {
    const barnet = {
        erBarnetFødt: svpSak.familiehendelse.antallBarn > 0,
        fødselsdato: svpSak.familiehendelse.fødselsdato,
        termindato: svpSak.familiehendelse.termindato!, //TODO: denne skal vel alltid være satt?
    } satisfies Barn;

    return barnet;
};

const tilFerie = (svpSak: SvpSak) => {
    const avtalteFeriePerArbeidsgiver = svpSak.gjeldendeVedtak?.arbeidsforhold.reduce((acc, a) => {
        const nøkkel = finnTilretteleggingsnøkkel(a.aktivitet);
        if (!nøkkel) {
            return acc;
        }
        const b = a.oppholdsperioder
            .filter((opphold) => opphold.årsak === 'FERIE')
            .map((ferie) => {
                return {
                    arbeidsforhold: {
                        type: arbeidsforholdTypeUnionTilEnum(a.aktivitet),
                        id: nøkkel,
                    },
                    fom: ferie.fom,
                    tom: ferie.tom,
                };
            });

        acc[nøkkel] = {
            skalHaFerie: b.length > 0,
            feriePerioder: b,
        };

        return acc;
    }, {} as AvtaltFeriePerArbeidsgiver);

    return avtalteFeriePerArbeidsgiver;
};

const tilTilrettelegginger = (svpSak: SvpSak) => {
    const tilrettelegginer = svpSak.gjeldendeVedtak?.arbeidsforhold.reduce(
        (acc, a) => {
            const nøkkel = finnTilretteleggingsnøkkel(a.aktivitet);
            if (!nøkkel) {
                return acc;
            }
            if (a.tilrettelegginger.length === 1) {
                const tilrettelegging = a.tilrettelegginger[0];

                if (tilrettelegging.type === 'INGEN') {
                    acc[nøkkel] = {
                        type: Tilretteleggingstype.INGEN,
                        enPeriodeMedTilretteleggingFom: tilrettelegging.fom,
                        enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP, //TODO
                        behovForTilretteleggingFom: a.behovFrom,
                        risikofaktorer: a.risikofaktorer,
                        tilretteleggingstiltak: a.tiltak,
                    } satisfies IngenTilrettelegging;
                }

                if (tilrettelegging.type === 'DELVIS') {
                    acc[nøkkel] = {
                        type: Tilretteleggingstype.DELVIS,
                        delvisTilretteleggingPeriodeType:
                            DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN, //TODO
                        enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP, //TODO
                        enPeriodeMedTilretteleggingFom: tilrettelegging.fom,
                        enPeriodeMedTilretteleggingStillingsprosent: tilrettelegging.arbeidstidprosent?.toString(),
                        behovForTilretteleggingFom: a.behovFrom,
                        risikofaktorer: a.risikofaktorer,
                        tilretteleggingstiltak: a.tiltak,
                    } satisfies DelvisTilrettelegging;
                }
            }
            return acc;
        },
        {} as Record<string, IngenTilrettelegging | DelvisTilrettelegging>,
    );

    return tilrettelegginer;
};

const finnTilretteleggingsnøkkel = (aktivitet: SvpArbeidsforhold['aktivitet']) => {
    switch (aktivitet.type) {
        case 'ORDINÆRT_ARBEID':
            return aktivitet.arbeidsgiver?.id;
        case 'SELVSTENDIG_NÆRINGSDRIVENDE':
            return EGEN_NÆRING_ID;
        case 'FRILANS':
            return FRILANS_ID;
        case 'ANNET':
            throw new Error('Fant ANNET som aktivitetstype.');
        default:
            throw new Error(`Fant ukjent aktivitetstype ${aktivitet.type}`);
    }
};

const finnArbeidsforholdOgInntektSkjemaverdier = (arbeidsforhold: SvpArbeidsforhold[]) => {
    const harJobbetSomFrilans = arbeidsforhold.some((a) => a.aktivitet.type === 'FRILANS');
    const harJobbetSomSelvstendigNæringsdrivende = arbeidsforhold.some(
        (a) => a.aktivitet.type === 'SELVSTENDIG_NÆRINGSDRIVENDE',
    );
    const harHattArbeidIUtlandet = false; // TODO
    const arbeidsforholdOgInntekt = {
        harHattArbeidIUtlandet,
        harJobbetSomFrilans,
        harJobbetSomSelvstendigNæringsdrivende,
    } satisfies ArbeidsforholdOgInntektSvp;

    return arbeidsforholdOgInntekt;
};

// TODO: rotete
const arbeidsforholdTypeUnionTilEnum = (aktivitet: SvpArbeidsforhold['aktivitet']) => {
    switch (aktivitet.type) {
        case 'ORDINÆRT_ARBEID':
            return Arbeidsforholdstype.VIRKSOMHET;
        case 'SELVSTENDIG_NÆRINGSDRIVENDE':
            return Arbeidsforholdstype.PRIVAT;
        case 'FRILANS':
            return Arbeidsforholdstype.FRILANSER;
        case 'ANNET':
            throw new Error('Fant ANNET som aktivitetstype.');
        default:
            throw new Error(`Fant ukjent aktivitetstype ${aktivitet.type}`);
    }
};
