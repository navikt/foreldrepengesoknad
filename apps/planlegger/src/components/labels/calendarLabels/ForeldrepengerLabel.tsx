import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import CalendarIconLabel from './CalendarIconLabel';
import styles from './oversiktLabels.module.css';

interface Props {
    startdato: string;
    sluttdato: string;
}

const ForeldrepengerLabel: FunctionComponent<Props> = ({ startdato, sluttdato }) => {
    const intl = useIntl();

    return (
        <CalendarIconLabel iconType="blue">
            <BodyShort>
                <FormattedMessage id="OversiktSteg.ForeldrepengerLabel" />
            </BodyShort>
            <div className={styles.srOnly}>
                <FormattedMessage
                    id="OversiktSteg.ForeldrepengerSrOnly"
                    values={{
                        startdato: intl.formatDate(startdato, {
                            day: '2-digit',
                            month: 'long',
                            weekday: 'long',
                            year: 'numeric',
                        }),
                        sluttdato: intl.formatDate(sluttdato, {
                            day: '2-digit',
                            month: 'long',
                            weekday: 'long',
                            year: 'numeric',
                        }),
                    }}
                />
            </div>
        </CalendarIconLabel>
    );
};

export default ForeldrepengerLabel;
