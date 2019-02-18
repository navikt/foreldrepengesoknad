import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import { Row, Column } from 'nav-frontend-grid';
import SkjemaInputElement from 'common/components/skjema/elements/skjema-input-element/SkjemaInputElement';
import Input from 'common/components/skjema/wrappers/Input';

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
                <Column xs="12" sm="6" className="block--sm--xs">
                    <Input
                        disabled={kanIkkeOppgis}
                        label={getMessage(intl, 'annenForelder.spørsmål.fornavn')}
                        name="fornavn"
                        onChange={(v: string) => onChange({ fornavn: v })}
                        value={fornavn === undefined ? '' : fornavn}
                        className="skjemaelement--undersporsmal"
                        throttled={false}
                    />
                </Column>
                <Column xs="12" sm="6">
                    <Input
                        disabled={kanIkkeOppgis}
                        label={getMessage(intl, 'annenForelder.spørsmål.etternavn')}
                        name="etternavn"
                        onChange={(v: string) => onChange({ etternavn: v })}
                        value={etternavn === undefined ? '' : etternavn}
                        className="skjemaelement--undersporsmal"
                    />
                </Column>
            </Row>
        </SkjemaInputElement>
    );
};

export default injectIntl(NavnPåAnnenForelderSpørsmål);
