import { FormattedMessage } from 'react-intl';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

interface Props {
    minÅrslønn: number;
    antattÅrslønn: number;
    isGray?: boolean;
}

const HarIkkeRettTilFpInfobox: React.FunctionComponent<Props> = ({ minÅrslønn, antattÅrslønn, isGray = false }) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="HarIkkeRettTilFpInfobox.IkkeRett"
                    values={{ minÅrslønn: formatCurrencyWithKr(minÅrslønn) }}
                />
            }
            isGray={isGray}
        >
            <VStack gap="4">
                <BodyShort>
                    <FormattedMessage
                        id="HarIkkeRettTilFpInfobox.AntattLønn"
                        values={{
                            b: (msg: any) => <b>{msg}</b>,
                            antattÅrslønn: formatCurrencyWithKr(antattÅrslønn),
                            minÅrslønn: formatCurrencyWithKr(minÅrslønn),
                        }}
                    />
                </BodyShort>
                <BodyShort>
                    <FormattedMessage id="HarIkkeRettTilFpInfobox.Lenke1" />
                    <Link inlineText href={links.engangsstonad} className="lenke" rel="noreferrer" target="_blank">
                        <FormattedMessage id="HarIkkeRettTilFpInfobox.Lenke2" />
                    </Link>
                    <FormattedMessage id="HarIkkeRettTilFpInfobox.Lenke3" />
                </BodyShort>
            </VStack>
        </Infobox>
    );
};

export default HarIkkeRettTilFpInfobox;
