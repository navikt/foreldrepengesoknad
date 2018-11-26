import Behandling from './Behandling';

export default interface Sak {
    behandlinger?: Behandling[];
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
