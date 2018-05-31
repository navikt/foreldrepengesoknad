import * as React from 'react';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

import { ApiReducerState } from '../../../redux/reducers/apiReducer';
import DocumentTitle from 'react-document-title';
import Applikasjonsside from '../Applikasjonsside';
import Person from '../../../types/Person';
import Feilsidemelding from 'common/components/feilsidemelding/Feilsidemelding';

interface StateProps {
    person: Person;
}

type Props = StateProps & InjectedIntlProps;

const IkkeMyndig: React.StatelessComponent<Props> = (props: Props) => {
    const { intl, person } = props;

    if (person) {
        return (
            <Applikasjonsside visSpråkvelger={false}>
                <DocumentTitle title="Søknad om foreldrepenger" />
                <Feilsidemelding
                    tittel={getMessage(intl, 'ikkeMyndig.tittel', {
                        navn: person.fornavn
                    })}
                    ingress={getMessage(intl, 'ikkeMyndig.ingress')}
                />
            </Applikasjonsside>
        );
    }
    return null;
};

const mapStateToProps = (state: { api: ApiReducerState }) => ({
    person: state.api.person
});

export default connect(mapStateToProps)(injectIntl(IkkeMyndig));
