import { BehandlingTilstand } from './BehandlingTilstand';
import { Periode } from './Periode';
import { SøknadSVP } from './SøknadSVP';

export interface ÅpenBehandlingFP {
    tilstand: BehandlingTilstand;
    søknadsperioder?: Periode[];
}

export interface ÅpenBehandlingSVP {
    tilstand: BehandlingTilstand;
    søknad: SøknadSVP;
}

export type ÅpenBehandling = ÅpenBehandlingFP | ÅpenBehandlingSVP;
