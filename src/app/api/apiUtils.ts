import { Søknad } from 'app/context/types/Søknad';
import AnnenForelder, { AnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import {
    Periode,
    UttaksperiodeBase,
    Periodetype,
    isForeldrepengerFørFødselUttaksperiode,
    isUttaksperiode,
    Arbeidsform,
    Utsettelsesperiode,
} from 'uttaksplan/types/Periode';
import Barn, { isAdoptertBarn, isAdoptertStebarn, isFødtBarn } from 'app/context/types/Barn';
import Søker from 'app/context/types/Søker';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { Situasjon } from 'app/types/Situasjon';
import { Søkerrolle } from 'app/types/Søkerrolle';
import { assertUnreachable } from 'app/utils/globalUtil';
import {
    isArrayOfAttachments,
    mapAttachmentsToSøknadForInnsending,
    removeAttachmentsWithUploadError,
    removeDuplicateAttachments,
} from 'app/utils/vedleggUtils';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { Forelder } from 'app/types/Forelder';
import { sorterPerioder } from 'app/steps/uttaksplan-info/utils/Periodene';
import { Attachment } from 'app/types/Attachment';
import { Tilleggsopplysninger } from 'app/context/types/Tilleggsopplysninger';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { andreAugust2022ReglerGjelder, førsteOktober2021ReglerGjelder } from 'app/utils/dateUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { uttaksperiodeKanJusteresVedFødsel } from 'app/utils/wlbUtils';
import { getTermindato } from 'app/utils/barnUtils';
import { AxiosError } from 'axios';
import * as Sentry from '@sentry/browser';
export interface AnnenForelderOppgittForInnsending
    extends Omit<AnnenForelder, 'erUfør' | 'harRettPåForeldrepengerINorge'> {
    harMorUføretrygd?: boolean;
    harRettPåForeldrepenger?: boolean;
}

export type AnnenForelderForInnsending = AnnenForelderIkkeOppgitt | AnnenForelderOppgittForInnsending;

export interface JusterbarPeriodeForInnsending {
    justeresVedFødsel?: boolean;
}

export type UttaksPeriodeForInnsending = Omit<UttaksperiodeBase, 'erMorForSyk'> & JusterbarPeriodeForInnsending;

export type PeriodeForInnsending = Exclude<Periode, 'Uttaksperiode'> | UttaksPeriodeForInnsending;

export type LocaleForInnsending = 'NB' | 'NN';

export type SøkerrolleInnsending = 'MOR' | 'FAR' | 'MEDMOR';

interface BarnPropsForAPI {
    adopsjonAvEktefellesBarn?: boolean;
}

export type BarnForInnsending = Omit<Barn, 'datoForAleneomsorg' | 'type'> & BarnPropsForAPI;

export interface SøkerForInnsending extends Omit<Søker, 'andreInntekterSiste10Mnd' | 'språkkode'> {
    språkkode: LocaleForInnsending;
    rolle: SøkerrolleInnsending;
}

export interface SøknadForInnsending
    extends Omit<
        Søknad,
        'barn' | 'annenForelder' | 'uttaksplan' | 'søker' | 'søkersituasjon' | 'tilleggsopplysninger'
    > {
    barn: BarnForInnsending;
    annenForelder: AnnenForelderForInnsending;
    uttaksplan: PeriodeForInnsending[];
    søker: SøkerForInnsending;
    situasjon: Situasjon;
    tilleggsopplysninger?: string;
}

export type EndringssøknadForInnsending = Pick<
    SøknadForInnsending,
    | 'type'
    | 'saksnummer'
    | 'erEndringssøknad'
    | 'uttaksplan'
    | 'vedlegg'
    | 'søker'
    | 'annenForelder'
    | 'barn'
    | 'dekningsgrad'
    | 'situasjon'
    | 'tilleggsopplysninger'
    | 'ønskerJustertUttakVedFødsel'
>;

export const FOR_MANGE_VEDLEGG_ERROR =
    'Søknaden kan ikke inneholde flere enn 40 vedlegg. Vennligst gå tilbake, slett noen vedlegg og prøv å sende inn søknaden på nytt. Du kan ettersende vedlegg senere.';

export const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ';

export const UKJENT_UUID = 'ukjent uuid';

const getUttaksperiodeForInnsending = (
    uttaksPeriode: UttaksperiodeBase,
    ønskerJustertUttakVedFødsel: boolean | undefined,
    termindato: Date | undefined
): UttaksPeriodeForInnsending => {
    const cleanedPeriode = changeGradertUttaksPeriode(cleanUttaksperiode(uttaksPeriode));
    if (uttaksperiodeKanJusteresVedFødsel(ønskerJustertUttakVedFødsel, termindato, uttaksPeriode.tidsperiode.fom)) {
        return { ...cleanedPeriode, justeresVedFødsel: true };
    }
    return cleanedPeriode;
};

const cleanUttaksperiode = (uttaksPeriode: UttaksperiodeBase): UttaksPeriodeForInnsending => {
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
        const { erUfør, erForSyk, harRettPåForeldrepengerINorge, harRettPåForeldrepengerIEØS, ...annenForelderRest } =
            annenForelder;
        const cleanedAnnenForelder =
            erEndringssøknad && annenForelder.harRettPåForeldrepengerINorge
                ? {
                      harMorUføretrygd: erUfør,
                      harRettPåForeldrepenger: harRettPåForeldrepengerINorge,
                      harAnnenForelderTilsvarendeRettEØS: harRettPåForeldrepengerIEØS,
                      erInformertOmSøknaden: true,
                      ...annenForelderRest,
                  }
                : {
                      harMorUføretrygd: erUfør,
                      harRettPåForeldrepenger: harRettPåForeldrepengerINorge,
                      harAnnenForelderTilsvarendeRettEØS: harRettPåForeldrepengerIEØS,
                      ...annenForelderRest,
                  };

        return cleanedAnnenForelder;
    }
    return annenForelder;
};

