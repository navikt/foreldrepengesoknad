import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import { FpSoknadFeilKode } from './ProblemDetails';
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

type GenerelleErrorKoder = 'TIMEOUT' | 'SERVER_ERROR';

export type AttachmentUploadError = {
    success: false;
    feilkode: FpSoknadFeilKode | GenerelleErrorKoder;
};

export type AttachmentUploadSuccess = {
    success: true;
    data: string;
};

export type AttachmentUploadResult = AttachmentUploadSuccess | AttachmentUploadError;

export type AttachmentError = GenerelleErrorKoder | FpSoknadFeilKode | InternError;
