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
import { AnnenForelderErKjentVisibility } from '../visibility/annenForelderVisibility';

interface StateProps {
    barn: Partial<ForeldreansvarBarn>;
    annenForelder: Partial<AnnenForelderPartial>;
    søker: SøkerPartial;
}

interface AnnenForelderErKjentPartialProps {
    registrertAnnenForelder?: RegistrertAnnenForelder;
    erFarEllerMedmor: boolean;
    vis: AnnenForelderErKjentVisibility;
}

type Props = AnnenForelderErKjentPartialProps & StateProps & InjectedIntlProps & DispatchProps;

class AnnenForelderErKjentPartial extends React.Component<Props> {
    render() {
        const { barn, annenForelder, søker, registrertAnnenForelder, vis, dispatch, intl } = this.props;

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
                <Block visible={vis.skalFarEllerMedmorHaForeldrepengerSpørsmål}>
                    <Veilederinfo>Informasjon om deling av uttak og at den andre kan ta perm.</Veilederinfo>
                    <SkalFarEllerMedmorHaForeldrepengerSpørsmål
                        navn={navn}
                        skalFarEllerMedmorHaForeldrepenger={annenForelder.skalHaForeldrepenger}
                        onChange={(skalHaForeldrepenger: boolean) => {
                            dispatch(
                                søknadActions.updateAnnenForelder({
                                    skalHaForeldrepenger
                                })
                            );
                        }}
                    />
                </Block>
                <Block visible={vis.skalAnnenForelderHaForeldrepengerSpørsmål}>
                    <RettPåForeldrepengerSpørsmål
                        navn={navn}
                        harAnnenForelderRettPåForeldrepenger={annenForelder.harRettPåForeldrepenger}
                        onChange={(harRettPåForeldrepenger: boolean) =>
                            dispatch(
                                søknadActions.updateAnnenForelder({
                                    harRettPåForeldrepenger
                                })
                            )
                        }
                    />
                </Block>

                <Block visible={vis.erMorUførSpørsmål}>
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
                    <Veilederinfo>Informasjon om rettigheter og deling av uttaksplan</Veilederinfo>
                </Block>

                <Block visible={vis.erDenAndreForelderenInformertSpørsmål}>
                    <ErDenAndreForelderenInformertSpørsmål
                        navn={navn}
                        erDenAndreForelderenInformert={annenForelder.erInformertOmSøknaden}
                        onChange={(erInformertOmSøknaden: boolean) =>
                            dispatch(
                                søknadActions.updateAnnenForelder({
                                    erInformertOmSøknaden
                                })
                            )
                        }
                    />
                </Block>

                {vis.farEllerMedmorBolk && (
                    <React.Fragment>
                        <Block visible={vis.omsorgsovertakelseDatoSpørsmål}>
                            <DatoInput
                                id="omsorgsovertakelseDato"
                                label={getMessage(intl, 'omsorgsovertakelseDato.spørsmål')}
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
                        <Block animated={true} visible={vis.omsorgsovertakelseVedleggSpørsmål}>
                            <Block animated={false} margin="xs" visible={vis.infoOmOmsorgsovertakelse}>
                                <Veilederinfo>
                                    <FormattedMessage id="far.omsorgsovertakelse.vedlegg.veileder" />
                                </Veilederinfo>
                            </Block>

                            <AttachmentsUploaderPure
                                attachments={barn.omsorgsovertakelse ? barn.omsorgsovertakelse : []}
                                attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
                                onFilesSelect={(attachments: Attachment[]) => {
                                    attachments.forEach((attachment: Attachment) => {
                                        dispatch(søknadActions.uploadAttachment(attachment));
                                    });
                                }}
                                onFileDelete={(attachment: Attachment) =>
                                    dispatch(søknadActions.deleteAttachment(attachment))
                                }
                                skjemanummer={Skjemanummer.OMSORGSOVERTAKELSESDATO}
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

export default connect(mapStateToProps)(injectIntl(AnnenForelderErKjentPartial));
