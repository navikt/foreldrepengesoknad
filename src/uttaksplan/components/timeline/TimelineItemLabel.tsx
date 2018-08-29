import * as React from 'react';
import { EtikettAdvarsel, EtikettSuksess, EtikettInfo, EtikettFokus } from 'nav-frontend-etiketter';
import { TimelineLabel } from 'uttaksplan/components/timeline/types';

export interface Props {
    label: TimelineLabel;
}

const TimelineItemLabel: React.StatelessComponent<Props> = ({ label }) => {
    switch (label.type) {
        case 'advarsel':
            return <EtikettAdvarsel typo="undertekst">{label.text}</EtikettAdvarsel>;
        case 'fokus':
            return (
                <EtikettFokus typo="undertekst" type="fokus">
                    {label.text}
                </EtikettFokus>
            );
        case 'info':
            return (
                <EtikettInfo typo="undertekst" type="info">
                    {label.text}
                </EtikettInfo>
            );
        default:
            return <EtikettSuksess typo="undertekst">{label.text}</EtikettSuksess>;
    }
};

export default TimelineItemLabel;
