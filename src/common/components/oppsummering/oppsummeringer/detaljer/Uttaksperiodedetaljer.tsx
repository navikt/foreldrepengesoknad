import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { StønadskontoType, UttaksperiodeBase } from '../../../../../app/types/uttaksplan/periodetyper';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import MorsAktivitetDetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/MorsAktivitetDetaljer';
import getMessage from 'common/util/i18nUtils';
import { getArbeidsformTekst } from 'common/util/oppsummeringUtils';

interface UttaksperiodedetaljerProps {
    periode: UttaksperiodeBase;
}

type Props = UttaksperiodedetaljerProps & InjectedIntlProps;

const Uttaksperiodedetaljer: React.StatelessComponent<Props> = ({ periode, intl }) => {
    const {
        konto,
        morsAktivitetIPerioden,
        ønskerSamtidigUttak,
        gradert,
        stillingsprosent,
        orgnr,
        arbeidsform,
        vedlegg
    } = periode;

    let arbeidsformTekst = '';
    if (arbeidsform) {
        arbeidsformTekst = getArbeidsformTekst(intl, arbeidsform, { orgnr });
    }

    return (
        <>
            {ønskerSamtidigUttak !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.uttak.samtidigUttak')}
                    verdi={ønskerSamtidigUttak ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}
            {konto !== StønadskontoType.ForeldrepengerFørFødsel && (
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

            {arbeidsform && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.uttak.arbeidstaker.label')}
                    verdi={arbeidsformTekst}
                />
            )}

            {morsAktivitetIPerioden && (
                <MorsAktivitetDetaljer
                    morsAktivitet={morsAktivitetIPerioden}
                    dokumentasjonAvMorsAktivitet={vedlegg || []}
                />
            )}
        </>
    );
};

export default injectIntl(Uttaksperiodedetaljer);
