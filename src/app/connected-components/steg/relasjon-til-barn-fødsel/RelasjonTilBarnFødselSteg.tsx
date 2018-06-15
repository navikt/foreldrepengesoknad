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
import Søker from '../../../types/søknad/Søker';
import { erFarEllerMedmor } from '../../../util/personUtil';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { Attachment } from 'common/storage/attachment/types/Attachment';

interface StateProps {
    barn: BarnPartial;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    person?: Person;
    terminbekreftelse: Attachment[];
    fødselsattest: Attachment[];
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
            fødselsattest,
            terminbekreftelse,
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
                            fødselsattest={fødselsattest || []}
                        />
                    ) : (
                        <partials.UfødtBarnPartial
                            dispatch={dispatch}
                            barn={barn as UfødtBarn}
                            annenForelder={annenForelder}
                            søker={søker}
                            erFarEllerMedmor={erFarEllerMedmor(
                                person.kjønn,
                                søker.rolle
                            )}
                            terminbekreftelse={terminbekreftelse || []}
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
    const fødselsattest = (barn as FødtBarn).fødselsattest;
    const terminbekreftelse = (barn as UfødtBarn).terminbekreftelse;

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_FØDSEL,
        renderFortsettKnapp:
            (erBarnetFødt && fødselsattest.length > 0) ||
            (harTerminbekreftelseDato && terminbekreftelse.length > 0),
        history: props.history
    };

    return {
        søker: state.søknad.søker,
        annenForelder: state.søknad.annenForelder,
        person: state.api.person,
        barn,
        terminbekreftelse,
        fødselsattest,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(RelasjonTilBarnFødselSteg)
);
