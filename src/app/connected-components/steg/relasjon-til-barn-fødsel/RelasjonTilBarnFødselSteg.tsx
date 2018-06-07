import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';

import { StegID } from '../../../util/stegConfig';
import Steg, { StegProps } from 'app/components/layout/Steg';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import ErBarnetFødtSpørsmål from '../../../spørsmål/ErBarnetFødtSpørsmål';
import { BarnPartial, FødtBarn, UfødtBarn } from '../../../types/søknad/Barn';
import { DispatchProps } from 'common/redux/types';
import { partials } from './partials';
import { AppState } from '../../../redux/reducers';
import Person from '../../../types/Person';
import { HistoryProps } from '../../../types/common';
import { getSøknadsvedlegg } from '../../../util/vedleggUtil';
import Søker from '../../../types/s\u00F8knad/S\u00F8ker';
import { erFarEllerMedmor } from '../../../util/personUtil';
import { AnnenForelderPartial } from '../../../types/s\u00F8knad/AnnenForelder';

interface StateProps {
    barn: BarnPartial;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    person?: Person;
    fødselsattestLastetOpp: boolean;
    terminbekreftelseErLastetOpp: boolean;
    stegProps: StegProps;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class RelasjonTilBarnFødselSteg extends React.Component<Props, StateProps> {
    render() {
        const {
            barn,
            søker,
            annenForelder,
            person,
            terminbekreftelseErLastetOpp,
            stegProps,
            dispatch
        } = this.props;

        if (person) {
            return (
                <Steg {...stegProps}>
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

                    {barn && barn.erBarnetFødt === true ? (
                        <partials.FødtBarnPartial
                            dispatch={dispatch}
                            barn={barn as FødtBarn}
                        />
                    ) : (
                        <partials.UfødtBarnPartial
                            dispatch={dispatch}
                            barn={barn as UfødtBarn}
                            annenForelder={annenForelder}
                            søker={søker}
                            erFarEllerMedmor={erFarEllerMedmor(
                                person.kjønn,
                                søker.søkerRolle
                            )}
                            terminbekreftelseErLastetOpp={
                                terminbekreftelseErLastetOpp
                            }
                        />
                    )}
                </Steg>
            );
        }

        return null;
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const barn = state.søknad.barn;
    const erBarnetFødt = barn && barn.erBarnetFødt === true;
    const harTerminbekreftelseDato =
        (barn as UfødtBarn).terminbekreftelseDato !== undefined;
    const fødselsattestLastetOpp =
        getSøknadsvedlegg('fødselsattest', state).length > 0;
    const terminbekreftelseErLastetOpp =
        getSøknadsvedlegg('terminbekreftelse', state).length > 0;

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_FØDSEL,
        renderFortsettKnapp:
            (erBarnetFødt && fødselsattestLastetOpp) ||
            (harTerminbekreftelseDato && terminbekreftelseErLastetOpp),
        history: props.history
    };

    return {
        søker: state.søknad.søker,
        annenForelder: state.søknad.annenForelder,
        person: state.api.person,
        barn,
        fødselsattestLastetOpp,
        terminbekreftelseErLastetOpp,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(RelasjonTilBarnFødselSteg)
);
