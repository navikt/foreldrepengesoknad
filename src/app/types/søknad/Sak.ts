export default interface Behandling {
    behandlendeEnhet: string;
    behandlendeEnhetNavn: string;
    id: any;
    // @ts-ignore
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
export default interface Sak {
    behandlinger?: Behandling[];
    // @ts-ignore
    status?: FagsakStatus;
    saksnummer: string;
    opprettet: string;
}

export enum FagsakStatus {
    OPPRETTET = 'OPPR',
    UNDER_BEHANDLING = 'UBEH',
    LOPENDE = 'LOP',
    AVSLUTTET = 'AVSLU'
}
