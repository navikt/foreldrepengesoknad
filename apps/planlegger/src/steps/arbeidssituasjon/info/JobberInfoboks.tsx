import { CheckmarkIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

interface Props {
    erAlenesøker: boolean;
    fornavn: string;
    erSøker2?: boolean;
}

const JobberInfoboks: FunctionComponent<Props> = ({ erAlenesøker, fornavn, erSøker2 = false }) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="Arbeidssituasjon.Jobber.Infoboks.HarRettTilForeldrepenger"
                    values={{ erAlenesøker, navn: fornavn }}
                />
            }
            icon={<CheckmarkIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
        >
            <BodyShort>
                {!erSøker2 && (
                    <FormattedMessage
                        id="Arbeidssituasjon.Jobber.Infoboks.UtIfraInformasjonen"
                        values={{ erAlenesøker, navn: fornavn }}
                    />
                )}
                {erSøker2 && (
                    <FormattedMessage
                        id="Arbeidssituasjon.Jobber.Infoboks.HarJobbetSeksAvTiMnd"
                        values={{ erAlenesøker, navn: fornavn }}
                    />
                )}
            </BodyShort>
        </Infobox>
    );
};

export default JobberInfoboks;
