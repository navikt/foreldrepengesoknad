import { JSX } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { NavnPåForeldre } from '@navikt/fp-common';
import { MorsAktivitet } from '@navikt/fp-types';

import Block from '../../../../common/block/Block';
import { TypedFormComponents } from '../../../../formik-wrappers/components/getTypedFormComponents';

const hasValue = (v: unknown) => v !== '' && v !== undefined && v !== null;

interface Props<FieldName> {
    fieldName: FieldName;
    FormComponents: Pick<TypedFormComponents<FieldName, Record<string, unknown>, string>, 'Select'>;
    navnPåForeldre: NavnPåForeldre;
}

const MorsAktivitetConst = [
    'ARBEID',
    'UTDANNING',
    'KVALPROG',
    'INTROPROG',
    'TRENGER_HJELP',
    'INNLAGT',
    'ARBEID_OG_UTDANNING',
    'UFØRE',
    'IKKE_OPPGITT',
] satisfies MorsAktivitet[];
const renderOptions = (intl: IntlShape) => {
    return MorsAktivitetConst.filter((aktivitet) => aktivitet !== 'UFØRE' && aktivitet !== 'IKKE_OPPGITT').map(
        (aktivitet) => (
            <option value={aktivitet} key={aktivitet}>
                {intl.formatMessage({ id: `uttaksplan.morsAktivitet.${aktivitet}` })}
            </option>
        ),
    );
};

function AktivitetskravSpørsmål<FieldName>({
    fieldName,
    navnPåForeldre,
    FormComponents,
}: Props<FieldName>): JSX.Element {
    const intl = useIntl();

    return (
        <Block padBottom="l">
            <FormComponents.Select
                name={fieldName}
                description="For at du skal kunne bruke foreldrepenger må mor være i aktivitet"
                label={intl.formatMessage({ id: 'uttaksplan.aktivitetskrav' }, { navnMor: navnPåForeldre.mor })}
                validate={(value: MorsAktivitet | '') => {
                    if (!hasValue(value)) {
                        return intl.formatMessage({ id: 'uttaksplan.validering.aktivitetskrav' });
                    }

                    return undefined;
                }}
            >
                <option value="" />
                {renderOptions(intl)}
            </FormComponents.Select>
        </Block>
    );
}
// eslint-disable-next-line import/no-default-export
export default AktivitetskravSpørsmål;
