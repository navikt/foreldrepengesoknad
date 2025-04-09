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

import { ArbeidsforholdOgInntektSvp, SvpSak } from '../../../../packages/types';

export const tilSkjematilstandFraEksisterendeSak = (svpSak: SvpSak) => {
    const valgteArbeidsforhold = svpSak.gjeldendeVedtak?.arbeidsforhold
        .map((a) => a.aktivitet.arbeidsgiver?.id)
        .filter((s) => s !== undefined);

    const arbeidsforholdOgInntekt = {
        //TODO: dynamisk alle felter
        harHattArbeidIUtlandet: false,
        harJobbetSomFrilans: false,
        harJobbetSomSelvstendigNæringsdrivende: false,
    } satisfies ArbeidsforholdOgInntektSvp;

    return {
        OM_BARNET: tilBarnetSkjema(svpSak),
        VALGTE_ARBEIDSFORHOLD: valgteArbeidsforhold,
        FERIE: tilFerie(svpSak),
        TILRETTELEGGINGER: tilTilrettelegginger(svpSak),
        ARBEIDSFORHOLD_OG_INNTEKT: arbeidsforholdOgInntekt,
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
        const arbeidsgiverId = a.aktivitet.arbeidsgiver?.id;
        // TODO: dette caset
        if (!arbeidsgiverId) {
            return acc;
        }
        const b = a.oppholdsperioder
            .filter((opphold) => opphold.årsak === 'FERIE')
            .map((ferie) => {
                return {
                    arbeidsforhold: {
                        type: Arbeidsforholdstype.VIRKSOMHET, // TODO
                        id: arbeidsgiverId,
                    },
                    fom: ferie.fom,
                    tom: ferie.tom,
                };
            });

        acc[arbeidsgiverId] = {
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
            const arbeidsgiverId = a.aktivitet.arbeidsgiver?.id;
            // TODO: dette caset
            if (!arbeidsgiverId) {
                return acc;
            }
            if (a.tilrettelegginger.length === 1) {
                const tilrettelegging = a.tilrettelegginger[0];

                if (tilrettelegging.type === 'INGEN') {
                    acc[arbeidsgiverId] = {
                        type: Tilretteleggingstype.INGEN,
                        enPeriodeMedTilretteleggingFom: tilrettelegging.fom,
                        enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP, //TODO
                        behovForTilretteleggingFom: a.behovFrom,
                    } satisfies IngenTilrettelegging;
                }

                if (tilrettelegging.type === 'DELVIS') {
                    acc[arbeidsgiverId] = {
                        type: Tilretteleggingstype.DELVIS,
                        delvisTilretteleggingPeriodeType:
                            DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN, //TODO
                        enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP, //TODO
                        enPeriodeMedTilretteleggingFom: tilrettelegging.fom,
                        enPeriodeMedTilretteleggingStillingsprosent: tilrettelegging.arbeidstidprosent?.toString(),
                        behovForTilretteleggingFom: a.behovFrom,
                    } satisfies DelvisTilrettelegging;
                }
            }
            return acc;
        },
        {} as Record<string, IngenTilrettelegging | DelvisTilrettelegging>,
    );

    return tilrettelegginer;
};
