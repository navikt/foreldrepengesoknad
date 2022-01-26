import Søknad, {
    SøknadForInnsending,
    Søkersituasjon,
    EnkelEndringssøknadForInnsending,
    Tilleggsopplysninger,
} from '../../types/søknad/Søknad';
import { Attachment, InnsendingsType } from 'app/components/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'app/components/storage/attachment/components/util';
import {
    Periode,
    isUttaksperiode,
    StønadskontoType,
    Periodetype,
    Arbeidsform,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
} from '../../types/uttaksplan/periodetyper';
import { isValidTidsperiode } from '../uttaksplan/Tidsperioden';
import { Barn, BarnInnsending } from '../../types/søknad/Barn';
import { cleanupBarn } from '../barnUtils';
import AnnenForelder from 'app/types/søknad/AnnenForelder';
import Søker, { SøkerInnsending } from 'app/types/søknad/Søker';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { isISODateString } from 'nav-datovelger';
import { NæringInnsending } from 'app/types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { guid } from 'nav-frontend-js-utils';
import { Forelder } from 'common/types';
import { sorterPerioder } from '../uttaksplan/Periodene';
import moment from 'moment';
import { Uttaksdagen } from '../uttaksplan/Uttaksdagen';
import { førsteOktober2021ReglerGjelder } from '../dates/dates';

export const isArrayOfAttachments = (object: any) => {
    return (
        Array.isArray(object) &&
        object[0] !== null &&
        object.some(
            (element) => element && (element.filename || element.innsendingsType === InnsendingsType.SEND_SENERE)
        )
    );
};

export const removeAttachmentsWithUploadError = (attachments: Attachment[]) =>
    attachments.filter((a: Attachment) => !isAttachmentWithError(a));

export const cleanUpAttachments = (object: any): Attachment[] => {
    const foundAttachments = [] as Attachment[];
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                const attachmentWithoutUploadError = [...removeAttachmentsWithUploadError(object[key])];
                foundAttachments.push(...attachmentWithoutUploadError);
                object[key] = (object[key] as Attachment[])
                    .filter((attachment: Attachment) => attachmentWithoutUploadError.includes(attachment))
                    .map((attachment: Attachment) => attachment.id);
            } else {
                foundAttachments.push(...cleanUpAttachments(object[key]));
            }
        }
    });
    return foundAttachments;
};

const changeClientonlyKontotype = (periode: Periode, andreForelderHarRettPåForeldrepenger: boolean) => {
    if (isUttaksperiode(periode)) {
        if (periode.konto === StønadskontoType.Flerbarnsdager) {
            periode.konto = !andreForelderHarRettPåForeldrepenger
                ? StønadskontoType.Foreldrepenger
                : StønadskontoType.Fellesperiode;
        }

        if (periode.konto === StønadskontoType.AktivitetsfriKvote) {
            periode.konto = StønadskontoType.Foreldrepenger;
        }
    }

    return periode;
};

export const removePeriodetypeHullFromUttaksplan = (uttaksplan: Periode[]): Periode[] => {
    return uttaksplan.filter(isNotPeriodetypeHull);
};

export const isNotPeriodetypeHull = (periode: Periode): boolean => {
    return periode.type !== Periodetype.Hull;
};

export const isNotPeriodetypeInfo = (periode: Periode): boolean => {
    return periode.type !== Periodetype.Info;
};

export const isNotPeriodeUtenUttak = (periode: Periode): boolean => {
    return periode.type !== Periodetype.PeriodeUtenUttak;
};

export const removeDuplicateAttachments = (uttaksplan: Periode[]) => {
    uttaksplan.forEach((p1: Periode) => {
        if (p1.vedlegg) {
            const vedleggIdRefs = p1.vedlegg.map((a: Attachment) => a.id);
            uttaksplan.forEach((p2) => {
                if (p1 !== p2 && p1.vedlegg && p2.vedlegg) {
                    p2.vedlegg.forEach((a2) => {
                        if (vedleggIdRefs.includes(a2.id)) {
                            p2.vedlegg!.splice(p2.vedlegg!.indexOf(a2), 1);
                        }
                    });
                }
            });
        }
    });
};

