import { intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { validateEgenNæringLand, validateEgenNæringOrgnr } from '../egenNæringValidation';
import { EgenNæringFormField } from 'app/steps/egen-næring/egenNæringFormConfig';
import { Select, TextField } from '@navikt/fp-form-hooks';

interface Props {
    orgNummerErValgfritt: boolean;
    registrertINorge: boolean | undefined;
}

const OrgnummerEllerLand: FunctionComponent<Props> = ({ orgNummerErValgfritt, registrertINorge }) => {
    const intl = useIntl();
    const orgNrSpm = intlUtils(intl, 'egenNæring.orgnr');
    const orgNrLabel = orgNummerErValgfritt ? `${orgNrSpm} ${intlUtils(intl, 'valgfritt')}` : orgNrSpm;

    return (
        <>
            {registrertINorge ? (
                <TextField
                    name={EgenNæringFormField.egenNæringOrgnr}
                    label={orgNrLabel}
                    validate={[validateEgenNæringOrgnr(intl, orgNummerErValgfritt)]}
                />
            ) : null}
            {registrertINorge === false ? (
                <Select
                    name={EgenNæringFormField.egenNæringLand}
                    label={intlUtils(intl, 'egenNæring.registrertILand')}
                    validate={[validateEgenNæringLand(intl)]}
                >
                    <option>Test</option>
                    <option>Test 2</option>
                </Select>
            ) : null}
        </>
    );
};

export default OrgnummerEllerLand;
