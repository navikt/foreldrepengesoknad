import { BehandlingTilstand } from './BehandlingTilstand';
import { Periode } from './Periode';

export interface ÅpenBehandling {
    tilstand: BehandlingTilstand;
    søknadsperioder?: Periode[];
}
