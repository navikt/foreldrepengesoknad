import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import ErDuMedmorSpørsmål from '../spørsmål/ErDuMedmorSpørsmål';
import ErBarnetFødtSpørsmål from '../spørsmål/ErBarnetFødtSpørsmål';
import { Søker, SøkerRolle, Søkersituasjon } from '../types/søknad/Søknad';
import { DispatchProps } from '../redux/types';
import søknadActions from './../redux/actions/søknad/søknadActionCreators';
import Barn, { UfødtBarn } from '../types/søknad/Barn';
import AntallBarnSpørsmål from '../spørsmål/AntallBarnSpørsmål';
import getMessage from '../util/i18nUtils';
import { getDateFromString } from '../util/dates';
import Spørsmål from '../components/spørsmål/Spørsmål';
import AnnenForelderBolk from '../bolker/AnnenForelderBolk';
import AnnenForelder, {
    AnnenForelderPartial
} from '../types/søknad/AnnenForelder';
import Bolk from '../components/layout/Bolk';
import DatoInput from '../components/dato-input/DatoInput';
import SøkersituasjonSpørsmål from '../spørsm\u00E5l/SøkersituasjonSpørsm\u00E5l';
import VæreINorgeVedFødselSpørsmål from '../spørsmål/VæreINorgeVedFødselSpørsmål';
import Utenlandsopphold from '../types/søknad/Utenlandsopphold';

interface EksempelsøknadProps {
    annenForelder: AnnenForelder;
    barn: Barn;
    søker: Søker;
    situasjon: Søkersituasjon;
    utenlandsopphold: Utenlandsopphold;
}

type Props = EksempelsøknadProps & InjectedIntlProps & DispatchProps;

class Eksempelsøknad extends React.Component<Props> {
    render() {
        const {
            dispatch,
            søker,
            barn,
            situasjon,
            annenForelder,
            utenlandsopphold,
            intl
        } = this.props;

        return (
            <React.Fragment>
                <Spørsmål
                    render={() => (
                        <SøkersituasjonSpørsmål
                            situasjon={situasjon}
                            onChange={(value) =>
                                dispatch(
                                    søknadActions.updateSøknad({
                                        situasjon: value
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={situasjon === Søkersituasjon.ADOPSJON}
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

                <Spørsmål
                    synlig={annenForelder !== undefined}
                    render={() => (
                        <VæreINorgeVedFødselSpørsmål
                            fødselINorge={utenlandsopphold.fødselINorge}
                            onChange={(fødselINorge: boolean) =>
                                dispatch(
                                    søknadActions.updateUtenlandsopphold({
                                        fødselINorge
                                    })
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
    situasjon: state.søknad.situasjon,
    utenlandsopphold: state.søknad.utenlandsopphold,
    språkkode: state.common.språkkode
}))(injectIntl(Eksempelsøknad));
