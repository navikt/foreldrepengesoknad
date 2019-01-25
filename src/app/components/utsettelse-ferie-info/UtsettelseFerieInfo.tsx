import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Permisjonsregler } from '../../types/uttaksplan/permisjonsregler';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { getVarighetString } from 'common/util/intlUtils';

export interface Props {
    feriedager: number;
    permisjonsregler: Permisjonsregler;
}

const Ferieinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({ feriedager, permisjonsregler, intl }) => {
    if (feriedager <= permisjonsregler.maksFeriedagerEttÅr) {
        return (
            <Veilederinfo>
                <FormattedHTMLMessage tagName="div" id="utsettelseskjema.veiledning.ferie" />
            </Veilederinfo>
        );
    }
    const ukerOgDager = getVarighetString(feriedager, intl);
    if (feriedager > permisjonsregler.maksFeriedagerMedOverføring) {
        return (
            <Veilederinfo type="feil">
                <FormattedMessage id="utsettelseskjema.ferievarsel.ulovlig" values={{ ukerOgDager }} />
            </Veilederinfo>
        );
    } else if (feriedager > permisjonsregler.maksFeriedagerEttÅr) {
        return (
            <Veilederinfo type="advarsel">
                <FormattedMessage id="utsettelseskjema.ferievarsel.kreveroverforing" values={{ ukerOgDager }} />
            </Veilederinfo>
        );
    }
    return null;
};

export default injectIntl(Ferieinfo);
