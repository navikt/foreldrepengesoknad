import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyLong, BodyShort, ReadMore } from '@navikt/ds-react';

import { Block, MorsAktivitet, NavnPåForeldre, hasValue, intlUtils } from '@navikt/fp-common';

import { PeriodeUtsettelseFormField } from '../../periode-utsettelse-form/periodeUtsettelseFormConfig';
import { PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

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
                {intlUtils(intl, `uttaksplan.morsAktivitet.${aktivitetsid}`)}
            </option>
        ));
};

const renderReadMore = () => {
    return (
        <ReadMore header="Hva mener NAV med at mor må være i aktivitet?">
            <BodyShort>
                <FormattedMessage id="uttaksplan.morsAktivitet.readMore.del1" />
            </BodyShort>
            <ul>
                <li>
                    <FormattedMessage id="uttaksplan.morsAktivitet.readMore.punkt1" />
                </li>
                <li>
                    <FormattedMessage id="uttaksplan.morsAktivitet.readMore.punkt2" />
                </li>
                <li>
                    <FormattedMessage id="uttaksplan.morsAktivitet.readMore.punkt3" />
                </li>
                <li>
                    <FormattedMessage id="uttaksplan.morsAktivitet.readMore.punkt4" />
                </li>
                <li>
                    <FormattedMessage id="uttaksplan.morsAktivitet.readMore.punkt5" />
                </li>
                <li>
                    <FormattedMessage id="uttaksplan.morsAktivitet.readMore.punkt6" />
                </li>
            </ul>
            <BodyLong>
                <FormattedMessage id="uttaksplan.morsAktivitet.readMore.del2" />
            </BodyLong>
        </ReadMore>
    );
};

const AktivitetskravSpørsmål: FunctionComponent<Props> = ({ fieldName, navnPåForeldre, FormComponents }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l">
                <FormComponents.Select
                    name={fieldName}
                    description="For at du skal kunne bruke fellesperioden må mor være i aktivitet"
                    label={intlUtils(intl, 'uttaksplan.aktivitetskrav', { navnMor: navnPåForeldre.mor })}
                    validate={(value: MorsAktivitet | '') => {
                        if (!hasValue(value)) {
                            return intlUtils(intl, 'uttaksplan.validering.aktivitetskrav');
                        }

                        return undefined;
                    }}
                >
                    <option value="" />
                    {renderOptions(intl)}
                </FormComponents.Select>
                <div style={{ padding: '1rem 0' }}>{renderReadMore()}</div>
            </Block>
        </>
    );
};

export default AktivitetskravSpørsmål;
