import React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { ForeldreansvarBarn } from '../../../../types/søknad/Barn';
import { AnnenForelderPartial } from '../../../../types/søknad/AnnenForelder';
import RettPåForeldrepengerSpørsmål from '../../../../spørsmål/RettPåForeldrepengerSpørsmål';
import ErMorUførSpørsmål from '../../../../spørsmål/ErMorUførSpørsmål';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { DispatchProps } from 'common/redux/types';
import Block from 'common/components/block/Block';
import ErDenAndreForelderenInformertSpørsmål from '../../../../spørsmål/ErDenAndreForelderenInformertSpørsmål';
import SkalFarEllerMedmorHaForeldrepengerSpørsmål from '../../../../spørsmål/SkalFarEllerMedmorHaForeldrepengerSpørsmål';
import getMessage from 'common/util/i18nUtils';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { SøkerPartial } from '../../../../types/søknad/Søker';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentType, Skjemanummer } from '../../../../types/søknad/Søknad';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { connect } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import AleneOmOmsorgsSpørsmål from '../../../../spørsmål/AleneOmOmsorgSpørsmål';
import { RegistrertAnnenForelder } from '../../../../types/Person';
import { formaterNavn } from '../../../../util/domain/personUtil';

interface StateProps {
    barn: Partial<ForeldreansvarBarn>;
    annenForelder: Partial<AnnenForelderPartial>;
    søker: SøkerPartial;
}

interface AnnenForelderErKjentPartialProps {
    registrertAnnenForelder?: RegistrertAnnenForelder;
    erFarEllerMedmor: boolean;
    visInformasjonVedOmsorgsovertakelse: boolean;
}

type Props = AnnenForelderErKjentPartialProps &
    StateProps &
    InjectedIntlProps &
    DispatchProps;

