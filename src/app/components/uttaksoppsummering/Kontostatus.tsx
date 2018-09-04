import * as React from 'react';
import { Stønadskontouttak } from './Uttaksoppsummering';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import StønadskontoIkon from '../periodeikon/St\u00F8nadskontoIkon';

export interface Props {
    uttak: Stønadskontouttak;
}

const Kontostatus: React.StatelessComponent<Props & InjectedIntlProps> = ({ uttak, intl }) => (
    <div className="kontostatus">
        <StønadskontoIkon konto={uttak.konto} />
        {uttak.konto}, {uttak.dager}
    </div>
);

export default injectIntl(Kontostatus);