export const skalPeriodeSendesInn = (periode: Periode) => {
    return isNotPeriodetypeHull(periode) && isNotPeriodetypeInfo(periode) && isNotPeriodeUtenUttak(periode);
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

const changeGradertPeriode = (periode: Periode) => {
    if (isUttaksperiode(periode) && periode.gradert) {
        return { ...periode, ...getArbeidstakerFrilansSN(periode.arbeidsformer) };
    }
    return periode;
};
const ensureNoNullItemsInFødselsdatoer = (barn: BarnInnsending, situasjon: Søkersituasjon): BarnInnsending => {
    const cleanedBarn = cleanupBarn(barn, situasjon);
    return (cleanedBarn as BarnInnsending) || barn;
};

export const getPeriodeVedTidspunkt = (uttaksplan: Periode[], tidspunkt: Date): Periode | undefined => {
    return uttaksplan.find((periode) =>
        moment(tidspunkt).isBetween(periode.tidsperiode.fom, periode.tidsperiode.fom, 'day', '[]')
    );
};

export const getUttaksplanMedFriUtsettelsesperiode = (uttaksplan: Periode[], endringstidspunkt: Date): Periode[] => {
    const førstePeriodeEtterEndringstidspunkt = uttaksplan.find((periode) =>
        moment(periode.tidsperiode.fom).isAfter(endringstidspunkt)
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

const cleanupUttaksplan = (
    uttaksplan: Periode[],
    familiehendelsesdato: Date,
    annenForelder?: AnnenForelder,
    endringstidspunkt?: Date
): Periode[] => {
    const cleanedUttaksplan = uttaksplan
        .filter((periode: Periode) => isValidTidsperiode(periode.tidsperiode))
        .filter(skalPeriodeSendesInn)
        .map((periode) =>
            annenForelder ? changeClientonlyKontotype(periode, annenForelder.harRettPåForeldrepenger) : periode
        )
        .map(changeGradertPeriode);

    if (endringstidspunkt && førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        const periodeVedEndringstidspunkt = getPeriodeVedTidspunkt(cleanedUttaksplan, endringstidspunkt);

        if (!periodeVedEndringstidspunkt) {
            return getUttaksplanMedFriUtsettelsesperiode(cleanedUttaksplan, endringstidspunkt);
        }
    }

    return cleanedUttaksplan;
};

const cleanupTilleggsopplysninger = (tilleggsopplysninger: Tilleggsopplysninger): string | undefined => {
    const tilleggsopplysningerTilSaksbehandler = tilleggsopplysninger.begrunnelseForSenEndring?.tekst;
    if (tilleggsopplysningerTilSaksbehandler !== undefined && tilleggsopplysningerTilSaksbehandler.length > 0) {
        return tilleggsopplysningerTilSaksbehandler;
    }
    return undefined;
};

const konverterStringDatoerIObjektTilDate = <T, U>(input: T): U => {
    const inputJSON = JSON.stringify(input);

    return JSON.parse(inputJSON, (_key, value) => {
        if (isISODateString(value)) {
            return ISOStringToDate(value);
        }

        return value;
    });
};

const cleanupNæring = (næringsinformasjon: NæringInnsending): NæringInnsending => {
    return næringsinformasjon.næringsinntekt
        ? {
              ...næringsinformasjon,
              næringsinntekt: Number(næringsinformasjon.næringsinntekt),
          }
        : {
              ...næringsinformasjon,
          };
};

const cleanupSøker = (søker: Søker) => {
    const søkerWithDates = konverterStringDatoerIObjektTilDate<Søker, SøkerInnsending>(søker);
    const cleanedNæring = søkerWithDates.selvstendigNæringsdrivendeInformasjon
        ? søkerWithDates.selvstendigNæringsdrivendeInformasjon.map(cleanupNæring)
        : undefined;

    return cleanedNæring
        ? { ...søkerWithDates, selvstendigNæringsdrivendeInformasjon: cleanedNæring }
        : { ...søkerWithDates };
};

export const cleanUpSøknad = (søknad: Søknad, familiehendelsesdato: Date): SøknadForInnsending => {
    const {
        ekstrainfo,
        sensitivInfoIkkeLagre,
        vedleggForSenEndring,
        tilleggsopplysninger,
        søker,
        barn,
        ...rest
    } = søknad;
    const søkerInnsending = cleanupSøker(søker);
    const barnInnsending = konverterStringDatoerIObjektTilDate<Barn, BarnInnsending>(barn);
    const cleanedSøknad: SøknadForInnsending = { søker: søkerInnsending, barn: barnInnsending, ...rest };

    cleanedSøknad.barn = ensureNoNullItemsInFødselsdatoer(cleanedSøknad.barn, søknad.situasjon);
    cleanedSøknad.uttaksplan = cleanupUttaksplan(cleanedSøknad.uttaksplan, familiehendelsesdato, søknad.annenForelder);
    removeDuplicateAttachments(cleanedSøknad.uttaksplan);
    cleanedSøknad.vedlegg = cleanUpAttachments({ cleanedSøknad, vedleggForSenEndring });
    cleanedSøknad.tilleggsopplysninger = cleanupTilleggsopplysninger(søknad.tilleggsopplysninger);

    return cleanedSøknad;
};

export const cleanEnkelEndringssøknad = (
    søknad: Søknad,
    endringerIUttaksplan: Periode[],
    familiehendelsesdato: Date,
    endringstidspunkt?: Date
): EnkelEndringssøknadForInnsending => {
    const cleanedSøknad: EnkelEndringssøknadForInnsending = {
        erEndringssøknad: true,
        saksnummer: søknad.saksnummer,
        type: søknad.type,
        uttaksplan: endringerIUttaksplan,
        vedlegg: søknad.vedlegg,
        søker: konverterStringDatoerIObjektTilDate(søknad.søker),
        annenForelder: søknad.annenForelder,
        barn: konverterStringDatoerIObjektTilDate(søknad.barn),
        dekningsgrad: søknad.dekningsgrad,
        situasjon: søknad.situasjon,
    };
    cleanedSøknad.uttaksplan = cleanupUttaksplan(
        cleanedSøknad.uttaksplan,
        familiehendelsesdato,
        søknad.annenForelder,
        endringstidspunkt
    );
    removeDuplicateAttachments(cleanedSøknad.uttaksplan);
    cleanedSøknad.vedlegg = cleanUpAttachments({ cleanedSøknad, vedleggForSenEndring: søknad.vedleggForSenEndring });
    cleanedSøknad.tilleggsopplysninger = cleanupTilleggsopplysninger(søknad.tilleggsopplysninger);

    return cleanedSøknad;
};
