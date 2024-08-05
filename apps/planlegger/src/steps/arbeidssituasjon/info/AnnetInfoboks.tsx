import { CircleSlashIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Link } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Satser } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

dayjs.extend(isSameOrAfter);

interface Props {
    erAlenesøker: boolean;
    fornavn: string;
    erSøker2?: boolean;
    erFarOgFar: boolean;
    satser: Satser;
}

const AnnetInfoboks: FunctionComponent<Props> = ({ erAlenesøker, fornavn, erSøker2 = false, erFarOgFar, satser }) => {
    return (
        <Infobox
            header={
                <FormattedMessage
                    id="Arbeidssituasjon.Infoboks.HarIkkeRettTilForeldrepenger"
                    values={{ erAlenesøker, navn: fornavn }}
                />
            }
            color="green"
            icon={<CircleSlashIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
        >
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
            <BodyShort>
                <FormattedMessage
                    id="Arbeidssituasjon.Ingen.Infoboks.NoenUtbetalinger"
                    values={{
                        a: (msg: any) => (
                            <Link inlineText href={links.foreldrepengerOpptjening} target="_blank">
                                {msg}
                            </Link>
                        ),
                    }}
                />
            </BodyShort>
        </Infobox>
    );
};

export default AnnetInfoboks;
