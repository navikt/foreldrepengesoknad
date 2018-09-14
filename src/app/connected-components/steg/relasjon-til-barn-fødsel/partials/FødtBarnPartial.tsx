import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import AntallBarnBolk from '../../../../bolker/AntallBarnBolk';
import { FødtBarn } from '../../../../types/søknad/Barn';
import FødselsdatoerSpørsmål from '../../../../spørsmål/FødselsdatoerSpørsmål';

import { DispatchProps } from 'common/redux/types/index';
import getMessage from 'common/util/i18nUtils';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import Block from 'common/components/block/Block';
import { AttachmentType, Skjemanummer } from '../../../../types/søknad/Søknad';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { RegistrertBarn } from '../../../../types/Person';
import { RelasjonTilBarnFødtVisibility } from '../visibility/relasjonTilBarnFødselVisibility';

interface StateProps {
    barn: FødtBarn;
    fødselsattest: Attachment[];
    registrerteBarn: RegistrertBarn[];
    gjelderAnnetBarn?: boolean;
    vis: RelasjonTilBarnFødtVisibility;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class FødtBarnPartial extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
        props.dispatch(
            søknadActions.updateBarn({
                fødselsdatoer: props.barn.fødselsdatoer !== undefined ? [props.barn.fødselsdatoer[0]] : new Array(1)
            })
        );
    }

    oppdaterAntallBarn(antall: number) {
        const { barn } = this.props;
        this.props.dispatch(
            søknadActions.updateBarn({
                ...barn,
                antallBarn: antall,
                fødselsdatoer: barn.fødselsdatoer !== undefined ? [barn.fødselsdatoer[0]] : new Array(1)
            })
        );
    }

    render() {
        const { intl, dispatch, barn, fødselsattest, vis } = this.props;
        return (
            <React.Fragment>
                <AntallBarnBolk
                    spørsmål={getMessage(intl, 'antallBarn.spørsmål.fått')}
                    inputName="antallBarn"
                    antallBarn={barn.antallBarn}
                    onChange={this.oppdaterAntallBarn}
                />
                <Block visible={vis.fødselsdatoer}>
                    <FødselsdatoerSpørsmål
                        collapsed={true}
                        fødselsdatoer={barn.fødselsdatoer || []}
                        onChange={(fødselsdatoer: Date[]) =>
                            dispatch(
                                søknadActions.updateBarn({
                                    fødselsdatoer
                                })
                            )
                        }
                    />
                </Block>

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
            </React.Fragment>
        );
    }
}

export default injectIntl(FødtBarnPartial);