const cleanBarn = (barn: Barn): BarnForInnsending => {
    if (isFødtBarn(barn)) {
        const { datoForAleneomsorg, type, fnr, ...barnRest } = barn;

        return barnRest;
    }

    if (isAdoptertBarn(barn)) {
        const { datoForAleneomsorg, type, fnr, ...barnRest } = barn;
        return {
            adopsjonAvEktefellesBarn: isAdoptertStebarn(barn),
            ...barnRest,
        };
    }
    const { datoForAleneomsorg, type, ...barnRest } = barn;
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
            return assertUnreachable(rolle, 'Søkerrolle er ikke satt');
    }
};

const changeClientonlyKontotype = (
    periode: Periode,
    annenForelderHarRettPåForeldrepengerINorge: boolean,
    morErUfør: boolean,
    søkerErFarEllerMedmor: boolean,
    familiehendelsesdato: Date
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
    uttaksplan: Periode[],
    familiehendelsesdato: Date,
    søkerErFarEllerMedmor: boolean,
    ønskerJustertUttakVedFødsel: boolean | undefined,
    termindato: Date | undefined,
    annenForelder?: AnnenForelder,
    endringstidspunkt?: Date
): PeriodeForInnsending[] => {
    const cleanedUttaksplan = uttaksplan
        .filter((periode: Periode) => isValidTidsperiode(periode.tidsperiode))
        .filter(skalPeriodeSendesInn)
        .map((periode) =>
            annenForelder && isAnnenForelderOppgitt(annenForelder)
                ? changeClientonlyKontotype(
                      periode,
                      !!annenForelder.harRettPåForeldrepengerINorge,
                      !!annenForelder.erUfør,
                      søkerErFarEllerMedmor,
                      familiehendelsesdato
                  )
                : periode
        )
        .map((periode) =>
            periode.type === Periodetype.Uttak
                ? getUttaksperiodeForInnsending(periode, ønskerJustertUttakVedFødsel, termindato)
                : periode
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
        dayjs(tidspunkt).isBetween(periode.tidsperiode.fom, periode.tidsperiode.fom, 'day', '[]')
    );
};

export const getUttaksplanMedFriUtsettelsesperiode = (uttaksplan: Periode[], endringstidspunkt: Date): Periode[] => {
    const førstePeriodeEtterEndringstidspunkt = uttaksplan.find((periode) =>
        dayjs(periode.tidsperiode.fom).isAfter(endringstidspunkt, 'day')
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

export const cleanSøknad = (søknad: Søknad, familiehendelsesdato: Date): SøknadForInnsending => {
    const { søker, barn, annenForelder, søkersituasjon, tilleggsopplysninger, uttaksplan, ...rest } = søknad;
    const annenForelderInnsending = cleanAnnenForelder(annenForelder);
    const søkerInnsending = cleanSøker(søker, søknad.søkersituasjon);
    const barnInnsending = cleanBarn(barn);
    const søkerErFarEllerMedmor = isFarEllerMedmor(søknad.søkersituasjon.rolle);
    const termindato = getTermindato(søknad.barn);
    const uttaksplanInnsending = cleanUttaksplan(
        uttaksplan,
        familiehendelsesdato,
        søkerErFarEllerMedmor,
        søknad.ønskerJustertUttakVedFødsel,
        termindato,
        annenForelder
    );
    const tilleggsopplysningerInnsending = cleanTilleggsopplysninger(søknad.tilleggsopplysninger);
    const cleanedSøknad: SøknadForInnsending = {
        søker: søkerInnsending,
        barn: barnInnsending,
        situasjon: søknad.søkersituasjon.situasjon,
        annenForelder: annenForelderInnsending,
        uttaksplan: uttaksplanInnsending,
        tilleggsopplysninger: tilleggsopplysningerInnsending,
        ...rest,
    };

    removeDuplicateAttachments(cleanedSøknad.uttaksplan);

    return mapAttachmentsToSøknadForInnsending(cleanedSøknad) as SøknadForInnsending; //TODO vedleggForSenEndring
};

const cleanSøker = (søker: Søker, søkersituasjon: Søkersituasjon): SøkerForInnsending => {
    const cleanedSpråkkode = søker.språkkode === 'nb' ? 'NB' : 'NN';
    const rolle = konverterRolle(søkersituasjon.rolle);
    return {
        ...søker,
        rolle: rolle,
        språkkode: cleanedSpråkkode,
    };
};

export const getSøknadsdataForInnsending = (
    originalSøknad: Søknad,
    endringerIUttaksplan: Periode[],
    familiehendelsesdato: Date,
    endringstidspunkt?: Date
): SøknadForInnsending | EndringssøknadForInnsending => {
    const søknad: Søknad = JSON.parse(JSON.stringify(originalSøknad));
    if (søknad.erEndringssøknad) {
        return cleanEndringssøknad(
            søknad,
            endringerIUttaksplan,
            familiehendelsesdato,
            søknad.ønskerJustertUttakVedFødsel,
            endringstidspunkt
        );
    } else {
        return cleanSøknad(søknad, familiehendelsesdato);
    }
};

export const cleanAttachments = (object: any): Attachment[] => {
    const foundAttachments = [] as Attachment[];

    if (object === null || object === undefined) {
        return foundAttachments;
    }

    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                const attachmentWithoutUploadError = [...removeAttachmentsWithUploadError(object[key])];
                foundAttachments.push(...attachmentWithoutUploadError);
                object[key] = (object[key] as Attachment[])
                    .filter((attachment: Attachment) => attachmentWithoutUploadError.includes(attachment))
                    .map((attachment: Attachment) => attachment.id);
            } else {
                foundAttachments.push(...cleanAttachments(object[key]));
            }
        }
    });
    return foundAttachments;
};

