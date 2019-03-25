import Søknad, { SøknadForInnsending, Søkersituasjon } from '../../types/søknad/Søknad';
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

const isArrayOfAttachments = (object: object) => {
    return (
        Array.isArray(object) &&
        object[0] !== null &&
        object.some((element) => element.filename || element.innsendingsType === InnsendingsType.SEND_SENERE)
    );
};

const removeAttachmentsWithUploadError = (attachments: Attachment[]) =>
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

const changeClientonlyKontotypes = (uttaksplan: Periode[], andreForelderHarRettPåForeldrepenger: boolean) => {
    return uttaksplan.map((periode) => {
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
    });
};

const changeClientonlyOppholdsÅrsaker = (uttaksplan: Periode[]) => {
    return uttaksplan.map((periode) => {
        if (periode.type === Periodetype.Opphold) {
            if (periode.årsak === OppholdÅrsakType.UttakFlerbarnsukerAnnenForelder) {
                periode.årsak = OppholdÅrsakType.UttakFellesperiodeAnnenForelder;
            }
        }

        return periode;
    });
};

export const removePeriodetypeHullFromUttaksplan = (uttaksplan: Periode[]): Periode[] => {
    return uttaksplan.filter((p) => p.type !== Periodetype.Hull);
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

const changeGradertePerioder = (uttaksplan: Periode[]) => {
    return uttaksplan.map((periode: Periode) => {
        if (isUttaksperiode(periode) && periode.gradert) {
            return { ...periode, ...getArbeidstakerFrilansSN(periode.arbeidsformer) };
        }

        return periode;
    });
};

const ensureNoNullItemsInFødselsdatoer = (barn: Barn, situasjon: Søkersituasjon): Barn => {
    const cleanedBarn = cleanupBarn(barn, situasjon);
    return (cleanedBarn as Barn) || barn;
};

export const cleanUpSøknad = (søknad: Søknad): SøknadForInnsending => {
    const { ekstrainfo, sensitivInfoIkkeLagre, vedleggForSenEndring, tilleggsopplysninger, ...rest } = søknad;
    const cleanedSøknad: SøknadForInnsending = { ...rest };

    removeDuplicateAttachments(cleanedSøknad.uttaksplan);
    cleanedSøknad.barn = ensureNoNullItemsInFødselsdatoer(cleanedSøknad.barn, søknad.situasjon);
    cleanedSøknad.vedlegg = cleanUpAttachments({ cleanedSøknad, vedleggForSenEndring });
    cleanedSøknad.uttaksplan = cleanedSøknad.uttaksplan.filter((periode: Periode) =>
        isValidTidsperiode(periode.tidsperiode)
    );

    cleanedSøknad.uttaksplan = changeClientonlyKontotypes(
        cleanedSøknad.uttaksplan,
        søknad.annenForelder.harRettPåForeldrepenger
    );

    cleanedSøknad.uttaksplan = changeGradertePerioder(cleanedSøknad.uttaksplan);
    cleanedSøknad.uttaksplan = changeClientonlyOppholdsÅrsaker(cleanedSøknad.uttaksplan);
    cleanedSøknad.uttaksplan = removePeriodetypeHullFromUttaksplan(cleanedSøknad.uttaksplan);

    const tilleggsopplysningerTilSaksbehandler = stringifyTilleggsopplysninger(tilleggsopplysninger);
    if (tilleggsopplysningerTilSaksbehandler.length > 0) {
        cleanedSøknad.tilleggsopplysninger = tilleggsopplysningerTilSaksbehandler;
    }

    return cleanedSøknad;
};
