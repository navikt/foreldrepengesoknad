import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { UfødtBarn } from '../../../../types/søknad/Barn';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import MorForSykSpørsmål from '../../../../spørsmål/MorForSykSpørsmål';
import DatoInput from 'common/components/dato-input/DatoInput';
import Bolk from 'app/components/layout/Bolk';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { SøknadPartial } from '../../../../types/søknad/Søknad';
import AntallBarnSpørsmål from '../../../../spørsmål/AntallBarnSpørsmål';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Søknadsvedlegg from '../../../../components/søknadsvedlegg/Søknadsvedlegg';

interface UfødtBarnPartialProps {
    barn: UfødtBarn;
    søknad: SøknadPartial;
    terminbekreftelseErLastetOpp: boolean;
    erFarEllerMedmor: boolean;
}

type Props = UfødtBarnPartialProps & InjectedIntlProps & DispatchProps;

class UfødtBarnPartial extends React.Component<Props> {
    render() {
        const {
            intl,
            dispatch,
            barn,
            terminbekreftelseErLastetOpp,
            søknad,
            erFarEllerMedmor
        } = this.props;

        const erMorEllerMorErForSyk =
            !erFarEllerMedmor || søknad.erMorForSyk === true;

        return (
            <React.Fragment>
                <Spørsmål
                    synlig={erFarEllerMedmor}
                    render={() => (
                        <MorForSykSpørsmål
                            erMorForSyk={søknad.erMorForSyk}
                            onChange={(erMorForSyk: boolean) => {
                                dispatch(
                                    søknadActions.updateSøknad({
                                        erMorForSyk
                                    })
                                );
                            }}
                        />
                    )}
                />

                {søknad.erMorForSyk === false && (
                    <Veilederinfo type="feil">
                        {getMessage(intl, 'annenForelder.forelder1IkkeSyk')}
                    </Veilederinfo>
                )}

                {erMorEllerMorErForSyk && (
                    <React.Fragment>
                        <Spørsmål
                            render={() => (
                                <AntallBarnSpørsmål
                                    antallBarn={barn.antallBarn}
                                    inputName="antallBarn"
                                    onChange={(antallBarn: number) => {
                                        dispatch(
                                            søknadActions.updateBarn({
                                                antallBarn
                                            })
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
                                    id="termindato"
                                    label={getMessage(
                                        intl,
                                        'termindato.spørsmål'
                                    )}
                                    onChange={(termindato: Date) => {
                                        dispatch(
                                            søknadActions.updateBarn({
                                                termindato
                                            })
                                        );
                                    }}
                                    dato={barn.termindato}
                                />
                            )}
                        />

                        <Bolk
                            synlig={barn.termindato !== undefined}
                            tittel={getMessage(
                                intl,
                                'vedlegg.tittel.terminbekreftelse'
                            )}
                            render={() => (
                                <Søknadsvedlegg type="terminbekreftelse" />
                            )}
                        />

                        <Spørsmål
                            synlig={
                                terminbekreftelseErLastetOpp &&
                                barn.termindato !== undefined
                            }
                            render={() => (
                                <DatoInput
                                    id="terminbekreftelseDato"
                                    label={getMessage(
                                        intl,
                                        'terminbekreftelseDato.spørsmål'
                                    )}
                                    onChange={(terminbekreftelseDato: Date) => {
                                        dispatch(
                                            søknadActions.updateBarn({
                                                terminbekreftelseDato
                                            })
                                        );
                                    }}
                                    dato={barn.terminbekreftelseDato}
                                />
                            )}
                        />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
export default injectIntl(UfødtBarnPartial);
