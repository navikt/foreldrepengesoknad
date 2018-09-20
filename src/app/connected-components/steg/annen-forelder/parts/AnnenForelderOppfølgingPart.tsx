import React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { ForeldreansvarBarn } from '../../../../types/søknad/Barn';
import RettPåForeldrepengerSpørsmål from '../../../../spørsmål/RettPåForeldrepengerSpørsmål';
import ErMorUførSpørsmål from '../../../../spørsmål/ErMorUførSpørsmål';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { DispatchProps } from 'common/redux/types';
import Block from 'common/components/block/Block';
import ErAnnenForelderInformertSpørsmål from '../../../../spørsmål/ErAnnenForelderInformertSpørsmål';
import getMessage from 'common/util/i18nUtils';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Skjemanummer } from '../../../../types/søknad/Søknad';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { connect } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import AleneOmOmsorgsSpørsmål from '../../../../spørsmål/AleneOmOmsorgSpørsmål';
import { RegistrertAnnenForelder } from '../../../../types/Person';
import { formaterNavn } from '../../../../util/domain/personUtil';
import { AnnenForelderStegVisibility } from '../visibility/annenForelderVisibility';
import { Søker } from '../../../../types/søknad/Søker';
import AnnenForelder from '../../../../types/søknad/AnnenForelder';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';

interface StateProps {
    barn: Partial<ForeldreansvarBarn>;
    annenForelder: Partial<AnnenForelder>;
    søker: Partial<Søker>;
}

interface AnnenForelderOppfølgingPartProps {
    registrertAnnenForelder?: RegistrertAnnenForelder;
    erFarEllerMedmor: boolean;
    vis: AnnenForelderStegVisibility;
}

type Props = AnnenForelderOppfølgingPartProps & StateProps & InjectedIntlProps & DispatchProps;

class AnnenForelderOppfølgingPart extends React.Component<Props> {
    render() {
        const { barn, annenForelder, søker, registrertAnnenForelder, vis, dispatch, intl } = this.props;

        const navn = registrertAnnenForelder
            ? formaterNavn(
                  registrertAnnenForelder.fornavn,
                  registrertAnnenForelder.etternavn,
                  registrertAnnenForelder.mellomnavn
              )
            : formaterNavn(annenForelder.fornavn!, annenForelder.etternavn!);

        return (
            <React.Fragment>
                <Block>
                    <AleneOmOmsorgsSpørsmål
                        aleneOmOmsorg={søker.erAleneOmOmsorg}
                        onChange={(deltOmsorg) =>
                            dispatch(
                                søknadActions.updateSøker({
                                    erAleneOmOmsorg: !deltOmsorg
                                })
                            )
                        }
                    />
                </Block>
                <Block visible={vis.harRettPåForeldrepengerSpørsmål}>
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

                <Block visible={vis.erAnnenForelderInformertSpørsmål}>
                    <ErAnnenForelderInformertSpørsmål
                        navn={navn}
                        erAnnenForelderInformert={annenForelder.erInformertOmSøknaden}
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
                                name="omsorgsovertakelseDato"
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
                                attachments={barn.omsorgsovertakelseDato || []}
                                attachmentType={AttachmentType.OMSORGSOVERTAKELSEDATO}
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

export default connect(mapStateToProps)(injectIntl(AnnenForelderOppfølgingPart));
