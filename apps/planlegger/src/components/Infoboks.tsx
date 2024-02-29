import { BabyWrappedIcon } from '@navikt/aksel-icons';
import classnames from 'classnames';
import React from 'react';

import { Box, HStack, Heading, VStack } from '@navikt/ds-react';

import styles from './Infoboks.module.css';

interface Props {
    header: string | React.ReactNode;
    children: React.ReactNode;
}
const Infoboks: React.FC<Props> = ({ header, children }) => {
    return (
        <Box background="surface-alt-3-subtle" padding="4" borderRadius="large">
            <VStack gap="2">
                <HStack justify="space-between">
                    <Heading size="small" className={styles.header}>
                        {header}
                    </Heading>
                    <div className={classnames(styles.circle, styles.circle__info)}>
                        <BabyWrappedIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />
                    </div>
                </HStack>

                {children}
            </VStack>
        </Box>
    );
};

export default Infoboks;
