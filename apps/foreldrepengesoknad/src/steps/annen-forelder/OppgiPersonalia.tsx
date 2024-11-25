import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { validateFødselsnummer, validateTextInputField } from 'utils/validationUtil';

import { Barn, isAdoptertStebarn } from '@navikt/fp-common';
import { RhfCheckbox, RhfSelect, RhfTextField } from '@navikt/fp-form-hooks';
import { Søkerrolle } from '@navikt/fp-types';
import { bemUtils, createCountryOptions } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { AnnenForelderFormData } from './AnnenForelderFormData';
import './oppgiPersonalia.css';

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

export const OppgiPersonalia = ({ søkersFødselsnummer, rolle, barn }: Props) => {
    const intl = useIntl();
    const bem = bemUtils('width');

    const formMethods = useFormContext<AnnenForelderFormData>();
    const fornavn = formMethods.watch('fornavn');
    const utenlandskFnr = formMethods.watch('utenlandskFnr');
    const kanIkkeOppgis = formMethods.watch('kanIkkeOppgis');

    return (
        <>
            {isAnnenForelderKanIkkeOppgisIncluded(rolle, isAdoptertStebarn(barn)) && (
                <RhfCheckbox
                    name="kanIkkeOppgis"
                    label={intl.formatMessage({ id: 'annenForelder.spørsmål.kanOppgis' })}
                />
            )}
            {!kanIkkeOppgis && (
                <>
                    <RhfTextField
                        name="fornavn"
                        label={<FormattedMessage id="annenForelder.spørsmål.fornavn" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.annenForelder.fornavnPåkrevd' })),
                            isValidText(intl, 'annenForelder.spørsmål.fornavn'),
                        ]}
                        className={bem.block}
                    />
                    <RhfTextField
                        name="etternavn"
                        label={<FormattedMessage id="annenForelder.spørsmål.etternavn" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.annenForelder.etternavnPåkrevd' })),
                            isValidText(intl, 'annenForelder.spørsmål.etternavn'),
                        ]}
                        className={bem.block}
                    />
                </>
            )}
            {!kanIkkeOppgis && (
                <>
                    <div>
                        <RhfTextField
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
                            className={bem.block}
                        />
                        <RhfCheckbox
                            name="utenlandskFnr"
                            label={intl.formatMessage({ id: 'annenForelder.spørsmål.utenlandskFnr' })}
                        />
                    </div>
                    {utenlandskFnr && (
                        <RhfSelect
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
                        </RhfSelect>
                    )}
                </>
            )}
        </>
    );
};
