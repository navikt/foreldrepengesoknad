import { HStack, Label } from '@navikt/ds-react';
import { Barn, hasValue, isAdoptertStebarn, validateTextInputField } from '@navikt/fp-common';
import { useFormContext } from 'react-hook-form';
import { IntlShape, useIntl } from 'react-intl';

import { Checkbox, Select, TextField } from '@navikt/fp-form-hooks';
import { createCountryOptions } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';
import { validateFødselsnummer } from 'app/utils/validationUtil';
import { AnnenForelderFormData } from './AnnenForelderFormData';
import { Søkerrolle } from '@navikt/fp-types';

const isValidText = (intl: IntlShape, label: string) => (fornavn: string) => {
    return validateTextInputField(fornavn, label, intl);
};

const isAnnenForelderKanIkkeOppgisIncluded = (søkerRolle: Søkerrolle, gjelderStebarnsadopsjon: boolean): boolean => {
    if (gjelderStebarnsadopsjon) {
        return false;
    }

    if (søkerRolle === 'medmor') {
        return false;
    }

    return true;
};

interface Props {
    kanIkkeOppgis: boolean | undefined;
    erUtenlandskFnr: boolean | undefined;
    søkersFødselsnummer: string;
    rolle: Søkerrolle;
    barn: Barn;
}

const OppgiPersonalia: React.FunctionComponent<Props> = ({
    erUtenlandskFnr,
    kanIkkeOppgis,
    søkersFødselsnummer,
    rolle,
    barn,
}) => {
    const intl = useIntl();

    const formMethods = useFormContext<AnnenForelderFormData>();
    const fornavn = formMethods.watch('fornavn');
    const etternavn = formMethods.watch('etternavn');
    const utenlandskFnr = formMethods.watch('utenlandskFnr');
    const fnr = formMethods.watch('fnr');

    const fornavnLabel = intl.formatMessage({ id: 'annenForelder.spørsmål.fornavn' });
    const etternavnLabel = intl.formatMessage({ id: 'annenForelder.spørsmål.etternavn' });

    return (
        <>
            <legend>
                <Label>{intl.formatMessage({ id: 'annenForelder.spørsmål.navn' })}</Label>
            </legend>
            <HStack gap="4">
                <TextField
                    name="fornavn"
                    label={fornavnLabel}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.annenForelder.fornavnPåkrevd' })),
                        isValidText(intl, fornavnLabel),
                    ]}
                    disabled={kanIkkeOppgis}
                />
                <TextField
                    name="etternavn"
                    label={etternavnLabel}
                    disabled={kanIkkeOppgis}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.annenForelder.etternavnPåkrevd' })),
                        isValidText(intl, etternavnLabel),
                    ]}
                />
            </HStack>
            {isAnnenForelderKanIkkeOppgisIncluded(rolle, isAdoptertStebarn(barn)) && (
                <Checkbox name="kanIkkeOppgis" label={intl.formatMessage({ id: 'annenForelder.spørsmål.kanOppgis' })} />
            )}
            {hasValue(fornavn) && hasValue(etternavn) && (
                <TextField
                    name="fnr"
                    label={intl.formatMessage({ id: 'annenForelder.spørsmål.fnr' }, { navn: fornavn })}
                    validate={[
                        validateFødselsnummer(
                            intl,
                            søkersFødselsnummer,
                            intl.formatMessage({ id: 'annenForelder.spørsmål.fnr' }, { navn: fornavn }),
                            erUtenlandskFnr,
                        ),
                    ]}
                />
            )}
            {kanIkkeOppgis !== true && hasValue(fornavn) && hasValue(etternavn) && (
                <Checkbox
                    name="utenlandskFnr"
                    label={intl.formatMessage({ id: 'annenForelder.spørsmål.utenlandskFnr' }, { navn: fornavn })}
                />
            )}
            {utenlandskFnr === true && hasValue(fnr) && (
                <Select
                    name="bostedsland"
                    label={intl.formatMessage({ id: 'annenForelder.bostedsland' }, { navn: fornavn })}
                >
                    {createCountryOptions().map((o: Record<string, any>) => (
                        <option key={o[0]} value={o[0]}>
                            {o[1]}
                        </option>
                    ))}
                </Select>
            )}
        </>
    );
};

export default OppgiPersonalia;
