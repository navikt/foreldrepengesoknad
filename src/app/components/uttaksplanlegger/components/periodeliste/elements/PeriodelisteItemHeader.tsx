import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
import { Tidsperiode } from 'common/types';
import { måned3bokstaver, måned, år } from 'common/util/datoUtils';
import moment from 'moment';
import { getIkonForVeilederMelding } from 'app/util/validation/getAdvarselForPeriode';
import { VeilederMessage } from 'app/components/veileder-info/types';
import UttaksplanIkon from 'app/components/ikoner/uttaksplan-ikon/UttaksplanIkon';

import './periodeheader.less';

interface Props {
    isOpen?: boolean;
    tittel: string;
    ikon: React.ReactNode | undefined;
    beskrivelse?: React.ReactNode;
    melding?: VeilederMessage;
    tidsperiode?: Tidsperiode;
    type: 'periode' | 'info';
}

const BEM = BEMHelper('periodelisteItemHeader');

const renderDagMnd = (dato: Date): JSX.Element => {
    const d = moment.utc(dato);
    return dato ? (
        <div className={BEM.element('dagmnd')}>
            <span className={BEM.element('dagmnd__dato')}>
                {d.get('date')}. {måned3bokstaver(d)}.
            </span>
            <EtikettLiten tag="span" className={BEM.element('dagmnd__mnd')}>
                <abbr title={`${måned(d)} ${år(d)}`}>{år(d)}</abbr>
            </EtikettLiten>
        </div>
    ) : (
        <div className={BEM.element('dagmnd')}>-</div>
    );
};

const PeriodelisteItemHeader: React.StatelessComponent<Props> = ({
    type,
    isOpen,
    ikon,
    tittel,
    beskrivelse,
    melding,
    tidsperiode
}) => {
    return (
        <div className={BEM.modifier(type)}>
            <div
                className={classnames(BEM.block, 'typo-normal', {
                    [BEM.modifier('apnet')]: isOpen
                })}>
                <div className={BEM.element('ikon')} role="presentation" aria-hidden={true}>
                    {ikon}
                </div>
                <div className={BEM.element('beskrivelse')}>
                    <Element tag="h1">{tittel}</Element>
                    {beskrivelse && <Normaltekst>{beskrivelse}</Normaltekst>}
                </div>
                {melding && (
                    <div className={BEM.element('advarsel')}>
                        <span role="presentation">
                            <UttaksplanIkon ikon={getIkonForVeilederMelding(melding)} title={melding.contentIntlKey} />
                        </span>
                    </div>
                )}
                {tidsperiode && (
                    <div className={BEM.element('tidsrom')}>
                        {renderDagMnd(tidsperiode.fom)}
                        {renderDagMnd(tidsperiode.tom)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PeriodelisteItemHeader;
