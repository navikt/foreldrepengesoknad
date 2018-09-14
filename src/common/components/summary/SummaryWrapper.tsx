import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import getMessage from 'common/util/i18nUtils';
import Søknad from '../../../app/types/søknad/Søknad';
import SøkerPersonalia from 'common/components/søker-personalia/SøkerPersonalia';
import RelasjonTilBarnSummary from 'common/components/summary/steg/RelasjonTilBarnSummary';
import { formaterNavn } from 'app/util/domain/personUtil';
import AnnenForelderSummary from 'common/components/summary/steg/OppsummeringAnnenForelder';
import { Søkerinfo } from '../../../app/types/søkerinfo';
import { skalSøkerLasteOppTerminbekreftelse } from '../../../app/util/validation/steg/barn';
import UtenlandsoppholdSummary from 'common/components/summary/steg/UtenlandsoppholdSummary';
import Summary from 'common/components/summary/Summary';
import Block from 'common/components/block/Block';

import './summaryWrapper.less';

interface OppsummeringProps {
    className?: string;
    søkerinfo: Søkerinfo;
    søknad: Søknad;
}

type Props = OppsummeringProps & InjectedIntlProps;
class SummaryWrapper extends React.Component<Props> {
    render() {
        const { className, søkerinfo, søknad, intl } = this.props;
        const { person } = søkerinfo;
        return (
            <div className={className}>
                <Veilederinfo>{getMessage(intl, 'oppsummering.veileder')}</Veilederinfo>
                <div className="summaryWrapper">
                    <Block margin="xs">
                        <SøkerPersonalia
                            navn={formaterNavn(person.fornavn, person.etternavn, person.mellomnavn)}
                            fnr={person.fnr}
                            kjønn={person.kjønn}
                        />
                    </Block>

                    <Summary tittel={getMessage(intl, 'oppsummering.relasjonTilBarn')} tittelProps={'undertittel'}>
                        <RelasjonTilBarnSummary
                            barn={søknad.barn}
                            annenForelder={søknad.annenForelder}
                            situasjon={this.props.søknad.situasjon}
                            skalLasteOppTerminbekreftelse={skalSøkerLasteOppTerminbekreftelse(søknad, søkerinfo)}
                        />
                    </Summary>

                    <Summary tittel={getMessage(intl, 'oppsummering.annenForelder')} tittelProps={'undertittel'}>
                        <AnnenForelderSummary
                            annenForelder={søknad.annenForelder}
                            erAleneOmOmsorg={søknad.søker.erAleneOmOmsorg}
                        />
                    </Summary>

                    <Summary tittel={getMessage(intl, 'oppsummering.utenlandsopphold')} tittelProps={'undertittel'}>
                        <UtenlandsoppholdSummary
                            informasjonOmUtenlandsopphold={søknad.informasjonOmUtenlandsopphold}
                            erBarnetFødt={søknad.barn.erBarnetFødt}
                        />
                    </Summary>
                </div>
            </div>
        );
    }
}
export default injectIntl(SummaryWrapper);
