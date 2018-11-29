import Sak from '../../types/søknad/Sak';
import { BehandlingTema } from '../../types/søknad/Behandling';

export const sakGjelderAdopsjon = (sak: Sak): boolean => {
    if (sak === undefined || sak.behandlinger === undefined || sak.behandlinger.length === 0) {
        return false;
    }
    return sak.behandlinger[0].tema === BehandlingTema.FORELDREPENGER_ADOPSJON;
};
