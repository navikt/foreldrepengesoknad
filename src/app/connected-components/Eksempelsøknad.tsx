import * as React from 'react';
import { connect } from 'react-redux';
import ErDuMedmorSpørsmål from '../spørsmål/ErDuMedmorSpørsmål';
import ErBarnetFødtSpørsmål from '../spørsmål/ErBarnetFødtSpørsmål';
import { Søker, SøkerRolle } from '../types/søknad/Søknad';
import { DispatchProps } from '../redux/types/index';
import søknadActions from './../redux/actions/søknad/søknadActionCreators';
import Barn from '../types/søknad/Barn';
import FødselEllerAdopsjonSpørsmål from '../spørsmål/FødselEllerAdopsjonSpørsmål';

interface Props {
    barn: Barn;
    søker: Søker;
    gjelderAdopsjon: boolean;
}

class Eksempelsøknad extends React.Component<Props & DispatchProps> {
    render() {
        const { dispatch, søker, barn, gjelderAdopsjon } = this.props;

        return (
            <React.Fragment>
                <FødselEllerAdopsjonSpørsmål
                    gjelderAdopsjon={gjelderAdopsjon}
                    onChange={(value) =>
                        dispatch(
                            søknadActions.updateSøknad({
                                gjelderAdopsjon: value
                            })
                        )
                    }
                />

                {gjelderAdopsjon !== undefined && (
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
    gjelderAdopsjon: state.søknad.gjelderAdopsjon
}))(Eksempelsøknad);
