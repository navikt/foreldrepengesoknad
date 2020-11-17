import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import CheckboksPanelGruppeResponsive from 'common/components/skjema/elements/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';
import { formaterNavn } from '../util/domain/personUtil';
import { InputChangeEvent } from '../../common/types/Events';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../util/dates/dates';
import { RegistrertBarn } from '../types/Person';

interface GjelderSøknadenNoenAvDisseBarnaSpørsmålProps {
    registrerteBarn: RegistrertBarn[];
    valgteBarn: RegistrertBarn[];
    onChange: (barn: RegistrertBarn, checked: boolean) => void;
    disabled: boolean;
    intl: IntlShape;
}

type Props = GjelderSøknadenNoenAvDisseBarnaSpørsmålProps;

const erBarnValgt = (barn: RegistrertBarn, valgteBarn: RegistrertBarn[]): boolean => {
    return valgteBarn.find((b) => b.fnr === barn.fnr) !== undefined;
};

class GjelderSøknadenNoenAvDisseBarnaSpørsmål extends React.Component<Props> {
    createRegistrertBarnOptions() {
        const { registrerteBarn, valgteBarn } = this.props;
        return registrerteBarn.map((registrertBarn: RegistrertBarn) => {
            const { fornavn, mellomnavn, etternavn } = registrertBarn;
            const formatertNavn = formaterNavn(fornavn, etternavn, mellomnavn);
            return {
                label: formatertNavn,
                value: registrertBarn.fnr,
                checked: erBarnValgt(registrertBarn, valgteBarn),
                subtext: formatDate(registrertBarn.fødselsdato),
                autoComplete: 'off',
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
                    legend={getMessage(intl, 'gjelderSøknadenNoenAvDisseBarna.registrerteBarn')}
                    onChange={(e: InputChangeEvent, fnr: string) => {
                        onChange(
                            this.props.registrerteBarn.find((b) => b.fnr === fnr) as RegistrertBarn,
                            e.target.checked
                        );
                    }}
                />
            </React.Fragment>
        );
    }
}

export default injectIntl(GjelderSøknadenNoenAvDisseBarnaSpørsmål);
