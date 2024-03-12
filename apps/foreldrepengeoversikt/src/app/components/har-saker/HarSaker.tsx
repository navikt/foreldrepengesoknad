import EtBarn from 'assets/EtBarn';
import ToBarn from 'assets/ToBarn';
import TreBarn from 'assets/TreBarn';
import { useIntl } from 'react-intl';

import { Heading } from '@navikt/ds-react';

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

const getIkonForAntallBarn = (antallBarn: number) => {
    switch (antallBarn) {
        case 0:
        case 1:
            return <EtBarn />;
        case 2:
            return <ToBarn />;
        default:
            return <TreBarn />;
    }
};

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
                            {getIkonForAntallBarn(gruppering.antallBarn)}
                            <div>
                                <div>{tittel}</div>
                            </div>
                        </Heading>
                        {gruppering.saker.map((sak) => {
                            return <SakLink key={guid()} sak={sak} />;
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default HarSaker;
