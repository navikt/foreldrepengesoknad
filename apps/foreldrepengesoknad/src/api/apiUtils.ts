import { ContextDataMap, ContextDataType } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { toNumber } from 'lodash';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { VedleggDataType } from 'types/VedleggDataType';
import { erPeriodeIOpprinneligSak } from 'utils/eksisterendeSakUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';

import {
    AnnenForelder,
    Arbeidsform,
    Barn,
    Periode,
    Periodetype,
    Søkerrolle,
    UttaksperiodeBase,
    isAdoptertBarn,
    isAdoptertStebarn,
    isAnnenForelderIkkeOppgitt,
    isAnnenForelderOppgitt,
    isForeldrepengerFørFødselUttaksperiode,
    isFødtBarn,
    isUttaksperiode,
} from '@navikt/fp-common';
import {
    AnnenForelderDto,
    Attachment,
    BarnDto,
    BrukerRolle,
    EndringssøknadForeldrepengerDto,
    ForeldrepengesøknadDto,
    FpSak_fpoversikt,
    KontoType,
    Målform,
    Oppholdsårsak,
    PersonMedArbeidsforholdDto_fpoversikt,
    SøkerDto,
    UtsettelsesÅrsak,
    UttakOppholdÅrsak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
    UttaksplanDto,
    Uttaksplanperiode,
    isUfødtBarn,
} from '@navikt/fp-types';
import {
    Uttaksdagen,
    dateToISOString,
    getDecoratorLanguageCookie,
    isValidTidsperiode,
    omitOne,
} from '@navikt/fp-utils';
import { andreAugust2022ReglerGjelder, førsteOktober2021ReglerGjelder } from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

export const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

export const UKJENT_UUID = 'ukjent uuid';

const hentValgtSpråk = (): Målform => {
    return getDecoratorLanguageCookie('decorator-language').toUpperCase() as Målform;
};

const getUttaksperiodeForInnsending = (uttaksperiodeBase: UttaksperiodeBase): Uttaksplanperiode => {
    const uttaksperiode = {
        type: 'uttak' as const,
        fom: dateToISOString(uttaksperiodeBase.tidsperiode.fom),
        tom: dateToISOString(uttaksperiodeBase.tidsperiode.tom),
        konto: uttaksperiodeBase.konto as KontoType,
        morsAktivitetIPerioden: uttaksperiodeBase.morsAktivitetIPerioden,
        ønskerSamtidigUttak: uttaksperiodeBase.ønskerSamtidigUttak,
        samtidigUttakProsent: toNumber(uttaksperiodeBase.samtidigUttakProsent) || undefined,
        ønskerFlerbarnsdager: uttaksperiodeBase.ønskerFlerbarnsdager,
        ønskerGradering: uttaksperiodeBase.gradert,
    };

    if (uttaksperiodeBase.gradert) {
        return {
            ...uttaksperiode,
            gradering: {
                ...getArbeidstakerFrilansSN(uttaksperiodeBase.arbeidsformer),
                stillingsprosent: toNumber(uttaksperiodeBase.stillingsprosent),
                orgnumre: uttaksperiodeBase.orgnumre,
            },
        };
    } else {
        return uttaksperiode;
    }
};

const isNotPeriodetypeHull = (periode: Periode): boolean => {
    return periode.type !== Periodetype.Hull;
};

const isNotPeriodetypeInfo = (periode: Periode): boolean => {
    return periode.type !== Periodetype.Info;
};

const isNotPeriodeUtenUttak = (periode: Periode): boolean => {
    return periode.type !== Periodetype.PeriodeUtenUttak;
};

const skalPeriodeSendesInn = (periode: Periode) => {
    if (isForeldrepengerFørFødselUttaksperiode(periode)) {
        return !periode.skalIkkeHaUttakFørTermin;
    }

    return (
        isNotPeriodetypeHull(periode) &&
        isNotPeriodetypeInfo(periode) &&
        isNotPeriodeUtenUttak(periode) &&
        !(isUttaksperiode(periode) && periode.konto === undefined)
    );
};

