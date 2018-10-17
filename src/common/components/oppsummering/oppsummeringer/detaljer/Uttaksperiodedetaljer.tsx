import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Periode } from '../../../../../app/types/uttaksplan/periodetyper';

interface UttaksperiodedetaljerProps {
    periode: Periode;
}

type Props = UttaksperiodedetaljerProps & InjectedIntlProps;

const Uttaksperiodedetaljer: React.StatelessComponent<Props> = ({ periode, intl }) => {
    return null;
};

export default injectIntl(Uttaksperiodedetaljer);
