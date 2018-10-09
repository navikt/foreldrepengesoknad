import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { UfødtBarn } from '../../../../types/søknad/Barn';
import MorForSykSpørsmål from '../../../../spørsmål/MorForSykSpørsmål';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import AntallBarnBolk from '../../../../bolker/AntallBarnBolk';
import { DispatchProps } from 'common/redux/types/index';
import getMessage from 'common/util/i18nUtils';
import Søker from '../../../../types/søknad/Søker';
import { AnnenForelderPartial } from '../../../../types/søknad/AnnenForelder';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { getTermindatoRegler, termindatoAvgrensninger } from '../../../../util/validation/termindato';
import TerminbekreftelsePartial from './TerminbekreftelsePartial';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import Block from 'common/components/block/Block';
import { RelasjonTilBarnUfødtVisibility } from '../visibility/relasjonTilBarnFødselVisibility';

interface UfødtBarnPartialProps {
    barn: UfødtBarn;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    terminbekreftelse: Attachment[];
    erFarEllerMedmor: boolean;
    vis: RelasjonTilBarnUfødtVisibility;
}

type Props = UfødtBarnPartialProps & InjectedIntlProps & DispatchProps;

class UfødtBarnPartial extends React.Component<Props> {
    render() {
        const { barn, terminbekreftelse, annenForelder, erFarEllerMedmor, dispatch, intl, vis } = this.props;

        const erMorEllerMorErForSyk = !erFarEllerMedmor || annenForelder.erForSyk === true;

        return (
            <React.Fragment>
                <Block visible={vis.erMorForSyk}>
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
                </Block>

                {annenForelder.erForSyk === false && (
                    <Veilederinfo type="feil">{getMessage(intl, 'annenForelder.morIkkeSyk')}</Veilederinfo>
                )}

                {erMorEllerMorErForSyk && (
                    <React.Fragment>
                        <AntallBarnBolk
                            antallBarn={barn.antallBarn}
                            inputName="antallBarn"
                            onChange={(antallBarn: number) => {
                                dispatch(
                                    søknadActions.updateBarn({
                                        antallBarn
                                    })
                                );
                            }}
                            spørsmål={getMessage(intl, 'antallBarn.spørsmål.venter')}
                        />

                        <Block visible={vis.termindato}>
                            <DatoInput
                                id="termindato"
                                name="termindato"
                                label={getMessage(intl, 'termindato.spørsmål')}
                                onChange={(termindato: Date) => {
                                    dispatch(
                                        søknadActions.updateBarn({
                                            termindato
                                        })
                                    );
                                }}
                                dato={barn.termindato}
                                avgrensninger={termindatoAvgrensninger}
                                validators={getTermindatoRegler(barn.termindato, intl)}
                            />
                        </Block>

                        {vis.terminbekreftelse ? (
                            <TerminbekreftelsePartial
                                barn={barn}
                                dispatch={dispatch}
                                terminbekreftelse={terminbekreftelse}
                                vis={vis}
                            />
                        ) : null}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
export default injectIntl(UfødtBarnPartial);
