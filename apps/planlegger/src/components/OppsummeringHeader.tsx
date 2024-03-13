import { CheckmarkCircleIcon, CheckmarkIcon } from '@navikt/aksel-icons';
import GreenHeading from 'components/GreenHeading';
import IconCircle from 'components/ikoner/IconCircle';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading, Show } from '@navikt/ds-react';

import styles from './planleggerPage/planleggerFrontpage.module.css';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

const OppsummeringHeader: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <div className={styles.background}>
            <div className={styles.header}>
                <Show below="md">
                    <GreenHeading useDarkGreen>
                        <HStack gap="4" align="center">
                            <IconCircle color="darkGreen" size="xl">
                                <CheckmarkCircleIcon height={28} width={28} fontSize="1.5rem" />
                            </IconCircle>
                            <Heading size="medium">
                                <FormattedMessage id="oppsummering.tittel" />
                            </Heading>
                        </HStack>
                    </GreenHeading>
                </Show>
                <Show above="md">
                    <GreenHeading>
                        <HStack gap="4" align="center">
                            <IconCircle color="darkGreen" size="xl">
                                <CheckmarkIcon height={40} width={40} fontSize="1.5rem" />
                            </IconCircle>
                            <Heading size="medium">
                                <FormattedMessage id="oppsummering.tittel" />
                            </Heading>
                        </HStack>
                    </GreenHeading>
                </Show>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default OppsummeringHeader;
