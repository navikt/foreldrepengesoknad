import { ISOStringToDate } from '@navikt/fp-common';
import { AttachmentMetadataType, LocaleNo } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType } from 'app/context/SvpDataContext';
import { erVirksomhetRegnetSomNyoppstartet } from 'app/steps/egen-næring/egenNæringFormUtils';
import { AnnenInntektType, ArbeidIUtlandet, ArbeidIUtlandetDTO, ArbeidIUtlandetInput } from 'app/types/ArbeidIUtlandet';
import { ArbeidsforholdDTO } from 'app/types/Arbeidsforhold';
import { AttachmentDTO } from 'app/types/AttachmentDTO';
import { Barn, BarnDTO } from 'app/types/Barn';
import { EgenNæring, EgenNæringDTO, Næringstype } from 'app/types/EgenNæring';
import { Frilans, FrilansDTO } from 'app/types/Frilans';
import { Inntektsinformasjon } from 'app/types/Inntektsinformasjon';
import { SøkerDTO, Søkerrolle } from 'app/types/Søker';
import { SøknadDTO, Søknadstype } from 'app/types/Søknad';
import Tilrettelegging, {
    Arbeidsforholdstype,
    DelvisTilretteleggingDTO,
    HelTilretteleggingDTO,
    IngenTilretteleggingDTO,
    TilretteleggingDTO,
    TilretteleggingPeriode,
    Tilretteleggingstype,
} from 'app/types/Tilrettelegging';
import {
    InformasjonOmUtenlandsoppholdDTO,
    Utenlandsopphold,
    UtenlandsoppholdDTO,
    UtenlandsoppholdPeriode,
    UtenlandsoppholdSenere,
    UtenlandsoppholdTidligere,
} from 'app/types/Utenlandsopphold';

import { getSisteDagForSvangerskapspenger } from './dateUtils';
import { mapTilretteleggingTilPerioder } from './tilretteleggingUtils';

const getArbeidsforholdForInnsending = (t: TilretteleggingPeriode | Tilrettelegging): ArbeidsforholdDTO => {
    if (
        t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER ||
        t.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG
    ) {
        return {
            type: t.arbeidsforhold.type,
            risikoFaktorer: t.risikofaktorer!,
            tilretteleggingstiltak: t.tilretteleggingstiltak!,
        };
    }
    return {
        id: t.arbeidsforhold.arbeidsgiverId!,
        type: t.arbeidsforhold.type,
    };
};

const mapBostedUtlandTilDTO = (utenlandsopphold: UtenlandsoppholdPeriode): UtenlandsoppholdDTO => {
    return {
        land: utenlandsopphold.land,
        tidsperiode: {
            fom: ISOStringToDate(utenlandsopphold.tidsperiode.fom)!,
            tom: ISOStringToDate(utenlandsopphold.tidsperiode.tom)!,
        },
    };
};

const mapUtenlandsOppholdForInnsending = (
    utenlandsopphold: Utenlandsopphold,
    senereUtenlandsopphold?: UtenlandsoppholdSenere,
    tidligereUtenlandsopphold?: UtenlandsoppholdTidligere,
): InformasjonOmUtenlandsoppholdDTO => {
    return {
        iNorgeSiste12Mnd: utenlandsopphold.iNorgeSiste12Mnd,
        iNorgeNeste12Mnd: utenlandsopphold.iNorgeNeste12Mnd,
        tidligereOpphold: (tidligereUtenlandsopphold?.tidligereOpphold || []).map(mapBostedUtlandTilDTO),
        senereOpphold: (senereUtenlandsopphold?.senereOpphold || []).map(mapBostedUtlandTilDTO),
    };
};

// TODO (TOR) Fjern denne når endepunkt er endra til å ta i mot kun ein fødselsdato
const mapBarnForInnsending = (barn: Barn): BarnDTO => {
    return {
        erBarnetFødt: barn.erBarnetFødt,
        termindato: barn.termindato,
        fødselsdatoer: barn.fødselsdato ? [barn.fødselsdato] : undefined,
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
        const navn =
            næring.næringstype === Næringstype.FISKER && næring.navnPåNæringen.trim().length === 0
                ? undefined
                : næring.navnPåNæringen;
        const erNyoppstartet = erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(næring.tidsperiode.fom));

        const mappedNæring = {
            næringstyper: [næring.næringstype],
            tidsperiode: {
                fom: ISOStringToDate(næring.tidsperiode.fom),
                tom: ISOStringToDate(næring.tidsperiode.tom),
            },
            næringsinntekt: næring.næringsinntekt ? parseInt(næring.næringsinntekt!, 10) : undefined,
            navnPåNæringen: navn,
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
        } else {
            return {
                ...mappedNæring,
                hattVarigEndringAvNæringsinntektSiste4Kalenderår:
                    næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår,
                endringAvNæringsinntektInformasjon: næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår
                    ? {
                          dato: ISOStringToDate(næring.varigEndringDato)!,
                          næringsinntektEtterEndring: parseInt(næring.varigEndringInntektEtterEndring!),
                          forklaring: næring.varigEndringBeskrivelse!,
                      }
                    : undefined,
            };
        }
    }
    return undefined;
};

