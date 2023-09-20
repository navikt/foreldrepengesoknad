import { Dokument } from 'app/types/Dokument';
import Environment from 'app/Environment';
import dayjs from 'dayjs';

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
    return dokument.url ? dokument.url : `${Environment.REST_API_URL}/dokument/hent-dokument/${dokument.journalpostId}/${dokument.dokumentId}`;
}
