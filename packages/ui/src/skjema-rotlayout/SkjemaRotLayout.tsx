import React from 'react';

import { Heading, Page } from '@navikt/ds-react';

export const SkjemaRotLayout = ({ children, pageTitle }: { children: React.ReactNode; pageTitle: React.ReactNode }) => {
    return (
        <Page>
            <Page.Block as="main" id="pageMainContent" width="text" gutters>
                {pageTitle && (
                    <Page.Block>
                        <Heading size="large" level="1" spacing>
                            {pageTitle}
                        </Heading>
                    </Page.Block>
                )}
                <Page.Block>{children}</Page.Block>
            </Page.Block>
        </Page>
    );
};
