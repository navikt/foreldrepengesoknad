import { Attachment } from 'common/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import { EngangsstønadSøknadDto } from 'app/types/domain/EngangsstønadSøknad';
import { EngangsstønadContextState } from 'app/context/EngangsstønadContextConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { FodtBarn, UfodtBarn } from 'app/types/domain/Barn';
import { OmBarnetFormData } from 'app/steps/om-barnet/omBarnetFormConfig';
import { UtenlandsoppholdFormData } from 'app/steps/utenlandsopphold/utenlandsoppholdFormTypes';
import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from 'app/types/domain/InformasjonOmUtenlandsopphold';
import { BostedUtland } from 'app/steps/utenlandsopphold/bostedUtlandListAndDialog/types';
import dayjs from 'dayjs';
import { Locale } from '@navikt/fp-common';
import * as Sentry from '@sentry/browser';
import utc from 'dayjs/plugin/utc';
import Adopsjon from 'app/types/domain/Adopsjon';
import { AxiosError } from 'axios';

dayjs.extend(utc);

export const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ';

export const UKJENT_UUID = 'ukjent uuid';

const isArrayOfAttachments = (attachment: Attachment) => {
    return Array.isArray(attachment) && attachment.some((element: Attachment) => element.filename);
};

const removeAttachmentsWithUploadError = (attachments: Attachment[]) =>
    attachments.filter((a: Attachment) => !isAttachmentWithError(a));

export const mapAttachments = (object: any): Attachment[] => {
    const foundAttachments = [] as Attachment[];
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                foundAttachments.push(...removeAttachmentsWithUploadError(object[key]));
                delete object[key];
            } else {
                foundAttachments.push(...mapAttachments(object[key]));
            }
        }
    });
    return foundAttachments;
};

const mapBarnForInnsending = (omBarnet: OmBarnetFormData): FodtBarn | UfodtBarn | Adopsjon => {
    if (omBarnet.adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED) {
        return {
            adopsjonAvEktefellesBarn: omBarnet.adopsjonAvEktefellesBarn === YesOrNo.YES ? true : false,
            søkerAdopsjonAlene: omBarnet.søkerAdopsjonAlene === YesOrNo.YES ? true : false,
            adopsjonsdato: dayjs(omBarnet.adopsjonsdato).toDate(),
            antallBarn: parseInt(omBarnet.antallBarn!, 10),
            fødselsdatoer: omBarnet.fødselsdatoer.map((fødselsdato) => dayjs.utc(fødselsdato).toDate()),
        };
    }
    return omBarnet.erBarnetFødt === YesOrNo.YES
        ? {
              antallBarn: parseInt(omBarnet.antallBarn!, 10),
              erBarnetFødt: true,
              fødselsdatoer: [dayjs.utc(omBarnet.fødselsdatoer[0]).toDate()],
          }
        : {
              antallBarn: parseInt(omBarnet.antallBarn!, 10),
              erBarnetFødt: false,
              termindato: dayjs.utc(omBarnet.termindato).toDate(),
              terminbekreftelseDato: dayjs.utc(omBarnet.terminbekreftelsedato).toDate(),
          };
};

const mapBostedUtlandTilUtenlandsopphold = (bostedUtland: BostedUtland[]): Utenlandsopphold[] => {
    return bostedUtland.map((bosted) => ({
        land: bosted.landkode,
        tidsperiode: {
            fom: dayjs.utc(bosted.fom).toDate(),
            tom: dayjs.utc(bosted.tom).toDate(),
        },
    }));
};

const mapUtenlandsoppholdForInnsending = (
    utenlandsopphold: UtenlandsoppholdFormData
): InformasjonOmUtenlandsopphold => {
    return {
        senereOpphold: mapBostedUtlandTilUtenlandsopphold(utenlandsopphold.utenlandsoppholdNeste12Mnd),
        tidligereOpphold: mapBostedUtlandTilUtenlandsopphold(utenlandsopphold.utenlandsoppholdSiste12Mnd),
        iNorgeNeste12Mnd: utenlandsopphold.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES,
        iNorgeSiste12Mnd: utenlandsopphold.harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES,
    };
};

export const mapStateForInnsending = (state: EngangsstønadContextState, locale: Locale): EngangsstønadSøknadDto => {
    const { omBarnet, utenlandsopphold } = state.søknad;
    const barn: FodtBarn | UfodtBarn | Adopsjon = mapBarnForInnsending(omBarnet);
    const utenlandsoppholdDto = mapUtenlandsoppholdForInnsending(utenlandsopphold);

    return {
        barn,
        type: 'engangsstønad',
        erEndringssøknad: false,
        informasjonOmUtenlandsopphold: utenlandsoppholdDto,
        søker: {
            språkkode: locale,
        },
        vedlegg: mapAttachments(JSON.parse(JSON.stringify(state.søknad))),
    };
};

export const sendErrorMessageToSentry = (error: AxiosError<any>) => {
    const errorCallId = getErrorCallId(error) + '. ';
    const errorTimestamp = getErrorTimestamp(error) + '. ';
    const hideNumbersAndTrim = (tekst: string): string => {
        return tekst.replace(/\d/g, '*').slice(0, 250) + '...';
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
