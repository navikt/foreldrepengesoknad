import Sak, { FagsakStatus, SakType } from '../../types/søknad/Sak';
import Behandling, {
    BehandlingStatus,
    BehandlingTema,
    BehandligType,
    BehandlingResultatType
} from '../../types/søknad/Behandling';

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
    return behandling ? behandling.type === BehandligType.FORELDREPENGESØKNAD : true;
};

export const erInfotrygdSak = (sak: Sak): boolean => {
    return sak.type === SakType.SAK;
};

const erAvslåttBehandling = (behandling: Behandling) => {
    return (
        behandling.status === BehandlingStatus.AVSLUTTET &&
        behandling.behandlingResultat === BehandlingResultatType.AVSLÅTT
    );
};

export const harEnAvsluttetBehandling = (sak: Sak): boolean => {
    return sak.behandlinger
        ? sak.behandlinger
              .filter((behandling: Behandling) => !erAvslåttBehandling(behandling))
              .some((behandling: Behandling) => behandling.status === BehandlingStatus.AVSLUTTET)
        : false;
};

const harEnAktivBehandling = (sak: Sak): boolean => {
    return sak.behandlinger
        ? sak.behandlinger.some(
              (behandling: Behandling) =>
                  behandling.status === BehandlingStatus.OPPRETTET || behandling.status === BehandlingStatus.UTREDES
          )
        : false;
};

export const harSakUnderBehandling = (sak: Sak): boolean => {
    return gjelderSakForeldrepengesøknad(sak)
        ? sak.status === FagsakStatus.OPPRETTET ||
              (sak.status === FagsakStatus.UNDER_BEHANDLING && harEnAktivBehandling(sak))
        : false;
};

export const skalKunneSøkeOmEndring = (sak: Sak): boolean => {
    return gjelderSakForeldrepengesøknad(sak)
        ? (sak.status !== FagsakStatus.AVSLUTTET && harEnAvsluttetBehandling(sak)) || erInfotrygdSak(sak)
        : false;
};

export const getSakUnderBehandling = (saker: Sak[]): Sak | undefined => {
    return saker
        .filter(gjelderSakForeldrepengesøknad)
        .filter((sak) => !harEnAvsluttetBehandling(sak) && harSakUnderBehandling(sak))
        .sort(sakByDescendingOrder)[0];
};

export const getSakForEndringssøknad = (saker: Sak[]): Sak | undefined => {
    return saker.filter(skalKunneSøkeOmEndring).sort(sakByDescendingOrder)[0];
};

const sakByDescendingOrder = (a: Sak, b: Sak) => b.opprettet.localeCompare(a.opprettet);