const cleanBarn = (barn: Barn): BarnDto => {
    if (isUfødtBarn(barn)) {
        return {
            type: 'termin',
            antallBarn: barn.antallBarn,
            termindato: barn.termindato,
            terminbekreftelseDato: barn.terminbekreftelsedato,
        };
    }

    if (isFødtBarn(barn)) {
        return {
            type: 'fødsel',
            antallBarn: barn.antallBarn,
            fødselsdato: barn.fødselsdatoer[0]!,
            termindato: barn.termindato,
        };
    }

    if (isAdoptertBarn(barn)) {
        const barnRest = omitOne(barn, 'type');
        return {
            ...barnRest,
            type: 'adopsjon',
            adopsjonAvEktefellesBarn: isAdoptertStebarn(barn),
        };
    }

    throw new Error('Det er feil i data om barnet');
};

const konverterRolle = (rolle: Søkerrolle): BrukerRolle => {
    switch (rolle) {
        case 'mor':
            return 'MOR';
        case 'far':
            return 'FAR';
        case 'medmor':
            return 'MEDMOR';
    }
};

const changeClientonlyKontotype = (
    periode: Periode,
    annenForelderHarRettPåForeldrepengerINorge: boolean,
    morErUfør: boolean,
    søkerErFarEllerMedmor: boolean,
    familiehendelsesdato: string,
) => {
    if (isUttaksperiode(periode)) {
        if (periode.konto === 'AKTIVITETSFRI_KVOTE') {
            periode.konto = 'FORELDREPENGER';
            if (
                søkerErFarEllerMedmor &&
                !annenForelderHarRettPåForeldrepengerINorge &&
                andreAugust2022ReglerGjelder(familiehendelsesdato)
            ) {
                periode.morsAktivitetIPerioden = 'IKKE_OPPGITT';
            } else if (morErUfør) {
                periode.morsAktivitetIPerioden = 'UFØRE';
            }
        }
    }
    return periode;
};

const getArbeidstakerFrilansSN = (arbeidsformer: Arbeidsform[] | undefined) => {
    if (arbeidsformer !== undefined && arbeidsformer.length > 0) {
        const arbeidsform = arbeidsformer[0];
        return {
            erArbeidstaker: arbeidsform === Arbeidsform.arbeidstaker,
            erFrilanser: arbeidsform === Arbeidsform.frilans,
            erSelvstendig: arbeidsform === Arbeidsform.selvstendignæringsdrivende,
        };
    } else {
        return {};
    }
};

const getPeriodeForInnsending = (periode: Periode): Uttaksplanperiode => {
    const { tidsperiode, ...periodeRest } = periode;
    // @ts-expect-error -- kontoType må mappes om
    return {
        ...periodeRest,
        fom: dateToISOString(tidsperiode.fom),
        tom: dateToISOString(tidsperiode.tom),
    };
};

const cleanUttaksplan = (
    plan: Periode[],
    familiehendelsesdato: string,
    søkerErFarEllerMedmor: boolean,
    ønskerJustertUttakVedFødsel: boolean | undefined,
    annenForelder?: AnnenForelder,
    endringstidspunkt?: Date,
): UttaksplanDto => {
    const uttaksplan = plan.map((periode) => {
        return { ...periode };
    });
    const cleanedUttaksplan = uttaksplan
        .filter((periode: Periode) => isValidTidsperiode(periode.tidsperiode))
        .filter(skalPeriodeSendesInn)
        .map((periode) =>
            annenForelder && isAnnenForelderOppgitt(annenForelder)
                ? changeClientonlyKontotype(
                      periode,
                      !!annenForelder.harRettPåForeldrepengerINorge,
                      !!annenForelder.erMorUfør,
                      søkerErFarEllerMedmor,
                      familiehendelsesdato,
                  )
                : periode,
        )
        .map((periode) =>
            periode.type === Periodetype.Uttak
                ? getUttaksperiodeForInnsending(periode)
                : getPeriodeForInnsending(periode),
        );

    if (endringstidspunkt && førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        const periodeVedEndringstidspunkt = getPeriodeVedTidspunkt(cleanedUttaksplan, endringstidspunkt);

        if (!periodeVedEndringstidspunkt) {
            return {
                ønskerJustertUttakVedFødsel: ønskerJustertUttakVedFødsel,
                uttaksperioder: getUttaksplanMedFriUtsettelsesperiode(cleanedUttaksplan, endringstidspunkt),
            };
        }
    }

    return {
        ønskerJustertUttakVedFødsel: ønskerJustertUttakVedFødsel,
        uttaksperioder: cleanedUttaksplan,
    };
};

