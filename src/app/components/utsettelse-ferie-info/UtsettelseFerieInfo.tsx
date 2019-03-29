import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Permisjonsregler } from '../../types/uttaksplan/permisjonsregler';
import { getVarighetString } from 'common/util/intlUtils';
import VeilederMeldinger from '../veilederpanel-innhold/VeilederpanelInnhold';

export interface Props {
    feriedager: number;
    permisjonsregler: Permisjonsregler;
}

const Ferieinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({ feriedager, permisjonsregler, intl }) => {
    if (feriedager <= permisjonsregler.maksFeriedagerEttÅr) {
        return (
            <VeilederMeldinger
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'utsettelseskjema.veiledning.ferie',
                        formatContentAsHTML: true
                    }
                ]}
            />
        );
    }
    const ukerOgDager = getVarighetString(feriedager, intl);
    if (feriedager > permisjonsregler.maksFeriedagerMedOverføring) {
        return (
            <VeilederMeldinger
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'utsettelseskjema.ferievarsel.ulovlig',
                        values: { ukerOgDager }
                    }
                ]}
            />
        );
    } else if (feriedager > permisjonsregler.maksFeriedagerEttÅr) {
        return (
            <VeilederMeldinger
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'utsettelseskjema.ferievarsel.kreveroverforing',
                        values: { ukerOgDager }
                    }
                ]}
            />
        );
    }
    return null;
};

export default injectIntl(Ferieinfo);
