export default interface Behandling {
    behandlendeEnhet: string;
    behandlendeEnhetNavn: string;
    id: any;
    status: BehanldingStatus;
    tema: string;
    type: string;
    årsak: any;
}

export enum BehanldingStatus {
    OPPRETTET = 'OPPRE',
    UTREDES = 'UTRED',
    FATTER_VEDTAK = 'FVED',
    IVERKSETTER_VEDTAK = 'IVED',
    AVSLUTTET = 'AVSLU'
}
