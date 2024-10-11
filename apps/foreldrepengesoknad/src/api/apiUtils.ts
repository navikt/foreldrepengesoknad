import { ContextDataMap, ContextDataType } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { toNumber } from 'lodash';
import { AndreInntektskilder, AnnenInntektType } from 'types/AndreInntektskilder';
import { AnnenInntekt } from 'types/AnnenInntekt';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { Næring } from 'types/Næring';
import { EndringssøknadForInnsending, SøknadForInnsending } from 'types/Søknad';
import { VedleggDataType } from 'types/VedleggDataType';
import { getTermindato } from 'utils/barnUtils';
import { guid } from 'utils/guid';
import isFarEllerMedmor from 'utils/isFarEllerMedmor';

import {
    AnnenForelder,
    AnnenForelderIkkeOppgitt,
    Arbeidsform,
    Barn,
    Forelder,
    MorsAktivitet,
    Periode,
    Periodetype,
    StønadskontoType,
    Søkerrolle,
    Søkersituasjon,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    UttaksperiodeBase,
    isAdoptertBarn,
    isAdoptertStebarn,
    isAnnenForelderOppgitt,
    isForeldrepengerFørFødselUttaksperiode,
    isFødtBarn,
    isUttaksperiode,
} from '@navikt/fp-common';
import { mapUtenlandsOppholdForInnsending } from '@navikt/fp-steg-utenlandsopphold';
import { ArbeidsforholdOgInntektFp, Attachment, EgenNæring, Frilans, LocaleNo } from '@navikt/fp-types';
import { Uttaksdagen, isValidTidsperiode } from '@navikt/fp-utils';
import {
    andreAugust2022ReglerGjelder,
    førsteOktober2021ReglerGjelder,
    sorterPerioder,
    uttaksperiodeKanJusteresVedFødsel,
} from '@navikt/fp-uttaksplan';
import { assertUnreachable, notEmpty } from '@navikt/fp-validation';

export interface AnnenForelderOppgittForInnsending
    extends Omit<
        AnnenForelder,
        'erMorUfør' | 'harRettPåForeldrepengerINorge' | 'harOppholdtSegIEØS' | 'harRettPåForeldrepengerIEØS'
    > {
    harMorUføretrygd?: boolean;
    harRettPåForeldrepenger?: boolean;
    harAnnenForelderOppholdtSegIEØS?: boolean;
    harAnnenForelderTilsvarendeRettEØS?: boolean;
}

export type AnnenForelderForInnsending = AnnenForelderIkkeOppgitt | AnnenForelderOppgittForInnsending;

export interface JusterbarPeriodeForInnsending {
    justeresVedFødsel?: boolean;
}

export type UttaksPeriodeForInnsending = Omit<UttaksperiodeBase, 'erMorForSyk'> & JusterbarPeriodeForInnsending;

export type PeriodeForInnsending = Exclude<Periode, 'Uttaksperiode'> | UttaksPeriodeForInnsending;

export type LocaleForInnsending = 'NB' | 'NN' | 'nb' | 'nn';

export type SøkerrolleInnsending = 'MOR' | 'FAR' | 'MEDMOR';

interface BarnPropsForAPI {
    adopsjonAvEktefellesBarn?: boolean;
}

export type BarnForInnsending = Omit<Barn, 'datoForAleneomsorg' | 'type'> & BarnPropsForAPI;

export interface SøkerForInnsending {
    erAleneOmOmsorg: boolean;
    språkkode: LocaleForInnsending;
    rolle: SøkerrolleInnsending;
    selvstendigNæringsdrivendeInformasjon?: Næring[];
    frilansInformasjon?: Frilans;
    andreInntekterSiste10Mnd?: AnnenInntekt[];
}

export const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

export const UKJENT_UUID = 'ukjent uuid';

const getUttaksperiodeForInnsending = (
    uttaksPeriode: UttaksperiodeBase,
    ønskerJustertUttakVedFødsel: boolean | undefined,
    termindato: string | undefined,
): UttaksPeriodeForInnsending => {
    const cleanedPeriode = changeGradertUttaksPeriode(cleanUttaksperiode(uttaksPeriode));
    if (uttaksperiodeKanJusteresVedFødsel(ønskerJustertUttakVedFødsel, termindato, uttaksPeriode.tidsperiode.fom)) {
        return { ...cleanedPeriode, justeresVedFødsel: true };
    }
    return cleanedPeriode;
};

