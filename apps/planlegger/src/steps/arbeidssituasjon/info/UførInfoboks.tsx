import { CircleSlashIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Link } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

interface Props {
    erAlenesøker: boolean;
    fornavn: string;
}

const UførInfoboks: FunctionComponent<Props> = ({ erAlenesøker, fornavn }) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="Arbeidssituasjon.Infoboks.HarIkkeRettTilForeldrepenger"
                    values={{ erAlenesøker, navn: fornavn }}
                />
            }
            icon={<CircleSlashIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
        >
            <BodyShort>
                <FormattedMessage id="Arbeidssituasjon.Ufør.Infoboks.ErUfør" values={{ erAlenesøker, navn: fornavn }} />
            </BodyShort>
            <BodyShort>
                <FormattedMessage
                    id="Arbeidssituasjon.Ufør.Infoboks.LesMer"
                    values={{
                        a: (msg: any) => (
                            <Link inlineText href={links.hvorLenge} className="lenke" rel="noreferrer" target="_blank">
                                {msg}
                            </Link>
                        ),
                        navn: fornavn,
                        erAlenesøker,
                    }}
                />
            </BodyShort>
        </Infobox>
    );
};

export default UførInfoboks;
