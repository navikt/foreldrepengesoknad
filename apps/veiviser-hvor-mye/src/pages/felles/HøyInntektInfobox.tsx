import { InformationIcon, KronerIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HStack, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

interface Props {
    maxÅrslønnDekket: number;
    isGray?: boolean;
    showKrIcon?: boolean;
}

const HøyInntektInfobox: React.FunctionComponent<Props> = ({
    maxÅrslønnDekket,
    isGray = false,
    showKrIcon = false,
}) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="HøyInntektInfobox.DelvisDekning"
                    values={{ maxÅrslønn: formatCurrencyWithKr(maxÅrslønnDekket) }}
                />
            }
            color={isGray ? 'gray' : 'green'}
            icon={
                showKrIcon ? (
                    <KronerIcon title="a11y-title" fontSize="1.5rem" aria-hidden />
                ) : (
                    <InformationIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />
                )
            }
        >
            <HStack gap="2">
                <VStack gap="4">
                    <BodyShort>
                        <FormattedMessage id="HøyInntektInfobox.OppgittHøyereInntekt" />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id="HøyInntektInfobox.HøyereLenke1"
                            values={{ maxÅrslønn: formatCurrencyWithKr(maxÅrslønnDekket) }}
                        />
                        <Link inlineText href={links.grunnbeløpet} className="lenke" rel="noreferrer" target="_blank">
                            <FormattedMessage id="HøyInntektInfobox.HøyereLenke2" />
                        </Link>
                    </BodyShort>
                </VStack>
            </HStack>
        </Infobox>
    );
};

export default HøyInntektInfobox;
