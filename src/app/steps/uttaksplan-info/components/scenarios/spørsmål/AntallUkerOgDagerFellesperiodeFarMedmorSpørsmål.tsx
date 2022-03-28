import { bemUtils, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { getNumberFromNumberInputValue, TypedFormComponents } from '@navikt/sif-common-formik/lib';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import RangeIcon from '../../fordelingFellesperiode/range-input/RangeIcon';
import Sirkelknapp from '../../fordelingFellesperiode/range-input/sirkelknapp/Sirkelknapp';

import './antallUkerOgDagerFellesperiodeFarMedmorSpørsmål.less';

interface Props {
    FormComponents: TypedFormComponents<any, any, string>;
    ukerFieldName: string;
    dagerFieldName: string;
    antallUker: string;
    antallDager: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    ukerMedFellesperiode: number;
}

const getNumberFromStringInput = (input: string): number | undefined => {
    return input.trim().length === 0 ? 0 : getNumberFromNumberInputValue(input);
};

const leggTilUke = (currentAntall: string, max: number): string => {
    const number = getNumberFromStringInput(currentAntall);

    if (number === undefined || Math.round(number) !== number) {
        return currentAntall;
    }

    if (number + 1 > max) {
        return max.toString();
    }

    return (number + 1).toString();
};

const trekkFraUke = (currentAntall: string, min: number): string => {
    const number = getNumberFromStringInput(currentAntall);

    if (number === undefined || number === 0 || Math.round(number) !== number) {
        return currentAntall;
    }

    if (number - 1 < min) {
        return min.toString();
    }

    return (number - 1).toString();
};

const leggTilDag = (currentAntall: string, max: number): string => {
    const number = getNumberFromStringInput(currentAntall);

    if (number === undefined || Math.round(number) !== number) {
        return currentAntall;
    }

    if (number + 1 > max) {
        return max.toString();
    }

    return (number + 1).toString();
};

const trekkFraDag = (currentAntall: string, min: number): string => {
    const number = getNumberFromStringInput(currentAntall);

    if (number === undefined || number === 0 || Math.round(number) !== number) {
        return currentAntall;
    }

    if (number - 1 < min) {
        return min.toString();
    }

    return (number - 1).toString();
};

const AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål: FunctionComponent<Props> = ({
    FormComponents,
    ukerFieldName,
    dagerFieldName,
    antallDager,
    antallUker,
    setFieldValue,
    ukerMedFellesperiode,
}) => {
    const bem = bemUtils('antallUkerOgDagerFellesperiodeFarMedmorSpørsmål');
    const intl = useIntl();

    return (
        <SkjemaGruppe
            legend={
                <Element>
                    <FormattedMessage id="uttaksplaninfo.fellesperiode.tittel" />
                </Element>
            }
            description={
                <UtvidetInformasjon apneLabel={intlUtils(intl, 'uttaksplaninfo.fellesperiode.apneLabel')}>
                    <FormattedMessage id="uttaksplaninfo.fellesperiode.lesMerInfo" />
                </UtvidetInformasjon>
            }
        >
            <div className={bem.block}>
                <div className={bem.element('stepper')}>
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Mink antall uker med en uke"
                            ikon={<RangeIcon type="minus" />}
                            disabled={parseInt(antallUker, 10) === 0 || antallUker.trim().length === 0 ? true : false}
                            onClick={() => setFieldValue(ukerFieldName, trekkFraUke(antallUker, 0))}
                        />
                    </div>
                    <FormComponents.NumberInput
                        className={bem.element('uker')}
                        integerValue={true}
                        name={ukerFieldName}
                        label={intlUtils(intl, 'uker.fellesperiode')}
                        bredde="XS"
                        step="1"
                    />
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Øk antall uker med en uke"
                            ikon={<RangeIcon type="plus" />}
                            disabled={parseInt(antallUker, 10) >= ukerMedFellesperiode ? true : false}
                            onClick={() => setFieldValue(ukerFieldName, leggTilUke(antallUker, ukerMedFellesperiode))}
                        />
                    </div>
                </div>
                <div className={bem.element('stepper')}>
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Mink antall dager med en dag"
                            ikon={<RangeIcon type="minus" />}
                            onClick={() => setFieldValue(dagerFieldName, trekkFraDag(antallDager, 0))}
                            disabled={parseInt(antallDager, 10) === 0 || antallDager.trim().length === 0 ? true : false}
                        />
                    </div>
                    <FormComponents.NumberInput
                        className={bem.element('uker')}
                        integerValue={true}
                        name={dagerFieldName}
                        label={intlUtils(intl, 'dager.fellesperiode')}
                        bredde="XS"
                        step="1"
                    />
                    <div className={bem.element('icon')}>
                        <Sirkelknapp
                            stil="hvit"
                            ariaLabel="Øk antall dager med en dag"
                            ikon={<RangeIcon type="plus" />}
                            onClick={() => setFieldValue(dagerFieldName, leggTilDag(antallDager, 4))}
                            disabled={parseInt(antallDager, 10) === 4 ? true : false}
                        />
                    </div>
                </div>
            </div>
        </SkjemaGruppe>
    );
};

export default AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål;
