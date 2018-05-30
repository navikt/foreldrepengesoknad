import * as React from 'react';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { DispatchProps } from '../../../redux/types';
import Søknadsvedlegg from '../../../types/søknad/Søknadsvedlegg';
import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';
import AttachmentUploader from 'storage/attachment/connected-components/attachment-uploader/AttachmentUploader';

export interface StateProps {
    vedlegg: Søknadsvedlegg;
}

export type Props = StateProps & DispatchProps;

class VedleggSide extends React.Component<Props, {}> {
    render() {
        const { vedlegg } = this.props;
        return (
            <Applikasjonsside visSpråkvelger={true}>
                <DocumentTitle title="Vedlegg" />
                <div className="blokk-m">
                    <h2>Adopsjonsvedtak</h2>
                    <AttachmentUploader
                        group="adopsjonsvedtak"
                        attachments={vedlegg.adopsjonsvedtak}
                        onChange={(files) => {
                            this.props.dispatch(
                                søknadActions.updateVedlegg({
                                    adopsjonsvedtak: files
                                })
                            );
                        }}
                    />
                </div>
                <div className="blokk-m">
                    <h2>Fødselsattest</h2>
                    <AttachmentUploader
                        group="fødselsattest"
                        attachments={vedlegg.fødselsattest}
                        onChange={(files) => {
                            this.props.dispatch(
                                søknadActions.updateVedlegg({
                                    fødselsattest: files
                                })
                            );
                        }}
                    />
                </div>
            </Applikasjonsside>
        );
    }
}
const mapStateToProps = (state: AppState): StateProps => {
    return {
        vedlegg: state.søknad.vedlegg
    };
};

export default connect(mapStateToProps)(VedleggSide);
