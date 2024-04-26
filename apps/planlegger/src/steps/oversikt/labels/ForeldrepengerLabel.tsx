import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack } from '@navikt/ds-react';

import BlåSirkel from './ikoner/BlåSirkel';
import styles from './oversiktLabels.module.css';

interface Props {
    startdato: string;
    sluttdato: string;
}

const ForeldrepengerLabel: FunctionComponent<Props> = ({ startdato, sluttdato }) => {
    const intl = useIntl();

    return (
        <div className={styles.bluePanel}>
            <HStack gap="2" align="end" wrap={false}>
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
                <div className={styles.margin}>
                    <BlåSirkel />
                </div>
            </HStack>
        </div>
    );
};

export default ForeldrepengerLabel;
