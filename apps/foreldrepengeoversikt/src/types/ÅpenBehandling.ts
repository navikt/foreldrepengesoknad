import { SaksperiodeNy, SøknadSVP } from '@navikt/fp-types';

import { BehandlingTilstand } from './BehandlingTilstand';

export interface ÅpenBehandlingFP {
    tilstand: BehandlingTilstand;
    søknadsperioder?: SaksperiodeNy[];
}

export interface ÅpenBehandlingES {
    tilstand: BehandlingTilstand;
}

export interface ÅpenBehandlingSVP {
    tilstand: BehandlingTilstand;
    søknad: SøknadSVP;
}

export type ÅpenBehandling = ÅpenBehandlingFP | ÅpenBehandlingSVP;
