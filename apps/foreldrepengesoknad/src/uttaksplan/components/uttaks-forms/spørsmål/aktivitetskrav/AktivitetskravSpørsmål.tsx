import { Block, hasValue, intlUtils } from '@navikt/fp-common';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import links from 'app/links/links';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { Skjemanummer } from 'app/types/Skjemanummer';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { getNavnGenitivEierform } from 'uttaksplan/utils/stønadskontoerUtils';
import { PeriodeUtsettelseFormField } from '../../periode-utsettelse-form/periodeUtsettelseFormConfig';
import { PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';
import { BodyShort, GuidePanel } from '@navikt/ds-react';

interface Props {
    fieldName: PeriodeUttakFormField | PeriodeUtsettelseFormField;
    vedleggFieldName:
        | PeriodeUttakFormField.aktivitetskravMorDokumentasjon
        | PeriodeUtsettelseFormField.morsAktivitetIPeriodenDokumentasjon;
    FormComponents: any;
    navnPåForeldre: NavnPåForeldre;
    aktivitetskravMorValue: MorsAktivitet | '';
    aktivitetskravVedlegg: Attachment[];
}

const getVeilederTekst = (
    intl: IntlShape,
    morsAktivitetIPerioden: MorsAktivitet | '',
    navnPåForeldre: NavnPåForeldre
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
                (MorsAktivitet as any)[aktivitetsid] !== MorsAktivitet.IkkeOppgitt
        )
        .map((aktivitetsid) => (
            <option value={(MorsAktivitet as any)[aktivitetsid]} key={(MorsAktivitet as any)[aktivitetsid]}>
                {intlUtils(intl, `uttaksplan.morsAktivitet.${aktivitetsid}`)}
            </option>
        ));
};

export const getMorsAktivitetSkjemanummer = (morsAktivitet?: MorsAktivitet): Skjemanummer => {
    switch (morsAktivitet) {
        case MorsAktivitet.Innlagt:
            return Skjemanummer.DOK_INNLEGGELSE;
        case MorsAktivitet.Kvalifiseringsprogrammet:
            return Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM;
        case MorsAktivitet.Introduksjonsprogrammet:
            return Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET;
        case MorsAktivitet.ArbeidOgUtdanning:
        case MorsAktivitet.Arbeid:
        case MorsAktivitet.TrengerHjelp:
            return Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM;
        case MorsAktivitet.Utdanning:
            return Skjemanummer.BEKREFTELSE_FRA_STUDIESTED;
        default:
            return Skjemanummer.ANNET;
    }
};

const AktivitetskravSpørsmål: FunctionComponent<Props> = ({
    fieldName,
    vedleggFieldName,
    navnPåForeldre,
    aktivitetskravMorValue,
    aktivitetskravVedlegg,
    FormComponents,
}) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l">
                <FormComponents.Select
                    name={fieldName}
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
            <Block padBottom="l" visible={hasValue(aktivitetskravMorValue)}>
                <FormikFileUploader
                    label="Last opp dokumentasjon for mors aktivitet"
                    name={vedleggFieldName}
                    attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
                    skjemanummer={getMorsAktivitetSkjemanummer(aktivitetskravMorValue as MorsAktivitet)}
                    attachments={aktivitetskravVedlegg}
                />
            </Block>
        </>
    );
};

export default AktivitetskravSpørsmål;
