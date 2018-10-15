import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../app/util/dates/dates';
import Oppsummeringsliste from 'common/components/oppsummering/oppsummeringsliste/Oppsummeringsliste';
import { Næring } from '../../../../app/types/søknad/SelvstendigNæringsdrivendeInformasjon';

interface SelvstendigNæringsdrivendeOppsummeringslisteProps {
    næringer: Næring[];
}

type Props = SelvstendigNæringsdrivendeOppsummeringslisteProps & InjectedIntlProps;

const SelvstendigNæringsdrivendeOppsummeringsliste: React.StatelessComponent<Props> = ({ næringer, intl }: Props) => {
    return (
        <Oppsummeringsliste
            data={næringer.map(({ navnPåNæringen, tidsperiode, pågående }) => ({
                venstrestiltTekst: navnPåNæringen,
                høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                    fom: formatDate(tidsperiode.fom),
                    tom: pågående ? 'pågående' : formatDate(tidsperiode.tom)
                })
            }))}
        />
    );
};
export default injectIntl(SelvstendigNæringsdrivendeOppsummeringsliste);
