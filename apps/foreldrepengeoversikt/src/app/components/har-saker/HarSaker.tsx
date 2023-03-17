import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils, guid } from '@navikt/fp-common';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { GruppertSak } from 'app/types/GruppertSak';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { getSakTittel, getSakUndertittel } from 'app/utils/sakerUtils';
import EtBarn from 'assets/EtBarn';
import ToBarn from 'assets/ToBarn';
import TreBarn from 'assets/TreBarn';
import React from 'react';
import { useIntl } from 'react-intl';
import SakLink from '../sak-link/SakLink';

import './har-saker.css';

interface Props {
    grupperteSaker: GruppertSak[];
}

const getIkonForAntallBarn = (antallBarn: number) => {
    switch (antallBarn) {
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
                    gruppering.type
                );
                const undertittel = getSakUndertittel(
                    gruppering.barn?.fornavn,
                    gruppering.barn?.fødselsdatoer,
                    gruppering.type,
                    ISOStringToDate(gruppering.familiehendelsedato)!,
                    !!gruppering.barn?.alleBarnaLever
                );
                return (
                    <div className={bem.block} key={gruppering.familiehendelsedato}>
                        <Heading size="small" level="2" className={bem.element('tittel')}>
                            {getIkonForAntallBarn(gruppering.antallBarn)}
                            <div>
                                <div>{tittel}</div>
                                {undertittel && <BodyShort size="medium">{undertittel}</BodyShort>}
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
