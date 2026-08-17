import { KronerIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

interface Props {
    minÅrslønn: number;
    antattÅrslønn: number;
}

export const HarIkkeRettTilFpInfobox = ({ minÅrslønn, antattÅrslønn }: Props) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="HarIkkeRettTilFpInfobox.IkkeRett"
                    values={{ minÅrslønn: formatCurrencyWithKr(minÅrslønn) }}
                />
            }
            icon={<KronerIcon fontSize="1.5rem" aria-hidden />}
            color="green"
        >
            <VStack gap="space-16">
                <BodyShort>
                    <FormattedMessage
                        id="HarIkkeRettTilFpInfobox.AntattLønn"
                        values={{
                            b: (msg) => <b>{msg}</b>,
                            antattÅrslønn: formatCurrencyWithKr(antattÅrslønn),
                            minÅrslønn: formatCurrencyWithKr(minÅrslønn),
                        }}
                    />
                </BodyShort>
                <BodyShort>
                    <FormattedMessage id="HarIkkeRettTilFpInfobox.Lenke1" />
                    <Link inlineText href={links.veiviser} rel="noreferrer" target="_blank">
                        <FormattedMessage id="HarIkkeRettTilFpInfobox.Lenke2" />
                    </Link>
                    <FormattedMessage id="HarIkkeRettTilFpInfobox.Lenke3" />
                </BodyShort>
            </VStack>
        </Infobox>
    );
};
