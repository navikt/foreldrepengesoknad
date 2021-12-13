import { bemUtils, Block } from '@navikt/fp-common';
import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Forelder } from 'app/types/Forelder';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent, useState } from 'react';
import LinkButton from 'uttaksplan/components/link-button/LinkButton';
import TidsperiodeDisplay from 'uttaksplan/components/tidsperiode-display/TidsperiodeDisplay';
import UttakEndreTidsperiodeSpørsmål from 'uttaksplan/components/uttak-endre-tidsperiode-spørsmål/UttakEndreTidsperiodeSpørsmål';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getVelgbareStønadskontotyper } from 'uttaksplan/utils/stønadskontoerUtils';
import ErMorForSykSpørsmål from '../spørsmål/er-mor-for-syk/ErMorForSykSpørsmål';
import FlerbarnsdagerSpørsmål from '../spørsmål/flerbarnsdager/FlerbarnsdagerSpørsmål';
import HvemSkalHaUttakSpørsmål from '../spørsmål/hvem-skal-ha-uttak/HvemSkalHaUttakSpørsmål';
import HvilkenKontoSpørsmål from '../spørsmål/hvilken-konto/HvilkenKontoSpørsmål';
import OverføringsårsakSpørsmål from '../spørsmål/overføringsårsak/OverføringsårsakSpørsmål';
import SamtidigUttakSpørsmål from '../spørsmål/samtidig-uttak/SamtidigUttakSpørsmål';
import SkalHaGraderingSpørsmål from '../spørsmål/skal-ha-gradering/SkalHaGraderingSpørsmål';
import { SubmitListener } from '../submit-listener/SubmitListener';
import TidsperiodeForm from '../tidsperiode-form/TidsperiodeForm';
import { PeriodeUttakFormComponents, PeriodeUttakFormData, PeriodeUttakFormField } from './periodeUttakFormConfig';
import { periodeUttakFormQuestionsConfig } from './periodeUttakFormQuestionsConfig';
import {
    cleanPeriodeUttakFormData,
    getPeriodeUttakFormInitialValues,
    mapPeriodeUttakFormToPeriode,
} from './periodeUttakFormUtils';

import './periodeUttakForm.less';
import { FormattedMessage } from 'react-intl';
import { getSlettPeriodeTekst } from 'uttaksplan/utils/periodeUtils';

interface Props {
    periode: Periode;
    familiehendelsesdato: Date;
    handleOnPeriodeChange: (periode: Periode) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    toggleIsOpen: (id: string) => void;
    arbeidsforhold: Arbeidsforhold[];
    handleDeletePeriode: (periodeId: string) => void;
}

const periodenGjelderAnnenForelder = (erFarEllerMedmor: boolean, forelder: Forelder): boolean => {
    return (erFarEllerMedmor && forelder === Forelder.farMedmor) || (!erFarEllerMedmor && forelder === Forelder.mor)
        ? false
        : true;
};

const erUttakAvAnnenForeldersKvote = (konto: StønadskontoType | '', søkerErFarEllerMedmor: boolean): boolean => {
    return (
        (konto === StønadskontoType.Mødrekvote && søkerErFarEllerMedmor) ||
        (konto === StønadskontoType.Fedrekvote && !søkerErFarEllerMedmor)
    );
};

const getPeriodeType = (
    periodenGjelder: Forelder | '',
    erFarEllerMedmor: boolean,
    konto: StønadskontoType | ''
): Periodetype => {
    if (periodenGjelder === '' || konto === '') {
        return Periodetype.Uttak;
    }

    if (periodenGjelderAnnenForelder(erFarEllerMedmor, periodenGjelder)) {
        return Periodetype.Opphold;
    }

    if (erUttakAvAnnenForeldersKvote(konto, erFarEllerMedmor)) {
        return Periodetype.Overføring;
    }

    return Periodetype.Uttak;
};

