import { intlUtils, Block, UtvidetInformasjon, hasValue, TidsperiodeDate } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { getKunArbeidsforholdForValgtTidsperiode } from 'app/utils/arbeidsforholdUtils';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidsform } from 'uttaksplan/types/Periode';
import { prosentValideringGradering } from 'uttaksplan/utils/prosentValidering';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';
import { BodyShort } from '@navikt/ds-react';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

interface Props {
    graderingsprosentVisible: boolean;
    arbeidsforhold: Arbeidsforhold[];
    tidsperiode: TidsperiodeDate;
}

export const getArbeidsOptions = (
    arbeidsforhold: Arbeidsforhold[],
    tidsperiode: TidsperiodeDate
): FormikRadioProp[] => {
    const aktiveArbeidsforholdIPerioden = getKunArbeidsforholdForValgtTidsperiode(arbeidsforhold, tidsperiode);

    const defaultOptions: FormikRadioProp[] = [
        {
            label: 'Selvstendig næringsdrivende',
            value: Arbeidsform.selvstendignæringsdrivende,
        },
        {
            label: 'Frilans',
            value: Arbeidsform.frilans,
        },
    ];
    const eksisterendeArbeidsforhold: FormikRadioProp[] = [];

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

                        return undefined;
                    }}
                />
            </Block>
            <Block padBottom="l" visible={graderingsprosentVisible}>
                <PeriodeUttakFormComponents.NumberInput
                    name={PeriodeUttakFormField.stillingsprosent}
                    label={intlUtils(intl, 'uttaksplan.stillingsprosent')}
                    description={
                        <UtvidetInformasjon apneLabel={intlUtils(intl, 'uttaksplan.stillingsprosent.lesMer.tittel')}>
                            <BodyShort>
                                <FormattedMessage id="uttaksplan.stillingsprosent.lesMer.innhold" />
                            </BodyShort>
                        </UtvidetInformasjon>
                    }
                    maxLength={5}
                    validate={prosentValideringGradering(intl)}
                />
            </Block>
            <Block visible={graderingsprosentVisible}>
                <PeriodeUttakFormComponents.RadioGroup
                    name={PeriodeUttakFormField.arbeidsformer}
                    legend={intlUtils(intl, 'uttaksplan.arbeidsformer')}
                    description={
                        <UtvidetInformasjon apneLabel={intlUtils(intl, 'uttaksplan.arbeidsformer.lesMer.tittel')}>
                            <BodyShort>
                                <FormattedMessage id="uttaksplan.arbeidsformer.lesMer.innhold" />
                            </BodyShort>
                        </UtvidetInformasjon>
                    }
                    radios={getArbeidsOptions(arbeidsforhold, tidsperiode)}
                    validate={(value) => {
                        if (!hasValue(value)) {
                            return intlUtils(intl, 'uttaksplan.validering.arbeidsformer');
                        }

                        return undefined;
                    }}
                />
            </Block>
        </>
    );
};

export default SkalHaGraderingSpørsmål;
