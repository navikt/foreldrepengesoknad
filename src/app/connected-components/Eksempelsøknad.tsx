import * as React from 'react';
import { connect } from 'react-redux';
import ErDuMedmorSpørsmål from '../spørsmål/ErDuMedmorSpørsmål';
import ErBarnetFødtSpørsmål from '../spørsmål/ErBarnetFødtSpørsmål';
import { Søker, SøkerRolle, default as Søknad } from '../types/søknad/Søknad';
import { DispatchProps } from '../redux/types/index';
import søknadActions from './../redux/actions/søknad/søknadActionCreators';
import Barn from '../types/søknad/Barn';
import FødselEllerAdopsjonSpørsmål from '../spørsmål/FødselEllerAdopsjonSpørsmål';

interface Props {
    barn: Barn;
    søker: Søker;
    søknad: Søknad;
}

class Eksempelsøknad extends React.Component<Props & DispatchProps> {
    render() {
        const { dispatch, søker, barn, søknad } = this.props;

        return (
            <React.Fragment>
                <FødselEllerAdopsjonSpørsmål
                    gjelderAdopsjon={søknad.gjelderAdopsjon}
                    onChange={(gjelderAdopsjon) =>
                        dispatch(
                            søknadActions.updateSøknad({ gjelderAdopsjon })
                        )
                    }
                />

                {søknad.gjelderAdopsjon !== undefined && (
                    <ErDuMedmorSpørsmål
                        erMedmor={søker.rolle}
                        onChange={(rolle: SøkerRolle) =>
                            dispatch(søknadActions.updateSøker({ rolle }))
                        }
                    />
                )}

                {søker.rolle && (
                    <ErBarnetFødtSpørsmål
                        erBarnetFødt={barn.erBarnetFødt}
                        onChange={(erBarnetFødt: boolean) => {
                            dispatch(
                                søknadActions.updateRelasjonTilBarn({
                                    erBarnetFødt
                                })
                            );
                        }}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default connect<Props>((state: any) => ({
    barn: state.søknad.barn,
    søker: state.søknad.søker,
    søknad: state.søknad
}))(Eksempelsøknad);
