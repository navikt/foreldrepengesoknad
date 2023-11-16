import { FunctionComponent } from 'react';
import * as countries from 'i18n-iso-countries';
import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from 'app/context/types/AnnenInntekt';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import { useIntl } from 'react-intl';
import { Attachment, intlUtils, isAttachmentWithError } from '@navikt/fp-common';
import { BodyShort, Link, Tag } from '@navikt/ds-react';

interface Props {
    annenInntekt: AnnenInntekt;
}

const AnnenInntektDetaljer: FunctionComponent<Props> = ({ annenInntekt }) => {
    const intl = useIntl();
    const { type, vedlegg } = annenInntekt;
    if (type === AnnenInntektType.JOBB_I_UTLANDET) {
        const jobbIUtlandetInntekt = annenInntekt as JobbIUtlandetInntekt;
        return (
            <>
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.andreInntekter.arbeidsgiverNavn')}>
                    <BodyShort>{jobbIUtlandetInntekt.arbeidsgiverNavn}</BodyShort>
                </OppsummeringsPunkt>
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.andreInntekter.arbeidsgiverLand')}>
                    <BodyShort>{countries.getName(jobbIUtlandetInntekt.land, 'nb')}</BodyShort>
                </OppsummeringsPunkt>
            </>
        );
    }
    if (type === AnnenInntektType.SLUTTPAKKE || type === AnnenInntektType.MILITÆRTJENESTE) {
        const renderListOfAttachmentPreviewLinks = () => {
            return vedlegg
                .filter((a: Attachment) => !isAttachmentWithError(a))
                .map(({ url, id, filename }) => (
                    <Link href={url!} key={id} target="_blank">
                        {filename}
                    </Link>
                ));
        };
        return (
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.andreInntekter.vedlagtdokumentasjon')}>
                {(vedlegg || []).filter((a: Attachment) => !isAttachmentWithError(a)).length > 0 ? (
                    renderListOfAttachmentPreviewLinks()
                ) : (
                    <Tag variant="warning">{intlUtils(intl, 'oppsummering.andreInntekter.dokumentasjon.mangler')}</Tag>
                )}
            </OppsummeringsPunkt>
        );
    }
    return null;
};

export default AnnenInntektDetaljer;
