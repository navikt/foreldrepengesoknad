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
import VeilederpanelInnhold from 'app/components/veilederpanel-innhold/VeilederpanelInnhold';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';
import { MissingAttachment } from 'app/types/MissingAttachment';
import Block from 'common/components/block/Block';
import VedleggSpørsmål from 'app/components/vedlegg-spørsmål/VedleggSpørsmål';

interface ReduxProps {
    stegProps: StegProps;
    missingAttachments: MissingAttachment[];
}

type Props = SøkerinfoProps & ReduxProps & InjectedIntlProps & DispatchProps & HistoryProps;

class ManglendeVedleggsteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { stegProps, missingAttachments } = this.props;

        return (
            <Steg {...stegProps}>
                <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                    <VeilederpanelInnhold
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'manglendeVedlegg.info'
                            }
                        ]}
                    />
                </Veilederpanel>
                {missingAttachments.map((ma) => (
                    <>
                        <Block margin="xs" header={{ title: 'test', info: 'Waaaaaaaaaaaat' }}>
                            <VedleggSpørsmål
                                attachmentType={ma.type}
                                skjemanummer={ma.skjemanummer}
                                onChange={() => null}
                            />
                        </Block>
                    </>
                ))}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): ReduxProps => {
    const { søknad, api } = state;
    const missingAttachments = findMissingAttachments(søknad, api, søknad.annenForelder);

    const stegProps: StegProps = {
        id: StegID.MANGLENDE_VEDLEGG,
        renderFortsettKnapp: missingAttachments.length === 0,
        history: props.history,
        renderFormTag: true,
        isAvailable: isAvailable(StegID.MANGLENDE_VEDLEGG, søknad, props.søkerinfo)
    };

    return {
        stegProps,
        missingAttachments
    };
};

export default injectIntl(connect<ReduxProps>(mapStateToProps)(ManglendeVedleggsteg));
