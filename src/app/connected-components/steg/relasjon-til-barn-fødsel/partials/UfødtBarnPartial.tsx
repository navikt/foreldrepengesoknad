import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { DispatchProps } from '../../../../redux/types/index';
import { UfødtBarn } from '../../../../types/søknad/Barn';
import Spørsmål from '../../../../components/spørsmål/Spørsmål';
import MorForSykSpørsmål from '../../../../spørsmål/MorForSykSpørsmål';
import DatoInput from '../../../../components/dato-input/DatoInput';
import Bolk from '../../../../components/layout/Bolk';
import getMessage from '../../../../util/i18nUtils';
import {
    concatNewFiles,
    removeFileFromArray
} from '../../../../components/vedlegg/util';
import VedleggOversikt from '../../../../components/vedlegg/VedleggOversikt';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import Veilederinfo from '../../../../components/veileder-info/Veilederinfo';
import { SøknadPartial } from '../../../../types/søknad/Søknad';
import AntallBarnSpørsmål from '../../../../spørsmål/AntallBarnSpørsmål';
import { søknadStegPath } from '../../StegRoutes';
import FortsettKnapp from '../../../../components/fortsett-knapp/FortsettKnapp';
import { HistoryProps } from '../../../../types/common';
import ISøknadsvedlegg from '../../../../types/søknad/Søknadsvedlegg';
import { Attachment } from '../../../../types/Attachment';

interface UfødtBarnPartialProps {
    barn: UfødtBarn;
    søknad: SøknadPartial;
    vedlegg: ISøknadsvedlegg;
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
                                <VedleggOversikt
                                    inputId="terminbekreftelse"
                                    vedlegg={vedlegg.terminbekreftelse}
                                    onFilesSelect={(files: Attachment[]) => {
                                        dispatch(
                                            søknadActions.updateVedlegg({
                                                terminbekreftelse: concatNewFiles(
                                                    files,
                                                    vedlegg.terminbekreftelse
                                                )
                                            })
                                        );
                                    }}
                                    onFileDelete={(file: Attachment) =>
                                        dispatch(
                                            søknadActions.updateVedlegg({
                                                terminbekreftelse: removeFileFromArray(
                                                    file,
                                                    vedlegg.terminbekreftelse
                                                )
                                            })
                                        )
                                    }
                                />
                            )}
                        />

                        <Spørsmål
                            synlig={
                                vedlegg.terminbekreftelse.length > 0 &&
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
                            vedlegg.terminbekreftelse.length > 0 && (
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
