import * as React from 'react';

import { Dekningsgrad, NavnPåForeldre } from 'common/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import AnnenForelder from '../../../../app/types/søknad/AnnenForelder';
import Arbeidsforhold from '../../../../app/types/Arbeidsforhold';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import { Periode } from '../../../../app/types/uttaksplan/periodetyper';
import { Tilleggsopplysning } from 'app/types/søknad/Søknad';
import UttaksplanOppsummeringsliste from 'common/components/oppsummering/oppsummeringer/lister/UttaksplanOppsummeringsliste';
import { UttaksplanValideringState } from 'app/redux/reducers/uttaksplanValideringReducer';
import getMessage from 'common/util/i18nUtils';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Søknadsinfo } from 'app/selectors/types';

interface OwnProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: Arbeidsforhold[];
    uttaksplanValidering: UttaksplanValideringState;
    dekningsgrad: Dekningsgrad;
    antallUkerUttaksplan: number;
    annenForelder: AnnenForelder;
    begrunnelseForSenEndring?: Tilleggsopplysning;
    begrunnelseForSenEndringVedlegg?: Attachment[];
    søknadsinfo: Søknadsinfo;
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
