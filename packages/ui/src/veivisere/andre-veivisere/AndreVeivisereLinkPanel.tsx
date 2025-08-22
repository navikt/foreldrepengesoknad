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

export const AndreVeivisereLinkPanel = ({ links }: Props) => {
    return (
        <div className={styles.background}>
            <div className={styles.box}>
                <VStack gap="space-8">
                    {links.length > 1 && (
                        <Heading size="small" level="2">
                            <FormattedMessage id="AndreVeivisereLinkPanel.AndreVeivisere" />
                        </Heading>
                    )}
                    {links.map((link) => (
                        <Link key={link.url} inlineText href={link.url} rel="noreferrer" className={styles.lenkepanel}>
                            <Box.New padding="4" background="default" borderRadius="xlarge">
                                {link.content}
                            </Box.New>
                        </Link>
                    ))}
                </VStack>
            </div>
        </div>
    );
};
