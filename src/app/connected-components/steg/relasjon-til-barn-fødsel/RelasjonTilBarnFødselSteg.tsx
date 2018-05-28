import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';

import { StegID } from '../../../util/stegConfig';
import Steg from '../../../components/layout/Steg';
import Spørsmål from '../../../components/spørsmål/Spørsmål';
import ErBarnetFødtSpørsmål from '../../../spørsmål/ErBarnetFødtSpørsmål';
import { BarnPartial, FødtBarn, UfødtBarn } from '../../../types/søknad/Barn';
import { DispatchProps } from '../../../redux/types';
import { partials } from '../../../partials';
import Søknad from '../../../types/søknad/Søknad';
import { AppState } from '../../../redux/reducers';
import Vedlegg from '../../../types/søknad/Vedlegg';

interface StateProps {
    barn: BarnPartial;
    søknad: Søknad;
    vedlegg: Vedlegg;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;
class RelasjonTilBarnFødsel extends React.Component<Props, StateProps> {
    renderPartial() {
        const { barn, vedlegg, dispatch, søknad } = this.props;
        if (barn.erBarnetFødt === true) {
            return (
                <partials.FødtBarnPartial
                    dispatch={dispatch}
                    barn={barn as FødtBarn}
                    vedlegg={vedlegg}
                />
            );
        }
        return (
            <partials.UFødtBarnAnnenForelderPartial
                dispatch={dispatch}
                barn={barn as UfødtBarn}
                vedlegg={vedlegg}
                søknad={søknad}
            />
        );
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
                {barn.erBarnetFødt !== undefined && this.renderPartial()}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    søknad: state.søknad,
    barn: state.søknad.barn,
    vedlegg: state.søknad.vedlegg
});

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(RelasjonTilBarnFødsel)
);
