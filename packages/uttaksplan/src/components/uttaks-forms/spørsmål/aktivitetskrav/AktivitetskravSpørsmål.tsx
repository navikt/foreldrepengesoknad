import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { MorsAktivitet, NavnPåForeldre } from '@navikt/fp-common';

import Block from '../../../../common/block/Block';
import { PeriodeUtsettelseFormField } from '../../periode-utsettelse-form/periodeUtsettelseFormConfig';
import { PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

interface Props {
    fieldName: PeriodeUttakFormField | PeriodeUtsettelseFormField;
    FormComponents: any;
    navnPåForeldre: NavnPåForeldre;
}

const renderOptions = (intl: IntlShape) => {
    return Object.keys(MorsAktivitet)
        .filter(
            (aktivitetsid) =>
                (MorsAktivitet as any)[aktivitetsid] !== MorsAktivitet.Uføre &&
                (MorsAktivitet as any)[aktivitetsid] !== MorsAktivitet.IkkeOppgitt,
        )
        .map((aktivitetsid) => (
            <option value={(MorsAktivitet as any)[aktivitetsid]} key={(MorsAktivitet as any)[aktivitetsid]}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart */}
                {intl.formatMessage({ id: `uttaksplan.morsAktivitet.${aktivitetsid}` })}
            </option>
        ));
};

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const AktivitetskravSpørsmål: FunctionComponent<Props> = ({ fieldName, navnPåForeldre, FormComponents }) => {
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
};
// eslint-disable-next-line import/no-default-export
export default AktivitetskravSpørsmål;
