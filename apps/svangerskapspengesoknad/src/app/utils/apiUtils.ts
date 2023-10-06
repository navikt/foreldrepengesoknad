import { ISOStringToDate } from '@navikt/fp-common';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';
import { DelivisTilretteleggingPeriodeType } from 'app/steps/tilrettelegging/tilretteleggingStepFormConfig';
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
import Tilrettelegging, {
    Arbeidsforholdstype,
    DelvisTilretteleggingDTO,
    IngenTilretteleggingDTO,
    TilretteleggingDTO,
    Tilretteleggingstype,
} from 'app/types/Tilrettelegging';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

const getArbeidsforholdForInnsending = (tilrettelegging: Tilrettelegging): ArbeidsforholdDTO => {
    if (
        tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER ||
        tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG
    ) {
        return {
            type: tilrettelegging.arbeidsforhold.type,
            risikoFaktorer: tilrettelegging.risikofaktorer!,
            tilretteleggingstiltak: tilrettelegging.tilretteleggingstiltak!,
        };
    }
    return {
        id: tilrettelegging.arbeidsforhold.arbeidsgiverId!,
        type: tilrettelegging.arbeidsforhold.type,
    };
};

const mapBostedUtlandTilDTO = (utenlandsopphold: Utenlandsopphold, intl: IntlShape): UtenlandsoppholdDTO => {
    return {
        land: getCountryName(utenlandsopphold.land, intl.locale),
        tidsperiode: {
            fom: ISOStringToDate(utenlandsopphold.tidsperiode.fom)!,
            tom: ISOStringToDate(utenlandsopphold.tidsperiode.tom)!,
        },
    };
};

const mapUtenlandsOppholdForInnsending = (
    utenlandsopphold: InformasjonOmUtenlandsopphold,
    intl: IntlShape,
): InformasjonOmUtenlandsoppholdDTO => {
    return {
        iNorgePåHendelsestidspunktet: utenlandsopphold.iNorgePåHendelsestidspunktet,
        iNorgeSiste12Mnd: utenlandsopphold.iNorgeSiste12Mnd,
        iNorgeNeste12Mnd: utenlandsopphold.iNorgeNeste12Mnd,
        jobbetINorgeSiste12Mnd: utenlandsopphold.jobbetINorgeSiste12Mnd,
        tidligereOpphold: utenlandsopphold.tidligereOpphold.map((opphold) => {
            return mapBostedUtlandTilDTO(opphold, intl);
        }),
        senereOpphold: utenlandsopphold.tidligereOpphold.map((opphold) => {
            return mapBostedUtlandTilDTO(opphold, intl);
        }),
    };
};

const mapBarnForInnsending = (barn: Barn): BarnDTO => {
    return {
        ...barn,
        termindato: ISOStringToDate(barn.termindato)!,
        fødselsdatoer: barn.fødselsdato ? [ISOStringToDate(barn.fødselsdato)!] : [],
    };
};
const mapDelvisTilretteleggingForInnsending = (
    tilrettelegging: Tilrettelegging,
    arbeidsforholdForInnsending: ArbeidsforholdDTO,
    prosentStilling: number,
): DelvisTilretteleggingDTO => {
    return {
        type: Tilretteleggingstype.DELVIS,
        behovForTilretteleggingFom: ISOStringToDate(tilrettelegging.behovForTilretteleggingFom)!,
        arbeidsforhold: arbeidsforholdForInnsending as ArbeidsforholdDTO,
        vedlegg: tilrettelegging.vedlegg.map((v) => v.id),
        tilrettelagtArbeidFom: ISOStringToDate(tilrettelegging.enPeriodeMedTilretteleggingFom)!,
        stillingsprosent: prosentStilling,
    };
};

const mapIngenTilretteleggingForInnsending = (
    tilrettelegging: Tilrettelegging,
    arbeidsforholdForInnsending: ArbeidsforholdDTO,
): IngenTilretteleggingDTO => {
    return {
        type: Tilretteleggingstype.INGEN,
        behovForTilretteleggingFom: ISOStringToDate(tilrettelegging.behovForTilretteleggingFom)!,
        arbeidsforhold: arbeidsforholdForInnsending as ArbeidsforholdDTO,
        vedlegg: tilrettelegging.vedlegg.map((v) => v.id),
        slutteArbeidFom: ISOStringToDate(tilrettelegging.enPeriodeMedTilretteleggingFom)!,
    };
};

const mapDelvisTilretteleggingMedEnPeriodeForInnsending = (
    tilrettelegging: Tilrettelegging,
    arbeidsforholdForInnsending: ArbeidsforholdDTO,
): DelvisTilretteleggingDTO | IngenTilretteleggingDTO => {
    const prosentStilling = parseInt(tilrettelegging.enPeriodeMedTilretteleggingStillingsprosent!, 10);
    const jobberDelvis = prosentStilling > 0;
    if (jobberDelvis) {
        return mapDelvisTilretteleggingForInnsending(tilrettelegging, arbeidsforholdForInnsending, prosentStilling);
    } else {
        return mapIngenTilretteleggingForInnsending(tilrettelegging, arbeidsforholdForInnsending);
    }
};

