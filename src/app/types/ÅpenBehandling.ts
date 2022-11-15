import { SaksperiodeDTO } from './SaksperiodeDTO';
import { TilstandÅpenBehandling } from './TilstandÅpenBehandling';

export interface ÅpenBehandling {
    tilstand: TilstandÅpenBehandling;
    søknadsperioder: SaksperiodeDTO[];
}