const PeriodeUttakForm: FunctionComponent<Props> = ({
    familiehendelsesdato,
    periode,
    handleOnPeriodeChange,
    stønadskontoer,
    navnPåForeldre,
    annenForelder,
    toggleIsOpen,
    arbeidsforhold,
    handleDeletePeriode,
}) => {
    const { tidsperiode } = periode;
    const [tidsperiodeIsOpen, setTidsperiodeIsOpen] = useState(false);
    const bem = bemUtils('periodeUttakForm');

    const toggleVisTidsperiode = () => {
        setTidsperiodeIsOpen(!tidsperiodeIsOpen);
    };

    const velgbareStønadskontoer = getVelgbareStønadskontotyper(stønadskontoer);
    const navnPåAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : undefined;

    return (
        <PeriodeUttakFormComponents.FormikWrapper
            initialValues={getPeriodeUttakFormInitialValues(periode)}
            onSubmit={(values: Partial<PeriodeUttakFormData>) =>
                handleOnPeriodeChange(
                    mapPeriodeUttakFormToPeriode(
                        values,
                        periode.id,
                        getPeriodeType(values.hvemSkalTaUttak!, false, values.konto!)
                    )
                )
            }
            renderForm={({ setFieldValue, values }) => {
                const visibility = periodeUttakFormQuestionsConfig.getVisbility({
                    values,
                    regelProps: {
                        annenForelder,
                        erAleneOmOmsorg: false,
                        erDeltUttak: true,
                        erFarEllerMedmor: false,
                        erFlerbarnssøknad: false,
                        familiehendelsesdato,
                        periodetype: getPeriodeType(values.hvemSkalTaUttak, false, values.konto),
                        situasjon: 'fødsel',
                    },
                });

                return (
                    <PeriodeUttakFormComponents.Form includeButtons={false}>
                        <SubmitListener cleanup={cleanPeriodeUttakFormData} visibility={visibility} />
                        <Block visible={!isValidTidsperiode(tidsperiode)} padBottom="l">
                            <TidsperiodeForm
                                tidsperiode={tidsperiode}
                                familiehendelsesdato={familiehendelsesdato}
                                onBekreft={(values) => {
                                    setFieldValue(PeriodeUttakFormField.fom, values.fom);
                                    setFieldValue(PeriodeUttakFormField.tom, values.tom);
                                }}
                                ugyldigeTidsperioder={undefined}
                            />
                        </Block>
                        <Block visible={isValidTidsperiode(tidsperiode)} padBottom="l">
                            <TidsperiodeDisplay tidsperiode={tidsperiode} toggleVisTidsperiode={toggleVisTidsperiode} />
                            <UttakEndreTidsperiodeSpørsmål
                                periode={periode}
                                familiehendelsesdato={familiehendelsesdato}
                                ugyldigeTidsperioder={[]}
                                onBekreft={(values) => {
                                    toggleVisTidsperiode();
                                    setFieldValue(PeriodeUttakFormField.fom, values.fom);
                                    setFieldValue(PeriodeUttakFormField.tom, values.tom);
                                }}
                                changeTidsperiode={(values) => {
                                    setFieldValue(PeriodeUttakFormField.fom, values.fom);
                                    setFieldValue(PeriodeUttakFormField.tom, values.tom);
                                }}
                                tidsperiode={tidsperiode}
                                onAvbryt={() => toggleVisTidsperiode()}
                                visible={tidsperiodeIsOpen}
                            />
                        </Block>
                        <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.hvemSkalTaUttak)}>
                            <HvemSkalHaUttakSpørsmål
                                fieldName={PeriodeUttakFormField.hvemSkalTaUttak}
                                erFarEllerMedmor={false}
                                navnPåForeldre={navnPåForeldre}
                            />
                        </Block>
                        <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.konto)}>
                            <HvilkenKontoSpørsmål
                                fieldName={PeriodeUttakFormField.konto}
                                velgbareStønadskontoer={velgbareStønadskontoer}
                                erOppholdsperiode={false}
                                navnPåForeldre={navnPåForeldre}
                            />
                        </Block>
                        <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.overføringsårsak)}>
                            <OverføringsårsakSpørsmål
                                vedlegg={values.overføringsdokumentasjon}
                                navnAnnenForelder={navnPåAnnenForelder!}
                            />
                        </Block>
                        <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.ønskerFlerbarnsdager)}>
                            <FlerbarnsdagerSpørsmål fieldName={PeriodeUttakFormField.ønskerFlerbarnsdager} />
                        </Block>
                        <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.erMorForSyk)}>
                            <ErMorForSykSpørsmål fieldName={PeriodeUttakFormField.erMorForSyk} />
                        </Block>
                        <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.samtidigUttak)}>
                            <SamtidigUttakSpørsmål
                                erFlerbarnssøknad={true}
                                navnPåForeldre={navnPåForeldre}
                                navnPåAnnenForelder={navnPåAnnenForelder}
                                samtidigUttakProsentVisible={visibility.isVisible(
                                    PeriodeUttakFormField.samtidigUttakProsent
                                )}
                            />
                        </Block>
                        <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.skalHaGradering)}>
                            <SkalHaGraderingSpørsmål
                                graderingsprosentVisible={visibility.isVisible(PeriodeUttakFormField.stillingsprosent)}
                                arbeidsforhold={arbeidsforhold}
                            />
                        </Block>
                        <Block>
                            <div style={{ textAlign: 'center', position: 'relative' }}>
                                <Knapp htmlType="button" onClick={() => toggleIsOpen(periode.id)}>
                                    Lukk
                                </Knapp>
                                <div className={bem.element('slettPeriodeWrapper')}>
                                    <LinkButton
                                        onClick={() => handleDeletePeriode(periode.id)}
                                        className={bem.element('slettPeriode')}
                                    >
                                        <FormattedMessage id={getSlettPeriodeTekst(periode.type)} />
                                    </LinkButton>
                                </div>
                            </div>
                        </Block>
                    </PeriodeUttakFormComponents.Form>
                );
            }}
        />
    );
};

export default PeriodeUttakForm;
