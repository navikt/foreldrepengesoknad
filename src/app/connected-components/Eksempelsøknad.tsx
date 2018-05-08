import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import ErDuMedmorSpørsmål from '../spørsmål/ErDuMedmorSpørsmål';
import ErBarnetFødtSpørsmål from '../spørsmål/ErBarnetFødtSpørsmål';
import { Søker, SøkerRolle } from '../types/søknad/Søknad';
import { DispatchProps } from '../redux/types/index';
import søknadActions from './../redux/actions/søknad/søknadActionCreators';
import Barn, { UfødtBarn } from '../types/søknad/Barn';
import FødselEllerAdopsjonSpørsmål from '../spørsmål/FødselEllerAdopsjonSpørsmål';
import AntallBarnSpørsmål from '../spørsmål/AntallBarnSpørsmål';
import getMessage from '../util/i18nUtils';
import { getDateFromString } from '../util/dates';
import Spørsmål from '../components/spørsmål/Spørsmål';
import DatoInput from '../components/dato-input/DatoInput';

interface EksempelsøknadProps {
    barn: Barn;
    søker: Søker;
    gjelderAdopsjon: boolean;
}

type Props = EksempelsøknadProps & InjectedIntlProps & DispatchProps;

class Eksempelsøknad extends React.Component<Props> {
    render() {
        const { dispatch, søker, barn, gjelderAdopsjon, intl } = this.props;

        return (
            <React.Fragment>
                <Spørsmål
                    render={() => (
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
                    )}
                />

                <Spørsmål
                    synlig={gjelderAdopsjon !== undefined}
                    render={() => (
                        <ErDuMedmorSpørsmål
                            erMedmor={søker.rolle}
                            onChange={(rolle: SøkerRolle) =>
                                dispatch(søknadActions.updateSøker({ rolle }))
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={søker.rolle !== undefined}
                    render={() => (
                        <ErBarnetFødtSpørsmål
                            erBarnetFødt={barn.erBarnetFødt}
                            onChange={(erBarnetFødt: boolean) => {
                                dispatch(
                                    søknadActions.updateBarn({
                                        erBarnetFødt
                                    })
                                );
                            }}
                        />
                    )}
                />

                <Spørsmål
                    synlig={barn.erBarnetFødt !== undefined}
                    render={() => (
                        <AntallBarnSpørsmål
                            antallBarn={barn.antallBarn}
                            inputName="antallBarn"
                            onChange={(antallBarn: number) => {
                                dispatch(
                                    søknadActions.updateBarn({ antallBarn })
                                );
                            }}
                            spørsmål={getMessage(
                                intl,
                                'antallBarn.spørsmål.venter'
                            )}
                        />
                    )}
                />

                <Spørsmål
                    synlig={barn.antallBarn !== undefined}
                    render={() => (
                        <DatoInput
                            label={getMessage(intl, 'termindato.spørsmål')}
                            onChange={(value: Date) => {
                                const termindato = value.toISOString();
                                dispatch(
                                    søknadActions.updateBarn({ termindato })
                                );
                            }}
                            dato={getDateFromString(
                                (barn as UfødtBarn).termindato
                            )}
                            id="termindatoinput"
                        />
                    )}
                />

                <Spørsmål
                    synlig={(barn as UfødtBarn).termindato !== undefined}
                    render={() => (
                        <DatoInput
                            label={getMessage(
                                intl,
                                'terminbekreftelseDato.spørsmål'
                            )}
                            onChange={(value: Date) => {
                                const terminbekreftelseDato = value.toISOString();
                                dispatch(
                                    søknadActions.updateBarn({
                                        terminbekreftelseDato
                                    })
                                );
                            }}
                            dato={getDateFromString(
                                (barn as UfødtBarn).terminbekreftelseDato
                            )}
                            id="termindatoinput"
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

export default connect<EksempelsøknadProps>((state: any) => ({
    barn: state.søknad.barn,
    søker: state.søknad.søker,
    gjelderAdopsjon: state.søknad.gjelderAdopsjon,
    språkkode: state.common.språkkode
}))(injectIntl(Eksempelsøknad));
