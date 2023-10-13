import { ISOStringToDate } from '@navikt/fp-common';
import { erVirksomhetRegnetSomNyoppstartet } from 'app/steps/egen-næring/egenNæringFormUtils';
import { AnnenInntektType, ArbeidIUtlandet, ArbeidIUtlandetDTO } from 'app/types/ArbeidIUtlandet';
import { ArbeidsforholdDTO } from 'app/types/Arbeidsforhold';
import { Barn, BarnDTO } from 'app/types/Barn';
import { EgenNæring, EgenNæringDTO } from 'app/types/EgenNæring';
import { Frilans, FrilansDTO } from 'app/types/Frilans';
import InformasjonOmUtenlandsopphold, {
    InformasjonOmUtenlandsoppholdDTO,
    Utenlandsopphold,
    UtenlandsoppholdDTO,
} from 'app/types/InformasjonOmUtenlandsopphold';
import { Søker, SøkerDTO } from 'app/types/Søker';
import { Søknad, SøknadDTO, Søknadstype } from 'app/types/Søknad';
import {
    Arbeidsforholdstype,
    DelvisTilretteleggingDTO,
    HelTilretteleggingDTO,
    IngenTilretteleggingDTO,
    TilretteleggingDTO,
    TilretteleggingPeriode,
    Tilretteleggingstype,
} from 'app/types/Tilrettelegging';

const getArbeidsforholdForInnsending = (periode: TilretteleggingPeriode): ArbeidsforholdDTO => {
    if (
        periode.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER ||
        periode.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG
    ) {
        return {
            type: periode.arbeidsforhold.type,
            risikoFaktorer: periode.risikofaktorer!,
            tilretteleggingstiltak: periode.tilretteleggingstiltak!,
        };
    }
    return {
        id: periode.arbeidsforhold.arbeidsgiverId!,
        type: periode.arbeidsforhold.type,
    };
};

const mapBostedUtlandTilDTO = (utenlandsopphold: Utenlandsopphold): UtenlandsoppholdDTO => {
    return {
        land: utenlandsopphold.land,
        tidsperiode: {
            fom: ISOStringToDate(utenlandsopphold.tidsperiode.fom)!,
            tom: ISOStringToDate(utenlandsopphold.tidsperiode.tom)!,
        },
    };
};

const mapUtenlandsOppholdForInnsending = (
    utenlandsopphold: InformasjonOmUtenlandsopphold,
): InformasjonOmUtenlandsoppholdDTO => {
    return {
        iNorgePåHendelsestidspunktet: utenlandsopphold.iNorgePåHendelsestidspunktet,
        iNorgeSiste12Mnd: utenlandsopphold.iNorgeSiste12Mnd,
        iNorgeNeste12Mnd: utenlandsopphold.iNorgeNeste12Mnd,
        jobbetINorgeSiste12Mnd: utenlandsopphold.jobbetINorgeSiste12Mnd,
        tidligereOpphold: utenlandsopphold.tidligereOpphold.map((opphold) => {
            return mapBostedUtlandTilDTO(opphold);
        }),
        senereOpphold: utenlandsopphold.tidligereOpphold.map((opphold) => {
            return mapBostedUtlandTilDTO(opphold);
        }),
    };
};

const mapBarnForInnsending = (barn: Barn): BarnDTO => {
    return {
        erBarnetFødt: barn.erBarnetFødt,
        termindato: ISOStringToDate(barn.termindato)!,
        fødselsdatoer: barn.fødselsdato ? [ISOStringToDate(barn.fødselsdato)!] : undefined,
    };
};

const mapHelTilretteleggingForInnsending = (
    periode: TilretteleggingPeriode,
    arbeidsforhold: ArbeidsforholdDTO,
): HelTilretteleggingDTO => {
    return {
        type: Tilretteleggingstype.HEL,
        tilrettelagtArbeidFom: ISOStringToDate(periode.fom)!,
        arbeidsforhold,
        vedlegg: periode.vedlegg,
        behovForTilretteleggingFom: ISOStringToDate(periode.behovForTilretteleggingFom)!,
    };
};

const mapDelvisTilretteleggingForInnsending = (
    periode: TilretteleggingPeriode,
    arbeidsforhold: ArbeidsforholdDTO,
): DelvisTilretteleggingDTO => {
    return {
        type: Tilretteleggingstype.DELVIS,
        tilrettelagtArbeidFom: ISOStringToDate(periode.fom)!,
        arbeidsforhold,
        vedlegg: periode.vedlegg,
        behovForTilretteleggingFom: ISOStringToDate(periode.behovForTilretteleggingFom)!,
        stillingsprosent: periode.stillingsprosent,
    };
};

const mapIngenTilretteleggingForInnsending = (
    periode: TilretteleggingPeriode,
    arbeidsforhold: ArbeidsforholdDTO,
): IngenTilretteleggingDTO => {
    return {
        type: Tilretteleggingstype.INGEN,
        slutteArbeidFom: ISOStringToDate(periode.fom)!,
        arbeidsforhold,
        vedlegg: periode.vedlegg,
        behovForTilretteleggingFom: ISOStringToDate(periode.behovForTilretteleggingFom)!,
    };
};

