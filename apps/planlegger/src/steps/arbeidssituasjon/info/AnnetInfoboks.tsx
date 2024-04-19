import { XMarkIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyLong, Link } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

interface Props {
    erAlenesøker: boolean;
    fornavn: string;
    erAnnenPart?: boolean;
}

const AnnetInfoboks: FunctionComponent<Props> = ({ erAlenesøker, fornavn, erAnnenPart = false }) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="Arbeidssituasjon.Infoboks.HarIkkeRettTilForeldrepenger"
                    values={{ erAlenesøker, navn: fornavn }}
                />
            }
            icon={<XMarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
        >
            <BodyLong>
                <FormattedMessage
                    id="Arbeidssituasjon.Ingen.Infoboks.ManHarIkkeRett"
                    values={{ erAlenesøker, navn: fornavn }}
                />
            </BodyLong>
            {!erAnnenPart && (
                <BodyLong>
                    <FormattedMessage
                        id="Arbeidssituasjon.Ingen.Infoboks.Engangsstønad"
                        values={{
                            a: (msg: any) => (
                                <Link
                                    inlineText
                                    href={links.veiviser}
                                    className="lenke"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    {msg}
                                </Link>
                            ),
                            navn: fornavn,
                            erAlenesøker,
                        }}
                    />
                </BodyLong>
            )}
        </Infobox>
    );
};

export default AnnetInfoboks;
