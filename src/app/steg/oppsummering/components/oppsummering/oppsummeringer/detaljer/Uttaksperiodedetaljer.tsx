import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { StønadskontoType, UttaksperiodeBase } from '../../../../../../types/uttaksplan/periodetyper';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';
import MorsAktivitetDetaljer from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/detaljer/MorsAktivitetDetaljer';
import getMessage from 'common/util/i18nUtils';
import { getArbeidsformTekst } from 'app/util/oppsummeringUtils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { shouldPeriodeHaveAttachment } from 'app/util/attachments/missingAttachmentUtil';
import { Søknadsinfo } from 'app/selectors/types';

interface UttaksperiodedetaljerProps {
    periode: UttaksperiodeBase;
    registrerteArbeidsforhold: Arbeidsforhold[] | undefined;
    periodeErNyEllerEndret: boolean;
    søknadsinfo: Søknadsinfo;
}

type Props = UttaksperiodedetaljerProps & InjectedIntlProps;

const Uttaksperiodedetaljer: React.StatelessComponent<Props> = ({
    periode,
    registrerteArbeidsforhold,
    periodeErNyEllerEndret,
    intl,
    søknadsinfo
}) => {
    const {
        konto,
        morsAktivitetIPerioden,
        ønskerSamtidigUttak,
        gradert,
        stillingsprosent,
        orgnumre,
        arbeidsformer,
        vedlegg
    } = periode;

    let arbeidsformTekst = '';
    if (arbeidsformer) {
        arbeidsformTekst = getArbeidsformTekst(intl, arbeidsformer, orgnumre, registrerteArbeidsforhold).join('\r\n');
    }

    return (
        <>
            {ønskerSamtidigUttak !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.uttak.samtidigUttak')}
                    verdi={ønskerSamtidigUttak ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}
            {konto !== StønadskontoType.ForeldrepengerFørFødsel &&
                ønskerSamtidigUttak !== true && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.uttak.kombineresMedarbeid')}
                        verdi={gradert ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                    />
                )}

            {gradert === true &&
                stillingsprosent && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.uttak.stillingsprosent')}
                        verdi={stillingsprosent}
                    />
                )}

            {arbeidsformer && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.uttak.arbeidstaker.label')}
                    verdi={arbeidsformTekst}
                />
            )}
            {shouldPeriodeHaveAttachment(periode, søknadsinfo) &&
                morsAktivitetIPerioden && (
                    <MorsAktivitetDetaljer
                        morsAktivitet={morsAktivitetIPerioden}
                        dokumentasjonAvMorsAktivitet={vedlegg || []}
                        visOppsummeringAvDokumentasjon={periodeErNyEllerEndret}
                    />
                )}
        </>
    );
};

export default injectIntl(Uttaksperiodedetaljer);
