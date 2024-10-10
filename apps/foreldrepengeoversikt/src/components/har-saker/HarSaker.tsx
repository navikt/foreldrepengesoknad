import { useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { SakLink } from '../sak-link/SakLink';
import { useSetBackgroundColor } from './../../hooks/useBackgroundColor';
import { GruppertSak } from './../../types/GruppertSak';
import { guid } from './../../utils/guid';
import { getSakTittel } from './../../utils/sakerUtils';

interface Props {
    grupperteSaker: GruppertSak[];
    harMinstEttArbeidsforhold: boolean;
}

const HarSaker: React.FunctionComponent<Props> = ({ grupperteSaker, harMinstEttArbeidsforhold }) => {
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
                                return (
                                    <SakLink
                                        key={guid()}
                                        sak={sak}
                                        harMinstEttArbeidsforhold={harMinstEttArbeidsforhold}
                                    />
                                );
                            })}
                        </VStack>
                    </div>
                );
            })}
        </>
    );
};

export default HarSaker;
