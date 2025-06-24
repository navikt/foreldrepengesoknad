import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { validateFødselsnummer, validateTextInputField } from 'utils/validationUtil';

import { Barn, isAdoptertStebarn } from '@navikt/fp-common';
import { RhfCheckbox, RhfSelect, RhfTextField } from '@navikt/fp-form-hooks';
import { Søkerrolle } from '@navikt/fp-types';
import { createCountryOptions } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { AnnenForelderFormData } from './AnnenForelderFormData';
import styles from './oppgiPersonalia.module.css';

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

    const formMethods = useFormContext<AnnenForelderFormData>();
    const fornavn = formMethods.watch('fornavn');
    const utenlandskFnr = formMethods.watch('utenlandskFnr');
    const kanIkkeOppgis = formMethods.watch('kanIkkeOppgis');

    return (
        <>
            {isAnnenForelderKanIkkeOppgisIncluded(rolle, isAdoptertStebarn(barn)) && (
                <RhfCheckbox
                    name="kanIkkeOppgis"
                    control={formMethods.control}
                    label={intl.formatMessage({ id: 'annenForelder.spørsmål.kanOppgis' })}
                />
            )}
            {!kanIkkeOppgis && (
                <>
                    <RhfTextField
                        name="fornavn"
                        control={formMethods.control}
                        label={<FormattedMessage id="annenForelder.spørsmål.fornavn" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.annenForelder.fornavnPåkrevd' })),
                            isValidText(intl, 'annenForelder.spørsmål.fornavn'),
                        ]}
                        className={styles.width}
                    />
                    <RhfTextField
                        name="etternavn"
                        control={formMethods.control}
                        label={<FormattedMessage id="annenForelder.spørsmål.etternavn" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.annenForelder.etternavnPåkrevd' })),
                            isValidText(intl, 'annenForelder.spørsmål.etternavn'),
                        ]}
                        className={styles.width}
                    />
                </>
            )}
            {!kanIkkeOppgis && (
                <>
                    <div>
                        <RhfTextField
                            name="fnr"
                            control={formMethods.control}
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
                            className={styles.width}
                        />
                        <RhfCheckbox
                            name="utenlandskFnr"
                            control={formMethods.control}
                            label={intl.formatMessage({ id: 'annenForelder.spørsmål.utenlandskFnr' })}
                        />
                    </div>
                    {utenlandskFnr && (
                        <RhfSelect
                            name="bostedsland"
                            control={formMethods.control}
                            label={intl.formatMessage({ id: 'annenForelder.bostedsland' })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({ id: 'valideringsfeil.annenForelder.bostedslandPåkrevd' }),
                                ),
                            ]}
                        >
                            {createCountryOptions().map((o) => (
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
