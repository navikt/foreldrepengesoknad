import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { UfødtBarn } from '../../../../types/søknad/Barn';
import MorForSykSpørsmål from '../../../../spørsmål/MorForSykSpørsmål';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import AntallBarnBolk from '../../components/AntallBarnBolk';
import { DispatchProps } from 'common/redux/types/index';
import getMessage from 'common/util/i18nUtils';
import Søker from '../../../../types/søknad/Søker';
import { AnnenForelderPartial } from '../../../../types/søknad/AnnenForelder';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { getTermindatoRegler, termindatoAvgrensninger } from '../../../../util/validation/termindato';
import TerminbekreftelsePartial from './TerminbekreftelsePartial';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import Block from 'common/components/block/Block';
import { RelasjonTilBarnUfødtVisibility } from '../visibility/relasjonTilBarnFødselVisibility';
import { Søkersituasjon } from '../../../../types/søknad/Søknad';
import VeilederInfo from '../../../../components/veilederInfo/VeilederInfo';

import './ufødtBarnPartial.less';

interface UfødtBarnPartialProps {
    barn: UfødtBarn;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    terminbekreftelse: Attachment[];
    situasjon: Søkersituasjon;
    erFarEllerMedmor: boolean;
    vis: RelasjonTilBarnUfødtVisibility;
    intl: IntlShape;
}

type Props = UfødtBarnPartialProps & DispatchProps;

class UfødtBarnPartial extends React.Component<Props> {
    render() {
        const { barn, terminbekreftelse, annenForelder, erFarEllerMedmor, dispatch, intl, vis, situasjon } = this.props;

        const erMorEllerMorErForSyk = !erFarEllerMedmor || annenForelder.erForSyk === true;

        return (
            <React.Fragment>
                <Block visible={vis.erMorForSyk}>
                    <MorForSykSpørsmål
                        erMorForSyk={annenForelder.erForSyk}
                        onChange={(erForSyk: boolean) => {
                            dispatch(
                                søknadActions.updateAnnenForelder({
                                    erForSyk,
                                })
                            );
                        }}
                    />
                </Block>

                {annenForelder.erForSyk === false && (
                    <VeilederInfo
                        messages={[
                            {
                                type: 'feil',
                                contentIntlKey: 'annenForelder.morIkkeSyk',
                            },
                        ]}
                    />
                )}

                {erMorEllerMorErForSyk && (
                    <React.Fragment>
                        <AntallBarnBolk
                            antallBarn={barn.antallBarn}
                            erBarnetFødt={barn.erBarnetFødt}
                            situasjon={situasjon}
                            inputName="antallBarn"
                            onChange={(antallBarn: number) => {
                                dispatch(
                                    søknadActions.updateBarn({
                                        antallBarn,
                                    })
                                );
                            }}
                            spørsmål={getMessage(intl, 'antallBarn.spørsmål.venter')}
                        />

                        <Block visible={vis.termindato}>
                            <div className="infoknappfiks">
                                <DatoInput
                                    inputId="termindato"
                                    name="termindato"
                                    label={getMessage(intl, 'termindato.spørsmål')}
                                    infotekst={getMessage(intl, 'termindato.infotekst')}
                                    onChange={(termindato: Date) => {
                                        dispatch(
                                            søknadActions.updateBarn({
                                                termindato,
                                            })
                                        );
                                    }}
                                    dato={barn.termindato}
                                    datoAvgrensinger={termindatoAvgrensninger}
                                    validators={getTermindatoRegler(barn.termindato, intl)}
                                />
                            </div>
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
