import * as React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import Feilsidemelding from 'common/components/feilsidemelding/Feilsidemelding';
import getMessage from 'common/util/i18nUtils';
import Lenke from 'nav-frontend-lenker';
import lenker from 'app/util/routing/lenker';
import { History } from 'history';

interface GenerellFeilProps {
    history: History;
}

type Props = GenerellFeilProps & InjectedIntlProps;
const GenerellFeil: React.StatelessComponent<Props> = (props: Props) => {
    const errorMessage = props.history.location.state.errorMessage;

    return (
        <Applikasjonsside visSpråkvelger={false}>
            <DocumentTitle title={getMessage(props.intl, 'dokument.tittel.feilside.generell')} />
            <Feilsidemelding
                tittel={getMessage(props.intl, 'feilside.tittel')}
                ingress={
                    <FormattedMessage
                        id={errorMessage}
                        values={{
                            lenke: (
                                <Lenke href={lenker.brukerstøtte}>
                                    {getMessage(props.intl, 'feilside.ingress.lenke')}
                                </Lenke>
                            )
                        }}
                    />
                }
            />
        </Applikasjonsside>
    );
};
export default injectIntl(GenerellFeil);
