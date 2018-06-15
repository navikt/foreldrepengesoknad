import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Bolk from 'app/components/layout/Bolk';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import AntallBarnSpørsmål from '../../../../spørsmål/AntallBarnSpørsmål';
import { FødtBarn } from '../../../../types/søknad/Barn';
import FødselsdatoerSpørsmål from '../../../../spørsmål/FødselsdatoerSpørsmål';

import utils from '../../../../util/fødselsdato';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';

interface StateProps {
    barn: FødtBarn;
    fødselsattest: Attachment[];
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class FødtBarnPartial extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateBarn({
                ...this.props.barn,
                antallBarn: antall,
                fødselsdatoer: utils.trimFødselsdatoer(
                    antall,
                    this.props.barn.fødselsdatoer
                )
            })
        );
    }

    render() {
        const { intl, dispatch, barn, fødselsattest } = this.props;
        return (
            <React.Fragment>
                <Spørsmål
                    render={() => (
                        <AntallBarnSpørsmål
                            spørsmål={getMessage(
                                intl,
                                'antallBarn.spørsmål.fått'
                            )}
                            inputName="antallBarn"
                            antallBarn={barn.antallBarn}
                            onChange={this.oppdaterAntallBarn}
                        />
                    )}
                />

                <Spørsmål
                    render={() => (
                        <FødselsdatoerSpørsmål
                            fødselsdatoer={barn.fødselsdatoer}
                            onChange={(fødselsdatoer: Date[]) =>
                                dispatch(
                                    søknadActions.updateBarn({
                                        fødselsdatoer
                                    })
                                )
                            }
                        />
                    )}
                />

                <Bolk
                    synlig={
                        barn.fødselsdatoer.length > 0 &&
                        barn.fødselsdatoer.every(
                            (fødselsdato: Date) => fødselsdato instanceof Date
                        )
                    }
                    tittel={getMessage(
                        intl,
                        'attachments.tittel.fødselsattest'
                    )}
                    render={() => (
                        <AttachmentsUploader
                            attachments={fødselsattest}
                            attachmentType="fødselsattest"
                            onFilesSelect={(attachments: Attachment[]) => {
                                dispatch(
                                    søknadActions.updateBarn({
                                        fødselsattest: attachments
                                    })
                                );
                            }}
                            onFileDelete={(attachment: Attachment) => {}}
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

export default injectIntl(FødtBarnPartial);
