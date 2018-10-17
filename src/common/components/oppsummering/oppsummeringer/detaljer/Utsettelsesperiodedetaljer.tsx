import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Periode } from '../../../../../app/types/uttaksplan/periodetyper';

interface UtsettelsesperiodedetaljerProps {
    periode: Periode;
}

type Props = UtsettelsesperiodedetaljerProps & InjectedIntlProps;

const Utsettelsesperiodedetaljer: React.StatelessComponent<Props> = ({ periode, intl }) => {
    return null;
};

export default injectIntl(Utsettelsesperiodedetaljer);
