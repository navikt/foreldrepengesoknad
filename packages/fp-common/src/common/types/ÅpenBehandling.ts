import { BehandlingTilstand } from './BehandlingTilstand';
import { SaksperiodeDTO } from './SaksperiodeDTO';

export interface ÅpenBehandling {
    tilstand: BehandlingTilstand;
    søknadsperioder: SaksperiodeDTO[];
}
