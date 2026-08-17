import { ReactNode } from 'react';

import { Page as AkselPage, Box } from '@navikt/ds-react';

interface Props {
    header: ReactNode;
    children: React.ReactElement | React.ReactElement[];
}

export const Page = ({ header, children }: Props) => {
    return (
        <AkselPage contentBlockPadding="none" className="bg-ax-neutral-200 pt-4 pb-4 max-[1023px]:pt-0">
            {/* Éin samla main-landemerke for tittel + innhald. Sida sjølv skal ikkje ha sitt eige
                banner-landemerke – det globale headeren/footeren kjem frå Nav-dekoratøren. */}
            <AkselPage.Block
                as="main"
                width="lg"
                className="max-[1023px]:flex max-[1023px]:flex-col max-[1023px]:h-full"
            >
                <Box background="default" className="rounded-t-[8px] max-[1023px]:rounded-none">
                    {header}
                </Box>
                <Box
                    background="default"
                    paddingInline={{ xs: 'space-16', lg: 'space-32' }}
                    paddingBlock={{ xs: 'space-24', lg: 'space-32' }}
                    className="rounded-b-[8px] max-[1023px]:rounded-none max-[1023px]:flex-1 max-[1023px]:flex max-[1023px]:flex-col"
                >
                    {children}
                </Box>
            </AkselPage.Block>
        </AkselPage>
    );
};
