import * as React from 'react';
import { Permisjonsregler } from 'uttaksplan/types';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { getVarighetString } from 'uttaksplan/utils/intlUtils';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

export interface Props {
    forelderNavn: string;
    feriedager: number;
    permisjonsregler: Permisjonsregler;
}

const Ferieinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
    feriedager,
    permisjonsregler,
    forelderNavn,
    intl
}) => {
    if (feriedager <= permisjonsregler.maksFeriedagerEttÅr) {
        return (
            <Veilederinfo>
                <FormattedMessage id="uttaksplan.utsettelseskjema.veiledning.ferie" />
            </Veilederinfo>
        );
    }
    const ukerOgDager = getVarighetString(feriedager, intl);
    if (feriedager > permisjonsregler.maksFeriedagerMedOverføring) {
        return (
            <Veilederinfo type="feil">
                <FormattedMessage
                    id="uttaksplan.utsettelseskjema.ferievarsel.ulovlig"
                    values={{ ukerOgDager, forelderNavn }}
                />
            </Veilederinfo>
        );
    } else if (feriedager > permisjonsregler.maksFeriedagerEttÅr) {
        return (
            <Veilederinfo type="advarsel">
                <FormattedMessage
                    id="uttaksplan.utsettelseskjema.ferievarsel.kreveroverforing"
                    values={{ ukerOgDager, forelderNavn }}
                />
            </Veilederinfo>
        );
    }
    return null;
};

export default injectIntl(Ferieinfo);
