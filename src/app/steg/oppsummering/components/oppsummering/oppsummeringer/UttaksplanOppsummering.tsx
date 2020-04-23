import * as React from 'react';

import { Dekningsgrad, NavnPåForeldre } from 'common/types';
import { useIntl } from 'react-intl';

import AnnenForelder from '../../../../../types/søknad/AnnenForelder';
import Arbeidsforhold from '../../../../../types/Arbeidsforhold';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';
import Oppsummeringsseksjon from 'app/steg/oppsummering/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import { Periode } from '../../../../../types/uttaksplan/periodetyper';
import { Tilleggsopplysning } from 'app/types/søknad/Søknad';
import UttaksplanOppsummeringsliste from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/lister/UttaksplanOppsummeringsliste';
import { UttaksplanValideringState } from 'app/redux/reducers/uttaksplanValideringReducer';
import getMessage from 'common/util/i18nUtils';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
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
    eksisterendeUttaksplan?: Periode[];
}

type Props = OwnProps;

const UttaksplanOppsummering: React.FunctionComponent<Props> = ({ dekningsgrad, antallUkerUttaksplan, ...rest }) => {
    const intl = useIntl();

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
};

export default UttaksplanOppsummering;
