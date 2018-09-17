import * as React from 'react';
import { Stønadskontouttak } from './Uttaksoppsummering';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import BEMHelper from 'common/util/bem';

import { getVarighetString } from 'common/util/intlUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import { getStønadskontoNavn } from '../../util/uttaksplan';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';

import './kontostatus.less';
import StønadskontoIkon from '../uttaksplan-ikon/StønadskontoIkon';

export interface Props {
    uttak: Stønadskontouttak;
    navnMor: string;
    navFarMedmor?: string;
}

const BEM = BEMHelper('kontostatus');

const getTittel = ({ uttak, intl, navnMor, navFarMedmor }: Props & InjectedIntlProps): string => {
    const kontonavn = getStønadskontoNavn(uttak.konto, intl);
    if (uttak.konto === StønadskontoType.ForeldrepengerFørFødsel || !uttak.forelder) {
        return kontonavn;
    }
    return getStønadskontoNavn(uttak.konto, intl);
};

const Kontostatus: React.StatelessComponent<Props & InjectedIntlProps> = ({ uttak, navnMor, navFarMedmor, intl }) => (
    <Normaltekst className={BEM.className} tag="div">
        <div className={BEM.element('ikon')}>
            <StønadskontoIkon konto={uttak.konto} />
        </div>
        <div className={BEM.element('content')}>
            <div className={BEM.element('konto')}>{getTittel({ uttak, navnMor, navFarMedmor, intl })}</div>
            <strong className={BEM.element('dager')}>{getVarighetString(uttak.dagerGjennstående, intl)}</strong>
        </div>
    </Normaltekst>
);

export default injectIntl(Kontostatus);
