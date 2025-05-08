import { KronerIcon, SackKronerIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

interface Props {
    minÅrslønn: number;
    antattÅrslønn: number;
    showKrIcon?: boolean;
}

export const HarIkkeRettTilFpInfobox = ({ minÅrslønn, antattÅrslønn, showKrIcon = false }: Props) => {
    const locale = useIntl().locale;
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="HarIkkeRettTilFpInfobox.IkkeRett"
                    values={{ minÅrslønn: formatCurrencyWithKr(minÅrslønn, locale) }}
                />
            }
            headingLevel="2"
            icon={
                showKrIcon ? (
                    <KronerIcon title="a11y-title" fontSize="1.5rem" aria-hidden />
                ) : (
                    <SackKronerIcon title="a11y-title" fontSize="1.5rem" aria-hidden />
                )
            }
            color="green"
        >
            <VStack gap="4">
                <BodyShort>
                    <FormattedMessage
                        id="HarIkkeRettTilFpInfobox.AntattLønn"
                        values={{
                            b: (msg: any) => <b>{msg}</b>,
                            antattÅrslønn: formatCurrencyWithKr(antattÅrslønn, locale),
                            minÅrslønn: formatCurrencyWithKr(minÅrslønn, locale),
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
