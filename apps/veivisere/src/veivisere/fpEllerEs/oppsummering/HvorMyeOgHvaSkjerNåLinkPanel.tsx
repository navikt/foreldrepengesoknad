import { BabyWrappedIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

import AndreVeivisereLinkPanel from '../../felles/andreVeivisere/AndreVeivisereLinkPanel';

const HvorMyeOgHvaSkjerNåLinkPanel: React.FunctionComponent = () => {
    return (
        <AndreVeivisereLinkPanel
            links={[
                {
                    url: links.veiviser,
                    content: (
                        <HStack gap="5" align="center" wrap={false}>
                            <BabyWrappedIcon aria-hidden height={45} width={45} />
                            <Heading level="3" size="small">
                                <FormattedMessage id="HvorMyeOgHvaSkjerNåLinkPanel.HvorMye" />
                            </Heading>
                        </HStack>
                    ),
                },
                {
                    url: links.hvaSkjerNår,
                    content: (
                        <HStack gap="5" align="center" wrap={false}>
                            <MagnifyingGlassIcon aria-hidden height={45} width={45} />
                            <Heading level="3" size="small">
                                <FormattedMessage id="HvorMyeOgHvaSkjerNåLinkPanel.HvaSkjer" />
                            </Heading>
                        </HStack>
                    ),
                },
            ]}
        />
    );
};

export default HvorMyeOgHvaSkjerNåLinkPanel;
