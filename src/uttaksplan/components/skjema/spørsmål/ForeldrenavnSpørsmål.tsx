import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Row, Column } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';

export interface OwnProps {
    navnForelder1?: string;
    navnForelder2?: string;
    onSetNavnForelder1: (navn: string) => void;
    onSetNavnForelder2: (navn: string) => void;
}

type Props = OwnProps & InjectedIntlProps;

class ForeldrenavnSpørsmål extends React.Component<Props> {
    render() {
        const { intl, navnForelder1, navnForelder2, onSetNavnForelder1, onSetNavnForelder2 } = this.props;

        return (
            <Row>
                <Column xs="6">
                    <Input
                        name="navnforelder1"
                        label={intl.formatMessage({
                            id: 'uttaksplan.skjema.label.forelder1'
                        })}
                        value={navnForelder1 || ''}
                        placeholder="Navn"
                        onChange={(e) => onSetNavnForelder1(e.target.value)}
                    />
                </Column>
                <Column xs="6">
                    <Input
                        name="navnforelder2"
                        label={intl.formatMessage({
                            id: 'uttaksplan.skjema.label.forelder2'
                        })}
                        value={navnForelder2 || ''}
                        placeholder="Navn"
                        onChange={(e) => onSetNavnForelder2(e.target.value)}
                    />
                </Column>
            </Row>
        );
    }
}

export default injectIntl(ForeldrenavnSpørsmål);
