import { SaksperiodeDTO } from './SaksperiodeDTO';
import { BehandlingTilstand } from './BehandlingTilstand';

export interface ÅpenBehandling {
    tilstand: BehandlingTilstand;
    søknadsperioder: SaksperiodeDTO[];
}
