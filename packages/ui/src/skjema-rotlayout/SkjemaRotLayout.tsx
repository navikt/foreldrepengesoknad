import React from 'react';

import { Heading, Page, VStack } from '@navikt/ds-react';

export const SkjemaRotLayout = ({ children, pageTitle }: { children: React.ReactNode; pageTitle: React.ReactNode }) => {
    return (
        <Page>
            <Page.Block as="main" id="pageMainContent" width="text" gutters>
                <VStack gap="space-16">
                    {pageTitle && (
                        <Page.Block>
                            <Heading size="xlarge" level="1" className="mb-8">
                                {pageTitle}
                            </Heading>
                        </Page.Block>
                    )}
                    <Page.Block>{children}</Page.Block>
                </VStack>
            </Page.Block>
        </Page>
    );
};
