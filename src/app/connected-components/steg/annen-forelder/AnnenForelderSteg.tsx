import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';

import { StegID } from '../../../util/stegConfig';
import Steg from '../../../components/layout/Steg';
import Spørsmål from '../../../components/spørsmål/Spørsmål';
import ErBarnetFødtSpørsmål from '../../../spørsmål/ErBarnetFødtSpørsmål';
import Barn, { UfødtBarn, FødtBarn } from '../../../types/søknad/Barn';
import { DispatchProps } from '../../../redux/types';
import { partials } from '../../../partials';
import { Søker } from '../../../types/søknad/Søknad';
import { AppState } from '../../../redux/reducers';
import Vedlegg from '../../../types/søknad/Vedlegg';

interface StateProps {
    barn: Barn;
    søker: Søker;
    vedlegg: Vedlegg;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;
class AnnenForelderSteg extends React.Component<Props, StateProps> {
    renderPartial() {
        const { barn, vedlegg, intl, dispatch, søker } = this.props;
        if (barn.erBarnetFødt === true) {
            return (
                <partials.FødtBarnPartial
                    intl={intl}
                    dispatch={dispatch}
                    barn={barn as FødtBarn}
                    vedlegg={vedlegg}
                />
            );
        } else if (barn.erBarnetFødt === false) {
            return (
                <partials.UFødtBarnForelder2Partial
                    intl={intl}
                    dispatch={dispatch}
                    barn={barn as UfødtBarn}
                    vedlegg={vedlegg}
                    søker={søker}
                />
            );
        }
        return null;
    }

    render() {
        const { barn, dispatch } = this.props;
        return (
            <Steg id={StegID.ANNEN_FORELDER}>
                <Spørsmål
                    render={() => (
                        <ErBarnetFødtSpørsmål
                            erBarnetFødt={barn.erBarnetFødt}
                            onChange={(erBarnetFødt: boolean) =>
                                dispatch(
                                    søknadActions.updateBarn({
                                        erBarnetFødt
                                    })
                                )
                            }
                        />
                    )}
                />
                {this.renderPartial()}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    barn: state.søknad.barn as FødtBarn,
    søker: state.søknad.søker as Søker,
    vedlegg: state.søknad.vedlegg as Vedlegg
});

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(AnnenForelderSteg)
);
