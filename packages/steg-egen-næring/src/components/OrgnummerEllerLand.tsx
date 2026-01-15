import { useFormContext } from 'react-hook-form';
import { IntlShape, useIntl } from 'react-intl';

import { RhfSelect, RhfTextField } from '@navikt/fp-form-hooks';
import { createCountryOptions } from '@navikt/fp-utils';
import { containsWhiteSpace, erGyldigNorskOrgnummer, isNotEqualValue, isRequired } from '@navikt/fp-validation';

import { NæringFormValues } from '../types/NæringFormValues';

const validateEgenNæringOrgnr =
    (intl: IntlShape, erValgfri: boolean) =>
    (orgnrValue = ''): string | undefined => {
        if (!erValgfri && !orgnrValue) {
            return intl.formatMessage({ id: 'valideringsfeil.egenNæringOrgnr.påkrevd' });
        }

        if (orgnrValue.length > 0 && containsWhiteSpace(orgnrValue)) {
            return intl.formatMessage({ id: 'valideringsfeil.egenNæringOrgnr.inneholderMellomrom' });
        }

        if (orgnrValue.length > 0 && !erGyldigNorskOrgnummer(orgnrValue)) {
            return intl.formatMessage({ id: 'valideringsfeil.egenNæringOrgnr.ugyldigFormat' });
        }

        return undefined;
    };

interface Props {
    orgNummerErValgfritt: boolean;
    registrertINorge: boolean | undefined;
}

export const OrgnummerEllerLand = ({ orgNummerErValgfritt, registrertINorge }: Props) => {
    const intl = useIntl();
    const orgNrSpm = intl.formatMessage({ id: 'egenNæring.orgnr' });
    const orgNrLabel = orgNummerErValgfritt ? `${orgNrSpm} ${intl.formatMessage({ id: 'valgfritt' })}` : orgNrSpm;

    const { control } = useFormContext<NæringFormValues>();

    return (
        <>
            {registrertINorge && (
                <RhfTextField
                    name="organisasjonsnummer"
                    control={control}
                    label={orgNrLabel}
                    validate={[validateEgenNæringOrgnr(intl, orgNummerErValgfritt)]}
                />
            )}
            {registrertINorge === false && (
                <RhfSelect
                    name="registrertILand"
                    control={control}
                    label={intl.formatMessage({ id: 'egenNæring.registrertILand' })}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringLand.påkrevd' })),
                        isNotEqualValue(intl.formatMessage({ id: 'valideringsfeil.egenNæringLand.ikkeNorge' }), 'NO'),
                    ]}
                >
                    {createCountryOptions()
                        .filter((country) => country[0] !== 'NO')
                        .map((o) => (
                            <option key={o[0]} value={o[0]}>
                                {o[1]}
                            </option>
                        ))}
                </RhfSelect>
            )}
        </>
    );
};
