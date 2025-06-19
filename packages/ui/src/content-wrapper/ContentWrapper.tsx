import React from 'react';

import { Page as AkselPage, Heading } from '@navikt/ds-react';

export const ContentWrapper = ({ children, pageTitle }: { children: React.ReactNode; pageTitle: React.ReactNode }) => {
    return (
        <AkselPage>
            <AkselPage.Block as="main" id="pageMainContent" width="text" gutters>
                {pageTitle && (
                    <AkselPage.Block>
                        <Heading size="large" level="1" spacing>
                            {pageTitle}
                        </Heading>
                    </AkselPage.Block>
                )}
                <AkselPage.Block>{children}</AkselPage.Block>
            </AkselPage.Block>
        </AkselPage>
    );
};