const mapFrilansForInnsending = (frilans: Frilans | undefined): FrilansDTO | undefined => {
    if (frilans) {
        return {
            ...frilans,
            oppstart: ISOStringToDate(frilans.oppstart)!,
        };
    }
    return undefined;
};

const mapArbeidIUtlandetForInnsending = (arbeid: ArbeidIUtlandetInput): ArbeidIUtlandetDTO => {
    return {
        type: AnnenInntektType.JOBB_I_UTLANDET,
        arbeidsgiverNavn: arbeid.arbeidsgiverNavn,
        land: arbeid.land,
        tidsperiode: {
            fom: arbeid.fom,
            tom: arbeid.tom,
            pågående: arbeid.pågående,
        },
    };
};

const mapSøkerForInnsending = (
    locale: LocaleNo,
    inntektsinformasjon: Inntektsinformasjon,
    egenNæring?: EgenNæring,
    frilans?: Frilans,
    arbeidIUtlandet?: ArbeidIUtlandet,
): SøkerDTO => {
    const mappedNæring = mapEgenNæringForInnsending(egenNæring);
    const mappedArbeidIUtlandet = arbeidIUtlandet
        ? arbeidIUtlandet.arbeidIUtlandet.map((inntekt) => mapArbeidIUtlandetForInnsending(inntekt))
        : undefined;
    const mappedSøker: SøkerDTO = {
        rolle: Søkerrolle.MOR,
        språkkode: locale,
        frilansInformasjon: inntektsinformasjon.harJobbetSomFrilans ? mapFrilansForInnsending(frilans) : undefined,
        selvstendigNæringsdrivendeInformasjon: mappedNæring ? [mappedNæring] : undefined,
        andreInntekterSiste10Mnd: mappedArbeidIUtlandet,
    };
    return mappedSøker;
};

const mapVedleggForInnsending = (tilrettelegginger: Tilrettelegging[]): AttachmentDTO[] => {
    const mappedVedlegg = tilrettelegginger.map((t) => {
        const mappedArbeid = getArbeidsforholdForInnsending(t);
        const vedleggForInnsending = t.vedlegg.map((v) => ({
            ...v,
            dokumenterer: {
                type: AttachmentMetadataType.TILRETTELEGGING,
                arbeidsforhold: mappedArbeid,
            },
        }));
        return vedleggForInnsending;
    });
    return mappedVedlegg.flat(1);
};

export const getSøknadForInnsending = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    locale: LocaleNo,
): SøknadDTO => {
    const utenlandsoppholdForInnsending = mapUtenlandsOppholdForInnsending(
        notEmpty(hentData(ContextDataType.UTENLANDSOPPHOLD)),
        hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE),
        hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE),
    );

    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const tilrettelegging = notEmpty(hentData(ContextDataType.TILRETTELEGGINGER));

    const barnForInnsending = mapBarnForInnsending(barn);
    const vedleggForInnsending = mapVedleggForInnsending(tilrettelegging);
    const søkerForInnsending = mapSøkerForInnsending(
        locale,
        notEmpty(hentData(ContextDataType.INNTEKTSINFORMASJON)),
        hentData(ContextDataType.EGEN_NÆRING),
        hentData(ContextDataType.FRILANS),
        hentData(ContextDataType.ARBEID_I_UTLANDET),
    );

    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const allePerioderMedFomOgTom = mapTilretteleggingTilPerioder(tilrettelegging, sisteDagForSvangerskapspenger);
    const tilretteleggingForInnsending = mapTilretteleggingerForInnsending(allePerioderMedFomOgTom);

    return {
        type: Søknadstype.SVANGERSKAPSPENGER,
        erEndringssøknad: false,
        informasjonOmUtenlandsopphold: utenlandsoppholdForInnsending,
        barn: barnForInnsending,
        vedlegg: vedleggForInnsending,
        tilrettelegging: tilretteleggingForInnsending,
        søker: søkerForInnsending,
    };
};
