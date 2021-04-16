import * as React from 'react';
import { IntlShape, injectIntl } from 'react-intl';
import ApplicationSpinner from 'common/components/applicationSpinner/ApplicationSpinner';
import DocumentTitle from 'react-document-title';
import getMessage from 'common/util/i18nUtils';
import Applikasjonsside from 'app/components/applikasjon/applikasjonsside/Applikasjonsside';

interface Props {
    intl: IntlShape;
}

const LoadingScreen: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Applikasjonsside visAlertstripe={false}>
            <DocumentTitle title={getMessage(props.intl, 'dokument.tittel.loadingScreen')} />
            <ApplicationSpinner />
        </Applikasjonsside>
    );
};

export default injectIntl(LoadingScreen);
