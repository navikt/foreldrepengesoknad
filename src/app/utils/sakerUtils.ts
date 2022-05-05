import Behandling, {
    BehandlingResultatType,
    BehandlingStatus,
    BehandlingTema,
    BehandlingType,
} from 'app/types/Behandling';
import Sak, { FagsakStatus } from 'app/types/Sak';
import { assertUnreachable } from './globalUtil';

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

const gjelderSakForeldrepengesøknad = (sak: Sak): boolean => {
    const behandling = getBehandling(sak);
    return behandling ? behandling.type === BehandlingType.FORELDREPENGESØKNAD : true;
};

const erAvslåttBehandling = (behandling: Behandling) => {
    return (
        behandling.status === BehandlingStatus.AVSLUTTET &&
        behandling.behandlingResultat === BehandlingResultatType.AVSLÅTT
    );
};

const erUrelevantAutomatiskOpprettetBehandling = (behandling: Behandling) => {
    if (behandling.behandlingResultat === BehandlingResultatType.MERGET_OG_HENLAGT) {
        return true;
    }

    return false;
};

const harEnAvsluttetBehandling = (sak: Sak): boolean => {
    return sak.behandlinger
        ? sak.behandlinger
              .filter((behandling: Behandling) => !erAvslåttBehandling(behandling))
              .filter((behandling: Behandling) => !erUrelevantAutomatiskOpprettetBehandling(behandling))
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

const harSakUnderBehandling = (sak: Sak): boolean => {
    return gjelderSakForeldrepengesøknad(sak)
        ? sak.status === FagsakStatus.OPPRETTET ||
              (sak.status === FagsakStatus.UNDER_BEHANDLING && harEnAktivBehandling(sak))
        : false;
};

export const erSakFerdigbehandlet = (sak: Sak | undefined): boolean => {
    if (sak === undefined) {
        return false;
    } else {
        switch (sak.status) {
            case FagsakStatus.LOPENDE:
            case FagsakStatus.AVSLUTTET:
                return true;
            case FagsakStatus.OPPRETTET:
            case FagsakStatus.UNDER_BEHANDLING:
            case undefined:
                return false;
            default:
                return assertUnreachable(sak.status, `Ugyldig sak status: {$sak.status}`);
        }
    }
};

export const skalKunneSøkeOmEndring = (sak: Sak): boolean => {
    return gjelderSakForeldrepengesøknad(sak)
        ? sak.status !== FagsakStatus.AVSLUTTET && harEnAvsluttetBehandling(sak)
        : false;
};

export const getSakUnderBehandling = (saker: Sak[]): Sak | undefined => {
    return saker
        .filter(gjelderSakForeldrepengesøknad)
        .filter((sak) => !harEnAvsluttetBehandling(sak) && harSakUnderBehandling(sak))
        .sort(sakByDescendingOrder)[0];
};

export const getSisteForeldrepengeSak = (saker: Sak[]): Sak | undefined => {
    return saker.filter(gjelderSakForeldrepengesøknad).sort(sakByDescendingOrder)[0];
};

export const getSakForEndringssøknad = (saker: Sak[]): Sak | undefined => {
    return saker.filter(skalKunneSøkeOmEndring).sort(sakByDescendingOrder)[0];
};

const sakByDescendingOrder = (a: Sak, b: Sak) => b.opprettet.localeCompare(a.opprettet);
