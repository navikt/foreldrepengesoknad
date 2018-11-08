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
import { getPermisjonsregler } from 'app/util/uttaksplan/permisjonsregler';

interface OwnProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: Arbeidsforhold[];
    uttaksplanValidering: UttaksplanValideringState;
    dekningsgrad: Dekningsgrad;
}

type Props = OwnProps & InjectedIntlProps;

class UttaksplanOppsummering extends React.Component<Props> {
    render() {
        const { dekningsgrad, intl, ...rest } = this.props;
        const permisjonsregler = getPermisjonsregler();
        const antallUker =
            dekningsgrad === '100' ? permisjonsregler.antallUkerTotalt100 : permisjonsregler.antallUkerTotalt80;
        return (
            <Oppsummeringsseksjon>
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.dekningsgrad.label')}
                    verdi={getMessage(intl, `oppsummering.dekningsgrad.verdi${dekningsgrad}`, {
                        antallUker
                    })}
                />
                <UttaksplanOppsummeringsliste {...rest} />
            </Oppsummeringsseksjon>
        );
    }
}

export default injectIntl(UttaksplanOppsummering);
