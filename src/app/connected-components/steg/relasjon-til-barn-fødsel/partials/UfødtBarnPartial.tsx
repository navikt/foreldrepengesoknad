import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { UfødtBarn } from '../../../../types/søknad/Barn';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import MorForSykSpørsmål from '../../../../spørsmål/MorForSykSpørsmål';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import AntallBarnSpørsmålsgruppe from '../../../../spørsmål/AntallBarnSpørsmålsgruppe';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Søker from '../../../../types/søknad/Søker';
import { AnnenForelderPartial } from '../../../../types/søknad/AnnenForelder';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import DatoInputWithValidation from 'common/lib/validation/DatoInputWithValidation';
import {
    getTermindatoRegler,
    termindatoAvgrensninger
} from '../../../../util/validation/fields/termindato';
import TerminbekreftelsePartial from './TerminbekreftelsePartial';

interface UfødtBarnPartialProps {
    barn: UfødtBarn;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    terminbekreftelse: Attachment[];
    skalLasteOppTerminbekreftelse: boolean;
    erFarEllerMedmor: boolean;
}

type Props = UfødtBarnPartialProps & InjectedIntlProps & DispatchProps;

class UfødtBarnPartial extends React.Component<Props> {
    render() {
        const {
            barn,
            annenForelder,
            terminbekreftelse,
            skalLasteOppTerminbekreftelse,
            erFarEllerMedmor,
            dispatch,
            intl
        } = this.props;

        const erMorEllerMorErForSyk =
            !erFarEllerMedmor || annenForelder.erForSyk === true;

        return (
            <React.Fragment>
                {erFarEllerMedmor && (
                    <MorForSykSpørsmål
                        erMorForSyk={annenForelder.erForSyk}
                        onChange={(erForSyk: boolean) => {
                            dispatch(
                                søknadActions.updateAnnenForelder({
                                    erForSyk
                                })
                            );
                        }}
                    />
                )}

                {annenForelder.erForSyk === false && (
                    <Veilederinfo type="feil">
                        {getMessage(intl, 'annenForelder.forelder1IkkeSyk')}
                    </Veilederinfo>
                )}

                {erMorEllerMorErForSyk && (
                    <React.Fragment>
                        <AntallBarnSpørsmålsgruppe
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

                        <Spørsmål
                            animert={false}
                            synlig={barn.antallBarn !== undefined}
                            render={() => (
                                <DatoInputWithValidation
                                    id="termindato"
                                    name="termindato"
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
                                    avgrensninger={termindatoAvgrensninger}
                                    validators={getTermindatoRegler(
                                        barn.termindato,
                                        intl
                                    )}
                                />
                            )}
                        />

                        {skalLasteOppTerminbekreftelse &&
                        barn.termindato !== undefined ? (
                            <TerminbekreftelsePartial
                                barn={barn}
                                terminbekreftelse={terminbekreftelse}
                                dispatch={dispatch}
                            />
                        ) : null}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
export default injectIntl(UfødtBarnPartial);
