export default interface Behandling {
    behandlendeEnhet: string;
    behandlendeEnhetNavn: string;
    id: any;
    status: BehandlingStatus;
    tema: string;
    type: string;
    årsak: any;
}

export enum BehandlingStatus {
    OPPRETTET = 'OPPRE',
    UTREDES = 'UTRED',
    FATTER_VEDTAK = 'FVED',
    IVERKSETTER_VEDTAK = 'IVED',
    AVSLUTTET = 'AVSLU'
}

export enum BehandlingTema {
    'ENGANGSTØNAD' = 'ENGST',
    'ENGANGSTØNAD_FØDSEL' = 'ENGST_FODS',
    'ENGANGSTØNAD_ADOPSJON' = 'ENGST_ADOP',
    'FORELDREPENGER' = 'FORP',
    'FORELDREPENGER_ADOPSJON' = 'FORP_ADOP',
    'FORELDREPENGER_FØDSEL' = 'FORP_FODS',
    'UDEFINERT' = '-'
}