export const getPeriodeVedTidspunkt = (
    uttaksplan: Uttaksplanperiode[],
    tidspunkt: Date,
): Uttaksplanperiode | undefined => {
    return uttaksplan.find((periode) => dayjs(tidspunkt).isBetween(periode.fom, periode.tom, 'day', '[]'));
};

export const getUttaksplanMedFriUtsettelsesperiode = (
    uttaksplan: Uttaksplanperiode[],
    endringstidspunkt: Date,
): Uttaksplanperiode[] => {
    const førstePeriodeEtterEndringstidspunkt = uttaksplan.find((periode) =>
        dayjs(periode.fom).isAfter(endringstidspunkt, 'day'),
    );
    const endringsTidspunktPeriodeTom = førstePeriodeEtterEndringstidspunkt
        ? Uttaksdagen(dayjs(førstePeriodeEtterEndringstidspunkt.fom).toDate()).forrige()
        : endringstidspunkt;

    const endringsTidspunktPeriode: Uttaksplanperiode = {
        type: Periodetype.Utsettelse,
        årsak: 'FRI',
        fom: dateToISOString(endringstidspunkt),
        tom: dateToISOString(endringsTidspunktPeriodeTom),
        erArbeidstaker: false,
    };

    uttaksplan.push(endringsTidspunktPeriode);

    uttaksplan.sort((p1, p2) => (dayjs(p1.fom).isBefore(p2.fom, 'day') ? -1 : 1));

    return uttaksplan;
};

const convertAttachmentsMapToArray = (vedlegg: VedleggDataType | undefined): Attachment[] => {
    if (!vedlegg) {
        return [];
    }

    const vedleggArray: Attachment[] = [];

    for (const key of Object.keys(vedlegg)) {
        const vedleggAvTypeSkjemanummer = vedlegg[key as GyldigeSkjemanummer];

        if (vedleggAvTypeSkjemanummer && vedleggAvTypeSkjemanummer.length > 0) {
            vedleggArray.push(...vedleggAvTypeSkjemanummer);
        }
    }

    return vedleggArray;
};

const cleanAnnenforelder = (annenForelder: AnnenForelder | undefined): AnnenForelderDto | undefined => {
    if (annenForelder === undefined || isAnnenForelderIkkeOppgitt(annenForelder)) {
        return;
    }

    const harRettPåForeldrepenger = !!annenForelder.harRettPåForeldrepengerINorge;
    /*
     Hvis bruker har svart på spørsmålet om annenForelder er informert så bruker vi det.
     Men i tilfelle endringssøknad så finnes ikke dette spørsmålet eksplisitt (det finnes implisitt i en checkbox for å kunne sende).
     I de tilfellene sier vi ja hvis annen forelder har rett i Norge.
    */
    const erInformertOmSøknaden = (() => {
        if (annenForelder.erInformertOmSøknaden === undefined) {
            return harRettPåForeldrepenger ? true : undefined;
        }
        return annenForelder.erInformertOmSøknaden;
    })();

    const baseData = {
        fnr: annenForelder.fnr,
        fornavn: annenForelder.fornavn,
        etternavn: annenForelder.etternavn,
        rettigheter: {
            harRettPåForeldrepenger,
            erInformertOmSøknaden,
            erAleneOmOmsorg: annenForelder.erAleneOmOmsorg,
            harMorUføretrygd: annenForelder.erMorUfør,
            harAnnenForelderOppholdtSegIEØS: annenForelder.harOppholdtSegIEØS,
            harAnnenForelderTilsvarendeRettEØS:
                // Bevarer logikken fra steget og gammel oppførsel her siden harRettPåForeldrepengerIEØS defaulter til false mange plasser
                annenForelder.harRettPåForeldrepengerINorge !== false || annenForelder.harOppholdtSegIEØS !== true
                    ? undefined
                    : annenForelder.harRettPåForeldrepengerIEØS,
        },
    };
    return annenForelder.utenlandskFnr
        ? { type: 'utenlandsk', ...baseData, bostedsland: annenForelder.bostedsland ?? 'UNDEFINED' }
        : { type: 'norsk', ...baseData };
};

