import { SaksperiodeNy } from '@navikt/fp-types';

import { BehandlingTilstand } from './BehandlingTilstand';
import { SøknadSVP } from './SøknadSVP';

export interface ÅpenBehandlingFP {
    tilstand: BehandlingTilstand;
    søknadsperioder?: SaksperiodeNy[];
}

export interface ÅpenBehandlingSVP {
    tilstand: BehandlingTilstand;
    søknad: SøknadSVP;
}

export type ÅpenBehandling = ÅpenBehandlingFP | ÅpenBehandlingSVP;
