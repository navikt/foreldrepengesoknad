import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Periode } from '../../../../../app/types/uttaksplan/periodetyper';

interface OverføringsperiodedetaljerProps {
    periode: Periode;
}

type Props = OverføringsperiodedetaljerProps & InjectedIntlProps;

const Overføringsperiodedetaljer: React.StatelessComponent<Props> = ({ periode, intl }) => {
    return null;
};

export default injectIntl(Overføringsperiodedetaljer);
