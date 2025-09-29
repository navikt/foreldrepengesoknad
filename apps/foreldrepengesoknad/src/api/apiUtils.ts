import { ContextDataMap, ContextDataType } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { toNumber } from 'lodash';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { VedleggDataType } from 'types/VedleggDataType';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';

import {
    AnnenForelder,
    AnnenForelderOppgitt,
    Arbeidsform,
    Barn,
    MorsAktivitet,
    Periode,
    Periodetype,
    StønadskontoType,
    Søkerrolle,
    UtsettelseÅrsakType,
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
    AdopsjonDto,
    Attachment,
    BrukerRolle,
    EndringssøknadForeldrepengerDto,
    ForeldrepengesøknadDto,
    FødselDto,
    KontoType,
    Målform,
    NorskForelderDto,
    OppholdsPeriodeDto,
    OverføringsPeriodeDto,
    TerminDto,
    UtenlandskForelderDto,
    UtsettelsesPeriodeDto,
    UttaksPeriodeDto,
    UttaksplanDto,
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

export type UttaksplanPeriode = UttaksPeriodeDto | OverføringsPeriodeDto | OppholdsPeriodeDto | UtsettelsesPeriodeDto;

export const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

export const UKJENT_UUID = 'ukjent uuid';

const hentValgtSpråk = (): Målform => {
    return getDecoratorLanguageCookie('decorator-language').toUpperCase() as Målform;
};

const getUttaksperiodeForInnsending = (uttaksperiodeBase: UttaksperiodeBase): UttaksPeriodeDto => {
    const uttaksperiode = {
        type: 'uttak' as const,
        fom: dateToISOString(uttaksperiodeBase.tidsperiode.fom),
        tom: dateToISOString(uttaksperiodeBase.tidsperiode.tom),
        konto: uttaksperiodeBase.konto as KontoType,
        morsAktivitetIPerioden: uttaksperiodeBase.morsAktivitetIPerioden,
        ønskerSamtidigUttak: uttaksperiodeBase.ønskerSamtidigUttak,
        samtidigUttakProsent: toNumber(uttaksperiodeBase.samtidigUttakProsent) || undefined,
        ønskerFlerbarnsdager: uttaksperiodeBase.ønskerFlerbarnsdager,
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

const cleanBarn = (barn: Barn): AdopsjonDto | FødselDto | TerminDto => {
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
            fødselsdato: barn.fødselsdatoer[0],
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

    throw Error('Det er feil i data om barnet');
};

const konverterRolle = (rolle: Søkerrolle): BrukerRolle => {
    return rolle.toUpperCase() as BrukerRolle;
};

const changeClientonlyKontotype = (
    periode: Periode,
    annenForelderHarRettPåForeldrepengerINorge: boolean,
    morErUfør: boolean,
    søkerErFarEllerMedmor: boolean,
    familiehendelsesdato: string,
) => {
    if (isUttaksperiode(periode)) {
        if (periode.konto === StønadskontoType.Flerbarnsdager) {
            periode.konto = !annenForelderHarRettPåForeldrepengerINorge
                ? StønadskontoType.Foreldrepenger
                : StønadskontoType.Fellesperiode;
        }
        if (periode.konto === StønadskontoType.AktivitetsfriKvote) {
            periode.konto = StønadskontoType.Foreldrepenger;
            if (
                søkerErFarEllerMedmor &&
                !annenForelderHarRettPåForeldrepengerINorge &&
                andreAugust2022ReglerGjelder(familiehendelsesdato)
            ) {
                periode.morsAktivitetIPerioden = MorsAktivitet.IkkeOppgitt;
            } else if (morErUfør) {
                periode.morsAktivitetIPerioden = MorsAktivitet.Uføre;
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

const getPeriodeForInnsending = (periode: any): OverføringsPeriodeDto | OppholdsPeriodeDto | UtsettelsesPeriodeDto => {
    const { tidsperiode, ...periodeRest } = periode;
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
    uttaksplan: UttaksplanPeriode[],
    tidspunkt: Date,
): UttaksplanPeriode | undefined => {
    return uttaksplan.find((periode) => dayjs(tidspunkt).isBetween(periode.fom, periode.tom, 'day', '[]'));
};

export const getUttaksplanMedFriUtsettelsesperiode = (
    uttaksplan: UttaksplanPeriode[],
    endringstidspunkt: Date,
): UttaksplanPeriode[] => {
    const førstePeriodeEtterEndringstidspunkt = uttaksplan.find((periode) =>
        dayjs(periode.fom).isAfter(endringstidspunkt, 'day'),
    );
    const endringsTidspunktPeriodeTom = førstePeriodeEtterEndringstidspunkt
        ? Uttaksdagen(dayjs(førstePeriodeEtterEndringstidspunkt.fom).toDate()).forrige()
        : endringstidspunkt;

    const endringsTidspunktPeriode: UtsettelsesPeriodeDto = {
        type: Periodetype.Utsettelse,
        årsak: UtsettelseÅrsakType.Fri,
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

const cleanAnnenforelder = (
    annenForelder: AnnenForelder | undefined,
): UtenlandskForelderDto | NorskForelderDto | undefined => {
    if (annenForelder === undefined || isAnnenForelderIkkeOppgitt(annenForelder)) {
        return;
    }

    const oppgitt = annenForelder as AnnenForelderOppgitt;

    const harRettPåForeldrepenger = !!oppgitt.harRettPåForeldrepengerINorge;
    /*
     Hvis bruker har svart på spørsmålet om annenForelder er informert så bruker vi det.
     Men i tilfelle endringssøknad så finnes ikke dette spørsmålet eksplisitt (det finnes implisitt i en checkbox for å kunne sende).
     I de tilfellene sier vi ja hvis annen forelder har rett i Norge.
    */
    const erInformertOmSøknaden = (() => {
        if (oppgitt.erInformertOmSøknaden === undefined) {
            return harRettPåForeldrepenger ? true : undefined;
        }
        return oppgitt.erInformertOmSøknaden;
    })();

    const baseData = {
        fnr: oppgitt.fnr,
        fornavn: oppgitt.fornavn,
        etternavn: oppgitt.etternavn,
        rettigheter: {
            harRettPåForeldrepenger,
            erInformertOmSøknaden,
            erAleneOmOmsorg: oppgitt.erAleneOmOmsorg,
            harMorUføretrygd: oppgitt.erMorUfør,
            harAnnenForelderOppholdtSegIEØS: oppgitt.harOppholdtSegIEØS,
            harAnnenForelderTilsvarendeRettEØS:
                // Bevarer logikken fra steget og gammel oppførsel her siden harRettPåForeldrepengerIEØS defaulter til false mange plasser
                oppgitt.harRettPåForeldrepengerINorge !== false || oppgitt.harOppholdtSegIEØS !== true
                    ? undefined
                    : oppgitt.harRettPåForeldrepengerIEØS,
        },
    };
    return oppgitt.utenlandskFnr
        ? { type: 'utenlandsk', ...baseData, bostedsland: oppgitt.bostedsland ?? 'UNDEFINED' }
        : { type: 'norsk', ...baseData };
};

export const getSøknadsdataForInnsending = (
    erEndringssøknad: boolean,
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    endringerIUttaksplan: Periode[],
    familiehendelsesdato: string,
    endringstidspunkt?: Date,
): ForeldrepengesøknadDto | EndringssøknadForeldrepengerDto => {
    if (erEndringssøknad) {
        return cleanEndringssøknad(hentData, endringerIUttaksplan, familiehendelsesdato, endringstidspunkt);
    } else {
        return cleanSøknad(hentData, familiehendelsesdato);
    }
};

export const cleanSøknad = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    familiehendelsesdato: string,
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

export const cleanEndringssøknad = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    endringerIUttaksplan: Periode[],
    familiehendelsesdato: string,
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
