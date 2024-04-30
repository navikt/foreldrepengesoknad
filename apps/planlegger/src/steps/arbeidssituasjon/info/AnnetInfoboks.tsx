import { CircleSlashIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Link } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

interface Props {
    erAlenesøker: boolean;
    fornavn: string;
    erSøker2?: boolean;
    erFarOgFar: boolean;
}

const AnnetInfoboks: FunctionComponent<Props> = ({ erAlenesøker, fornavn, erSøker2 = false, erFarOgFar }) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="Arbeidssituasjon.Infoboks.HarIkkeRettTilForeldrepenger"
                    values={{ erAlenesøker, navn: fornavn }}
                />
            }
            icon={<CircleSlashIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
        >
            <BodyShort>
                <FormattedMessage id="Arbeidssituasjon.Ingen.Infoboks.ManHarIkkeRett" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage
                    id="Arbeidssituasjon.Ingen.Infoboks.ManHarIkkeRettAnnenPart"
                    values={{
                        a: (msg: any) => (
                            <Link inlineText href={links.foreldrepenger} target="_blank">
                                {msg}
                            </Link>
                        ),
                    }}
                />
            </BodyShort>
            {!erSøker2 && !erFarOgFar && (
                <BodyShort>
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
                </BodyShort>
            )}
        </Infobox>
    );
};

export default AnnetInfoboks;
