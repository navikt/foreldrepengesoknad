import { Block } from '@navikt/fp-common';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import React, { FunctionComponent, useState } from 'react';
import TidsperiodeDisplay from 'uttaksplan/components/tidsperiode-display/TidsperiodeDisplay';
import UttakEndreTidsperiodeSpørsmål from 'uttaksplan/components/uttak-endre-tidsperiode-spørsmål/UttakEndreTidsperiodeSpørsmål';
import { Periode } from 'uttaksplan/types/Periode';
import { getForelderFromPeriode } from 'uttaksplan/utils/periodeUtils';
import { getVelgbareStønadskontotyper } from 'uttaksplan/utils/stønadskontoerUtils';
import ErMorForSykSpørsmål from '../spørsmål/er-mor-for-syk/ErMorForSykSpørsmål';
import FlerbarnsdagerSpørsmål from '../spørsmål/flerbarnsdager/FlerbarnsdagerSpørsmål';
import HvemSkalHaUttakSpørsmål from '../spørsmål/hvem-skal-ha-uttak/HvemSkalHaUttakSpørsmål';
import HvilkenKvoteSpørsmål from '../spørsmål/hvilken-kvote/HvilkenKvoteSpørsmål';
import SamtidigUttakSpørsmål from '../spørsmål/samtidig-uttak/SamtidigUttakSpørsmål';
import { SubmitListener } from '../submit-listener/SubmitListener';
import TidsperiodeForm from '../tidsperiode-form/TidsperiodeForm';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from './periodeUttakFormConfig';
import { getPeriodeUttakFormInitialValues, mapPeriodeUttakFormToPeriode } from './periodeUttakFormUtils';

interface Props {
    periode: Periode;
    familiehendelsesdato: Date;
    handleOnPeriodeChange: (periode: Periode) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
}

const PeriodeUttakForm: FunctionComponent<Props> = ({
    familiehendelsesdato,
    periode,
    handleOnPeriodeChange,
    stønadskontoer,
    navnPåForeldre,
}) => {
    const { tidsperiode } = periode;
    const [tidsperiodeIsOpen, setTidsperiodeIsOpen] = useState(false);

    const toggleVisTidsperiode = () => {
        setTidsperiodeIsOpen(!tidsperiodeIsOpen);
    };

    const velgbareStønadskontoer = getVelgbareStønadskontotyper(stønadskontoer);
    const forelder = getForelderFromPeriode(periode);

    return (
        <PeriodeUttakFormComponents.FormikWrapper
            initialValues={getPeriodeUttakFormInitialValues(periode)}
            onSubmit={(values: any) =>
                handleOnPeriodeChange(mapPeriodeUttakFormToPeriode(values, periode.id, periode.type, forelder))
            }
            renderForm={({ setFieldValue, values }) => {
                return (
                    <PeriodeUttakFormComponents.Form includeButtons={false}>
                        <SubmitListener />
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
                        <Block padBottom="l">
                            <HvemSkalHaUttakSpørsmål
                                fieldName={PeriodeUttakFormField.hvemSkalTaUttak}
                                erFarEllerMedmor={false}
                                navnPåForeldre={navnPåForeldre}
                            />
                        </Block>
                        <Block padBottom="l">
                            <HvilkenKvoteSpørsmål
                                fieldName={PeriodeUttakFormField.kvote}
                                velgbareStønadskontoer={velgbareStønadskontoer}
                                erOppholdsperiode={false}
                                navnPåForeldre={navnPåForeldre}
                            />
                        </Block>
                        <Block padBottom="l">
                            <FlerbarnsdagerSpørsmål fieldName={PeriodeUttakFormField.ønskerFlerbarnsdager} />
                        </Block>
                        <Block padBottom="l">
                            <ErMorForSykSpørsmål fieldName={PeriodeUttakFormField.erMorForSyk} />
                        </Block>
                        <Block padBottom="l">
                            <SamtidigUttakSpørsmål
                                samtidigUttakValue={values.samtidigUttak}
                                erFlerbarnssøknad={true}
                                navnPåForeldre={navnPåForeldre}
                            />
                        </Block>
                        <Block padBottom="l">
                            <PeriodeUttakFormComponents.YesOrNoQuestion
                                name={PeriodeUttakFormField.skalHaGradering}
                                legend="Skal du kombinere foreldrepengene med delvis arbeid?"
                            />
                        </Block>
                    </PeriodeUttakFormComponents.Form>
                );
            }}
        />
    );
};

export default PeriodeUttakForm;
