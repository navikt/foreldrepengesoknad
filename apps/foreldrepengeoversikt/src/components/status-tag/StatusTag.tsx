import { Tag } from '@navikt/ds-react';

import { Sak } from '../../types/Sak';

interface Props {
    sak: Sak;
    harMinstEttArbeidsforhold: boolean;
}

export const StatusTag = ({ sak, harMinstEttArbeidsforhold }: Props) => {
    if (sak.åpenBehandling) {
        if (!sak.sakAvsluttet) {
            if (sak.åpenBehandling.tilstand === 'UNDER_BEHANDLING') {
                return (
                    <Tag variant="warning-moderate" size="xsmall">
                        Under behandling
                    </Tag>
                );
            }

            if (sak.åpenBehandling.tilstand === 'VENT_INNTEKTSMELDING') {
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

            if (sak.åpenBehandling.tilstand === 'VENT_DOKUMENTASJON') {
                return (
                    <Tag variant="warning-moderate" size="xsmall">
                        Du må sende dokumentasjon
                    </Tag>
                );
            }

            if (sak.åpenBehandling.tilstand === 'VENT_TIDLIG_SØKNAD') {
                return (
                    <Tag variant="warning-moderate" size="xsmall">
                        Søknaden vil bli behandlet senere
                    </Tag>
                );
            }

            if (sak.åpenBehandling.tilstand === 'VENT_MELDEKORT') {
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
