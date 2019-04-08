import * as React from 'react';
import { StegID } from 'app/util/routing/stegConfig';
import { AppState } from 'app/redux/reducers';
import { findMissingAttachments } from 'app/util/attachments/missingAttachmentUtil';
import Steg, { StegProps } from 'app/components/steg/Steg';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { DispatchProps } from 'common/redux/types';
import { HistoryProps } from 'app/types/common';
import isAvailable from '../util/isAvailable';
import { SøkerinfoProps } from 'app/types/søkerinfo';
import { connect } from 'react-redux';
import { MissingAttachment } from 'app/types/MissingAttachment';
import Block from 'common/components/block/Block';
import VedleggSpørsmål from 'app/components/vedlegg-spørsmål/VedleggSpørsmål';
import { getSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { findAllAttachments } from 'app/util/attachments/attachmentUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import Søknad from 'app/types/søknad/Søknad';
import { soknadActionCreators } from 'app/redux/actions';
import { guid } from 'nav-frontend-js-utils';

interface ReduxProps {
    stegProps: StegProps;
    søknad: Søknad;
    missingAttachments: Map<string, MissingAttachment[]>;
    alleVedlegg: Map<string, Attachment[]>;
}

type Props = SøkerinfoProps & ReduxProps & InjectedIntlProps & DispatchProps & HistoryProps;

class ManglendeVedleggsteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleVedleggSpørsmålOnChange = this.handleVedleggSpørsmålOnChange.bind(this);
    }

    handleVedleggSpørsmålOnChange(attachments: Attachment[], key: string) {
        const { søknad, dispatch } = this.props;
        søknad[key] = attachments;
        dispatch(soknadActionCreators.updateSøknad(søknad));
    }

    render() {
        const { søknad, stegProps, alleVedlegg, missingAttachments } = this.props;
        console.log('alleVedlegg', alleVedlegg);
        console.log('missingAttachments', missingAttachments);

        return (
            <Steg {...stegProps}>
                {[...Array.from(alleVedlegg.entries()), ...Array.from(missingAttachments.entries())].map((ma: any) => {
                    return (
                        <Block key={guid()} margin="xs" header={{ title: ma.type, info: `${ma.skjemanummer}` }}>
                            <VedleggSpørsmål
                                vedlegg={søknad[ma.key]}
                                attachmentType={ma.type}
                                skjemanummer={ma.skjemanummer}
                                onChange={(attachments: Attachment[]) =>
                                    this.handleVedleggSpørsmålOnChange(attachments, ma.key)
                                }
                            />
                        </Block>
                    );
                })}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): ReduxProps => {
    const { søknad, api } = state;
    const missingAttachments = findMissingAttachments(søknad, api, getSøknadsinfo(state)!);
    const alleVedlegg = findAllAttachments(søknad);

    const stegProps: StegProps = {
        id: StegID.MANGLENDE_VEDLEGG,
        renderFortsettKnapp: true,
        history: props.history,
        renderFormTag: true,
        isAvailable: isAvailable(StegID.MANGLENDE_VEDLEGG, søknad, props.søkerinfo)
    };

    return {
        søknad,
        stegProps,
        missingAttachments,
        alleVedlegg
    };
};

export default injectIntl(connect<ReduxProps>(mapStateToProps)(ManglendeVedleggsteg));
