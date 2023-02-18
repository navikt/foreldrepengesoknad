import { intlUtils, Block, UtvidetInformasjon, hasValue, TidsperiodeDate } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { getKunArbeidsforholdForValgtTidsperiode } from 'app/utils/arbeidsforholdUtils';
import { RadioPanelProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidsform } from 'uttaksplan/types/Periode';
import { prosentValideringGradering } from 'uttaksplan/utils/prosentValidering';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    graderingsprosentVisible: boolean;
    arbeidsforhold: Arbeidsforhold[];
    tidsperiode: TidsperiodeDate;
}

export const getArbeidsOptions = (
    arbeidsforhold: Arbeidsforhold[],
    tidsperiode: TidsperiodeDate
): RadioPanelProps[] => {
    const aktiveArbeidsforholdIPerioden = getKunArbeidsforholdForValgtTidsperiode(arbeidsforhold, tidsperiode);

    const defaultOptions: RadioPanelProps[] = [
        {
            label: 'Selvstendig næringsdrivende',
            value: Arbeidsform.selvstendignæringsdrivende,
        },
        {
            label: 'Frilans',
            value: Arbeidsform.frilans,
        },
    ];
    const eksisterendeArbeidsforhold: RadioPanelProps[] = [];

    if (aktiveArbeidsforholdIPerioden.length > 0) {
        aktiveArbeidsforholdIPerioden.forEach((arb) =>
            eksisterendeArbeidsforhold.push({ label: `${arb.arbeidsgiverNavn}`, value: `${arb.arbeidsgiverId}` })
        );
    }

    return [...eksisterendeArbeidsforhold, ...defaultOptions];
};

const SkalHaGraderingSpørsmål: FunctionComponent<Props> = ({
    graderingsprosentVisible,
    arbeidsforhold,
    tidsperiode,
}) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l">
                <PeriodeUttakFormComponents.YesOrNoQuestion
                    name={PeriodeUttakFormField.skalHaGradering}
                    legend={intlUtils(intl, 'uttaksplan.skalHaGradering')}
                    validate={(value: YesOrNo) => {
                        if (value === YesOrNo.UNANSWERED) {
                            return intlUtils(intl, 'uttaksplan.validering.skalHaGradering');
                        }
                    }}
                />
            </Block>
            <Block padBottom="l" visible={graderingsprosentVisible}>
                <PeriodeUttakFormComponents.NumberInput
                    name={PeriodeUttakFormField.stillingsprosent}
                    label={intlUtils(intl, 'uttaksplan.stillingsprosent')}
                    description={
                        <UtvidetInformasjon apneLabel={intlUtils(intl, 'uttaksplan.stillingsprosent.lesMer.tittel')}>
                            <Normaltekst>
                                <FormattedMessage id="uttaksplan.stillingsprosent.lesMer.innhold" />
                            </Normaltekst>
                        </UtvidetInformasjon>
                    }
                    maxLength={5}
                    validate={prosentValideringGradering(intl)}
                />
            </Block>
            <Block visible={graderingsprosentVisible}>
                <PeriodeUttakFormComponents.RadioPanelGroup
                    name={PeriodeUttakFormField.arbeidsformer}
                    legend={intlUtils(intl, 'uttaksplan.arbeidsformer')}
                    description={
                        <UtvidetInformasjon apneLabel={intlUtils(intl, 'uttaksplan.arbeidsformer.lesMer.tittel')}>
                            <Normaltekst>
                                <FormattedMessage id="uttaksplan.arbeidsformer.lesMer.innhold" />
                            </Normaltekst>
                        </UtvidetInformasjon>
                    }
                    useTwoColumns={true}
                    radios={getArbeidsOptions(arbeidsforhold, tidsperiode)}
                    validate={(value) => {
                        if (!hasValue(value)) {
                            return intlUtils(intl, 'uttaksplan.validering.arbeidsformer');
                        }
                    }}
                />
            </Block>
        </>
    );
};

export default SkalHaGraderingSpørsmål;