export const getSøknadsdataForInnsending = (
    erEndringssøknad: boolean,
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    endringerIUttaksplan: Periode[],
    familiehendelsesdato: string,
    søkerinfo: PersonMedArbeidsforholdDto_fpoversikt,
    endringstidspunkt?: Date,
): ForeldrepengesøknadDto | EndringssøknadForeldrepengerDto => {
    if (erEndringssøknad) {
        return cleanEndringssøknad(hentData, endringerIUttaksplan, familiehendelsesdato, søkerinfo, endringstidspunkt);
    } else {
        return cleanSøknad(hentData, familiehendelsesdato, søkerinfo);
    }
};

export const getSøknadsdataForInnsendingNy = (
    erEndringssøknad: boolean,
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    søkerinfo: PersonMedArbeidsforholdDto_fpoversikt,
    foreldrepengerSaker: FpSak_fpoversikt[],
): ForeldrepengesøknadDto | EndringssøknadForeldrepengerDto => {
    const valgtEksisterendeSaksnr = hentData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    const eksisterendeSak = foreldrepengerSaker.find((sak) => sak.saksnummer === valgtEksisterendeSaksnr);

    if (erEndringssøknad) {
        return cleanEndringssøknadNy(hentData, søkerinfo, eksisterendeSak);
    } else {
        return cleanSøknadNy(hentData, søkerinfo, eksisterendeSak);
    }
};

