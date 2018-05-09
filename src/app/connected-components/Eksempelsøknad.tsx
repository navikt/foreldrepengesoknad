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
import DatoSpørsmål from '../spørsmål/DatoSpørsmål';
import { getDateFromString } from '../util/dates';
import Spørsmål from '../components/spørsmål/Spørsmål';
import { Språkkode } from '../intl/types';
import AnnenForelderBolk from '../bolker/AnnenForelderBolk';
import AnnenForelder, {
    AnnenForelderPartial
} from '../types/søknad/AnnenForelder';
import Bolk from '../components/layout/Bolk';

interface EksempelsøknadProps {
    annenForelder: AnnenForelder;
    barn: Barn;
    søker: Søker;
    gjelderAdopsjon: boolean;
}

type Props = EksempelsøknadProps & InjectedIntlProps & DispatchProps;

class Eksempelsøknad extends React.Component<Props> {
    render() {
        const {
            dispatch,
            søker,
            barn,
            gjelderAdopsjon,
            annenForelder,
            intl
        } = this.props;

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
                        <DatoSpørsmål
                            spørsmål={getMessage(intl, 'termindato.spørsmål')}
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
                            språkkode={intl.locale as Språkkode}
                        />
                    )}
                />

                <Spørsmål
                    synlig={(barn as UfødtBarn).termindato !== undefined}
                    render={() => (
                        <DatoSpørsmål
                            spørsmål={getMessage(
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
                            språkkode={intl.locale as Språkkode}
                        />
                    )}
                />

                <Bolk
                    synlig={
                        (barn as UfødtBarn).terminbekreftelseDato !== undefined
                    }
                    render={() => (
                        <AnnenForelderBolk
                            annenForelderData={annenForelder}
                            onChange={(data: AnnenForelderPartial) =>
                                dispatch(
                                    søknadActions.updateAnnenForelder(data)
                                )
                            }
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

export default connect<EksempelsøknadProps>((state: any) => ({
    annenForelder: state.søknad.annenForelder,
    barn: state.søknad.barn,
    søker: state.søknad.søker,
    gjelderAdopsjon: state.søknad.gjelderAdopsjon,
    språkkode: state.common.språkkode
}))(injectIntl(Eksempelsøknad));
