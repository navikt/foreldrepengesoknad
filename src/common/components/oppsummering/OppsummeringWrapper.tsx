import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import getMessage from 'common/util/i18nUtils';
import Person from '../../../app/types/Person';
import Søknad from '../../../app/types/søknad/Søknad';
import SøkerPersonalia from 'common/components/søker-personalia/SøkerPersonalia';
import OppsummeringRelasjonTilBarnFødsel from 'common/components/oppsummering/steg/OppsummeringRelasjonTilBarnFødsel';
import { formaterNavn } from 'app/util/domain/personUtil';
import OppsummeringAnnenForelder from 'common/components/oppsummering/steg/OppsummeringAnnenForelder';
import Block from 'common/components/block/Block';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import './oppsummering.less';

interface OppsummeringProps {
    className?: string;
    person: Person;
    søknad: Søknad;
}

interface State {
    relasjonTilBarnSummaryOpen: boolean;
    annenForelderSummaryOpen: boolean;
}

type Props = OppsummeringProps & InjectedIntlProps;
class OppsummeringWrapper extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            relasjonTilBarnSummaryOpen: false,
            annenForelderSummaryOpen: false
        };
    }

    render() {
        const { className, person, søknad, intl } = this.props;
        return (
            <div className={className}>
                <Veilederinfo>{getMessage(intl, 'oppsummering.veileder')}</Veilederinfo>
                <div className="oppsummeringWrapper">
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
                            <OppsummeringRelasjonTilBarnFødsel barn={søknad.barn} />
                        </Ekspanderbartpanel>
                    </Block>

                    <Block animated={false}>
                        <Ekspanderbartpanel
                            tittel={getMessage(intl, 'oppsummering.annenForelder')}
                            tittelProps={'undertittel'}
                            onClick={() =>
                                this.setState({ annenForelderSummaryOpen: !this.state.annenForelderSummaryOpen })
                            }>
                            <OppsummeringAnnenForelder
                                annenForelder={søknad.annenForelder}
                                erAleneOmOmsorg={søknad.søker.erAleneOmOmsorg}
                            />
                        </Ekspanderbartpanel>
                    </Block>
                </div>
            </div>
        );
    }
}
export default injectIntl(OppsummeringWrapper);
