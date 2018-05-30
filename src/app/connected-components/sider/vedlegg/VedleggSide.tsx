import * as React from 'react';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { DispatchProps } from '../../../redux/types';
import ISøknadsvedlegg from '../../../types/søknad/Søknadsvedlegg';
import { Attachment } from '../../../types/Attachment';
import SøknadsvedleggOversikt from '../../../components/søknadsvedleggOversikt/SøknadsvedleggOversikt';
import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';

export interface StateProps {
    vedlegg: ISøknadsvedlegg;
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
                    <SøknadsvedleggOversikt
                        gruppe="adopsjonsvedtak"
                        vedlegg={vedlegg.adopsjonsvedtak}
                        onChange={(files: Attachment[]) => {
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
                    <SøknadsvedleggOversikt
                        gruppe="fødselsattest"
                        vedlegg={vedlegg.fødselsattest}
                        onChange={(files: Attachment[]) => {
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
