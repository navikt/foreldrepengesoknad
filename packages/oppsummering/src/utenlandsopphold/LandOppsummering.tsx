import dayjs from 'dayjs';
import * as countries from 'i18n-iso-countries';
import React from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { formatDate, isToday } from '@navikt/fp-utils';

const formaterDato = (dato: string, intl: IntlShape) => {
    if (isToday(dato)) {
        return intl.formatMessage({ id: 'LandOppsummering.IDag' });
    }
    return formatDate(dato);
};

const sortOpphold = (o1: UtenlandsoppholdPeriode, o2: UtenlandsoppholdPeriode) => {
    return dayjs(o1.fom).isAfter(o2.fom, 'day') ? 1 : 0;
};

interface Props {
    utenlandsoppholdListe: UtenlandsoppholdPeriode[];
}

const LandOppsummering: React.FunctionComponent<Props> = ({ utenlandsoppholdListe }) => {
    const intl = useIntl();
    return (
        <FormSummary.Answers>
            {utenlandsoppholdListe.sort(sortOpphold).map((opphold) => (
                <React.Fragment key={opphold.landkode}>
                    <FormSummary.Answer>
                        <FormSummary.Label>{countries.getName(opphold.landkode, 'nb')}</FormSummary.Label>
                        <FormSummary.Value>
                            <FormattedMessage
                                id="LandOppsummering.periode"
                                values={{ fra: formaterDato(opphold.fom, intl), til: formaterDato(opphold.tom, intl) }}
                            />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </React.Fragment>
            ))}
        </FormSummary.Answers>
    );
};

export default LandOppsummering;
