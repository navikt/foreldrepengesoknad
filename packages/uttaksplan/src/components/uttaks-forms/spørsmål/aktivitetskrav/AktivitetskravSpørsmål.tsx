import {
    Block,
    MorsAktivitet,
    NavnPåForeldre,
    getNavnGenitivEierform,
    hasValue,
    intlUtils,
    links,
} from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { PeriodeUtsettelseFormField } from '../../periode-utsettelse-form/periodeUtsettelseFormConfig';
import { PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';
import { BodyLong, BodyShort, GuidePanel, ReadMore } from '@navikt/ds-react';

interface Props {
    fieldName: PeriodeUttakFormField | PeriodeUtsettelseFormField;
    FormComponents: any;
    navnPåForeldre: NavnPåForeldre;
    aktivitetskravMorValue: MorsAktivitet | '';
}

const getVeilederTekst = (
    intl: IntlShape,
    morsAktivitetIPerioden: MorsAktivitet | '',
    navnPåForeldre: NavnPåForeldre,
) => {
    if (morsAktivitetIPerioden === MorsAktivitet.Arbeid) {
        return (
            <BodyShort>
                <FormattedMessage
                    id="uttaksplan.morsAktivitet.veileder.arbeid"
                    values={{ navnMor: getNavnGenitivEierform(navnPåForeldre.mor, intl.locale) }}
                />
            </BodyShort>
        );
    } else if (morsAktivitetIPerioden === MorsAktivitet.ArbeidOgUtdanning) {
        const listData = [
            intlUtils(intl, 'uttaksplan.morsAktivitet.veileder.arbeidOgUtdanning.punkt1'),
            intlUtils(intl, 'uttaksplan.morsAktivitet.veileder.arbeidOgUtdanning.punkt2'),
            intlUtils(intl, 'uttaksplan.morsAktivitet.veileder.arbeidOgUtdanning.punkt3'),
            intlUtils(intl, 'uttaksplan.morsAktivitet.veileder.arbeidOgUtdanning.punkt4'),
        ];

        return (
            <>
                <BodyShort>
                    <FormattedMessage
                        id="uttaksplan.morsAktivitet.veileder.arbeidOgUtdanning"
                        values={{ navnMor: navnPåForeldre.mor }}
                    />
                </BodyShort>
                <ul>
                    {listData.map((listItem, index) => (
                        <li key={`arbeidOgUtdanning${index}`}>{listItem}</li>
                    ))}
                </ul>
            </>
        );
    } else if (
        morsAktivitetIPerioden === MorsAktivitet.Innlagt ||
        morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp
    ) {
        return (
            <BodyShort>
                <FormattedMessage
                    id="uttaksplan.morsAktivitet.veileder.informasjonVedSykdomAnnenForelder"
                    values={{ navn: navnPåForeldre.mor }}
                />
            </BodyShort>
        );
    } else if (morsAktivitetIPerioden === MorsAktivitet.Introduksjonsprogrammet) {
        return (
            <BodyShort>
                <FormattedMessage
                    id="uttaksplan.morsAktivitet.veileder.introduksjonsprogrammet"
                    values={{ navnMor: navnPåForeldre.mor }}
                />
            </BodyShort>
        );
    } else if (morsAktivitetIPerioden === MorsAktivitet.Kvalifiseringsprogrammet) {
        return (
            <BodyShort>
                <FormattedMessage
                    id="uttaksplan.morsAktivitet.veileder.kvalifiseringsprogrammet"
                    values={{ navnMor: navnPåForeldre.mor }}
                />
            </BodyShort>
        );
    } else if (morsAktivitetIPerioden === MorsAktivitet.Utdanning) {
        const listData = [
            intlUtils(intl, 'uttaksplan.morsAktivitet.veileder.utdanning.punkt1'),
            intlUtils(intl, 'uttaksplan.morsAktivitet.veileder.utdanning.punkt2'),
            intlUtils(intl, 'uttaksplan.morsAktivitet.veileder.utdanning.punkt3'),
            intlUtils(intl, 'uttaksplan.morsAktivitet.veileder.utdanning.punkt4'),
        ];

        return (
            <>
                <BodyShort>
                    <FormattedMessage
                        id="uttaksplan.morsAktivitet.veileder.utdanning"
                        values={{ navnMor: navnPåForeldre.mor }}
                    />
                </BodyShort>
                <ul>
                    {listData.map((listItem, index) => (
                        <li key={`trengerhjelp${index}`}>{listItem}</li>
                    ))}
                </ul>
            </>
        );
    } else {
        return '';
    }
};

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

const AktivitetskravSpørsmål: FunctionComponent<Props> = ({
    fieldName,
    navnPåForeldre,
    aktivitetskravMorValue,
    FormComponents,
}) => {
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
            <Block padBottom="l" visible={hasValue(aktivitetskravMorValue)}>
                <GuidePanel>
                    {getVeilederTekst(intl, aktivitetskravMorValue, navnPåForeldre)}
                    <BodyShort>
                        <FormattedMessage
                            id="uttaksplan.morsAktivitet.lesmer"
                            values={{
                                a: (msg: any) => (
                                    <a
                                        href={links.morsAktivitetskrav}
                                        className="lenke"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        {msg}
                                    </a>
                                ),
                            }}
                        />
                    </BodyShort>
                </GuidePanel>
            </Block>
        </>
    );
};

export default AktivitetskravSpørsmål;
