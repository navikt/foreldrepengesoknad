import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import { Dokumenterer, InnsendingType } from './fpsoknadDtoGenerert';

export type Attachment = {
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: InnsendingType;
    error?: AttachmentError;
    beskrivelse?: string;
};

type InternError = 'NO_DATA';

type ProblemDetailsErrorKode =
    | 'IKKE_TILGANG'
    | 'DUPLIKAT_FORSENDELSE'
    | 'MELLOMLAGRING'
    | 'MELLOMLAGRING_VEDLEGG'
    | 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
    | 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
    | 'KRYPTERING_MELLOMLAGRING';

type GenerelleErrorKoder = 'TIMEOUT' | 'SERVER_ERROR';

export type AttachmentUploadError = {
    success: false;
    feilKode: ProblemDetailsErrorKode | GenerelleErrorKoder;
};

export type AttachmentUploadSuccess = {
    success: true;
    data: string;
};

export type AttachmentUploadResult = AttachmentUploadSuccess | AttachmentUploadError;

export type AttachmentError = GenerelleErrorKoder | ProblemDetailsErrorKode | InternError;
