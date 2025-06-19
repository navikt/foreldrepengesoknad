import React from 'react';

import { Page as AkselPage, Heading } from '@navikt/ds-react';

interface PageProps {
    bannerTitle?: string;
    children: React.ReactNode;
}

export const Page = ({ bannerTitle, children }: PageProps) => {
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);
    // TODO: burde vi ha dette? Og hvis så har vel routeren en implementasjon for det?

    return (
        <AkselPage>
            <AkselPage.Block as="main" id="pageMainContent" width="text" gutters>
                {bannerTitle && (
                    <AkselPage.Block>
                        <Heading size="large" level="1" spacing>
                            {bannerTitle}
                        </Heading>
                    </AkselPage.Block>
                )}
                <AkselPage.Block>{children}</AkselPage.Block>
            </AkselPage.Block>
        </AkselPage>
    );
};
