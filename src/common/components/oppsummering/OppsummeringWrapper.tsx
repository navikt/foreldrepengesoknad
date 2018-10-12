import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import getMessage from 'common/util/i18nUtils';
import Søknad from '../../../app/types/søknad/Søknad';
import SøkerPersonalia from 'common/components/søker-personalia/SøkerPersonalia';
import { formaterNavn } from 'app/util/domain/personUtil';
import { Søkerinfo } from '../../../app/types/søkerinfo';
import { skalSøkerLasteOppTerminbekreftelse } from '../../../app/util/validation/steg/barn';
import Oppsummeringsseksjon from 'common/components/oppsummering/Oppsummeringsseksjon';
import Block from 'common/components/block/Block';
import AnnenForelderOppsummering from 'common/components/oppsummering/steg/AnnenForelderOppsummering';
import RelasjonTilBarnOppsummering from 'common/components/oppsummering/steg/RelasjonTilBarnOppsummering';
import UtenlandsoppholdOppsummering from 'common/components/oppsummering/steg/UtenlandsoppholdOppsummering';
import './oppsummeringWrapper.less';

interface OppsummeringProps {
    className?: string;
    søkerinfo: Søkerinfo;
    søknad: Søknad;
}

type Props = OppsummeringProps & InjectedIntlProps;
class OppsummeringWrapper extends React.Component<Props> {
    render() {
        const { className, søkerinfo, søknad, intl } = this.props;
        const { person } = søkerinfo;
        return (
            <div className={className}>
                <Veilederinfo>{getMessage(intl, 'oppsummering.veileder')}</Veilederinfo>
                <div className="oppsummeringWrapper">
                    <Block margin="xs">
                        <SøkerPersonalia
                            navn={formaterNavn(person.fornavn, person.etternavn, person.mellomnavn)}
                            fnr={person.fnr}
                            kjønn={person.kjønn}
                        />
                    </Block>

                    <Oppsummeringsseksjon
                        tittel={getMessage(intl, 'oppsummering.relasjonTilBarn')}
                        tittelProps={'undertittel'}>
                        <RelasjonTilBarnOppsummering
                            barn={søknad.barn}
                            annenForelder={søknad.annenForelder}
                            situasjon={this.props.søknad.situasjon}
                            skalLasteOppTerminbekreftelse={skalSøkerLasteOppTerminbekreftelse(søknad, søkerinfo)}
                        />
                    </Oppsummeringsseksjon>

                    <Oppsummeringsseksjon
                        tittel={getMessage(intl, 'oppsummering.annenForelder')}
                        tittelProps={'undertittel'}>
                        <AnnenForelderOppsummering
                            annenForelder={søknad.annenForelder}
                            erAleneOmOmsorg={søknad.søker.erAleneOmOmsorg}
                            barn={søknad.barn}
                        />
                    </Oppsummeringsseksjon>

                    <Oppsummeringsseksjon
                        tittel={getMessage(intl, 'oppsummering.utenlandsopphold')}
                        tittelProps={'undertittel'}>
                        <UtenlandsoppholdOppsummering
                            informasjonOmUtenlandsopphold={søknad.informasjonOmUtenlandsopphold}
                            erBarnetFødt={søknad.barn.erBarnetFødt}
                        />
                    </Oppsummeringsseksjon>
                </div>
            </div>
        );
    }
}
export default injectIntl(OppsummeringWrapper);
