import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../../../util/dates/dates';
import Oppsummeringsliste from 'app/steg/oppsummering/components/oppsummeringsliste/Oppsummeringsliste';
import { FrilansOppdrag } from '../../../../../../types/søknad/FrilansInformasjon';

interface FrilansoppdragOppsummeringslisteProps {
    frilansoppdrag: FrilansOppdrag[];
}

type Props = FrilansoppdragOppsummeringslisteProps & InjectedIntlProps;

const FrilansoppdragOppsummeringsliste: React.StatelessComponent<Props> = ({ frilansoppdrag, intl }: Props) => {
    return (
        <Oppsummeringsliste
            data={frilansoppdrag.map(({ navnPåArbeidsgiver, tidsperiode, pågående }) => ({
                venstrestiltTekst: navnPåArbeidsgiver,
                høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                    fom: formatDate(tidsperiode.fom),
                    tom: pågående ? 'pågående' : formatDate(tidsperiode.tom)
                })
            }))}
        />
    );
};
export default injectIntl(FrilansoppdragOppsummeringsliste);
