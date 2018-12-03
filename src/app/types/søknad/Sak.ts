import Behandling from './Behandling';

export default interface Sak {
    type: SakType;
    behandlinger?: Behandling[];
    status?: FagsakStatus;
    saksnummer: string;
    opprettet: string;
}

export enum SakType {
    SAK = 'SAK', // Indicates that sak is from infotrygd
    FPSAK = 'FPSAK'
}

export enum FagsakStatus {
    OPPRETTET = 'OPPR',
    UNDER_BEHANDLING = 'UBEH',
    LOPENDE = 'LOP',
    AVSLUTTET = 'AVSLU'
}
