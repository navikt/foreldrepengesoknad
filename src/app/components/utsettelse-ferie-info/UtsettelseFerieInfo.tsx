import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Permisjonsregler } from '../../types/uttaksplan/permisjonsregler';
import { getVarighetString } from 'common/util/intlUtils';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';
import VeilederpanelInnhold from '../veilederpanel-innhold/VeilederpanelInnhold';

export interface Props {
    feriedager: number;
    permisjonsregler: Permisjonsregler;
}

const Ferieinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({ feriedager, permisjonsregler, intl }) => {
    if (feriedager <= permisjonsregler.maksFeriedagerEttÅr) {
        return (
            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                <VeilederpanelInnhold
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'utsettelseskjema.veiledning.ferie',
                            formatContentAsHTML: true
                        }
                    ]}
                />
            </Veilederpanel>
        );
    }
    const ukerOgDager = getVarighetString(feriedager, intl);
    if (feriedager > permisjonsregler.maksFeriedagerMedOverføring) {
        return (
            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                <VeilederpanelInnhold
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'utsettelseskjema.ferievarsel.ulovlig',
                            values: { ukerOgDager }
                        }
                    ]}
                />
            </Veilederpanel>
        );
    } else if (feriedager > permisjonsregler.maksFeriedagerEttÅr) {
        return (
            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                <VeilederpanelInnhold
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'utsettelseskjema.ferievarsel.kreveroverforing',
                            values: { ukerOgDager }
                        }
                    ]}
                />
            </Veilederpanel>
        );
    }
    return null;
};

export default injectIntl(Ferieinfo);
