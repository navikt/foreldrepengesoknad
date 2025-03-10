import dayjs from 'dayjs';
import uniqBy from 'lodash/uniqBy';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ReadMore } from '@navikt/ds-react';

import { Arbeidsforhold, Arbeidsform, TidsperiodeDate } from '@navikt/fp-common';

import Block from '../../../../common/block/Block';
import { YesOrNo } from '../../../../formik-wrappers';
import { FormikRadioProp } from '../../../../formik-wrappers/components/formik-radio-group/FormikRadioGroup';
import { dateIsBetween } from '../../../../utils/dateUtils';
import { prosentValideringGradering } from '../../../../utils/prosentValidering';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

const containsDuplicates = (arbeidsforhold: Arbeidsforhold[]): boolean => {
    if (arbeidsforhold.length > 1) {
        const arbeidsgiverIds = arbeidsforhold.map((a) => a.arbeidsgiverId);
        const uniqueIds = new Set(arbeidsgiverIds);

        return uniqueIds.size !== arbeidsgiverIds.length;
    }

    return false;
};

const getArbeidsgiverId = (arbeidsforhold: Arbeidsforhold): string => {
    return arbeidsforhold.arbeidsgiverId;
};

const getKunArbeidsforholdForValgtTidsperiode = (
    arbeidsforhold: Arbeidsforhold[],
    tidsperiode: TidsperiodeDate,
): Arbeidsforhold[] => {
    if (tidsperiode.tom && tidsperiode.fom) {
        const kunArbeidsforholdForValgtTidsperiode = arbeidsforhold.filter((a) => {
            if (a.tom === undefined) {
                if (dayjs(tidsperiode.fom).isSameOrAfter(dayjs(a.fom), 'day')) {
                    return true;
                }

                return false;
            }

            if (dateIsBetween(tidsperiode.fom, a.fom, a.tom) || dateIsBetween(tidsperiode.tom, a.fom, a.tom)) {
                return true;
            }

            return false;
        });

        if (containsDuplicates(kunArbeidsforholdForValgtTidsperiode)) {
            return uniqBy(kunArbeidsforholdForValgtTidsperiode, getArbeidsgiverId);
        }

        return kunArbeidsforholdForValgtTidsperiode;
    }

    return arbeidsforhold;
};

interface Props {
    graderingsprosentVisible: boolean;
    arbeidsforhold: Arbeidsforhold[];
    tidsperiode: TidsperiodeDate;
}

export const getArbeidsOptions = (
    arbeidsforhold: Arbeidsforhold[],
    tidsperiode: TidsperiodeDate,
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
            eksisterendeArbeidsforhold.push({ label: `${arb.arbeidsgiverNavn}`, value: `${arb.arbeidsgiverId}` }),
        );
    }

    return [...eksisterendeArbeidsforhold, ...defaultOptions];
};

// eslint-disable-next-line @typescript-eslint/no-restricted-types
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
                    legend={intl.formatMessage({ id: 'uttaksplan.skalHaGradering' })}
                    validate={(value: YesOrNo) => {
                        if (value === YesOrNo.UNANSWERED) {
                            return intl.formatMessage({ id: 'uttaksplan.validering.skalHaGradering' });
                        }

                        return undefined;
                    }}
                />
            </Block>
            <Block padBottom="l" visible={graderingsprosentVisible}>
                <Block padBottom="s">
                    <PeriodeUttakFormComponents.NumberInput
                        name={PeriodeUttakFormField.stillingsprosent}
                        label={intl.formatMessage({ id: 'uttaksplan.stillingsprosent' })}
                        maxLength={5}
                        validate={prosentValideringGradering(intl)}
                    />
                </Block>
                <ReadMore header={intl.formatMessage({ id: 'uttaksplan.stillingsprosent.lesMer.tittel' })}>
                    <BodyShort>
                        <FormattedMessage id="uttaksplan.stillingsprosent.lesMer.innhold" />
                    </BodyShort>
                </ReadMore>
            </Block>
            <Block visible={graderingsprosentVisible}>
                <PeriodeUttakFormComponents.RadioGroup
                    name={PeriodeUttakFormField.arbeidsformer}
                    legend={intl.formatMessage({ id: 'uttaksplan.arbeidsformer' })}
                    radios={getArbeidsOptions(arbeidsforhold, tidsperiode)}
                    validate={(value) => {
                        if (!hasValue(value)) {
                            return intl.formatMessage({ id: 'uttaksplan.validering.arbeidsformer' });
                        }

                        return undefined;
                    }}
                />
                <ReadMore header={intl.formatMessage({ id: 'uttaksplan.arbeidsformer.lesMer.tittel' })}>
                    <BodyShort>
                        <FormattedMessage id="uttaksplan.arbeidsformer.lesMer.innhold" />
                    </BodyShort>
                </ReadMore>
            </Block>
        </>
    );
};
// eslint-disable-next-line import/no-default-export
export default SkalHaGraderingSpørsmål;
