import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import getMessage from 'common/util/i18nUtils';
import Person from '../../../app/types/Person';
import Søknad from '../../../app/types/søknad/Søknad';
import { StegID } from 'app/util/routing/stegConfig';
import SøkerPersonalia from 'common/components/søker-personalia/SøkerPersonalia';
import OppsummeringRelasjonTilBarnFødsel from 'common/components/oppsummering/steg/OppsummeringRelasjonTilBarnFødsel';
import { formaterNavn } from 'app/util/domain/personUtil';
import EkspanderbartOppsummeringsPanel from '../../../common/components/ekspanderbart-oppsummeringspanel/EkspanderbartOppsummeringspanel';
import OppsummeringDenAndreForelderen from 'common/components/oppsummering/steg/OppsummeringDenAndreForelderen';

import './oppsummering.less';

interface OppsummeringProps {
    className?: string;
    person: Person;
    søknad: Søknad;
    confirmSteg: (type: string) => void;
    godkjenteSteg: {};
}

type Props = OppsummeringProps & InjectedIntlProps;
class OppsummeringWrapper extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    onOppsummeringExpand(stegID: StegID) {
        this.props.confirmSteg(stegID);
    }

    render() {
        const { className, person, søknad, godkjenteSteg, intl } = this.props;
        return (
            <div className={className}>
                <Veilederinfo>
                    {getMessage(intl, 'oppsummering.veileder')}
                </Veilederinfo>
                <div className="oppsummering">
                    <SøkerPersonalia
                        navn={formaterNavn(
                            person.fornavn,
                            person.etternavn,
                            person.mellomnavn
                        )}
                        fnr={person.fnr}
                        kjønn={person.kjønn}
                    />

                    <EkspanderbartOppsummeringsPanel
                        steg={StegID.RELASJON_TIL_BARN_FØDSEL}
                        checked={godkjenteSteg[StegID.RELASJON_TIL_BARN_FØDSEL]}
                        tittel={getMessage(
                            intl,
                            'oppsummering.relasjonTilBarn'
                        )}
                        onClick={(stegID: StegID) =>
                            this.onOppsummeringExpand(stegID)
                        }
                        render={() => (
                            <OppsummeringRelasjonTilBarnFødsel
                                barn={søknad.barn}
                            />
                        )}
                    />

                    <EkspanderbartOppsummeringsPanel
                        steg={StegID.ANNEN_FORELDER}
                        checked={godkjenteSteg[StegID.ANNEN_FORELDER]}
                        tittel={getMessage(
                            intl,
                            'oppsummering.denAndreForelderen'
                        )}
                        onClick={(stegID: StegID) =>
                            this.onOppsummeringExpand(stegID)
                        }
                        render={() => (
                            <OppsummeringDenAndreForelderen
                                annenForelder={søknad.annenForelder}
                                erAleneOmOmsorg={søknad.søker.erAleneOmOmsorg}
                            />
                        )}
                    />
                </div>
            </div>
        );
    }
}
export default injectIntl(OppsummeringWrapper);
