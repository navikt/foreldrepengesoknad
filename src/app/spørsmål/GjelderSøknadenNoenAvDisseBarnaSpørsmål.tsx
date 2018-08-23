import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { VelgbartRegistrertBarn } from '../types/Person';
import CheckboksPanelGruppeResponsive from 'common/components/skjema/elements/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';
import { formaterNavn } from '../util/domain/personUtil';
import { InputChangeEvent } from '../types/dom/Events';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../util/dates/dates';

interface GjelderSøknadenNoenAvDisseBarnaSpørsmålProps {
    registrerteBarn: VelgbartRegistrertBarn[];
    onChange: (fødselsdato: string) => void;
    disabled: boolean;
}

type Props = GjelderSøknadenNoenAvDisseBarnaSpørsmålProps & InjectedIntlProps;

class GjelderSøknadenNoenAvDisseBarnaSpørsmål extends React.Component<Props> {
    createRegistrertBarnOptions() {
        const { registrerteBarn } = this.props;
        return registrerteBarn.map((registrertBarn: VelgbartRegistrertBarn) => {
            const { fornavn, mellomnavn, etternavn } = registrertBarn;
            const formatertNavn = formaterNavn(fornavn, etternavn, mellomnavn);
            return {
                label: formatertNavn,
                value: registrertBarn.id,
                checked: registrertBarn.checked === true || false,
                subtext: formatDate(registrertBarn.fødselsdato)
            };
        });
    }

    render() {
        const { intl, disabled, onChange } = this.props;
        return (
            <React.Fragment>
                <CheckboksPanelGruppeResponsive
                    checkboxes={this.createRegistrertBarnOptions()}
                    disabled={disabled}
                    legend={getMessage(
                        intl,
                        'gjelderSøknadenNoenAvDisseBarna.spørsmål'
                    )}
                    onChange={(e: InputChangeEvent, fødselsdato: string) => {
                        onChange(fødselsdato);
                    }}
                />
            </React.Fragment>
        );
    }
}

export default injectIntl(GjelderSøknadenNoenAvDisseBarnaSpørsmål);