class AnnenForelderErKjentPartial extends React.Component<Props> {
    render() {
        const {
            barn,
            annenForelder,
            søker,
            erFarEllerMedmor,
            registrertAnnenForelder,
            visInformasjonVedOmsorgsovertakelse,
            dispatch,
            intl
        } = this.props;

        const harDenAndreForelderenOpplystOmSinPågåendeSak =
            registrertAnnenForelder &&
            registrertAnnenForelder.harOpplystOmSinPågåendeSak;

        const navn = registrertAnnenForelder
            ? formaterNavn(
                  registrertAnnenForelder.fornavn,
                  registrertAnnenForelder.etternavn,
                  registrertAnnenForelder.mellomnavn
              )
            : annenForelder.navn;

        return (
            <React.Fragment>
                <Block>
                    <AleneOmOmsorgsSpørsmål
                        aleneOmOmsorg={søker.erAleneOmOmsorg}
                        onChange={(erAleneOmOmsorg) =>
                            dispatch(
                                søknadActions.updateSøker({
                                    erAleneOmOmsorg
                                })
                            )
                        }
                    />
                </Block>
                <Block
                    visible={
                        !erFarEllerMedmor && søker.erAleneOmOmsorg === true
                    }>
                    <Veilederinfo>
                        Informasjon om deling av uttak og at den andre kan ta
                        perm.
                    </Veilederinfo>
                    <SkalFarEllerMedmorHaForeldrepengerSpørsmål
                        navn={navn}
                        skalFarEllerMedmorHaForeldrepenger={
                            annenForelder.skalHaForeldrepenger
                        }
                        onChange={(skalHaForeldrepenger: boolean) => {
                            dispatch(
                                søknadActions.updateAnnenForelder({
                                    skalHaForeldrepenger
                                })
                            );
                        }}
                    />
                </Block>
                <Block
                    visible={
                        annenForelder.skalHaForeldrepenger === true ||
                        (søker.erAleneOmOmsorg === false &&
                            !harDenAndreForelderenOpplystOmSinPågåendeSak)
                    }>
                    <RettPåForeldrepengerSpørsmål
                        navn={navn}
                        harAnnenForelderRettPåForeldrepenger={
                            annenForelder.harRettPåForeldrepenger
                        }
                        onChange={(harRettPåForeldrepenger: boolean) =>
                            dispatch(
                                søknadActions.updateAnnenForelder({
                                    harRettPåForeldrepenger
                                })
                            )
                        }
                    />
                </Block>

                <Block
                    visible={
                        annenForelder.harRettPåForeldrepenger === false &&
                        erFarEllerMedmor
                    }>
                    <ErMorUførSpørsmål
                        navn={navn}
                        erUfør={annenForelder.erUfør}
                        onChange={(erUfør: boolean) =>
                            dispatch(
                                søknadActions.updateAnnenForelder({
                                    erUfør
                                })
                            )
                        }
                    />
                </Block>

                <Block visible={annenForelder.harRettPåForeldrepenger === true}>
                    <Veilederinfo>
                        Informasjon om rettigheter og deling av uttaksplan
                    </Veilederinfo>
                </Block>

                <Block
                    visible={
                        (søker.erAleneOmOmsorg === false &&
                            annenForelder.harRettPåForeldrepenger === true) ||
                        (søker.erAleneOmOmsorg === false &&
                            harDenAndreForelderenOpplystOmSinPågåendeSak ===
                                true &&
                            erFarEllerMedmor)
                    }>
                    <ErDenAndreForelderenInformertSpørsmål
                        navn={navn}
                        erDenAndreForelderenInformert={
                            annenForelder.erInformertOmSøknaden
                        }
                        onChange={(erInformertOmSøknaden: boolean) =>
                            dispatch(
                                søknadActions.updateAnnenForelder({
                                    erInformertOmSøknaden
                                })
                            )
                        }
                    />
                </Block>

                {erFarEllerMedmor && (
                    <React.Fragment>
                        <Block visible={søker.erAleneOmOmsorg === true}>
                            <DatoInput
                                id="omsorgsovertakelseDato"
                                label={getMessage(
                                    intl,
                                    'omsorgsovertakelseDato.spørsmål'
                                )}
                                onChange={(foreldreansvarsdato: Date) => {
                                    dispatch(
                                        søknadActions.updateBarn({
                                            foreldreansvarsdato
                                        })
                                    );
                                }}
                                dato={barn.foreldreansvarsdato}
                            />
                        </Block>
                        <Block
                            animated={true}
                            visible={
                                søker.erAleneOmOmsorg &&
                                barn.foreldreansvarsdato !== undefined
                            }>
                            <Block
                                animated={false}
                                margin="xs"
                                visible={visInformasjonVedOmsorgsovertakelse}>
                                <Veilederinfo>
                                    <FormattedMessage id="far.omsorgsovertakelse.vedlegg.veileder" />
                                </Veilederinfo>
                            </Block>

                            <AttachmentsUploaderPure
                                attachments={
                                    barn.omsorgsovertakelse
                                        ? barn.omsorgsovertakelse
                                        : []
                                }
                                attachmentType={
                                    AttachmentType.OMSORGSOVERTAKELSE
                                }
                                onFilesSelect={(attachments: Attachment[]) => {
                                    attachments.forEach(
                                        (attachment: Attachment) => {
                                            dispatch(
                                                søknadActions.uploadAttachment(
                                                    attachment
                                                )
                                            );
                                        }
                                    );
                                }}
                                onFileDelete={(attachment: Attachment) =>
                                    dispatch(
                                        søknadActions.deleteAttachment(
                                            attachment
                                        )
                                    )
                                }
                                skjemanummer={
                                    Skjemanummer.OMSORGSOVERTAKELSESDATO
                                }
                            />
                        </Block>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        annenForelder: state.søknad.annenForelder,
        søker: state.søknad.søker,
        barn: state.søknad.barn
    };
};

export default connect(mapStateToProps)(
    injectIntl(AnnenForelderErKjentPartial)
);
