import React, { FunctionComponent } from 'react';
import * as countries from 'i18n-iso-countries';
import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from 'app/context/types/AnnenInntekt';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import { Normaltekst } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { intlUtils } from '@navikt/fp-common';
import { Attachment } from 'app/types/Attachment';
import EtikettBase from 'nav-frontend-etiketter';
import Lenke from 'nav-frontend-lenker';
import { isAttachmentWithError } from 'app/utils/vedleggUtils';

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
                    <Normaltekst>{jobbIUtlandetInntekt.arbeidsgiverNavn}</Normaltekst>
                </OppsummeringsPunkt>
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.andreInntekter.arbeidsgiverLand')}>
                    <Normaltekst>{countries.getName(jobbIUtlandetInntekt.land, 'nb')}</Normaltekst>
                </OppsummeringsPunkt>
            </>
        );
    }
    if (
        type === AnnenInntektType.VENTELØNN ||
        type === AnnenInntektType.SLUTTPAKKE ||
        type === AnnenInntektType.MILITÆRTJENESTE
    ) {
        const renderListOfAttachmentPreviewLinks = () => {
            return vedlegg
                .filter((a: Attachment) => !isAttachmentWithError(a))
                .map(({ url, id, filename }) => (
                    <Lenke href={url!} key={id} target="_blank">
                        {filename}
                    </Lenke>
                ));
        };
        return (
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.andreInntekter.vedlagtdokumentasjon')}>
                {(vedlegg || []).filter((a: Attachment) => !isAttachmentWithError(a)).length > 0 ? (
                    renderListOfAttachmentPreviewLinks()
                ) : (
                    <EtikettBase type="fokus">
                        {intlUtils(intl, 'oppsummering.andreInntekter.dokumentasjon.mangler')}
                    </EtikettBase>
                )}
            </OppsummeringsPunkt>
        );
    }
    return null;
};

export default AnnenInntektDetaljer;
