import * as React from 'react';
import { Stønadskontouttak } from './Uttaksoppsummering';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import BEMHelper from 'common/util/bem';

import { getVarighetString } from 'common/util/intlUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import { getStønadskontoNavn, getForelderNavn } from '../../util/uttaksplan';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';

import './kontostatus.less';
import StønadskontoIkon from '../uttaksplan-ikon/St\u00F8nadskontoIkon';

export interface Props {
    uttak: Stønadskontouttak;
    navnForelder1: string;
    navnForelder2?: string;
}

const BEM = BEMHelper('kontostatus');

const getTittel = ({ uttak, intl, navnForelder1, navnForelder2 }: Props & InjectedIntlProps): string => {
    const kontonavn = getStønadskontoNavn(uttak.konto, intl);
    if (uttak.konto === StønadskontoType.ForeldrepengerFørFødsel || !uttak.forelder) {
        return kontonavn;
    }
    return `${getForelderNavn(uttak.forelder, navnForelder1, navnForelder2)} sin kvote`;
};

const Kontostatus: React.StatelessComponent<Props & InjectedIntlProps> = ({
    uttak,
    navnForelder1,
    navnForelder2,
    intl
}) => (
    <Normaltekst className={BEM.className} tag="div">
        <div className={BEM.element('ikon')}>
            <StønadskontoIkon konto={uttak.konto} />
        </div>
        <div className={BEM.element('content')}>
            <div className={BEM.element('konto')}>{getTittel({ uttak, navnForelder1, navnForelder2, intl })}</div>
            <strong className={BEM.element('dager')}>{getVarighetString(uttak.dagerGjennstående, intl)}</strong>
        </div>
    </Normaltekst>
);

export default injectIntl(Kontostatus);
