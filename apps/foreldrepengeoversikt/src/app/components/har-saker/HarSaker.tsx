import { useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { GruppertSak } from 'app/types/GruppertSak';
import { guid } from 'app/utils/guid';
import { getSakTittel } from 'app/utils/sakerUtils';

import SakLink from '../sak-link/SakLink';

interface Props {
    grupperteSaker: GruppertSak[];
}

const HarSaker: React.FunctionComponent<Props> = ({ grupperteSaker }) => {
    const intl = useIntl();
    useSetBackgroundColor('blue');

    return (
        <>
            {grupperteSaker.map((gruppering) => {
                const { tittel, undertittel } = getSakTittel({
                    barngruppering: gruppering.barn,
                    familiehendelsedato: gruppering.familiehendelsedato,
                    intl,
                    antallBarn: gruppering.antallBarn,
                    situasjon: gruppering.type,
                });
                return (
                    <div key={gruppering.familiehendelsedato}>
                        <HStack gap="2" align="baseline">
                            <Heading size="small" level="2" spacing>
                                {tittel}
                            </Heading>
                            <BodyShort>{capitalizeFirstLetter(undertittel)}</BodyShort>
                        </HStack>
                        <VStack gap="2">
                            {gruppering.saker.map((sak) => {
                                return <SakLink key={guid()} sak={sak} />;
                            })}
                        </VStack>
                    </div>
                );
            })}
        </>
    );
};

export default HarSaker;