export const cleanSøknad = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    familiehendelsesdato: string,
    søkerinfo: PersonMedArbeidsforholdDto_fpoversikt,
): ForeldrepengesøknadDto => {
    const annenForelder = notEmpty(hentData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const frilans = hentData(ContextDataType.FRILANS);
    const egenNæring = hentData(ContextDataType.EGEN_NÆRING);
    const andreInntektskilder = hentData(ContextDataType.ANDRE_INNTEKTSKILDER);
    const søkersituasjon = notEmpty(hentData(ContextDataType.SØKERSITUASJON));
    const utenlandsoppholdNeste12Mnd = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const utenlandsoppholdSiste12Mnd = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const dekningsgrad = notEmpty(hentData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const uttaksplan = notEmpty(hentData(ContextDataType.UTTAKSPLAN));
    const uttaksplanMetadata = notEmpty(hentData(ContextDataType.UTTAKSPLAN_METADATA));
    const vedlegg = hentData(ContextDataType.VEDLEGG);

    const søkerErFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const uttaksplanInnsending = cleanUttaksplan(
        uttaksplan,
        familiehendelsesdato,
        søkerErFarEllerMedmor,
        uttaksplanMetadata.ønskerJustertUttakVedFødsel,
        annenForelder,
    );
    return {
        søkerinfo: mapSøkerInfoTilSøknadDto(søkerinfo),
        rolle: konverterRolle(søkersituasjon.rolle),
        språkkode: hentValgtSpråk(),
        frilans: frilans,
        egenNæring: egenNæring,
        andreInntekterSiste10Mnd: andreInntektskilder,
        barn: cleanBarn(barn),
        annenForelder: cleanAnnenforelder(annenForelder),
        dekningsgrad,
        uttaksplan: uttaksplanInnsending,
        utenlandsopphold: (utenlandsoppholdSiste12Mnd ?? []).concat(utenlandsoppholdNeste12Mnd ?? []),
        vedlegg: convertAttachmentsMapToArray(vedlegg),
    };
};

export const cleanSøknadNy = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    søkerinfo: PersonMedArbeidsforholdDto_fpoversikt,
    eksisterendeSak?: FpSak_fpoversikt,
): ForeldrepengesøknadDto => {
    const annenForelder = notEmpty(hentData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const frilans = hentData(ContextDataType.FRILANS);
    const egenNæring = hentData(ContextDataType.EGEN_NÆRING);
    const andreInntektskilder = hentData(ContextDataType.ANDRE_INNTEKTSKILDER);
    const søkersituasjon = notEmpty(hentData(ContextDataType.SØKERSITUASJON));
    const utenlandsoppholdNeste12Mnd = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const utenlandsoppholdSiste12Mnd = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const dekningsgrad = notEmpty(hentData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const uttaksplan = notEmpty(hentData(ContextDataType.UTTAKSPLAN_NY));
    const { ønskerJustertUttakVedFødsel } = notEmpty(hentData(ContextDataType.UTTAKSPLAN_METADATA_NY));

    const vedlegg = hentData(ContextDataType.VEDLEGG);

    return {
        søkerinfo: mapSøkerInfoTilSøknadDto(søkerinfo),
        rolle: konverterRolle(søkersituasjon.rolle),
        språkkode: hentValgtSpråk(),
        frilans: frilans,
        egenNæring: egenNæring,
        andreInntekterSiste10Mnd: andreInntektskilder,
        barn: cleanBarn(barn),
        annenForelder: cleanAnnenforelder(annenForelder),
        dekningsgrad,
        uttaksplan: {
            uttaksperioder: midlertidigMappingAvUttaksplan(filtrerUtUendredePeriode(uttaksplan, eksisterendeSak)),
            ønskerJustertUttakVedFødsel,
        },
        utenlandsopphold: (utenlandsoppholdSiste12Mnd ?? []).concat(utenlandsoppholdNeste12Mnd ?? []),
        vedlegg: convertAttachmentsMapToArray(vedlegg),
    };
};

const mapSøkerInfoTilSøknadDto = (søkerinfo: PersonMedArbeidsforholdDto_fpoversikt): SøkerDto => {
    return {
        fnr: søkerinfo.person.fnr,
        navn: søkerinfo.person.navn,
        arbeidsforhold: søkerinfo.arbeidsforhold.map((af) => ({
            navn: af.arbeidsgiverNavn,
            orgnummer: af.arbeidsgiverId,
            stillingsprosent: af.stillingsprosent,
            fom: af.fom,
            tom: af.tom,
        })),
    };
};

export const cleanEndringssøknad = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    endringerIUttaksplan: Periode[],
    familiehendelsesdato: string,
    søkerinfo: PersonMedArbeidsforholdDto_fpoversikt,
    endringstidspunkt?: Date,
): EndringssøknadForeldrepengerDto => {
    const uttaksplanMetadata = notEmpty(hentData(ContextDataType.UTTAKSPLAN_METADATA));
    const annenForelder = notEmpty(hentData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(hentData(ContextDataType.SØKERSITUASJON));
    const eksisterendeSak = notEmpty(hentData(ContextDataType.EKSISTERENDE_SAK));
    const søkerErFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const vedlegg = hentData(ContextDataType.VEDLEGG);
    return {
        søkerinfo: mapSøkerInfoTilSøknadDto(søkerinfo),

        saksnummer: eksisterendeSak.saksnummer,
        rolle: konverterRolle(søkersituasjon.rolle),
        språkkode: hentValgtSpråk(),
        barn: cleanBarn(barn),
        annenForelder: cleanAnnenforelder(annenForelder),
        uttaksplan: cleanUttaksplan(
            endringerIUttaksplan,
            familiehendelsesdato,
            søkerErFarEllerMedmor,
            uttaksplanMetadata.ønskerJustertUttakVedFødsel,
            annenForelder,
            endringstidspunkt,
        ),
        vedlegg: convertAttachmentsMapToArray(vedlegg),
    };
};

export const cleanEndringssøknadNy = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    søkerinfo: PersonMedArbeidsforholdDto_fpoversikt,
    eksisterendeSak?: FpSak_fpoversikt,
): EndringssøknadForeldrepengerDto => {
    const annenForelder = notEmpty(hentData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(hentData(ContextDataType.SØKERSITUASJON));
    const valgtEksisterendeSaksnr = notEmpty(hentData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR));
    const uttaksplan = notEmpty(hentData(ContextDataType.UTTAKSPLAN_NY));
    const { ønskerJustertUttakVedFødsel } = notEmpty(hentData(ContextDataType.UTTAKSPLAN_METADATA_NY));
    const vedlegg = hentData(ContextDataType.VEDLEGG);
    return {
        søkerinfo: mapSøkerInfoTilSøknadDto(søkerinfo),
        saksnummer: valgtEksisterendeSaksnr,
        rolle: konverterRolle(søkersituasjon.rolle),
        språkkode: hentValgtSpråk(),
        barn: cleanBarn(barn),
        annenForelder: cleanAnnenforelder(annenForelder),
        vedlegg: convertAttachmentsMapToArray(vedlegg),
        uttaksplan: {
            uttaksperioder: midlertidigMappingAvUttaksplan(filtrerUtUendredePeriode(uttaksplan, eksisterendeSak)),
            ønskerJustertUttakVedFødsel,
        },
    };
};

const filtrerUtUendredePeriode = (
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    eksisterendeSak?: FpSak_fpoversikt,
): UttakPeriode_fpoversikt[] => {
    return uttaksplan.filter((periode) => {
        if ('trekkdager' in periode) {
            return false;
        }
        return eksisterendeSak ? !erPeriodeIOpprinneligSak(eksisterendeSak, periode) : true;
    });
};

const midlertidigMappingAvUttaksplan = (uttaksplan: UttakPeriode_fpoversikt[]): Uttaksplanperiode[] => {
    return uttaksplan.map((periode) => {
        if (periode.oppholdÅrsak) {
            return {
                type: 'opphold',
                fom: periode.fom,
                tom: periode.tom,
                årsak: midlertidigMappingAvOppholdÅrsak(periode.oppholdÅrsak),
            };
        }
        if (periode.overføringÅrsak) {
            return {
                type: 'overføring',
                fom: periode.fom,
                tom: periode.tom,
                konto: notEmpty(periode.kontoType),
                årsak: periode.overføringÅrsak,
            };
        }
        if (periode.utsettelseÅrsak) {
            return {
                type: 'utsettelse',
                fom: periode.fom,
                tom: periode.tom,
                erArbeidstaker: false,
                morsAktivitetIPerioden: periode.morsAktivitet,
                årsak: midlertidigMappingAvUtsettelseÅrsak(periode.utsettelseÅrsak),
            };
        }
        return {
            type: 'uttak',
            fom: periode.fom,
            tom: periode.tom,
            gradering: periode.gradering
                ? {
                      erArbeidstaker: periode.gradering.aktivitet.type === 'ORDINÆRT_ARBEID',
                      erFrilanser: periode.gradering.aktivitet.type === 'FRILANS',
                      erSelvstendig: periode.gradering.aktivitet.type === 'SELVSTENDIG_NÆRINGSDRIVENDE',
                      orgnumre: periode.gradering.aktivitet.arbeidsgiver?.id
                          ? [periode.gradering.aktivitet.arbeidsgiver.id]
                          : [],
                      stillingsprosent: periode.gradering?.arbeidstidprosent,
                  }
                : undefined,
            konto: notEmpty(periode.kontoType),
            morsAktivitetIPerioden: periode.morsAktivitet,
            samtidigUttakProsent: periode.samtidigUttak,
            ønskerFlerbarnsdager: periode.flerbarnsdager,
            ønskerGradering: periode.gradering !== undefined,
            ønskerSamtidigUttak: periode.samtidigUttak !== undefined,
        };
    });
};

const midlertidigMappingAvOppholdÅrsak = (årsak: UttakOppholdÅrsak_fpoversikt): Oppholdsårsak => {
    switch (årsak) {
        case 'FEDREKVOTE_ANNEN_FORELDER':
            return 'UTTAK_FEDREKVOTE_ANNEN_FORELDER';
        case 'FELLESPERIODE_ANNEN_FORELDER':
            return 'UTTAK_FELLESP_ANNEN_FORELDER';
        case 'FORELDREPENGER_ANNEN_FORELDER':
            return 'UTTAK_FORELDREPENGER_ANNEN_FORELDER';
        case 'MØDREKVOTE_ANNEN_FORELDER':
            return 'UTTAK_MØDREKVOTE_ANNEN_FORELDER';
        default:
            throw new Error('Ukjent oppholdsårsak');
    }
};

const midlertidigMappingAvUtsettelseÅrsak = (årsak: UttakUtsettelseÅrsak_fpoversikt): UtsettelsesÅrsak => {
    switch (årsak) {
        case 'ARBEID':
            return 'ARBEID';
        case 'BARN_INNLAGT':
            return 'INSTITUSJONSOPPHOLD_BARNET';
        case 'FRI':
            return 'FRI';
        case 'HV_ØVELSE':
            return 'HV_OVELSE';
        case 'LOVBESTEMT_FERIE':
            return 'LOVBESTEMT_FERIE';
        case 'NAV_TILTAK':
            return 'NAV_TILTAK';
        case 'SØKER_INNLAGT':
            return 'INSTITUSJONSOPPHOLD_SØKER';
        case 'SØKER_SYKDOM':
            return 'SYKDOM';
        default:
            throw new Error('Ukjent utsettelsesårsak');
    }
};
