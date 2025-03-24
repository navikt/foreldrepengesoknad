import dayjs from 'dayjs';

import { DokumentDto, TidslinjeHendelseDto } from '@navikt/fp-types';

import { urlPrefiks } from '../api/api';

export const grupperDokumenterPåTidspunkt = (dokumenter: DokumentDto[]): Record<string, DokumentDto[]> => {
    const gruppert: Record<string, DokumentDto[]> = {};

    dokumenter.forEach((dokument) => {
        const mottattTidspunkt = dayjs(dokument.mottatt).format();

        if (!gruppert[mottattTidspunkt]) {
            gruppert[mottattTidspunkt] = [dokument];
        } else {
            gruppert[mottattTidspunkt].push(dokument);
        }
    });

    return gruppert;
};

export const lagUrl = (dokument: DokumentDto | TidslinjeHendelseDto['dokumenter'][0]): string => {
    return `${urlPrefiks}/rest/dokument/hent-dokument/${dokument.journalpostId}/${dokument.dokumentId}`;
};