const mappedTilretteleggingMedEnPeriodeForInnsending = (tilrettelegging: Tilrettelegging): TilretteleggingDTO => {
    const arbeidsforholdForInnsending = getArbeidsforholdForInnsending(tilrettelegging);

    if (
        tilrettelegging.type === Tilretteleggingstype.DELVIS &&
        tilrettelegging.delvisTilretteleggingPeriodeType ===
            DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN
    ) {
        return mapDelvisTilretteleggingMedEnPeriodeForInnsending(
            tilrettelegging,
            arbeidsforholdForInnsending as ArbeidsforholdDTO,
        );
    }
    return mapIngenTilretteleggingForInnsending(tilrettelegging, arbeidsforholdForInnsending as ArbeidsforholdDTO);
};

const mappedTilretteleggingMedFlerePerioderForInnsending = (tilrettelegging: Tilrettelegging): TilretteleggingDTO[] => {
    const arbeidsforholdForInnsending = getArbeidsforholdForInnsending(tilrettelegging);
    const allePerioder = tilrettelegging.variertePerioder!.map((periode) => {
        const prosentStilling = parseInt(periode.stillingsprosent!, 10);
        const jobberDelvis = prosentStilling > 0;
        if (jobberDelvis) {
            return {
                type: Tilretteleggingstype.DELVIS,
                behovForTilretteleggingFom: ISOStringToDate(tilrettelegging.behovForTilretteleggingFom)!,
                arbeidsforhold: arbeidsforholdForInnsending,
                vedlegg: tilrettelegging.vedlegg.map((v) => v.id),
                tilrettelagtArbeidFom: ISOStringToDate(periode.fom)!,
                stillingsprosent: prosentStilling,
            } as DelvisTilretteleggingDTO;
        } else {
            return {
                type: Tilretteleggingstype.INGEN,
                behovForTilretteleggingFom: ISOStringToDate(tilrettelegging.behovForTilretteleggingFom)!,
                arbeidsforhold: arbeidsforholdForInnsending,
                vedlegg: tilrettelegging.vedlegg.map((v) => v.id),
                slutteArbeidFom: ISOStringToDate(periode.fom)!,
            } as IngenTilretteleggingDTO;
        }
    });
    return allePerioder;
};

export const sorterTilretteleggingsperioder = (p1: TilretteleggingDTO, p2: TilretteleggingDTO) => {
    const p1Fom = p1.type === Tilretteleggingstype.DELVIS ? p1.tilrettelagtArbeidFom : p1.slutteArbeidFom;
    const p2Fom = p2.type === Tilretteleggingstype.DELVIS ? p2.behovForTilretteleggingFom : p2.slutteArbeidFom;

    return dayjs(p1Fom).isBefore(p2Fom, 'day') ? -1 : 1;
};

const mapTilretteleggingerForInnsending = (tilrettelegging: Tilrettelegging[]): TilretteleggingDTO[] => {
    const tilretteleggingMedEnPeriode = tilrettelegging.filter(
        (t) => !t.variertePerioder || t.variertePerioder.length === 0,
    );
    const tilretteleggingMedFlerePerioder = tilrettelegging.filter(
        (t) => t.variertePerioder && t.variertePerioder.length > 0,
    );
    const mappedTilretteleggingerMedEnPeriode = tilretteleggingMedEnPeriode.map((t) => {
        return mappedTilretteleggingMedEnPeriodeForInnsending(t);
    });
    const mappedTilretteleggingAvFlerePerioder = tilretteleggingMedFlerePerioder.map((t) => {
        return mappedTilretteleggingMedFlerePerioderForInnsending(t);
    });
    const allePerioder = [
        ...mappedTilretteleggingerMedEnPeriode.flat(1),
        ...mappedTilretteleggingAvFlerePerioder.flat(1),
    ];
    const sortertePerioder = allePerioder.sort(sorterTilretteleggingsperioder);
    return sortertePerioder;
};

const mapEgenNæringForInnsending = (næring: EgenNæring | undefined): EgenNæringDTO | undefined => {
    if (næring) {
        const hattVarigEndring = næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår;

        const mappedNæring = {
            næringstype: næring.næringstype,
            tidsperiode: {
                fom: ISOStringToDate(næring.tidsperiode.fom),
                tom: ISOStringToDate(næring.tidsperiode.tom),
            },
            næringsinntekt: næring.næringsinntekt,
            navnPåNæringen: næring.navnPåNæringen,
            organisasjonsnummer: næring.organisasjonsnummer,
            registrertINorge: næring.registrertINorge,
            registrertILand: næring.registrertILand,
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:
                næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
            hattVarigEndringAvNæringsinntektSiste4Kalenderår: hattVarigEndring,
        };
        if (hattVarigEndring) {
            return {
                ...mappedNæring,
                endringAvNæringsinntektInformasjon: {
                    dato: ISOStringToDate(næring.varigEndringDato)!,
                    næringsinntektEtterEndring: næring.varigEndringInntektEtterEndring!,
                    forklaring: næring.varigEndringBeskrivelse!,
                },
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
        : [];
    const mappedSøker: SøkerDTO = {
        ...søker,
        frilansInformasjon: mapFrilansForInnsending(søker.frilansInformasjon),
        selvstendigNæringsdrivendeInformasjon: mappedNæring ? [mappedNæring] : [],
        andreInntekterSiste10Mnd: mappedArbeidIUtlandet,
    };
    return mappedSøker;
};

export const getSøknadForInnsending = (søknad: Søknad, intl: IntlShape): SøknadDTO => {
    const utenlandsoppholdForInnsending = mapUtenlandsOppholdForInnsending(søknad.informasjonOmUtenlandsopphold, intl);
    const barnForInnsending = mapBarnForInnsending(søknad.barn);
    const tilretteleggingForInnsending = mapTilretteleggingerForInnsending(søknad.tilrettelegging);
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