const cleanUttaksperiode = (uttaksPeriode: UttaksperiodeBase): UttaksPeriodeForInnsending => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { erMorForSyk, ...periodeRest } = uttaksPeriode;
    return periodeRest;
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

const cleanAnnenForelder = (annenForelder: AnnenForelder, erEndringssøknad = false): AnnenForelderForInnsending => {
    if (isAnnenForelderOppgitt(annenForelder)) {
        const {
            erMorUfør,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            erForSyk,
            harRettPåForeldrepengerINorge,
            harRettPåForeldrepengerIEØS,
            harOppholdtSegIEØS,
            ...annenForelderRest
        } = annenForelder;
        const cleanedAnnenForelder = {
            harMorUføretrygd: erMorUfør,
            harRettPåForeldrepenger: harRettPåForeldrepengerINorge,
            ...annenForelderRest,
        };
        if (harRettPåForeldrepengerINorge) {
            return { ...cleanedAnnenForelder, erInformertOmSøknaden: true } as AnnenForelderOppgittForInnsending;
        }
        if (harOppholdtSegIEØS) {
            return {
                ...cleanedAnnenForelder,
                harAnnenForelderOppholdtSegIEØS: harOppholdtSegIEØS,
                harAnnenForelderTilsvarendeRettEØS: harRettPåForeldrepengerIEØS,
            };
        } else if (erEndringssøknad) {
            return { ...cleanedAnnenForelder, harAnnenForelderTilsvarendeRettEØS: harRettPåForeldrepengerIEØS };
        } else {
            return { ...cleanedAnnenForelder, harAnnenForelderOppholdtSegIEØS: harOppholdtSegIEØS };
        }
    }
    return annenForelder;
};

const cleanBarn = (barn: Barn): BarnForInnsending => {
    if (isFødtBarn(barn)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type, fnr, ...barnRest } = barn;
        return barnRest;
    }

    if (isAdoptertBarn(barn)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type, fnr, ...barnRest } = barn;
        return {
            adopsjonAvEktefellesBarn: isAdoptertStebarn(barn),
            ...barnRest,
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...barnRest } = barn;
    return barnRest;
};

