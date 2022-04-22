import { bemUtils, Block, hasValue, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { isValidTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import React, { Dispatch, FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import LinkButton from 'uttaksplan/components/link-button/LinkButton';
import TidsperiodeDisplay from 'uttaksplan/components/tidsperiode-display/TidsperiodeDisplay';
import UtsettelseEndreTidsperiodeSpørsmål from 'uttaksplan/components/utsettelse-tidsperiode-spørsmål/UtsettelseTidsperiodeSpørsmål';
import { Arbeidsform, Periode } from 'uttaksplan/types/Periode';
import { getSlettPeriodeTekst } from 'uttaksplan/utils/periodeUtils';
import { SubmitListener } from '../submit-listener/SubmitListener';
import TidsperiodeForm from '../tidsperiode-form/TidsperiodeForm';
import { PeriodeUtsettelseFormComponents, PeriodeUtsettelseFormField } from './periodeUtsettelseFormConfig';
import {
    cleanupPeriodeUtsettelseFormData,
    getPeriodeUtsettelseFormInitialValues,
    mapPeriodeUtsettelseFormToPeriode,
} from './periodeUtsettelseFormUtils';

import './periodeUtsettelseForm.less';
import { periodeUtsettelseFormQuestionsConfig } from './periodeUtsettelseFormQuestionsConfig';
import UtsettelseÅrsakSpørsmål from '../spørsmål/utsettelse-årsak/UtsettelseÅrsakSpørsmål';
import { førsteOktober2021ReglerGjelder, ISOStringToDate } from 'app/utils/dateUtils';
import AktivitetskravSpørsmål from '../spørsmål/aktivitetskrav/AktivitetskravSpørsmål';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Normaltekst } from 'nav-frontend-typografi';
import { CheckboksPanelProps } from 'nav-frontend-skjema';
interface Props {
    periode: Periode;
    familiehendelsesdato: Date;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
    handleUpdatePeriode: (periode: Periode) => void;
    handleAddPeriode?: (nyPeriode: Periode) => void;
    setNyPeriodeFormIsVisible?: Dispatch<React.SetStateAction<boolean>>;
    toggleIsOpen?: (id: string) => void;
    handleDeletePeriode?: (periodeId: string) => void;
    isNyPeriode?: boolean;
    navnPåForeldre: NavnPåForeldre;
    erMorUfør: boolean;
    søkerErFarEllerMedmorOgKunDeHarRett: boolean;
    arbeidsforhold: Arbeidsforhold[];
}

const PeriodeUtsettelseForm: FunctionComponent<Props> = ({
    periode,
    familiehendelsesdato,
    handleUpdatePeriode,
    erFarEllerMedmor,
    erAleneOmOmsorg,
    handleAddPeriode,
    handleDeletePeriode,
    toggleIsOpen,
    isNyPeriode = false,
    setNyPeriodeFormIsVisible,
    navnPåForeldre,
    erMorUfør,
    søkerErFarEllerMedmorOgKunDeHarRett,
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const { tidsperiode, id } = periode;
    const [tidsperiodeIsOpen, setTidsperiodeIsOpen] = useState(false);
    const bem = bemUtils('periodeUtsettelseForm');

    const antallHelligdager = Tidsperioden(tidsperiode).getAntallFridager();
    const antallUttaksdager = Tidsperioden(tidsperiode).getAntallUttaksdager();
    const periodenErKunHelligdager = antallHelligdager === antallUttaksdager;
    const skalViseGamleUtsettelseÅrsaker = førsteOktober2021ReglerGjelder(familiehendelsesdato) === false; // Utsettelseårsaker som gjelder for søknader sendt før 1. oktober 2021

    const toggleVisTidsperiode = () => {
        setTidsperiodeIsOpen(!tidsperiodeIsOpen);
    };

    const getArbeidUnderUtsettelseOptions = (arbeidsgivere: Arbeidsforhold[]): CheckboksPanelProps[] => {
        const defaultOptions: CheckboksPanelProps[] = [
            {
                label: 'Selvstendig næringsdrivende',
                value: Arbeidsform.selvstendignæringsdrivende,
            },
            {
                label: 'Frilans',
                value: Arbeidsform.frilans,
            },
        ];
        const eksisterendeArbeidsforhold: CheckboksPanelProps[] = [];

        if (arbeidsgivere.length > 0) {
            arbeidsgivere.forEach((arb) =>
                eksisterendeArbeidsforhold.push({ label: `${arb.arbeidsgiverNavn}`, value: `${arb.arbeidsgiverId}` })
            );
        }
        const unikeEksisterendeArbeidsforholdUnike = [...new Set(eksisterendeArbeidsforhold)];

        return [...unikeEksisterendeArbeidsforholdUnike, ...defaultOptions];
    };

    return (
        <PeriodeUtsettelseFormComponents.FormikWrapper
            initialValues={getPeriodeUtsettelseFormInitialValues(periode)}
            onSubmit={(values) => handleUpdatePeriode(mapPeriodeUtsettelseFormToPeriode(values, id, erFarEllerMedmor))}
            renderForm={({ setFieldValue, values }) => {
                const visibility = periodeUtsettelseFormQuestionsConfig.getVisbility({
                    values,
                    erFarEllerMedmor,
                    erAleneOmOmsorg,
                    søkerErFarEllerMedmorOgKunDeHarRett,
                });

                return (
                    <>
                        <Block visible={!isValidTidsperiode(tidsperiode)} padBottom="l">
                            <TidsperiodeForm
                                tidsperiode={tidsperiode}
                                familiehendelsesdato={familiehendelsesdato}
                                onBekreft={(values) => {
                                    setFieldValue(PeriodeUtsettelseFormField.fom, ISOStringToDate(values.fom));
                                    setFieldValue(PeriodeUtsettelseFormField.tom, ISOStringToDate(values.tom));
                                }}
                                ugyldigeTidsperioder={undefined}
                            />
                        </Block>
                        <PeriodeUtsettelseFormComponents.Form includeButtons={false}>
                            <SubmitListener cleanup={() => cleanupPeriodeUtsettelseFormData(values)} />

                            <Block visible={isValidTidsperiode(tidsperiode)} padBottom="l">
                                <TidsperiodeDisplay
                                    tidsperiode={tidsperiode}
                                    toggleVisTidsperiode={toggleVisTidsperiode}
                                />
                                <UtsettelseEndreTidsperiodeSpørsmål
                                    periode={periode}
                                    familiehendelsesdato={familiehendelsesdato}
                                    ugyldigeTidsperioder={[]}
                                    onBekreft={(values) => {
                                        toggleVisTidsperiode();
                                        setFieldValue(PeriodeUtsettelseFormField.fom, ISOStringToDate(values.fom));
                                        setFieldValue(PeriodeUtsettelseFormField.tom, ISOStringToDate(values.tom));
                                    }}
                                    changeTidsperiode={(values) => {
                                        setFieldValue(PeriodeUtsettelseFormField.fom, values.fom);
                                        setFieldValue(PeriodeUtsettelseFormField.tom, values.tom);
                                    }}
                                    tidsperiode={tidsperiode}
                                    onAvbryt={() => toggleVisTidsperiode()}
                                    visible={tidsperiodeIsOpen}
                                />
                            </Block>
                            <Block visible={visibility.isVisible(PeriodeUtsettelseFormField.årsak)} padBottom="l">
                                <UtsettelseÅrsakSpørsmål
                                    periodenErKunHelligdager={periodenErKunHelligdager}
                                    skalViseGamleUtsettelseÅrsaker={skalViseGamleUtsettelseÅrsaker}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    tidsperiodenErInnenforFørsteSeksUker={Tidsperioden(
                                        tidsperiode
                                    ).erInnenforFørsteSeksUker(familiehendelsesdato)}
                                    familiehendelsesdato={familiehendelsesdato}
                                    utsettelseårsak={values.årsak}
                                    vedlegg={values.vedlegg}
                                    erMorUfør={erMorUfør}
                                    søkerErFarEllerMedmorOgKunDeHarRett={søkerErFarEllerMedmorOgKunDeHarRett}
                                />
                            </Block>
                            <Block
                                visible={visibility.isVisible(PeriodeUtsettelseFormField.arbeidsformer)}
                                padBottom="l"
                            >
                                <PeriodeUtsettelseFormComponents.CheckboxPanelGroup
                                    name={PeriodeUtsettelseFormField.arbeidsformer}
                                    legend={intlUtils(intl, 'uttaksplan.arbeidsformer')}
                                    description={
                                        <UtvidetInformasjon
                                            apneLabel={intlUtils(intl, 'uttaksplan.arbeidsformer.lesMer.tittel')}
                                        >
                                            <Normaltekst>
                                                <FormattedMessage id="uttaksplan.arbeidsformer.lesMer.innhold" />
                                            </Normaltekst>
                                        </UtvidetInformasjon>
                                    }
                                    useTwoColumns={true}
                                    checkboxes={getArbeidUnderUtsettelseOptions(arbeidsforhold)}
                                    validate={(value) => {
                                        if (!hasValue(value) || value === undefined || value.length === 0) {
                                            return intlUtils(intl, 'uttaksplan.validering.arbeidsformer');
                                        }
                                    }}
                                />
                            </Block>
                            <Block
                                visible={visibility.isVisible(PeriodeUtsettelseFormField.morsAktivitetIPerioden)}
                                padBottom="l"
                            >
                                <AktivitetskravSpørsmål
                                    aktivitetskravMorValue={values.morsAktivitetIPerioden}
                                    aktivitetskravVedlegg={values.morsAktivitetIPeriodenDokumentasjon}
                                    fieldName={PeriodeUtsettelseFormField.morsAktivitetIPerioden}
                                    navnPåForeldre={navnPåForeldre}
                                    FormComponents={PeriodeUtsettelseFormComponents}
                                    vedleggFieldName={PeriodeUtsettelseFormField.morsAktivitetIPeriodenDokumentasjon}
                                />
                            </Block>
                            <Block
                                visible={
                                    !isNyPeriode && handleDeletePeriode !== undefined && toggleIsOpen !== undefined
                                }
                            >
                                <div style={{ textAlign: 'center', position: 'relative' }}>
                                    <Knapp htmlType="button" onClick={() => toggleIsOpen!(periode.id)}>
                                        <FormattedMessage id="uttaksplan.lukk" />
                                    </Knapp>
                                    <div className={bem.element('slettPeriodeWrapper')}>
                                        <LinkButton
                                            onClick={() => handleDeletePeriode!(periode.id)}
                                            className={bem.element('slettPeriode')}
                                        >
                                            <FormattedMessage id={getSlettPeriodeTekst(periode.type)} />
                                        </LinkButton>
                                    </div>
                                </div>
                            </Block>
                            <Block
                                visible={
                                    isNyPeriode &&
                                    setNyPeriodeFormIsVisible !== undefined &&
                                    handleAddPeriode !== undefined
                                }
                            >
                                <div className={bem.element('knapperad')}>
                                    <Knapp htmlType="button" onClick={() => setNyPeriodeFormIsVisible!(false)}>
                                        <FormattedMessage id="uttaksplan.avbryt" />
                                    </Knapp>
                                    {visibility.areAllQuestionsAnswered() ? (
                                        <Hovedknapp
                                            htmlType="button"
                                            onClick={() => {
                                                handleAddPeriode!(
                                                    mapPeriodeUtsettelseFormToPeriode(
                                                        values,
                                                        periode.id,
                                                        erFarEllerMedmor
                                                    )
                                                );
                                                setNyPeriodeFormIsVisible!(false);
                                            }}
                                        >
                                            <FormattedMessage id="uttaksplan.leggTil" />
                                        </Hovedknapp>
                                    ) : null}
                                </div>
                            </Block>
                        </PeriodeUtsettelseFormComponents.Form>
                    </>
                );
            }}
        />
    );
};

export default PeriodeUtsettelseForm;
