import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { Select, TextField } from '@navikt/fp-form-hooks';
import { createCountryOptions } from '@navikt/fp-utils';
import { containsWhiteSpace, erGyldigNorskOrgnummer, isEqualValue, isRequired } from '@navikt/fp-validation';

const validateEgenNæringOrgnr =
    (intl: IntlShape, erValgfri: boolean) =>
    (orgnr: string | undefined): string | undefined => {
        const trimmedOrgNr = (orgnr || '').trim();

        if (!erValgfri && !trimmedOrgNr) {
            return intl.formatMessage({ id: 'valideringsfeil.egenNæringOrgnr.påkrevd' });
        }
        if (trimmedOrgNr.length > 0 && containsWhiteSpace(trimmedOrgNr)) {
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

const OrgnummerEllerLand: FunctionComponent<Props> = ({ orgNummerErValgfritt, registrertINorge }) => {
    const intl = useIntl();
    const orgNrSpm = intl.formatMessage({ id: 'egenNæring.orgnr' });
    const orgNrLabel = orgNummerErValgfritt ? `${orgNrSpm} ${intl.formatMessage({ id: 'valgfritt' })}` : orgNrSpm;

    return (
        <>
            {registrertINorge && (
                <TextField
                    name="organisasjonsnummer"
                    label={orgNrLabel}
                    validate={[validateEgenNæringOrgnr(intl, orgNummerErValgfritt)]}
                />
            )}
            {registrertINorge === false && (
                <Select
                    name="registrertILand"
                    label={intl.formatMessage({ id: 'egenNæring.registrertILand' })}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.egenNæringLand.påkrevd' })),
                        isEqualValue(intl.formatMessage({ id: 'valideringsfeil.egenNæringLand.ikkeNorge' }), 'NO'),
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
    );
};

export default OrgnummerEllerLand;
