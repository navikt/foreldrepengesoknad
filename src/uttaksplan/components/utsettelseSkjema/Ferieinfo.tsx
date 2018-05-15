import * as React from 'react';
import { Permisjonsregler } from 'uttaksplan/types';
import Veilederinfo from 'uttaksplan/elements/veilederinfo/Veilederinfo';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { getVarighetString } from 'uttaksplan/utils/intlUtils';

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
                <FormattedMessage id="utsettelseskjema.veiledning.ferie" />
            </Veilederinfo>
        );
    }
    const ukerOgDager = getVarighetString(feriedager, intl);
    if (feriedager > permisjonsregler.maksFeriedagerMedOverføring) {
        return (
            <Veilederinfo type="feil">
                <FormattedMessage
                    id="utsettelseskjema.ferievarsel.ulovlig"
                    values={{ ukerOgDager, forelderNavn }}
                />
            </Veilederinfo>
        );
    } else if (feriedager > permisjonsregler.maksFeriedagerEttÅr) {
        return (
            <Veilederinfo type="advarsel">
                <FormattedMessage
                    id="utsettelseskjema.ferievarsel.kreveroverforing"
                    values={{ ukerOgDager, forelderNavn }}
                />
            </Veilederinfo>
        );
    }
    return null;
};

export default injectIntl(Ferieinfo);
