import * as React from 'react';
import { Periode } from '../../../../app/types/uttaksplan/periodetyper';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import UttaksplanOppsummeringsliste from 'common/components/oppsummering/oppsummeringer/lister/UttaksplanOppsummeringsliste';
import { NavnPåForeldre, Dekningsgrad } from 'common/types';
import Arbeidsforhold from '../../../../app/types/Arbeidsforhold';
import { UttaksplanValideringState } from 'app/redux/reducers/uttaksplanValideringReducer';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import AnnenForelder from '../../../../app/types/søknad/AnnenForelder';

interface OwnProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: Arbeidsforhold[];
    uttaksplanValidering: UttaksplanValideringState;
    dekningsgrad: Dekningsgrad;
    antallUkerUttaksplan: number;
    annenForelder: AnnenForelder;
}

type Props = OwnProps & InjectedIntlProps;

class UttaksplanOppsummering extends React.Component<Props> {
    render() {
        const { dekningsgrad, antallUkerUttaksplan, intl, ...rest } = this.props;
        return (
            <Oppsummeringsseksjon>
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.dekningsgrad.label')}
                    verdi={getMessage(intl, `oppsummering.dekningsgrad.verdi${dekningsgrad}`, {
                        antallUker: antallUkerUttaksplan
                    })}
                />
                <UttaksplanOppsummeringsliste {...rest} />
            </Oppsummeringsseksjon>
        );
    }
}

export default injectIntl(UttaksplanOppsummering);