const konverterRolle = (rolle: Søkerrolle): SøkerrolleInnsending => {
    switch (rolle) {
        case 'mor':
            return 'MOR';
        case 'far':
            return 'FAR';
        case 'medmor':
            return 'MEDMOR';
        default:
            return assertUnreachable('Søkerrolle er ikke satt');
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

const changeGradertUttaksPeriode = (periode: UttaksPeriodeForInnsending): UttaksPeriodeForInnsending => {
    if (periode.gradert) {
        return { ...periode, ...getArbeidstakerFrilansSN(periode.arbeidsformer) };
    }
    return periode;
};

const cleanUttaksplan = (
    plan: Periode[],
    familiehendelsesdato: string,
    søkerErFarEllerMedmor: boolean,
    ønskerJustertUttakVedFødsel: boolean | undefined,
    termindato: string | undefined,
    annenForelder?: AnnenForelder,
    endringstidspunkt?: Date,
): PeriodeForInnsending[] => {
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
                ? getUttaksperiodeForInnsending(periode, ønskerJustertUttakVedFødsel, termindato)
                : periode,
        );

    if (endringstidspunkt && førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        const periodeVedEndringstidspunkt = getPeriodeVedTidspunkt(cleanedUttaksplan, endringstidspunkt);

        if (!periodeVedEndringstidspunkt) {
            return getUttaksplanMedFriUtsettelsesperiode(cleanedUttaksplan, endringstidspunkt);
        }
    }

    return cleanedUttaksplan;
};

export const getPeriodeVedTidspunkt = (uttaksplan: Periode[], tidspunkt: Date): Periode | undefined => {
    return uttaksplan.find((periode) =>
        dayjs(tidspunkt).isBetween(periode.tidsperiode.fom, periode.tidsperiode.tom, 'day', '[]'),
    );
};

export const getUttaksplanMedFriUtsettelsesperiode = (uttaksplan: Periode[], endringstidspunkt: Date): Periode[] => {
    const førstePeriodeEtterEndringstidspunkt = uttaksplan.find((periode) =>
        dayjs(periode.tidsperiode.fom).isAfter(endringstidspunkt, 'day'),
    );

    const endringsTidspunktPeriodeTom = førstePeriodeEtterEndringstidspunkt
        ? Uttaksdagen(førstePeriodeEtterEndringstidspunkt.tidsperiode.fom).forrige()
        : endringstidspunkt;

    const endringsTidspunktPeriode: Utsettelsesperiode = {
        type: Periodetype.Utsettelse,
        årsak: UtsettelseÅrsakType.Fri,
        id: guid(),
        tidsperiode: {
            fom: endringstidspunkt,
            tom: endringsTidspunktPeriodeTom,
        },
        erArbeidstaker: false,
        forelder: Forelder.farMedmor,
    };

    uttaksplan.push(endringsTidspunktPeriode);

    uttaksplan.sort(sorterPerioder);

    return uttaksplan;
};

export const convertAttachmentsMapToArray = (vedlegg: VedleggDataType | undefined): Attachment[] => {
    if (!vedlegg) {
        return [];
    }

    const vedleggArray: Attachment[] = [];

    Object.keys(vedlegg).forEach((key: unknown) => {
        const vedleggAvTypeSkjemanummer = vedlegg[key as GyldigeSkjemanummer];

        if (vedleggAvTypeSkjemanummer && vedleggAvTypeSkjemanummer.length > 0) {
            vedleggArray.push(...vedleggAvTypeSkjemanummer);
        }
    });

    return vedleggArray;
};

export const cleanSøknad = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    familiehendelsesdato: string,
    locale: LocaleNo,
): SøknadForInnsending => {
    const annenForelder = notEmpty(hentData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const arbeidsforholdOgInntekt = notEmpty(hentData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const frilans = hentData(ContextDataType.FRILANS);
    const egenNæring = hentData(ContextDataType.EGEN_NÆRING);
    const andreInntektskilder = hentData(ContextDataType.ANDRE_INNTEKTSKILDER);
    const søkersituasjon = notEmpty(hentData(ContextDataType.SØKERSITUASJON));
    const utenlandsopphold = notEmpty(hentData(ContextDataType.UTENLANDSOPPHOLD));
    const utenlandsoppholdNeste12Mnd = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const utenlandsoppholdSiste12Mnd = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const dekningsgrad = notEmpty(hentData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const uttaksplan = notEmpty(hentData(ContextDataType.UTTAKSPLAN));
    const uttaksplanMetadata = notEmpty(hentData(ContextDataType.UTTAKSPLAN_METADATA));
    const eksisterendeSak = hentData(ContextDataType.EKSISTERENDE_SAK);
    const vedlegg = hentData(ContextDataType.VEDLEGG);

    const annenForelderInnsending = cleanAnnenForelder(annenForelder);
    const søkerInnsending = cleanSøker(
        søkersituasjon,
        locale,
        annenForelder,
        arbeidsforholdOgInntekt,
        frilans,
        egenNæring,
        andreInntektskilder,
    );
    const barnInnsending = cleanBarn(barn);
    const søkerErFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const termindato = getTermindato(barn);
    const uttaksplanInnsending = cleanUttaksplan(
        uttaksplan,
        familiehendelsesdato,
        søkerErFarEllerMedmor,
        uttaksplanMetadata.ønskerJustertUttakVedFødsel,
        termindato,
        annenForelder,
    );

    return {
        type: 'foreldrepenger',
        harGodkjentVilkår: true,
        saksnummer: eksisterendeSak?.saksnummer,
        erEndringssøknad: false,
        søker: søkerInnsending,
        barn: barnInnsending,
        situasjon: søkersituasjon.situasjon,
        annenForelder: annenForelderInnsending,
        uttaksplan: uttaksplanInnsending,
        informasjonOmUtenlandsopphold: mapUtenlandsOppholdForInnsending(
            utenlandsopphold,
            utenlandsoppholdNeste12Mnd,
            utenlandsoppholdSiste12Mnd,
        ),
        dekningsgrad,
        ønskerJustertUttakVedFødsel: uttaksplanMetadata.ønskerJustertUttakVedFødsel,
        vedlegg: convertAttachmentsMapToArray(vedlegg),
    };
};

const cleanSøker = (
    søkersituasjon: Søkersituasjon,
    locale: LocaleNo,
    annenForelder: AnnenForelder,
    arbeidsforholdOgInntekt?: ArbeidsforholdOgInntektFp,
    frilans?: Frilans,
    egenNæring?: EgenNæring,
    andreInntektskilder?: AndreInntektskilder[],
): SøkerForInnsending => {
    const rolle = konverterRolle(søkersituasjon.rolle);
    const erOppgitt = isAnnenForelderOppgitt(annenForelder);

    const common = {
        rolle: rolle,
        språkkode: locale,
        erAleneOmOmsorg: erOppgitt ? annenForelder.erAleneOmOmsorg : true,
    };

    if (
        arbeidsforholdOgInntekt?.harJobbetSomFrilans ||
        arbeidsforholdOgInntekt?.harHattAndreInntektskilder ||
        arbeidsforholdOgInntekt?.harJobbetSomSelvstendigNæringsdrivende
    ) {
        return {
            ...common,
            andreInntekterSiste10Mnd: andreInntektskilder?.map((i) => ({
                ...i,
                tidsperiode: {
                    fom: i.fom,
                    tom: i.tom,
                    pågående: i.type === AnnenInntektType.SLUTTPAKKE ? false : i.pågående,
                },
                pågående: i.type === AnnenInntektType.SLUTTPAKKE ? false : i.pågående,
            })),
            frilansInformasjon: frilans,
            selvstendigNæringsdrivendeInformasjon: egenNæring
                ? [
                      {
                          næringstyper: [egenNæring.næringstype],
                          tidsperiode: {
                              fom: egenNæring.fom,
                              tom: egenNæring.tom,
                          },
                          navnPåNæringen: egenNæring.navnPåNæringen!,
                          endringAvNæringsinntektInformasjon:
                              egenNæring.hattVarigEndringAvNæringsinntektSiste4Kalenderår
                                  ? {
                                        dato: egenNæring.varigEndringDato!,
                                        næringsinntektEtterEndring: toNumber(
                                            egenNæring.varigEndringInntektEtterEndring!,
                                        ),
                                        forklaring: egenNæring.varigEndringBeskrivelse!,
                                    }
                                  : undefined,
                          ...egenNæring,
                      },
                  ]
                : [],
        };
    }
    return { ...common, andreInntekterSiste10Mnd: [], selvstendigNæringsdrivendeInformasjon: [] };
};

export const getSøknadsdataForInnsending = (
    erEndringssøknad: boolean,
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    endringerIUttaksplan: Periode[],
    familiehendelsesdato: string,
    locale: LocaleNo,
    endringstidspunkt?: Date,
): SøknadForInnsending | EndringssøknadForInnsending => {
    if (erEndringssøknad) {
        return cleanEndringssøknad(hentData, endringerIUttaksplan, familiehendelsesdato, locale, endringstidspunkt);
    } else {
        return cleanSøknad(hentData, familiehendelsesdato, locale);
    }
};

export const cleanEndringssøknad = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    endringerIUttaksplan: Periode[],
    familiehendelsesdato: string,
    locale: LocaleNo,
    endringstidspunkt?: Date,
): EndringssøknadForInnsending => {
    const uttaksplanMetadata = notEmpty(hentData(ContextDataType.UTTAKSPLAN_METADATA));
    const annenForelder = notEmpty(hentData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const arbeidsforholdOgInntekt = hentData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const frilans = hentData(ContextDataType.FRILANS);
    const egenNæring = hentData(ContextDataType.EGEN_NÆRING);
    const andreInntektskilder = hentData(ContextDataType.ANDRE_INNTEKTSKILDER);
    const dekningsgrad = notEmpty(hentData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const søkersituasjon = notEmpty(hentData(ContextDataType.SØKERSITUASJON));
    const eksisterendeSak = notEmpty(hentData(ContextDataType.EKSISTERENDE_SAK));
    const søkerErFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const termindato = getTermindato(barn);
    const vedlegg = hentData(ContextDataType.VEDLEGG);

    const cleanedSøknad: EndringssøknadForInnsending = {
        type: 'foreldrepenger',
        erEndringssøknad: true,
        saksnummer: eksisterendeSak.saksnummer,
        uttaksplan: cleanUttaksplan(
            endringerIUttaksplan,
            familiehendelsesdato,
            søkerErFarEllerMedmor,
            uttaksplanMetadata.ønskerJustertUttakVedFødsel,
            termindato,
            annenForelder,
            endringstidspunkt,
        ),
        søker: cleanSøker(
            søkersituasjon,
            locale,
            annenForelder,
            arbeidsforholdOgInntekt,
            frilans,
            egenNæring,
            andreInntektskilder,
        ),
        annenForelder: cleanAnnenForelder(annenForelder, true),
        barn,
        dekningsgrad,
        situasjon: søkersituasjon.situasjon,
        ønskerJustertUttakVedFødsel: uttaksplanMetadata.ønskerJustertUttakVedFødsel,
        vedlegg: convertAttachmentsMapToArray(vedlegg),
    };

    return cleanedSøknad;
};
