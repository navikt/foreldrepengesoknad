import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Input } from 'nav-frontend-skjema';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import { Row, Column } from 'nav-frontend-grid';
import SkjemaInputElement from 'common/components/skjema/elements/skjema-input-element/SkjemaInputElement';

interface NavnPåAnnenForelderSpørsmålProps {
    fornavn?: string;
    etternavn?: string;
    kanIkkeOppgis?: boolean;
    onChange: (annenForelder: AnnenForelderPartial) => void;
}

type Props = NavnPåAnnenForelderSpørsmålProps & InjectedIntlProps;

const NavnPåAnnenForelderSpørsmål = (props: Props) => {
    const { kanIkkeOppgis, fornavn, etternavn, onChange, intl } = props;

    return (
        <SkjemaInputElement label={getMessage(intl, 'annenForelder.spørsmål.navn')}>
            <Row>
                <Column xs="8" sm="6">
                    <Input
                        disabled={kanIkkeOppgis}
                        label={getMessage(intl, 'annenForelder.spørsmål.fornavn')}
                        name="fornavn"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ fornavn: e.target.value })}
                        value={fornavn === undefined ? '' : fornavn}
                        className={'skjemaelement--undersporsmal'}
                    />
                </Column>
                <Column xs="8" sm="6">
                    <Input
                        disabled={kanIkkeOppgis}
                        label={getMessage(intl, 'annenForelder.spørsmål.etternavn')}
                        name="etternavn"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ etternavn: e.target.value })}
                        value={etternavn === undefined ? '' : etternavn}
                        className={'skjemaelement--undersporsmal'}
                    />
                </Column>
            </Row>
        </SkjemaInputElement>
    );
};

export default injectIntl(NavnPåAnnenForelderSpørsmål);
