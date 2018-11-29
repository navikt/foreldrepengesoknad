import Sak from '../../types/søknad/Sak';
import Behandling, { BehandlingTema } from '../../types/søknad/Behandling';

const getBehandling = (sak: Sak): Behandling | undefined => {
    if (sak !== undefined && sak.behandlinger !== undefined && sak.behandlinger.length > 0) {
        return sak.behandlinger[0];
    }
    return undefined;
};

export const sakGjelderAdopsjon = (sak: Sak): boolean => {
    const behandling = getBehandling(sak);
    return behandling !== undefined && behandling.tema === BehandlingTema.FORELDREPENGER_ADOPSJON;
};

export const gjelderSakForeldrepengesøknad = (sak: Sak): boolean => {
    const behandling = getBehandling(sak);
    if (behandling === undefined) {
        return true;
    } else {
        const { tema } = behandling;
        return (
            tema === BehandlingTema.FORELDREPENGER ||
            tema === BehandlingTema.FORELDREPENGER_ADOPSJON ||
            tema === BehandlingTema.FORELDREPENGER_FØDSEL ||
            tema === BehandlingTema.UDEFINERT
        );
    }
};

export const erInfotrygdSak = (sak: Sak) => {
    return sak.behandlinger === undefined;
};
