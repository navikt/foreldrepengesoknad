import PlanvisningToggle from '@navikt/uttaksplan/src/components/planvisning-toggle/PlanvisningToggle';
import UttaksplanKalender from '@navikt/uttaksplan/src/components/uttaksplan-kalender/UttaksplanKalender';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { AnnenForelder, Dekningsgrad, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';

import OppsummeringsPunkt from '../OppsummeringsPunkt';
import UttaksplanOppsummeringsliste from './UttaksplanOppsummeringsliste';

interface Props {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: Arbeidsforhold[];
    dekningsgrad: Dekningsgrad;
    antallUkerUttaksplan: number;
    annenForelder: AnnenForelder;
    familiehendelsesdato: Date;
    termindato: string | undefined;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
    antallBarn: number;
    ønskerJustertUttakVedFødsel: boolean | undefined;
    eksisterendeUttaksplan?: Periode[];
}

const UttaksplanOppsummering: React.FunctionComponent<Props> = ({
    dekningsgrad,
    antallUkerUttaksplan,
    ønskerJustertUttakVedFødsel,
    antallBarn,
    perioder,
    erFarEllerMedmor,
    navnPåForeldre,
    ...rest
}) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const [visningsmodus, setVisningsmodus] = useState<string>('liste');
    const dekningsgradTekst =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? intl.formatMessage(
                  { id: 'oppsummering.uttak.dekningsgrad.verdi100' },
                  { antallUker: antallUkerUttaksplan },
              )
            : intl.formatMessage(
                  { id: 'oppsummering.uttak.dekningsgrad.verdi80' },
                  { antallUker: antallUkerUttaksplan },
              );
    const navnAnnenPart = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    return (
        <>
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.uttak.dekningsgrad.label' })}>
                <BodyShort>{dekningsgradTekst}</BodyShort>
            </OppsummeringsPunkt>
            <PlanvisningToggle setVisningsmodus={setVisningsmodus} />
            {visningsmodus === 'liste' && (
                <UttaksplanOppsummeringsliste
                    ønskerJustertUttakVedFødsel={ønskerJustertUttakVedFødsel}
                    perioder={perioder}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    {...rest}
                ></UttaksplanOppsummeringsliste>
            )}
            {visningsmodus === 'kalender' && (
                <UttaksplanKalender
                    uttaksplan={perioder}
                    barn={barn}
                    erFarEllerMedmor={erFarEllerMedmor}
                    navnAnnenPart={navnAnnenPart}
                ></UttaksplanKalender>
            )}
            {ønskerJustertUttakVedFødsel !== undefined && (
                <OppsummeringsPunkt
                    title={intl.formatMessage(
                        { id: 'oppsummering.uttak.ønskerAutomatiskJustering.label' },
                        {
                            antallBarn,
                        },
                    )}
                >
                    <BodyShort>
                        <FormattedMessage id={ønskerJustertUttakVedFødsel ? 'ja' : 'nei'} />
                    </BodyShort>
                </OppsummeringsPunkt>
            )}
        </>
    );
};

export default UttaksplanOppsummering;
