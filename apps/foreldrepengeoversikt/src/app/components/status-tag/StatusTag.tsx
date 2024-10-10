import { Tag } from '@navikt/ds-react';

import { BehandlingTilstand } from 'app/types/BehandlingTilstand';
import { Sak } from 'app/types/Sak';

interface Props {
    sak: Sak;
    harMinstEttArbeidsforhold: boolean;
}

const StatusTag: React.FunctionComponent<Props> = ({ sak, harMinstEttArbeidsforhold }) => {
    if (sak.åpenBehandling) {
        if (!sak.sakAvsluttet) {
            if (sak.åpenBehandling.tilstand === BehandlingTilstand.UNDER_BEHANDLING) {
                return (
                    <Tag variant="warning-moderate" size="xsmall">
                        Under behandling
                    </Tag>
                );
            }

            if (sak.åpenBehandling.tilstand === BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING) {
                return harMinstEttArbeidsforhold ? (
                    <Tag variant="warning-moderate" size="xsmall">
                        Venter på inntektsmelding fra arbeidsgiver
                    </Tag>
                ) : (
                    <Tag variant="info-filled" size="xsmall">
                        Venter på behandling
                    </Tag>
                );
            }

            if (sak.åpenBehandling.tilstand === BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON) {
                return (
                    <Tag variant="warning-moderate" size="xsmall">
                        Du må sende dokumentasjon
                    </Tag>
                );
            }

            if (sak.åpenBehandling.tilstand === BehandlingTilstand.TIDLIG_SØKNAD) {
                return (
                    <Tag variant="warning-moderate" size="xsmall">
                        Søknaden vil bli behandlet senere
                    </Tag>
                );
            }

            if (sak.åpenBehandling.tilstand === BehandlingTilstand.VENTER_PÅ_MELDEKORT) {
                return (
                    <Tag variant="warning-moderate" size="xsmall">
                        Du må sende meldekort
                    </Tag>
                );
            }
        }
    }

    if (sak.sakAvsluttet) {
        return (
            <Tag variant="neutral-moderate" size="xsmall">
                Avsluttet
            </Tag>
        );
    }

    return (
        <Tag variant="success-moderate" size="xsmall">
            Aktiv
        </Tag>
    );
};

export default StatusTag;
