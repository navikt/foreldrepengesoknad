import { Block, hasValue, intlUtils } from '@navikt/fp-common';
import VeilederNormal from 'app/assets/VeilederNormal';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import links from 'app/links/links';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { getNavnGenitivEierform } from 'uttaksplan/utils/stønadskontoerUtils';
import { PeriodeUtsettelseFormField } from '../../periode-utsettelse-form/periodeUtsettelseFormConfig';
import { PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    fieldName: PeriodeUttakFormField | PeriodeUtsettelseFormField;
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
            <Normaltekst>
                <FormattedMessage
                    id="uttaksplan.morsAktivitet.veileder.arbeid"
                    values={{ navnMor: getNavnGenitivEierform(navnPåForeldre.mor, intl.locale) }}
                />
            </Normaltekst>
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
                <Normaltekst>
                    <FormattedMessage
                        id="uttaksplan.morsAktivitet.veileder.arbeidOgUtdanning"
                        values={{ navnMor: navnPåForeldre.mor }}
                    />
                </Normaltekst>
                <ul>
                    {listData.map((listItem, index) => (
                        <li key={`arbeidOgUtdanning${index}`}>{listItem}</li>
                    ))}
                </ul>
            </>
        );
    } else if (morsAktivitetIPerioden === MorsAktivitet.Innlagt) {
        return (
            <Normaltekst>
                <FormattedMessage
                    id="uttaksplan.morsAktivitet.veileder.informasjonVedSykdomAnnenForelder"
                    values={{ navn: navnPåForeldre.mor }}
                />
            </Normaltekst>
        );
    } else if (morsAktivitetIPerioden === MorsAktivitet.Introduksjonsprogrammet) {
        return (
            <Normaltekst>
                <FormattedMessage
                    id="uttaksplan.morsAktivitet.veileder.introduksjonsprogrammet"
                    values={{ navnMor: navnPåForeldre.mor }}
                />
            </Normaltekst>
        );
    } else if (morsAktivitetIPerioden === MorsAktivitet.Kvalifiseringsprogrammet) {
        return (
            <Normaltekst>
                <FormattedMessage
                    id="uttaksplan.morsAktivitet.veileder.kvalifiseringsprogrammet"
                    values={{ navnMor: navnPåForeldre.mor }}
                />
            </Normaltekst>
        );
    } else if (morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp) {
        return (
            <Normaltekst>
                <FormattedMessage
                    id="uttaksplan.morsAktivitet.veileder.informasjonVedSykdomAnnenForelder"
                    values={{ navn: navnPåForeldre.mor }}
                />
            </Normaltekst>
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
                <Normaltekst>
                    <FormattedMessage
                        id="uttaksplan.morsAktivitet.veileder.utdanning"
                        values={{ navnMor: navnPåForeldre.mor }}
                    />
                </Normaltekst>
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
        .filter((aktivitetsid) => MorsAktivitet[aktivitetsid] !== MorsAktivitet.Uføre)
        .map((aktivitetsid) => (
            <option value={MorsAktivitet[aktivitetsid]} key={MorsAktivitet[aktivitetsid]}>
                {intlUtils(intl, `uttaksplan.morsAktivitet.${aktivitetsid}`)}
            </option>
        ));
};

const getMorsAktivitetSkjemanummer = (morsAktivitet?: MorsAktivitet): Skjemanummer => {
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
                >
                    <option value="" />
                    {renderOptions(intl)}
                </FormComponents.Select>
            </Block>
            <Block padBottom="l" visible={hasValue(aktivitetskravMorValue)}>
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    {getVeilederTekst(intl, aktivitetskravMorValue, navnPåForeldre)}
                    <Normaltekst>
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
                    </Normaltekst>
                </Veilederpanel>
            </Block>
            <Block padBottom="l" visible={hasValue(aktivitetskravMorValue)}>
                <FormikFileUploader
                    label="Last opp dokumentasjon for mors aktivitet"
                    name={PeriodeUttakFormField.aktivitetskravMorDokumentasjon}
                    attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
                    skjemanummer={getMorsAktivitetSkjemanummer(aktivitetskravMorValue as MorsAktivitet)}
                    attachments={aktivitetskravVedlegg}
                />
            </Block>
        </>
    );
};

export default AktivitetskravSpørsmål;
