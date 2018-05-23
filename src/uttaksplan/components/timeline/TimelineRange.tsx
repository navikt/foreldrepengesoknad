import * as React from 'react';
import { startOfDay, isEqual } from 'date-fns';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Dato from 'uttaksplan/elements/dato/Dato';
import TidsperiodeTekst from 'uttaksplan/components/tidslinje/elementer/TidsperiodeTekst';

export interface Props {
    from: Date;
    to: Date;
}

const TimelineRange: React.StatelessComponent<Props & InjectedIntlProps> = ({
    from,
    to,
    intl
}) => {
    if (isEqual(startOfDay(from), startOfDay(to))) {
        return <Dato dato={from} />;
    }
    return (
        <TidsperiodeTekst
            tidsperiode={{ startdato: from, sluttdato: to }}
            visSluttdato={true}
        />
    );
};

export default injectIntl(TimelineRange);
