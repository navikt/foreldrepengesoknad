import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import AntallBarnBolk from '../../../../bolker/AntallBarnBolk';
import { FødtBarn } from '../../../../types/søknad/Barn';
import FødselsdatoerSpørsmål from '../../../../spørsmål/FødselsdatoerSpørsmål';

import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import Block from 'common/components/block/Block';
import { AttachmentType, Skjemanummer } from '../../../../types/søknad/Søknad';

interface StateProps {
    barn: FødtBarn;
    fødselsattest: Attachment[];
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class FødtBarnPartial extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
        props.dispatch(
            søknadActions.updateBarn({
                fødselsdatoer: [props.barn.fødselsdatoer[0]]
            })
        );
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateBarn({
                ...this.props.barn,
                antallBarn: antall,
                fødselsdatoer: [this.props.barn.fødselsdatoer[0]]
            })
        );
    }

    render() {
        const { intl, dispatch, barn, fødselsattest } = this.props;
        return (
            <React.Fragment>
                <AntallBarnBolk
                    spørsmål={getMessage(intl, 'antallBarn.spørsmål.fått')}
                    inputName="antallBarn"
                    antallBarn={barn.antallBarn}
                    onChange={this.oppdaterAntallBarn}
                />
                <Block visible={barn.antallBarn !== undefined}>
                    <FødselsdatoerSpørsmål
                        collapsed={true}
                        fødselsdatoer={barn.fødselsdatoer}
                        onChange={(fødselsdatoer: Date[]) =>
                            dispatch(
                                søknadActions.updateBarn({
                                    fødselsdatoer
                                })
                            )
                        }
                    />
                </Block>

                <Block
                    visible={
                        barn.fødselsdatoer.length > 0 &&
                        barn.fødselsdatoer.every(
                            (fødselsdato: Date) => fødselsdato instanceof Date
                        )
                    }
                    header={{
                        title: getMessage(intl, 'vedlegg.tittel.fødselsattest')
                    }}>
                    <AttachmentsUploaderPure
                        attachments={fødselsattest}
                        attachmentType={AttachmentType.FØDSELSATTEST}
                        skjemanummer={Skjemanummer.FØDSELSATTEST}
                        onFilesSelect={(attachments: Attachment[]) => {
                            attachments.forEach((attachment: Attachment) => {
                                dispatch(
                                    søknadActions.uploadAttachment(attachment)
                                );
                            });
                        }}
                        onFileDelete={(attachment: Attachment) =>
                            dispatch(søknadActions.deleteAttachment(attachment))
                        }
                        dispatch={dispatch}
                    />
                </Block>
            </React.Fragment>
        );
    }
}

export default injectIntl(FødtBarnPartial);
