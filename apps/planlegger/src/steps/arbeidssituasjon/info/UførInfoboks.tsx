import { XMarkIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyLong, Link } from '@navikt/ds-react';

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
            icon={<XMarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
            shouldFadeIn
        >
            <BodyLong>
                <FormattedMessage id="Arbeidssituasjon.Ufør.Infoboks.ErUfør" values={{ erAlenesøker, navn: fornavn }} />
            </BodyLong>
            <BodyLong>
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
            </BodyLong>
        </Infobox>
    );
};

export default UførInfoboks;
