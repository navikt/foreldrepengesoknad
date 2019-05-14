import Søknad, {
    SøknadForInnsending,
    Søkersituasjon,
    EnkelEndringssøknadForInnsending,
    Tilleggsopplysninger
} from '../../types/søknad/Søknad';
import { Attachment, InnsendingsType } from 'common/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import {
    Periode,
    isUttaksperiode,
    StønadskontoType,
    Periodetype,
    OppholdÅrsakType,
    Arbeidsform
} from '../../types/uttaksplan/periodetyper';
import { isValidTidsperiode } from '../uttaksplan/Tidsperioden';
import stringifyTilleggsopplysninger from './stringifyTilleggsopplysninger';
import { Barn } from '../../types/søknad/Barn';
import { cleanupBarn } from '../barnUtils';
import AnnenForelder from 'app/types/søknad/AnnenForelder';
import { getEndretUttaksplanForInnsending } from '../uttaksplan/uttaksplanEndringUtil';

export const isArrayOfAttachments = (object: object) => {
    return (
        Array.isArray(object) &&
        object[0] !== null &&
        object.some((element) => element.filename || element.innsendingsType === InnsendingsType.SEND_SENERE)
    );
};

export const removeAttachmentsWithUploadError = (attachments: Attachment[]) =>
    attachments.filter((a: Attachment) => !isAttachmentWithError(a));

export const cleanUpAttachments = (object: object): Attachment[] => {
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
const changeClientonlyOppholdsÅrsak = (periode: Periode) => {
    if (periode.type === Periodetype.Opphold) {
        if (periode.årsak === OppholdÅrsakType.UttakFlerbarnsukerAnnenForelder) {
            periode.årsak = OppholdÅrsakType.UttakFellesperiodeAnnenForelder;
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

const getArbeidstakerFrilansSN = (arbeidsformer: Arbeidsform[] | undefined) => {
    if (arbeidsformer !== undefined && arbeidsformer.length > 0) {
        const arbeidsform = arbeidsformer[0];
        return {
            erArbeidstaker: arbeidsform === Arbeidsform.arbeidstaker,
            erFrilanser: arbeidsform === Arbeidsform.frilans,
            erSelvstendig: arbeidsform === Arbeidsform.selvstendignæringsdrivende
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
const ensureNoNullItemsInFødselsdatoer = (barn: Barn, situasjon: Søkersituasjon): Barn => {
    const cleanedBarn = cleanupBarn(barn, situasjon);
    return (cleanedBarn as Barn) || barn;
};

const cleanupUttaksplan = (uttaksplan: Periode[], annenForelder?: AnnenForelder): Periode[] => {
    return uttaksplan
        .filter((periode: Periode) => isValidTidsperiode(periode.tidsperiode))
        .filter(isNotPeriodetypeHull)
        .map(
            (periode) =>
                annenForelder ? changeClientonlyKontotype(periode, annenForelder.harRettPåForeldrepenger) : periode
        )
        .map(changeGradertPeriode)
        .map(changeClientonlyOppholdsÅrsak);
};

const cleanupTilleggsopplysninger = (tilleggsopplysninger: Tilleggsopplysninger): string | undefined => {
    const tilleggsopplysningerTilSaksbehandler = stringifyTilleggsopplysninger(tilleggsopplysninger);
    if (tilleggsopplysningerTilSaksbehandler.length > 0) {
        return tilleggsopplysningerTilSaksbehandler;
    }
    return undefined;
};

export const cleanUpSøknad = (søknad: Søknad): SøknadForInnsending => {
    const { ekstrainfo, sensitivInfoIkkeLagre, vedleggForSenEndring, tilleggsopplysninger, ...rest } = søknad;
    const cleanedSøknad: SøknadForInnsending = { ...rest };

    removeDuplicateAttachments(cleanedSøknad.uttaksplan);
    cleanedSøknad.barn = ensureNoNullItemsInFødselsdatoer(cleanedSøknad.barn, søknad.situasjon);
    cleanedSøknad.vedlegg = cleanUpAttachments({ cleanedSøknad, vedleggForSenEndring });
    cleanedSøknad.uttaksplan = cleanupUttaksplan(cleanedSøknad.uttaksplan, søknad.annenForelder);
    cleanedSøknad.tilleggsopplysninger = cleanupTilleggsopplysninger(søknad.tilleggsopplysninger);

    return cleanedSøknad;
};

export const cleanEnkelEndringssøknad = (
    søknad: Søknad,
    opprinneligUttaksplan: Periode[]
): EnkelEndringssøknadForInnsending => {
    const endringerIUttaksplan = getEndretUttaksplanForInnsending(opprinneligUttaksplan, søknad.uttaksplan);
    const cleanedSøknad: EnkelEndringssøknadForInnsending = {
        erEndringssøknad: true,
        saksnummer: søknad.saksnummer,
        type: søknad.type,
        uttaksplan: endringerIUttaksplan || søknad.uttaksplan,
        vedlegg: søknad.vedlegg,
        søker: søknad.søker,
        annenForelder: søknad.annenForelder,
        barn: søknad.barn,
        dekningsgrad: søknad.dekningsgrad
    };
    removeDuplicateAttachments(cleanedSøknad.uttaksplan);
    cleanedSøknad.vedlegg = cleanUpAttachments({ cleanedSøknad, vedleggForSenEndring: søknad.vedleggForSenEndring });
    cleanedSøknad.uttaksplan = cleanupUttaksplan(cleanedSøknad.uttaksplan, søknad.annenForelder);
    cleanedSøknad.tilleggsopplysninger = cleanupTilleggsopplysninger(søknad.tilleggsopplysninger);

    return cleanedSøknad;
};
