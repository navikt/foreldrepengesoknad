import { Tilleggsopplysning } from 'app/context/types/Tilleggsopplysninger';

const TIL_SAKSBEHANDLER = {
    'tilleggsopplysning.begrunnelseForSenEndring': 'Begrunnelse for å søke om utsettelse',
    'tilleggsopplysning.begrunnelseForSenEndring.SYKDOM': 'på grunn av sykdom tilbake i tid',
    'tilleggsopplysning.begrunnelseForSenEndring.UTTAK': 'på grunn av uttak mer enn tre måneder tilbake i tid',
    'tilleggsopplysning.begrunnelseForSenEndring.SYKDOM_OG_UTTAK':
        'på grunn av sykdom tilbake i tid og uttak mer enn tre måneder tilbake i tid',
};

export interface TilleggsopplysningMedBeskrivelse {
    beskrivelse: string;
    tekst: string;
    ekstraInformasjon?: string;
}

export const beskrivTilleggsopplysning = (tilleggsopplysning: Tilleggsopplysning): TilleggsopplysningMedBeskrivelse => {
    const { tekst, ekstraInformasjon } = tilleggsopplysning;
    const beskrivelseMessageId = `tilleggsopplysning.begrunnelseForSenEndring`;
    const beskrivelseAvOpplysning = TIL_SAKSBEHANDLER[beskrivelseMessageId];
    const ekstraMessageId = `tilleggsopplysning.begrunnelseForSenEndring.${ekstraInformasjon}`;
    const ekstraInfoTilSaksbehandling = TIL_SAKSBEHANDLER[ekstraMessageId];

    return {
        beskrivelse: beskrivelseAvOpplysning,
        ekstraInformasjon: ekstraInfoTilSaksbehandling,
        tekst,
    };
};
