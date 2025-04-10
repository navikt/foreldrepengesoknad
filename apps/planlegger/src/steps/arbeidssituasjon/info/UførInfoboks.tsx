import { CircleSlashIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Infobox } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

interface Props {
    erAlenesøker: boolean;
    fornavn: string;
}

export const UførInfoboks = ({ erAlenesøker, fornavn }: Props) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="Arbeidssituasjon.Infoboks.HarIkkeRettTilForeldrepenger"
                    values={{ erAlenesøker, navn: capitalizeFirstLetter(fornavn) }}
                />
            }
            color="green"
            icon={<CircleSlashIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
        >
            <VStack gap="2">
                <BodyShort>
                    <FormattedMessage
                        id="Arbeidssituasjon.Ufør.Infoboks.ErUfør"
                        values={{ erAlenesøker, navn: fornavn }}
                    />
                </BodyShort>
                <BodyShort>
                    <FormattedMessage
                        id="Arbeidssituasjon.Ufør.Infoboks.LesMer"
                        values={{
                            a: (msg: any) => (
                                <Link inlineText href={links.hvorLenge} rel="noreferrer" target="_blank">
                                    {msg}
                                </Link>
                            ),
                            hvem: fornavn,
                            erAlenesøker,
                        }}
                    />
                </BodyShort>
            </VStack>
        </Infobox>
    );
};