const mapTilretteleggingPeriodeForInnsending = (periode: TilretteleggingPeriode): TilretteleggingDTO => {
    const mappedArbeid = getArbeidsforholdForInnsending(periode);
    if (periode.type === Tilretteleggingstype.HEL) {
        return mapHelTilretteleggingForInnsending(periode, mappedArbeid);
    }
    if (periode.type === Tilretteleggingstype.DELVIS) {
        return mapDelvisTilretteleggingForInnsending(periode, mappedArbeid);
    }
    return mapIngenTilretteleggingForInnsending(periode, mappedArbeid);
};

const mapTilretteleggingerForInnsending = (
    tilretteleggingsPerioder: TilretteleggingPeriode[],
): TilretteleggingDTO[] => {
    return tilretteleggingsPerioder.map((p: TilretteleggingPeriode) => {
        return mapTilretteleggingPeriodeForInnsending(p);
    });
};

const mapEgenNæringForInnsending = (næring: EgenNæring | undefined): EgenNæringDTO | undefined => {
    if (næring) {
        const erNyoppstartet = erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(næring.tidsperiode.fom));

        const mappedNæring = {
            næringstyper: næring.næringstyper,
            tidsperiode: {
                fom: ISOStringToDate(næring.tidsperiode.fom),
                tom: ISOStringToDate(næring.tidsperiode.tom),
            },
            næringsinntekt: næring.næringsinntekt,
            navnPåNæringen: næring.navnPåNæringen,
            organisasjonsnummer: næring.organisasjonsnummer ? næring.organisasjonsnummer : undefined,
            registrertINorge: næring.registrertINorge,
            registrertILand: næring.registrertILand ? næring.registrertILand : undefined,
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:
                næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        };
        if (erNyoppstartet) {
            return {
                ...mappedNæring,
                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:
                    næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
                oppstartsdato: næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
                    ? næring.oppstartsdato
                    : undefined,
            };
        }
        if (!erNyoppstartet) {
            return {
                ...mappedNæring,
                hattVarigEndringAvNæringsinntektSiste4Kalenderår:
                    næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår,
                endringAvNæringsinntektInformasjon: næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår
                    ? {
                          dato: ISOStringToDate(næring.varigEndringDato)!,
                          næringsinntektEtterEndring: næring.varigEndringInntektEtterEndring!,
                          forklaring: næring.varigEndringBeskrivelse!,
                      }
                    : undefined,
            };
        }
        return mappedNæring;
    }
    return undefined;
};

const mapFrilansForInnsending = (frilans: Frilans | undefined): FrilansDTO | undefined => {
    if (frilans) {
        return {
            ...frilans,
            oppstart: ISOStringToDate(frilans.oppstart)!,
            // sluttDato: ISOStringToDate(frilans.sluttDato),
        };
    }
    return undefined;
};

const mapArbeidIUtlandetForInnsending = (arbeid: ArbeidIUtlandet): ArbeidIUtlandetDTO => {
    return {
        type: AnnenInntektType.JOBB_I_UTLANDET,
        arbeidsgiverNavn: arbeid.arbeidsgiverNavn,
        land: arbeid.land,
        tidsperiode: {
            fom: ISOStringToDate(arbeid.tidsperiode.fom)!,
            tom: ISOStringToDate(arbeid.tidsperiode.tom),
        },
    };
};

const mapSøkerForInnsending = (søker: Søker): SøkerDTO => {
    const mappedNæring = mapEgenNæringForInnsending(søker.selvstendigNæringsdrivendeInformasjon);
    const mappedArbeidIUtlandet = søker.andreInntekter
        ? søker.andreInntekter.map((inntekt) => mapArbeidIUtlandetForInnsending(inntekt))
        : undefined;
    const mappedSøker: SøkerDTO = {
        rolle: søker.rolle,
        språkkode: søker.språkkode,
        harJobbetSomFrilansSiste10Mnd: søker.harJobbetSomFrilans,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: søker.harJobbetSomSelvstendigNæringsdrivende,
        harHattAnnenInntektSiste10Mnd: søker.harHattAnnenInntekt,
        frilansInformasjon: søker.harJobbetSomFrilans ? mapFrilansForInnsending(søker.frilansInformasjon) : undefined,
        selvstendigNæringsdrivendeInformasjon: mappedNæring ? [mappedNæring] : undefined,
        andreInntekterSiste10Mnd: mappedArbeidIUtlandet,
    };
    return mappedSøker;
};

export const getSøknadForInnsending = (
    søknad: Søknad,
    tilretteleggingsPerioder: TilretteleggingPeriode[],
): SøknadDTO => {
    const utenlandsoppholdForInnsending = mapUtenlandsOppholdForInnsending(søknad.informasjonOmUtenlandsopphold);
    const barnForInnsending = mapBarnForInnsending(søknad.barn);
    const tilretteleggingForInnsending = mapTilretteleggingerForInnsending(tilretteleggingsPerioder);
    const søkerForInnsending = mapSøkerForInnsending(søknad.søker);
    return {
        type: Søknadstype.SVANGERSKAPSPENGER,
        erEndringssøknad: false,
        informasjonOmUtenlandsopphold: utenlandsoppholdForInnsending,
        barn: barnForInnsending,
        vedlegg: søknad.tilrettelegging.map((t) => t.vedlegg).flat(1),
        tilrettelegging: tilretteleggingForInnsending,
        søker: søkerForInnsending,
    };
};
