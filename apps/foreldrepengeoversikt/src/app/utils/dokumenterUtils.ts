import { Dokument } from 'app/types/Dokument';
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
