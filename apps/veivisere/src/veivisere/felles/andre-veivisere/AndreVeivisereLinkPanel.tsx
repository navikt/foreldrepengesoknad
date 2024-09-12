import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { Box, Heading, Link, VStack } from '@navikt/ds-react';

import styles from './andreVeivisereLinkPanel.module.css';

type AndreVeivisereLink = {
    url: string;
    content: ReactElement;
};

interface Props {
    links: AndreVeivisereLink[];
}

const AndreVeivisereLinkPanel: React.FunctionComponent<Props> = ({ links }) => {
    return (
        <div className={styles.background}>
            <div className={styles.box}>
                <VStack gap="2">
                    {links.length > 1 && (
                        <Heading size="small">
                            <FormattedMessage id="AndreVeivisereLinkPanel.AndreVeivisere" />
                        </Heading>
                    )}
                    {links.map((link) => (
                        <Link key={link.url} inlineText href={link.url} rel="noreferrer" className={styles.lenkepanel}>
                            <Box padding="4" background="surface-default" borderRadius="xlarge" shadow="small">
                                {link.content}
                            </Box>
                        </Link>
                    ))}
                </VStack>
            </div>
        </div>
    );
};

export default AndreVeivisereLinkPanel;
