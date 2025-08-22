import { CheckmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { Infobox } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

interface Props {
    erAlenesøker: boolean;
    fornavn: string;
}

export const JobberInfoboks = ({ erAlenesøker, fornavn }: Props) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="Arbeidssituasjon.Jobber.Infoboks.HarRettTilForeldrepenger"
                    values={{ erAlenesøker, navn: capitalizeFirstLetter(fornavn) }}
                />
            }
            color="green"
            icon={
                <CheckmarkIcon
                    height={24}
                    width={24}
                    color="var(--ax-bg-neutral-strong)"
                    fontSize="1.5rem"
                    aria-hidden
                />
            }
            shouldFadeIn
        >
            <BodyShort>
                <FormattedMessage
                    id="Arbeidssituasjon.Jobber.Infoboks.UtIfraInformasjonen"
                    values={{ erAlenesøker, navn: fornavn }}
                />
            </BodyShort>
        </Infobox>
    );
};
