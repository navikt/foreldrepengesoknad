import { FormattedMessage } from 'react-intl';

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
                        <FormattedMessage id="status.underBehandling" />
                    </Tag>
                );
            }

            if (sak.åpenBehandling.tilstand === 'VENT_INNTEKTSMELDING') {
                return harMinstEttArbeidsforhold ? (
                    <Tag variant="warning-moderate" size="xsmall">
                        <FormattedMessage id="status.venterPåInntektsmelding" />
                    </Tag>
                ) : (
                    <Tag variant="info-filled" size="xsmall">
                        <FormattedMessage id="status.venterPåBehandling" />
                    </Tag>
                );
            }

            if (sak.åpenBehandling.tilstand === 'VENT_DOKUMENTASJON') {
                return (
                    <Tag variant="warning-moderate" size="xsmall">
                        <FormattedMessage id="status.duMåSendeDokumentasjon" />
                    </Tag>
                );
            }

            if (sak.åpenBehandling.tilstand === 'VENT_TIDLIG_SØKNAD') {
                return (
                    <Tag variant="warning-moderate" size="xsmall">
                        <FormattedMessage id="status.søknaden" />
                    </Tag>
                );
            }

            if (sak.åpenBehandling.tilstand === 'VENT_MELDEKORT') {
                return (
                    <Tag variant="warning-moderate" size="xsmall">
                        <FormattedMessage id="status.duMåSendeMeldekort" />
                    </Tag>
                );
            }
        }
    }

    if (sak.sakAvsluttet) {
        return (
            <Tag variant="neutral-moderate" size="xsmall">
                <FormattedMessage id="status.avsluttet" />
            </Tag>
        );
    }

    return (
        <Tag variant="success-moderate" size="xsmall">
            <FormattedMessage id="status.aktiv" />
        </Tag>
    );
};
