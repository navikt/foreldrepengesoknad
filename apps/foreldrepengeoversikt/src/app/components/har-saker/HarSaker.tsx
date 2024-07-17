import { useIntl } from 'react-intl';

import { Heading, VStack } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { GruppertSak } from 'app/types/GruppertSak';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { guid } from 'app/utils/guid';
import { getSakTittel } from 'app/utils/sakerUtils';

import SakLink from '../sak-link/SakLink';
import './har-saker.css';

interface Props {
    grupperteSaker: GruppertSak[];
}

const HarSaker: React.FunctionComponent<Props> = ({ grupperteSaker }) => {
    const bem = bemUtils('har-saker');
    const intl = useIntl();
    useSetBackgroundColor('blue');

    return (
        <>
            {grupperteSaker.map((gruppering) => {
                const tittel = getSakTittel(
                    gruppering.barn?.fornavn,
                    gruppering.barn?.fødselsdatoer,
                    ISOStringToDate(gruppering.familiehendelsedato)!,
                    !!gruppering.barn?.alleBarnaLever,
                    gruppering.antallBarn,
                    intl,
                    gruppering.type,
                );
                return (
                    <div className={bem.block} key={gruppering.familiehendelsedato}>
                        <Heading size="small" level="2" className={bem.element('tittel')}>
                            {tittel}
                        </Heading>
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
