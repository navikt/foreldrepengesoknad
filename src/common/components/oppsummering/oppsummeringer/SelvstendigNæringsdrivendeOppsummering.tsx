import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Søker from '../../../../app/types/søknad/Søker';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import SelvstendigNæringsdrivendeOppsummeringsliste from 'common/components/oppsummering/oppsummeringer/lister/SelvstendigNæringsdrivendeOppsummeringsliste';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';

interface SelvstendigNæringsdrivendeOppsummeringProps {
    søker: Søker;
}

type Props = SelvstendigNæringsdrivendeOppsummeringProps & InjectedIntlProps;

const SelvstendigNæringsdrivendeOppsummering = ({ søker, intl }: Props) => {
    const { selvstendigNæringsdrivendeInformasjon, harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd } = søker;

    if (selvstendigNæringsdrivendeInformasjon && harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        return (
            <Oppsummeringsseksjon ingress={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}>
                <SelvstendigNæringsdrivendeOppsummeringsliste næringer={selvstendigNæringsdrivendeInformasjon} />
            </Oppsummeringsseksjon>
        );
    }

    return (
        <Oppsummeringsseksjon>
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}
                verdi={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.ikkeSelvstendigNæringsdrivende')}
            />
        </Oppsummeringsseksjon>
    );
};

export default injectIntl(SelvstendigNæringsdrivendeOppsummering);
