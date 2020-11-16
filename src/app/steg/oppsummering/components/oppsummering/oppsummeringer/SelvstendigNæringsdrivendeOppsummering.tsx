import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Søker from '../../../../../types/søknad/Søker';
import Oppsummeringsseksjon from 'app/steg/oppsummering/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import SelvstendigNæringsdrivendeOppsummeringsliste from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/lister/SelvstendigNæringsdrivendeOppsummeringsliste';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';

interface SelvstendigNæringsdrivendeOppsummeringProps {
    søker: Søker;
}

type Props = SelvstendigNæringsdrivendeOppsummeringProps;

const SelvstendigNæringsdrivendeOppsummering = ({ søker }: Props) => {
    const intl = useIntl();
    const { selvstendigNæringsdrivendeInformasjon, harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd } = søker;

    if (selvstendigNæringsdrivendeInformasjon && harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        return (
            <Oppsummeringsseksjon tittel={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}>
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

export default SelvstendigNæringsdrivendeOppsummering;
