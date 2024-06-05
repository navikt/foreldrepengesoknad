import { FormattedMessage } from 'react-intl';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

interface Props {
    maxÅrslønnDekket: number;
    isGray?: boolean;
}

const HøyInntektInfobox: React.FunctionComponent<Props> = ({ maxÅrslønnDekket, isGray = false }) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="HøyInntektInfobox.DelvisDekning"
                    values={{ maxÅrslønn: formatCurrencyWithKr(maxÅrslønnDekket) }}
                />
            }
            isGray={isGray}
        >
            <VStack gap="4">
                <BodyShort>
                    <FormattedMessage id="HøyInntektInfobox.OppgittHøyereInntekt" />
                </BodyShort>
                <BodyShort>
                    <FormattedMessage
                        id="HøyInntektInfobox.HøyereLenke1"
                        values={{ maxÅrslønn: formatCurrencyWithKr(maxÅrslønnDekket) }}
                    />
                    <Link inlineText href={links.engangsstonad} className="lenke" rel="noreferrer" target="_blank">
                        <FormattedMessage id="HøyInntektInfobox.HøyereLenke2" />
                    </Link>
                </BodyShort>
            </VStack>
        </Infobox>
    );
};

export default HøyInntektInfobox;
