import { FormattedMessage } from 'react-intl';

import { BodyLong, Box, Link, List } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

export const DinePlikter = () => {
    return (
        <Box marginBlock="space-16" asChild>
            <List>
                <List.Item>
                    <BodyLong>
                        <FormattedMessage
                            id="velkommen.dinePlikter.listeElement.1"
                            values={{
                                link: (
                                    <Link href={links.rettOgPlikt} target="_blank">
                                        <FormattedMessage id="velkommen.dinePlikter.listeElement.1.link" />
                                    </Link>
                                ),
                            }}
                        />
                    </BodyLong>
                </List.Item>
                <List.Item>
                    <BodyLong>
                        <FormattedMessage id="velkommen.dinePlikter.listeElement.2" />
                    </BodyLong>
                </List.Item>
            </List>
        </Box>
    );
};
