import { AnnenPart } from './AnnenPart';
import Behandling from './Behandling';

export default interface Sak {
    type: SakType;
    behandlinger?: Behandling[];
    annenPart?: AnnenPart;
    status?: FagsakStatus;
    saksnummer: string;
    opprettet: string;
}

export enum SakType {
    SAK = 'SAK', // Indicates that sak is from infotrygd
    FPSAK = 'FPSAK',
}

//TODO: Fjern
export enum FagsakStatus {
    OPPRETTET = 'OPPRETTET',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
    LOPENDE = 'LØPENDE',
    AVSLUTTET = 'AVSLUTTET',
}
