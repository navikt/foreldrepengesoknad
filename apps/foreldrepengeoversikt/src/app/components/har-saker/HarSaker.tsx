import { Heading } from '@navikt/ds-react';
import { bemUtils, formatDate, guid } from '@navikt/fp-common';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { GruppertSak } from 'app/types/GruppertSak';
import EtBarn from 'assets/EtBarn';
import React from 'react';
import SakLink from '../sak-link/SakLink';

import './har-saker.css';

interface Props {
    grupperteSaker: GruppertSak[];
}

export const getHeading = (type: 'fødsel' | 'termin' | 'adopsjon', antallBarn: number, familiehendelsedato: string) => {
    if (antallBarn === 0) {
        return `Barn med termin ${formatDate(familiehendelsedato)}`;
    }

    if (type === 'fødsel') {
        return `Barn født ${formatDate(familiehendelsedato)}`;
    }

    if (type === 'termin') {
        return `Barn med termin ${formatDate(familiehendelsedato)}`;
    }

    return `Barn med omsorgsovertakelse ${formatDate(familiehendelsedato)}`;
};

const HarSaker: React.FunctionComponent<Props> = ({ grupperteSaker }) => {
    const bem = bemUtils('har-saker');
    useSetBackgroundColor('blue');

    return (
        <>
            {grupperteSaker.map((gruppering) => {
                return (
                    <div className={bem.block} key={gruppering.familiehendelsedato}>
                        <Heading size="medium" level="2" className={bem.element('tittel')}>
                            <EtBarn />{' '}
                            {getHeading(gruppering.type, gruppering.antallBarn, gruppering.familiehendelsedato)}
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
