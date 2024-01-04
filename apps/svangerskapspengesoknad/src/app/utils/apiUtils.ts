import { ISOStringToDate } from '@navikt/fp-common';
import { erVirksomhetRegnetSomNyoppstartet } from 'app/steps/egen-næring/egenNæringFormUtils';
import { AnnenInntektType, ArbeidIUtlandet, ArbeidIUtlandetDTO } from 'app/types/ArbeidIUtlandet';
import { ArbeidsforholdDTO } from 'app/types/Arbeidsforhold';
import { AttachmentDTO, DokumentererType } from 'app/types/AttachmentDTO';
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
import Tilrettelegging, {
    Arbeidsforholdstype,
    DelvisTilretteleggingDTO,
    HelTilretteleggingDTO,
    IngenTilretteleggingDTO,
    TilretteleggingDTO,
    TilretteleggingPeriode,
    Tilretteleggingstype,
} from 'app/types/Tilrettelegging';

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
        senereOpphold: utenlandsopphold.senereOpphold.map((opphold) => {
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
        const erNyoppstartet = erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(næring.tidsperiode.fom));

        const mappedNæring = {
            næringstyper: næring.næringstyper,
            tidsperiode: {
                fom: ISOStringToDate(næring.tidsperiode.fom),
                tom: ISOStringToDate(næring.tidsperiode.tom),
            },
            næringsinntekt: næring.næringsinntekt ? parseInt(næring.næringsinntekt!, 10) : undefined,
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
        frilansInformasjon: søker.harJobbetSomFrilans ? mapFrilansForInnsending(søker.frilansInformasjon) : undefined,
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
                type: DokumentererType.TILRETTELEGGING,
                arbeidsforhold: mappedArbeid,
            },
        }));
        return vedleggForInnsending;
    });
    return mappedVedlegg.flat(1);
};

export const getSøknadForInnsending = (
    søknad: Søknad,
    tilretteleggingsPerioder: TilretteleggingPeriode[],
): SøknadDTO => {
    const utenlandsoppholdForInnsending = mapUtenlandsOppholdForInnsending(søknad.informasjonOmUtenlandsopphold);
    const barnForInnsending = mapBarnForInnsending(søknad.barn);
    const tilretteleggingForInnsending = mapTilretteleggingerForInnsending(tilretteleggingsPerioder);
    const søkerForInnsending = mapSøkerForInnsending(søknad.søker);
    const vedleggForInnsending = mapVedleggForInnsending(søknad.tilrettelegging);
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
