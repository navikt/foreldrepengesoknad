import dayjs from 'dayjs';

import { urlPrefiks } from '../api/api';
import { Dokument } from '../types/Dokument';

export const grupperDokumenterPåTidspunkt = (dokumenter: Dokument[]): Record<string, Dokument[]> => {
    const gruppert: Record<string, Dokument[]> = {};

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

export const lagUrl = (dokument: Dokument): string => {
    return dokument.url
        ? dokument.url
        : `${urlPrefiks}/rest/dokument/hent-dokument/${dokument.journalpostId}/${dokument.dokumentId}`;
};
