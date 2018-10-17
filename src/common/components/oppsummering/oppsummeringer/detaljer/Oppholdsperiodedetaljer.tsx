import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Periode } from '../../../../../app/types/uttaksplan/periodetyper';

interface OppholdsperiodedetaljerProps {
    periode: Periode;
}

type Props = OppholdsperiodedetaljerProps & InjectedIntlProps;

const Oppholdsperiodedetaljer: React.StatelessComponent<Props> = ({ periode, intl }) => {
    return null;
};

export default injectIntl(Oppholdsperiodedetaljer);
