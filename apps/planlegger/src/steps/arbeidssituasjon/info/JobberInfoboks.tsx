import { CheckmarkIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { Infobox } from '@navikt/fp-ui';

interface Props {
    erAlenesøker: boolean;
    fornavn: string;
}

const JobberInfoboks: FunctionComponent<Props> = ({ erAlenesøker, fornavn }) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="Arbeidssituasjon.Jobber.Infoboks.HarRettTilForeldrepenger"
                    values={{ erAlenesøker, navn: fornavn }}
                />
            }
            color="green"
            icon={<CheckmarkIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
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

export default JobberInfoboks;
