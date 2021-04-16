import React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'app/redux/reducers';
import { Foreldrepenger, SøknadEkstrainfo, Søkersituasjon } from 'app/types/søknad/Søknad';
import AnnenForelder from 'app/types/søknad/AnnenForelder';
import Barn from 'app/types/søknad/Barn';
import Søker from 'app/types/søknad/Søker';
import { RecursivePartial } from 'app/types/Partial';
import { Dekningsgrad } from 'common/types';
import { Hovedknapp } from 'nav-frontend-knapper';
import søknadActionCreators from 'app/redux/actions/søknad/søknadActionCreators';
import { DispatchProps } from 'common/redux/types';
import routeConfig from 'app/util/routing/routeConfig';
import { HistoryProps } from 'app/types/common';
import BEMHelper from 'common/util/bem';

import Block from 'common/components/block/Block';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';

import './resetSoknad.less';

interface StateProps {
    debugInfo: {
        type: Foreldrepenger;
        annenForelder: Partial<AnnenForelder>;
        barn: Partial<Barn>;
        søker: Partial<Søker>;
        ekstrainfo: RecursivePartial<SøknadEkstrainfo>;
        situasjon: Søkersituasjon;
        erEndringssøknad: boolean;
        dekningsgrad: Dekningsgrad;
    };
}

const ResetSoknad: React.FunctionComponent<StateProps & HistoryProps & DispatchProps> = ({ dispatch, history }) => {
    const resetAndCancelSøknad = () => {
        dispatch(søknadActionCreators.avbrytSøknad());
        history.push(routeConfig.APP_ROUTE_PREFIX);
    };

    const bem = BEMHelper('resetSoknad');

    return (
        <div className={bem.block}>
            <Block>
                <VeilederInfo
                    skjulMeldingIkon={true}
                    messages={[
                        {
                            type: 'feil',
                            contentIntlKey: 'feilside.veiledertekst',
                        },
                    ]}
                />
            </Block>
            <div className={bem.element('feilKnapp')}>
                <Hovedknapp onClick={resetAndCancelSøknad}>Start søknad på nytt</Hovedknapp>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => {
    const { søknad } = state;
    const { annenForelder, barn, søker, ekstrainfo, situasjon, erEndringssøknad, dekningsgrad } = søknad;

    // Mapper eksplisitt verdier for å unngå at fremtidige sensitive data havner med i loggen
    return {
        debugInfo: {
            type: søknad.type,
            annenForelder: {
                harRettPåForeldrepenger: annenForelder.harRettPåForeldrepenger,
                erForSyk: annenForelder.erForSyk,
                erUfør: annenForelder.erUfør,
            },
            barn: {
                antallBarn: barn.antallBarn,
            },
            søker: {
                erAleneOmOmsorg: søker.erAleneOmOmsorg,
                rolle: søker.rolle,
            },
            ekstrainfo: {
                currentStegID: ekstrainfo.currentStegID,
                eksisterendeSak: {
                    erAnnenPartsSak:
                        ekstrainfo.eksisterendeSak !== undefined
                            ? ekstrainfo.eksisterendeSak.erAnnenPartsSak
                            : undefined,
                    grunnlag:
                        ekstrainfo.eksisterendeSak !== undefined ? ekstrainfo.eksisterendeSak.grunnlag : undefined,
                },
            },
            situasjon,
            erEndringssøknad,
            dekningsgrad,
        },
    };
};

export default connect<StateProps>(mapStateToProps)(ResetSoknad);
