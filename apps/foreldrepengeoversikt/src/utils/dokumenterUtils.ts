import dayjs from 'dayjs';

import { DokumentDto_fpoversikt, TidslinjeHendelseDto_fpoversikt } from '@navikt/fp-types';

import { urlPrefiks } from '../api/api';

export const grupperDokumenterPåTidspunkt = (
    dokumenter: DokumentDto_fpoversikt[],
): Record<string, DokumentDto_fpoversikt[]> => {
    const gruppert: Record<string, DokumentDto_fpoversikt[]> = {};

    for (const dokument of dokumenter) {
        const mottattTidspunkt = dayjs(dokument.mottatt).format();

        if (!gruppert[mottattTidspunkt]) {
            gruppert[mottattTidspunkt] = [dokument];
        } else {
            gruppert[mottattTidspunkt].push(dokument);
        }
    }

    return gruppert;
};

export const lagUrl = (dokument: DokumentDto_fpoversikt | TidslinjeHendelseDto_fpoversikt['dokumenter'][0]): string => {
    return `${urlPrefiks}/rest/dokument/hent-dokument/${dokument.journalpostId}/${dokument.dokumentId}`;
};
