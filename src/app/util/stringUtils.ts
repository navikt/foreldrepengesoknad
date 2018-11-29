import { FagsakStatus } from '../types/søknad/Sak';

export const removeSpacesFromString = (value: string) => {
    return value.replace(/\s/g, '');
};

export const getIntlKeyForStatus = (status: FagsakStatus): string => {
    switch (status) {
        case FagsakStatus.OPPRETTET:
        case FagsakStatus.UNDER_BEHANDLING:
        case FagsakStatus.LOPENDE:
            return 'velkommen.sak.status.underBehandling';
        case FagsakStatus.AVSLUTTET:
            return 'velkommen.sak.status.avsluttet';
    }
};
