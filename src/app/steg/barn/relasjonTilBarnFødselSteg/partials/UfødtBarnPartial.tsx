import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import Block from 'common/components/block/Block';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { DispatchProps } from 'common/redux/types/index';
import getMessage from 'common/util/i18nUtils';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import VeilederInfo from '../../../../components/veilederInfo/VeilederInfo';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import MorForSykSpørsmål from '../../../../spørsmål/MorForSykSpørsmål';
import { AnnenForelderPartial } from '../../../../types/søknad/AnnenForelder';
import { UfødtBarn } from '../../../../types/søknad/Barn';
import Søker from '../../../../types/søknad/Søker';
import { Søkersituasjon } from '../../../../types/søknad/Søknad';
import { getTermindatoRegler, termindatoAvgrensninger } from '../../../../util/validation/termindato';
import AntallBarnBolk from '../../components/AntallBarnBolk';
import { RelasjonTilBarnUfødtVisibility } from '../visibility/relasjonTilBarnFødselVisibility';
import TerminbekreftelsePartial from './TerminbekreftelsePartial';
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
                                    id="termindato"
                                    name="termindato"
                                    label={getMessage(intl, 'termindato.spørsmål')}
                                    infotekst={getMessage(intl, 'termindato.infotekst')}
                                    apneLabel={getMessage(intl, 'termindato.infotekst.apneLabel')}
                                    onChange={(termindato) => {
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