export const cleanEndringssøknad = (
    søknad: Søknad,
    endringerIUttaksplan: Periode[],
    familiehendelsesdato: Date,
    ønskerJustertUttakVedFødsel: boolean | undefined,
    endringstidspunkt?: Date
): EndringssøknadForInnsending => {
    const søkerErFarEllerMedmor = isFarEllerMedmor(søknad.søkersituasjon.rolle);
    const termindato = getTermindato(søknad.barn);
    const cleanedSøknad: EndringssøknadForInnsending = {
        erEndringssøknad: true,
        saksnummer: søknad.saksnummer,
        type: søknad.type,
        uttaksplan: cleanUttaksplan(
            endringerIUttaksplan,
            familiehendelsesdato,
            søkerErFarEllerMedmor,
            ønskerJustertUttakVedFødsel,
            termindato,
            søknad.annenForelder,
            endringstidspunkt
        ),
        vedlegg: cleanAttachments({ søknad }), //TODO: cleanUpAttachments({ cleanedSøknad, vedleggForSenEndring: søknad.vedleggForSenEndring });
        søker: cleanSøker(søknad.søker, søknad.søkersituasjon),
        annenForelder: cleanAnnenForelder(søknad.annenForelder, true),
        barn: søknad.barn,
        dekningsgrad: søknad.dekningsgrad,
        situasjon: søknad.søkersituasjon.situasjon,
        tilleggsopplysninger: cleanTilleggsopplysninger(søknad.tilleggsopplysninger),
        ønskerJustertUttakVedFødsel: søknad.ønskerJustertUttakVedFødsel,
    };

    removeDuplicateAttachments(cleanedSøknad.uttaksplan);

    return mapAttachmentsToSøknadForInnsending(cleanedSøknad);
};

const cleanTilleggsopplysninger = (tilleggsopplysninger: Tilleggsopplysninger): string | undefined => {
    const tilleggsopplysningerTilSaksbehandler = tilleggsopplysninger.begrunnelseForSenEndring?.tekst;
    if (tilleggsopplysningerTilSaksbehandler !== undefined && tilleggsopplysningerTilSaksbehandler.length > 0) {
        return tilleggsopplysningerTilSaksbehandler;
    }
    return undefined;
};

export const sendErrorMessageToSentry = (error: AxiosError<any>) => {
    const errorCallId = getErrorCallId(error) + '. ';
    const errorTimestamp = getErrorTimestamp(error) + '. ';
    const hideNumbersAndTrim = (tekst: string): string => {
        return tekst.replace(/[0-9]/g, '*').slice(0, 250) + '...';
    };

    let errorString = errorCallId + errorTimestamp;
    if (error.request && error.request.data && error.request.data.messages) {
        errorString = errorString + hideNumbersAndTrim(error.request.data.messages);
    } else if (error.response && error.response.data && error.response.data.messages) {
        errorString = errorString + hideNumbersAndTrim(error.response.data.messages);
    }
    if (error.message) {
        errorString = errorString + error.message;
    }
    Sentry.captureMessage(errorString);
};

export const getErrorCallId = (error: AxiosError<any>): string => {
    return error.response && error.response.data && error.response.data.uuid ? error.response.data.uuid : UKJENT_UUID;
};

export const getErrorTimestamp = (error: AxiosError<any>): string => {
    return error.response && error.response.data && error.response.data.timestamp ? error.response.data.timestamp : '';
};
