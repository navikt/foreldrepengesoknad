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

interface EksempelsøknadProps {
    barn: Barn;
    søker: Søker;
    gjelderAdopsjon: boolean;
    språkkode: string;
}

type Props = EksempelsøknadProps & InjectedIntlProps & DispatchProps;

class Eksempelsøknad extends React.Component<Props> {
    render() {
        const {
            dispatch,
            søker,
            barn,
            gjelderAdopsjon,
            intl,
            språkkode
        } = this.props;

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
                                søknadActions.updateBarn({
                                    erBarnetFødt
                                })
                            );
                        }}
                    />
                )}

                {barn.erBarnetFødt !== undefined && (
                    <AntallBarnSpørsmål
                        antallBarn={barn.antallBarn}
                        inputName="antallBarn"
                        onChange={(antallBarn: number) => {
                            dispatch(søknadActions.updateBarn({ antallBarn }));
                        }}
                        spørsmål={getMessage(
                            intl,
                            'antallBarn.spørsmål.venter'
                        )}
                    />
                )}

                {barn.antallBarn !== undefined && (
                    <DatoSpørsmål
                        spørsmål={getMessage(intl, 'termindato.spørsmål')}
                        onChange={(value: Date) => {
                            const termindato = value.toISOString();
                            dispatch(søknadActions.updateBarn({ termindato }));
                        }}
                        dato={getDateFromString((barn as UfødtBarn).termindato)}
                        id="termindatoinput"
                        språkkode={språkkode}
                    />
                )}

                {(barn as UfødtBarn).termindato && (
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
                        språkkode={språkkode}
                    />
                )}
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
