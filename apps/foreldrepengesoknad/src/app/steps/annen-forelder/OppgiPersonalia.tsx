import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Barn, bemUtils, isAdoptertStebarn, validateTextInputField } from '@navikt/fp-common';
import { Checkbox, Select, TextField } from '@navikt/fp-form-hooks';
import { Søkerrolle } from '@navikt/fp-types';
import { createCountryOptions } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { validateFødselsnummer } from 'app/utils/validationUtil';

import { AnnenForelderFormData } from './AnnenForelderFormData';
import './oppgiPersonalia.less';

const isValidText = (intl: IntlShape, label: string) => (fornavn: string) => {
    return validateTextInputField(fornavn, label, intl);
};

const isAnnenForelderKanIkkeOppgisIncluded = (søkerRolle: Søkerrolle, gjelderStebarnsadopsjon: boolean): boolean => {
    if (gjelderStebarnsadopsjon) {
        return false;
    }
    return søkerRolle === 'medmor' ? false : true;
};

interface Props {
    søkersFødselsnummer: string;
    rolle: Søkerrolle;
    barn: Barn;
}

const OppgiPersonalia: React.FunctionComponent<Props> = ({ søkersFødselsnummer, rolle, barn }) => {
    const intl = useIntl();
    const bem = bemUtils('width');

    const formMethods = useFormContext<AnnenForelderFormData>();
    const fornavn = formMethods.watch('fornavn');
    const utenlandskFnr = formMethods.watch('utenlandskFnr');
    const kanIkkeOppgis = formMethods.watch('kanIkkeOppgis');

    return (
        <>
            {isAnnenForelderKanIkkeOppgisIncluded(rolle, isAdoptertStebarn(barn)) && (
                <Checkbox name="kanIkkeOppgis" label={intl.formatMessage({ id: 'annenForelder.spørsmål.kanOppgis' })} />
            )}
            <TextField
                name="fornavn"
                label={<FormattedMessage id="annenForelder.spørsmål.fornavn" />}
                validate={[
                    isRequired(intl.formatMessage({ id: 'valideringsfeil.annenForelder.fornavnPåkrevd' })),
                    isValidText(intl, 'annenForelder.spørsmål.fornavn'),
                ]}
                disabled={kanIkkeOppgis}
                className={bem.block}
            />
            <TextField
                name="etternavn"
                label={<FormattedMessage id="annenForelder.spørsmål.etternavn" />}
                disabled={kanIkkeOppgis}
                validate={[
                    isRequired(intl.formatMessage({ id: 'valideringsfeil.annenForelder.etternavnPåkrevd' })),
                    isValidText(intl, 'annenForelder.spørsmål.etternavn'),
                ]}
                className={bem.block}
            />
            {!kanIkkeOppgis && (
                <>
                    <div>
                        <TextField
                            name="fnr"
                            label={intl.formatMessage({ id: 'annenForelder.spørsmål.fnr' }, { navn: fornavn })}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'valideringsfeil.annenForelder.fnrPåkrevd' })),
                                validateFødselsnummer(
                                    intl,
                                    søkersFødselsnummer,
                                    intl.formatMessage({ id: 'annenForelder.spørsmål.fnr' }, { navn: fornavn }),
                                    utenlandskFnr,
                                ),
                            ]}
                        />
                        <Checkbox
                            name="utenlandskFnr"
                            label={intl.formatMessage({ id: 'annenForelder.spørsmål.utenlandskFnr' })}
                        />
                    </div>
                    {utenlandskFnr && (
                        <Select
                            name="bostedsland"
                            label={intl.formatMessage({ id: 'annenForelder.bostedsland' })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({ id: 'valideringsfeil.annenForelder.bostedslandPåkrevd' }),
                                ),
                            ]}
                        >
                            {createCountryOptions().map((o: Record<string, any>) => (
                                <option key={o[0]} value={o[0]}>
                                    {o[1]}
                                </option>
                            ))}
                        </Select>
                    )}
                </>
            )}
        </>
    );
};

export default OppgiPersonalia;
