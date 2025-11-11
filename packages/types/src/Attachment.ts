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

export type AttachmentError =
    | 'IKKE_TILGANG'
    | 'DUPLIKAT_FORSENDELSE'
    | 'MELLOMLAGRING'
    | 'MELLOMLAGRING_VEDLEGG'
    | 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
    | 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
    | 'KRYPTERING_MELLOMLAGRING';
