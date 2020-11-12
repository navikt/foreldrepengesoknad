import * as React from 'react';
import { injectIntl, FormattedMessage, IntlShape } from 'react-intl';
import Applikasjonsside from '../../components/applikasjon/applikasjonsside/Applikasjonsside';
import DocumentTitle from 'react-document-title';
import Feilsidemelding from 'common/components/feilsidemelding/Feilsidemelding';
import getMessage from 'common/util/i18nUtils';
import Lenke from 'nav-frontend-lenker';
import lenker from 'app/util/routing/lenker';
import { History } from 'history';

interface GenerellFeilProps {
    history: History;
    intl: IntlShape;
}

type Props = GenerellFeilProps;
const GenerellFeil: React.FunctionComponent<Props> = (props: Props) => {
    const errorMessage =
        props.history.location.state && (props.history.location.state as any).errorMessage
            ? (props.history.location.state as any).errorMessage
            : undefined;

    const uuid =
        props.history.location.state && (props.history.location.state as any).uuid
            ? (props.history.location.state as any).uuid
            : undefined;

    return (
        <Applikasjonsside visSpråkvelger={false} margin={false}>
            <DocumentTitle title={getMessage(props.intl, 'dokument.tittel.feilside.generell')} />
            <Feilsidemelding
                illustrasjon={{
                    tittel: getMessage(props.intl, 'feilside.bobletittel'),
                    tekst: getMessage(props.intl, 'feilside.bobletekst'),
                }}
                tittel={getMessage(props.intl, 'feilside.tittel')}
                uuid={uuid}
                ingress={
                    errorMessage ? (
                        errorMessage
                    ) : (
                        <FormattedMessage
                            id="feilside.ingress"
                            values={{
                                lenke: (
                                    <Lenke href={lenker.brukerstøtte}>
                                        {getMessage(props.intl, 'feilside.ingress.lenke')}
                                    </Lenke>
                                ),
                            }}
                        />
                    )
                }
            />
        </Applikasjonsside>
    );
};
export default injectIntl(GenerellFeil);
