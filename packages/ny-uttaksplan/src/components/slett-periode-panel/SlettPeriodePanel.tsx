import { TrashIcon } from '@navikt/aksel-icons';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Checkbox, HStack, Heading, VStack } from '@navikt/ds-react';

import { RhfCheckboxGroup, RhfForm } from '@navikt/fp-form-hooks';
import { NavnPåForeldre } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { Uttaksplanperiode, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { genererPeriodeId } from '../../utils/periodeUtils';
import { getStønadskontoNavn } from '../../utils/stønadskontoerUtils';

const ARIA_LABEL_ID = 'slett-periode-panel-heading';

interface Props {
    closePanel: () => void;
    handleDeletePerioder: (slettedePerioder: Array<{ fom: string; tom: string }>) => void;
    uttaksplanperioder: Uttaksplanperiode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

interface FormValues {
    perioder: string[];
}

export const SlettPeriodePanel = ({
    closePanel,
    handleDeletePerioder,
    uttaksplanperioder,
    navnPåForeldre,
    erFarEllerMedmor,
}: Props) => {
    const intl = useIntl();

    const formMethods = useForm<FormValues>({
        defaultValues: {
            perioder: [],
        },
    });

    const onSubmit = (values: FormValues) => {
        if (values.perioder.length === 1) {
            const periode = uttaksplanperioder.find((p) => genererPeriodeId(p) === values.perioder[0]);

            if (periode) {
                handleDeletePerioder([periode]);
            }
        } else {
            const slettedePerioder: Uttaksplanperiode[] = [];

            values.perioder?.map((id) => {
                const periode = uttaksplanperioder.find((p) => genererPeriodeId(p) === id);

                if (periode) {
                    slettedePerioder.push(periode);
                }
            });

            handleDeletePerioder(slettedePerioder);
        }
        closePanel();
    };

    return (
        <div aria-labelledby={ARIA_LABEL_ID} data-panel="slett-periode">
            <div className="mb-4">
                <HStack gap="space-8" align="center">
                    <TrashIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ARIA_LABEL_ID}>
                        <FormattedMessage id="uttaksplan.slettPeriode.tittel" />
                    </Heading>
                </HStack>
            </div>
            <div>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                    <VStack gap="space-16">
                        <Heading size="medium">
                            <FormattedMessage id="uttaksplan.slettPeriode.hvilkePerioder" />
                        </Heading>
                        <RhfCheckboxGroup
                            name="perioder"
                            control={formMethods.control}
                            validate={[isRequired(intl.formatMessage({ id: 'uttaksplan.velgperiode' }))]}
                            label={intl.formatMessage({ id: 'uttaksplan.perioder' })}
                        >
                            {uttaksplanperioder.map((p, index) => {
                                const morsAktivitet =
                                    erVanligUttakPeriode(p) && p.morsAktivitet ? p.morsAktivitet : undefined;

                                const id = genererPeriodeId(p);
                                return (
                                    <Checkbox key={id} name={id} value={id} autoFocus={index === 0}>
                                        {`${formatDate(p.fom)} - ${formatDate(p.tom)} -
                                        ${getStønadskontoNavn(
                                            intl,
                                            navnPåForeldre,
                                            erFarEllerMedmor,
                                            morsAktivitet,
                                            erVanligUttakPeriode(p) ? p.kontoType : undefined,
                                        )}`}
                                    </Checkbox>
                                );
                            })}
                        </RhfCheckboxGroup>
                        <HStack justify="space-between">
                            <Button type="button" variant="secondary" onClick={closePanel}>
                                <FormattedMessage id="uttaksplan.avbryt" />
                            </Button>
                            <Button>
                                <FormattedMessage id="uttaksplan.slettValgte" />
                            </Button>
                        </HStack>
                    </VStack>
                </RhfForm>
            </div>
        </div>
    );
};
