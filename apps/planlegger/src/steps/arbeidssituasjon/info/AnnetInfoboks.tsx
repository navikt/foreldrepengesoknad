import { CircleSlashIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FormattedMessage } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Satser } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { capitalizeFirstLetter, formatCurrencyWithKr } from '@navikt/fp-utils';

dayjs.extend(isSameOrAfter);

interface Props {
    erAlenesøker: boolean;
    fornavn: string;
    erSøker2?: boolean;
    erFarOgFar: boolean;
    satser: Satser;
}

export const AnnetInfoboks = ({ erAlenesøker, fornavn, erSøker2 = false, erFarOgFar, satser }: Props) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="Arbeidssituasjon.Infoboks.HarIkkeRettTilForeldrepenger"
                    values={{ erAlenesøker, navn: capitalizeFirstLetter(fornavn) }}
                />
            }
            color="green"
            icon={
                <CircleSlashIcon
                    height={24}
                    width={24}
                    color="var(--ax-bg-neutral-strong)"
                    fontSize="1.5rem"
                    aria-hidden
                />
            }
            shouldFadeIn
        >
            <VStack gap="space-8">
                <BodyShort>
                    <FormattedMessage
                        id="Arbeidssituasjon.Ingen.Infoboks.ManHarIkkeRett"
                        values={{ minsteInntekt: formatCurrencyWithKr(finnSisteGrunnbeløp(satser) / 2) }}
                    />
                </BodyShort>
                {!erSøker2 && !erFarOgFar && (
                    <BodyShort>
                        <FormattedMessage
                            id="Arbeidssituasjon.Ingen.Infoboks.Engangsstønad"
                            values={{
                                a: (msg) => (
                                    <Link inlineText href={links.veiviser} rel="noreferrer" target="_blank">
                                        {msg}
                                    </Link>
                                ),
                                navn: capitalizeFirstLetter(fornavn),
                                erAlenesøker,
                            }}
                        />
                    </BodyShort>
                )}
                <BodyShort>
                    <FormattedMessage
                        id="Arbeidssituasjon.Ingen.Infoboks.NoenUtbetalinger"
                        values={{
                            a: (msg) => (
                                <Link inlineText href={links.foreldrepengerOpptjening} target="_blank" rel="noreferrer">
                                    {msg}
                                </Link>
                            ),
                        }}
                    />
                </BodyShort>
            </VStack>
        </Infobox>
    );
};
