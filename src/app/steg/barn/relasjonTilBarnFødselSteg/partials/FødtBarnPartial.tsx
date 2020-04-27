import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import AntallBarnBolk from '../../components/AntallBarnBolk';
import { FødtBarn } from '../../../../types/søknad/Barn';
import FødselsdatoerSpørsmål from '../../../../spørsmål/FødselsdatoerSpørsmål';

import { DispatchProps } from 'common/redux/types/index';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import { RegistrertBarn } from '../../../../types/Person';
import { RelasjonTilBarnFødtVisibility } from '../visibility/relasjonTilBarnFødselVisibility';
import { Søkersituasjon, Skjemanummer } from '../../../../types/søknad/Søknad';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import AttachmentsUploaderPure from 'app/components/storage/attachment/components/AttachmentUploaderPure';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { Element } from 'nav-frontend-typografi';

interface StateProps {
    barn: FødtBarn;
    registrerteBarn: RegistrertBarn[];
    gjelderAnnetBarn?: boolean;
    situasjon: Søkersituasjon;
    vis: RelasjonTilBarnFødtVisibility;
    erFarMedmor: boolean;
}

interface OwnProps {
    intl: IntlShape;
}

type Props = StateProps & DispatchProps & OwnProps;

const getFødselsdatoer = (fødselsdatoer?: Date[]): Date[] => {
    return fødselsdatoer !== undefined &&
        fødselsdatoer.length > 0 &&
        fødselsdatoer[0] !== null &&
        fødselsdatoer[0] !== undefined
        ? [fødselsdatoer[0]]
        : [];
};

class FødtBarnPartial extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
        props.dispatch(
            søknadActions.updateBarn({
                fødselsdatoer: getFødselsdatoer(props.barn.fødselsdatoer),
            })
        );
    }

    oppdaterAntallBarn(antall: number) {
        const { barn } = this.props;
        this.props.dispatch(
            søknadActions.updateBarn({
                ...barn,
                antallBarn: antall,
                fødselsdatoer: getFødselsdatoer(barn.fødselsdatoer),
            })
        );
    }

    render() {
        const { intl, dispatch, barn, vis, situasjon, erFarMedmor } = this.props;
        return (
            <React.Fragment>
                <AntallBarnBolk
                    spørsmål={getMessage(intl, 'antallBarn.spørsmål.fått')}
                    inputName="antallBarn"
                    antallBarn={barn.antallBarn}
                    situasjon={situasjon}
                    erBarnetFødt={barn.erBarnetFødt}
                    onChange={this.oppdaterAntallBarn}
                />
                <Block visible={vis.fødselsdatoer}>
                    <FødselsdatoerSpørsmål
                        collapsed={true}
                        fødselsdatoer={barn.fødselsdatoer || []}
                        termindato={barn.termindato}
                        antallBarn={barn.antallBarn}
                        erFarMedmor={erFarMedmor}
                        onChangeFødselsdato={(fødselsdatoer: Date[]) =>
                            dispatch(
                                søknadActions.updateBarn({
                                    fødselsdatoer,
                                })
                            )
                        }
                        onChangeTermindato={(termindato: Date) => dispatch(søknadActions.updateBarn({ termindato }))}
                    />
                </Block>
                <Block visible={vis.visInfoOmPrematuruker}>
                    <VeilederInfo messages={[{ contentIntlKey: 'barnFødt.infoPrematuruker', type: 'info' }]} />
                </Block>

                <Block visible={vis.visInfoOmPrematuruker}>
                    <Block margin="xs">
                        <Element>{getMessage(intl, 'vedlegg.lastoppknapp.terminbekreftelse')}</Element>
                    </Block>
                    <AttachmentsUploaderPure
                        attachments={barn.terminbekreftelse || []}
                        attachmentType={AttachmentType.TERMINBEKREFTELSE}
                        skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                        onFilesSelect={(attachments: Attachment[]) => {
                            attachments.forEach((attachment: Attachment) => {
                                dispatch(søknadActions.uploadAttachment(attachment));
                            });
                        }}
                        onFileDelete={(attachment: Attachment) => {
                            dispatch(søknadActions.deleteAttachment(attachment));
                        }}
                    />
                </Block>

                {/*
                    // This has been commented out as users won't have to upload birth certificate
                    // in the first version of Foreldrepengesøknad, but it will be required
                    // once we start fetching data from TPS about registered children later on.
                    // PS! Please remove this comment once this is in place.

                    {vis.fødselsattest ? (
                        <React.Fragment>
                            <Block margin="xs">
                                <Veilederinfo>{getMessage(intl, 'vedlegg.veileder.fødselsattest')}</Veilederinfo>
                            </Block>
                            <Block>
                                <AttachmentsUploaderPure
                                    attachments={fødselsattest}
                                    attachmentType={AttachmentType.FØDSELSATTEST}
                                    skjemanummer={Skjemanummer.FØDSELSATTEST}
                                    onFilesSelect={(attachments: Attachment[]) => {
                                        attachments.forEach((attachment: Attachment) => {
                                            dispatch(søknadActions.uploadAttachment(attachment));
                                        });
                                    }}
                                    onFileDelete={(attachment: Attachment) =>
                                        dispatch(søknadActions.deleteAttachment(attachment))
                                    }
                                />
                            </Block>
                        </React.Fragment>
                    ) : null}
                */}
            </React.Fragment>
        );
    }
}

export default injectIntl(FødtBarnPartial);
