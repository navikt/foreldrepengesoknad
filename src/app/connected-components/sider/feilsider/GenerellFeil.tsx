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
    const errorMessage =
        props.history.location.state && props.history.location.state.errorMessage
            ? props.history.location.state.errorMessage
            : undefined;

    return (
        <Applikasjonsside visSpråkvelger={false} margin={false}>
            <DocumentTitle title={getMessage(props.intl, 'dokument.tittel.feilside.generell')} />
            <Feilsidemelding
                illustrasjon={{
                    tittel: getMessage(props.intl, 'feilside.bobletittel'),
                    tekst: getMessage(props.intl, 'feilside.bobletekst')
                }}
                tittel={getMessage(props.intl, 'feilside.tittel')}
                ingress={
                    errorMessage ? (
                        errorMessage
                    ) : (
                        <FormattedMessage
                            id={'feilside.ingress'}
                            values={{
                                lenke: (
                                    <Lenke href={lenker.brukerstøtte}>
                                        {getMessage(props.intl, 'feilside.ingress.lenke')}
                                    </Lenke>
                                )
                            }}
                        />
                    )
                }
            />
        </Applikasjonsside>
    );
};
export default injectIntl(GenerellFeil);
