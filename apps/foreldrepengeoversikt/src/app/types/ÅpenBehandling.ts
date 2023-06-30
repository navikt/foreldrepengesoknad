import { BehandlingTilstand } from './BehandlingTilstand';
import { Periode } from './Periode';
import { Søknad } from './svpTypesSommer';

export interface ÅpenBehandling {
    tilstand: BehandlingTilstand;
    søknadsperioder?: Periode[];
    søknad?: Søknad;
}
