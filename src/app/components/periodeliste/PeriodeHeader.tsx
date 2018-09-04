import * as React from 'react';
import classnames from 'classnames';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplanIkon/UttaksplanIkon';
import PeriodeIkon from '../periodeikon/Periodeikon';
import { getPeriodeBorderModifierClass } from '../../util/uttaksplan/styleUtils';
import { getVarighetString } from 'common/util/intlUtils';
import { Tidsperioden } from '../../util/uttaksplan/Tidsperioden';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';

import './periodeheader.less';
import { måned, måned3bokstaver } from 'common/util/datoUtils';

export type AdvarselType = 'advarsel' | 'feil';

interface Advarsel {
    beskrivelse: string;
    type: AdvarselType;
}

export interface Props {
    periode: Periode;
    advarsel?: Advarsel;
    foreldernavn: string;
}

const BEM = BEMHelper('periodeheader');

const getIkonForAdvarsel = (advarsel: Advarsel): UttaksplanIkonKeys => {
    return UttaksplanIkonKeys.advarsel;
};

const getPeriodeTittel = (periode: Periode, foreldernavn: string): string => {
    if (periode.type === Periodetype.Uttak) {
        return `${foreldernavn} sin kvote`;
    }
    if (periode.type === Periodetype.Utsettelse) {
        return `Utsettelse - ${periode.årsak}`;
    }
    return '';
};

const renderDagMnd = (dato: Date): JSX.Element => (
    <div className={BEM.element('dagmnd')}>
        <span className={BEM.element('dagmnd__dato')}>{dato.getDate()}.</span>
        <EtikettLiten tag="span" className={BEM.element('dagmnd__mnd')}>
            <span className={BEM.element('dagmnd__mnd', 'kort')}>
                <abbr title={måned(dato)}>{måned3bokstaver(dato)}</abbr>.
            </span>
            <span className={BEM.element('dagmnd__mnd', 'full')}>{måned(dato)}</span>
        </EtikettLiten>
    </div>
);

const PeriodeHeader: React.StatelessComponent<Props & InjectedIntlProps> = ({
    periode,
    advarsel,
    foreldernavn,
    intl
}) => {
    return (
        <article className={classnames(BEM.className, getPeriodeBorderModifierClass(periode), 'typo-normal')}>
            <div className={BEM.element('ikon')} role="presentation" aria-hidden={true}>
                <PeriodeIkon periode={periode} />
            </div>
            <div className={BEM.element('beskrivelse')}>
                <Element tag="h1">{getPeriodeTittel(periode, foreldernavn)}</Element>
                <Normaltekst>
                    {getVarighetString(Tidsperioden(periode.tidsperiode).getAntallUttaksdager(), intl)}
                    <em className={BEM.element('hvem')}> - {foreldernavn}</em>
                </Normaltekst>
            </div>
            {advarsel && (
                <div className={BEM.element('advarsel')}>
                    <UttaksplanIkon ikon={getIkonForAdvarsel(advarsel)} />
                </div>
            )}
            <div className={BEM.element('tidsrom')}>
                {renderDagMnd(periode.tidsperiode.fom)}
                -
                {renderDagMnd(periode.tidsperiode.tom)}
            </div>
        </article>
    );
};

export default injectIntl(PeriodeHeader);
