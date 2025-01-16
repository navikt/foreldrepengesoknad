import { IntlShape, useIntl } from 'react-intl';

import { RhfSelect, RhfTextField } from '@navikt/fp-form-hooks';
import { createCountryOptions } from '@navikt/fp-utils';
import { containsWhiteSpace, erGyldigNorskOrgnummer, isNotEqualValue, isRequired } from '@navikt/fp-validation';

const validateEgenNæringOrgnr =
    (intl: IntlShape, erValgfri: boolean) =>
    (orgnr: string | undefined): string | undefined => {
        const trimmedOrgNr = (orgnr || '').trim();

        if (!erValgfri && !trimmedOrgNr) {
            return intl.formatMessage({ id: 'valideringsfeil.egenNæringOrgnr.påkrevd' });
        }
        if (trimmedOrgNr.length > 0 && containsWhiteSpace(orgnr || '')) {
            return intl.formatMessage({ id: 'valideringsfeil.egenNæringOrgnr.inneholderMellomrom' });
        }
        if (trimmedOrgNr.length > 0 && !erGyldigNorskOrgnummer(trimmedOrgNr)) {
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

    return (
        <>
            {registrertINorge && (
                <RhfTextField
                    name="organisasjonsnummer"
                    label={orgNrLabel}
                    validate={[validateEgenNæringOrgnr(intl, orgNummerErValgfritt)]}
                />
            )}
            {registrertINorge === false && (
                <RhfSelect
                    name="registrertILand"
                    label={intl.formatMessage({ id: 'egenNæring.registrertILand' })}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringLand.påkrevd' })),
                        isNotEqualValue(intl.formatMessage({ id: 'valideringsfeil.egenNæringLand.ikkeNorge' }), 'NO'),
                    ]}
                >
                    {createCountryOptions()
                        .filter((country: Record<string, any>) => country[0] !== 'NO')
                        .map((o: Record<string, any>) => (
                            <option key={o[0]} value={o[0]}>
                                {o[1]}
                            </option>
                        ))}
                </RhfSelect>
            )}
        </>
    );
};
