import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Button, Heading } from '@navikt/ds-react';

import { StønadskontoType } from '@navikt/fp-common';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { RhfDatepicker, RhfForm } from '@navikt/fp-form-hooks';
import { UttaksdagenString } from '@navikt/fp-utils';

import { Planperiode } from '../../../types/Planperiode';
import { getFomValidators, getTomValidators } from '../../../utils/dateValidators';
import { ModalData } from '../EndrePeriodeModal';

interface Props {
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
    familiehendelsedato: string;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    inneholderKunEnPeriode: boolean;
    erBarnetFødt: boolean;
}

interface FormValues {
    fom: string | undefined;
    tom: string | undefined;
}

export const EndreTidsperiodeModalStep = ({
    modalData,
    setModalData,
    closeModal,
    familiehendelsedato,
    handleUpdatePeriode,
    inneholderKunEnPeriode,
    erBarnetFødt,
}: Props) => {
    const { valgtPeriode } = modalData;
    const intl = useIntl();
    const formMethods = useForm<FormValues>({
        defaultValues: {
            fom: modalData.valgtPeriode?.fom,
            tom: modalData.valgtPeriode?.tom,
        },
    });

    const onSubmit = (values: FormValues) => {
        handleUpdatePeriode({
            ...valgtPeriode!,
            fom: values.fom ?? valgtPeriode!.fom,
            tom: values.tom ?? valgtPeriode!.tom,
        });
        closeModal();
    };

    const fomValue = formMethods.watch('fom');
    const tomValue = formMethods.watch('tom');

    const minDate =
        valgtPeriode?.kontoType === StønadskontoType.ForeldrepengerFørFødsel
            ? dayjs(familiehendelsedato).subtract(3, 'weeks').format(ISO_DATE_FORMAT)
            : dayjs(familiehendelsedato).subtract(12, 'weeks').format(ISO_DATE_FORMAT);
    const maxDate =
        valgtPeriode?.kontoType === StønadskontoType.ForeldrepengerFørFødsel
            ? UttaksdagenString(UttaksdagenString(familiehendelsedato).denneEllerNeste()).forrige()
            : dayjs(familiehendelsedato).add(3, 'years').format(ISO_DATE_FORMAT);

    return (
        <>
            <Heading size="medium">Hvilke datoer skal perioden være?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                    <RhfDatepicker
                        showMonthAndYearDropdowns
                        minDate={minDate}
                        maxDate={maxDate}
                        label="Fra og med dato"
                        name="fom"
                        disableWeekends={true}
                        validate={getFomValidators(
                            intl,
                            familiehendelsedato,
                            valgtPeriode?.kontoType,
                            tomValue,
                            erBarnetFødt,
                            minDate,
                            maxDate,
                        )}
                    />
                    <RhfDatepicker
                        validate={getTomValidators(
                            intl,
                            familiehendelsedato,
                            valgtPeriode?.kontoType,
                            fomValue,
                            erBarnetFødt,
                            minDate,
                            maxDate,
                        )}
                        label="Til og med dato"
                        name="tom"
                        disableWeekends={true}
                        minDate={fomValue}
                        maxDate={maxDate}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingTop: '1rem',
                    }}
                >
                    <div>
                        <Button type="button" variant="secondary" onClick={closeModal}>
                            Avbryt
                        </Button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {inneholderKunEnPeriode ? null : (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setModalData({ ...modalData, currentStep: 'step1' });
                                }}
                            >
                                Gå tilbake
                            </Button>
                        )}
                        <Button>Ferdig, legg til i planen</Button>
                    </div>
                </div>
            </RhfForm>
        </>
    );
};
