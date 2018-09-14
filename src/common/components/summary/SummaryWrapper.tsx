import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import getMessage from 'common/util/i18nUtils';
import Søknad from '../../../app/types/søknad/Søknad';
import SøkerPersonalia from 'common/components/søker-personalia/SøkerPersonalia';
import RelasjonTilBarnSummary from 'common/components/summary/steg/RelasjonTilBarnSummary';
import { formaterNavn } from 'app/util/domain/personUtil';
import AnnenForelderSummary from 'common/components/summary/steg/OppsummeringAnnenForelder';
import Block from 'common/components/block/Block';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Søkerinfo } from '../../../app/types/søkerinfo';
import { skalSøkerLasteOppTerminbekreftelse } from '../../../app/util/validation/steg/barn';

import './summaryWrapper.less';
import UtenlandsoppholdSummary from 'common/components/summary/steg/UtenlandsoppholdSummary';

interface OppsummeringProps {
    className?: string;
    søkerinfo: Søkerinfo;
    søknad: Søknad;
}

interface State {
    relasjonTilBarnSummaryOpen: boolean;
    annenForelderSummaryOpen: boolean;
}

type Props = OppsummeringProps & InjectedIntlProps;
class SummaryWrapper extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            relasjonTilBarnSummaryOpen: false,
            annenForelderSummaryOpen: false
        };
    }

    render() {
        const { className, søkerinfo, søknad, intl } = this.props;
        const { person } = søkerinfo;
        return (
            <div className={className}>
                <Veilederinfo>{getMessage(intl, 'oppsummering.veileder')}</Veilederinfo>
                <div className="summaryWrapper">
                    <SøkerPersonalia
                        navn={formaterNavn(person.fornavn, person.etternavn, person.mellomnavn)}
                        fnr={person.fnr}
                        kjønn={person.kjønn}
                    />

                    <Block animated={false}>
                        <Ekspanderbartpanel
                            tittel={getMessage(intl, 'oppsummering.relasjonTilBarn')}
                            tittelProps={'undertittel'}
                            onClick={() =>
                                this.setState({ relasjonTilBarnSummaryOpen: !this.state.relasjonTilBarnSummaryOpen })
                            }>
                            <RelasjonTilBarnSummary
                                barn={søknad.barn}
                                annenForelder={søknad.annenForelder}
                                situasjon={this.props.søknad.situasjon}
                                skalLasteOppTerminbekreftelse={skalSøkerLasteOppTerminbekreftelse(søknad, søkerinfo)}
                            />
                        </Ekspanderbartpanel>
                    </Block>

                    <Block animated={false}>
                        <Ekspanderbartpanel
                            tittel={getMessage(intl, 'oppsummering.annenForelder')}
                            tittelProps={'undertittel'}
                            onClick={() =>
                                this.setState({ annenForelderSummaryOpen: !this.state.annenForelderSummaryOpen })
                            }>
                            <AnnenForelderSummary
                                annenForelder={søknad.annenForelder}
                                erAleneOmOmsorg={søknad.søker.erAleneOmOmsorg}
                            />
                        </Ekspanderbartpanel>
                    </Block>
                    <Block animated={false}>
                        <Ekspanderbartpanel
                            tittel={getMessage(intl, 'oppsummering.utenlandsopphold')}
                            tittelProps={'undertittel'}
                            onClick={() =>
                                this.setState({ annenForelderSummaryOpen: !this.state.annenForelderSummaryOpen })
                            }>
                            <UtenlandsoppholdSummary
                                informasjonOmUtenlandsopphold={søknad.informasjonOmUtenlandsopphold}
                                erBarnetFødt={søknad.barn.erBarnetFødt}
                            />
                        </Ekspanderbartpanel>
                    </Block>
                </div>
            </div>
        );
    }
}
export default injectIntl(SummaryWrapper);
