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
import { søknadStegPath } from '../../StegRoutes';
import FortsettKnapp from 'common/components/fortsett-knapp/FortsettKnapp';
import { HistoryProps } from '../../../../types/common';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Søknadsvedlegg from '../../../../components/søknadsvedlegg/Søknadsvedlegg';
import { Attachment } from 'storage/attachment/types/Attachment';

interface UfødtBarnPartialProps {
    barn: UfødtBarn;
    søknad: SøknadPartial;
    vedlegg: Attachment[];
    erFarEllerMedmor: boolean;
}

type Props = UfødtBarnPartialProps &
    InjectedIntlProps &
    DispatchProps &
    HistoryProps;

class UfødtBarnPartial extends React.Component<Props> {
    render() {
        const {
            intl,
            dispatch,
            barn,
            vedlegg,
            søknad,
            erFarEllerMedmor,
            history
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
                                vedlegg.length > 0 &&
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

                        {barn.terminbekreftelseDato &&
                            vedlegg.length > 0 && (
                                <FortsettKnapp
                                    history={history}
                                    location={søknadStegPath('annen-forelder')}>
                                    {getMessage(intl, 'fortsettknapp.label')}
                                </FortsettKnapp>
                            )}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
export default injectIntl(UfødtBarnPartial);
