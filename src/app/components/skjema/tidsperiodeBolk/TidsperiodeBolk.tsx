import * as React from 'react';
import { useIntl } from 'react-intl';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import moment from 'moment';
import { CalendarPlacement } from 'nav-datovelger/lib/types/index';
import { guid } from 'nav-frontend-js-utils';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import ValiderbarUkerDagerTeller from 'common/lib/validation/elements/ValiderbarUkerDagerTeller';
import { Validator } from 'common/lib/validation/types';
import { Avgrensninger, Feil, TidsperiodeStringMedValgfriSluttdato } from 'common/types';
import BEMHelper from 'common/util/bem';
import { getUkerOgDagerFromDager } from 'common/util/datoUtils';
import getMessage from 'common/util/i18nUtils';
import { getVarighetString } from 'common/util/intlUtils';
import { InputChangeEvent } from '../../../../common/types/Events';
import { getTidsperiode, Tidsperioden } from '../../../util/uttaksplan/Tidsperioden';
import { getTidsperiodeRegler } from '../../../util/validation/tidsperiode';
import './tidsperiodeBolk.less';

export interface DatoAvgrensninger {
    helgedagerIkkeTillatt?: boolean;
    fra: Avgrensninger;
    til: Avgrensninger;
}

export interface DatoValidatorer {
    fra?: Validator[];
    til?: Validator[];
}

interface TidsperiodeBolkProps {
    tidsperiode: Partial<TidsperiodeStringMedValgfriSluttdato>;
    pågående?: boolean;
    startdatoDisabled?: boolean;
    datoAvgrensninger?: DatoAvgrensninger;
    datoValidatorer?: DatoValidatorer;
    feil?: Feil;
    visVarighet?: boolean;
    varighetRenderer?: (varighetIDager: number) => React.ReactNode;
    onChange: (tidsperiode: Partial<TidsperiodeStringMedValgfriSluttdato>) => void;
    datoInputLabelProps?: {
        fom: string;
        tom: string;
    };
    defaultMånedFom?: Date;
    defaultMånedTom?: Date;
    calendarPosition?: CalendarPlacement;
    allowInvalidDateSelection?: boolean;
    visPågåendePeriodeCheckbox?: boolean;
    ukerOgDagerVelgerEnabled?: boolean;
}

type Props = TidsperiodeBolkProps;

const TidsperiodeBolk: React.FunctionComponent<Props> = (props) => {
    const {
        tidsperiode,
        pågående,
        datoAvgrensninger,
        feil,
        datoValidatorer,
        startdatoDisabled,
        defaultMånedFom,
        defaultMånedTom,
        datoInputLabelProps,
        allowInvalidDateSelection,
        calendarPosition,
        onChange,
        visVarighet,
        varighetRenderer,
        visPågåendePeriodeCheckbox = false,
        ukerOgDagerVelgerEnabled = false,
    } = props;

    const intl = useIntl();

    const handleOnChange = (value: Partial<TidsperiodeStringMedValgfriSluttdato>) => {
        onChange(value);
    };

    const getValidators = () => {
        const tidsperiodeValidators = getTidsperiodeRegler(
            { fom: ISOStringToDate(tidsperiode?.fom), tom: ISOStringToDate(tidsperiode?.tom) },
            intl,
            visPågåendePeriodeCheckbox,
            pågående
        );
        if (datoValidatorer) {
            if (datoValidatorer.fra && tidsperiodeValidators.fra) {
                tidsperiodeValidators.fra.push(...datoValidatorer.fra);
            }
            if (datoValidatorer.til && tidsperiodeValidators.til) {
                tidsperiodeValidators.til.push(...datoValidatorer.til);
            }
        }
        return tidsperiodeValidators;
    };

    const bem = BEMHelper('tidsperiodeBolk');

    const varighetIDager =
        tidsperiode &&
        tidsperiode.fom &&
        tidsperiode.tom &&
        moment(ISOStringToDate(tidsperiode.fom)).isSameOrBefore(ISOStringToDate(tidsperiode.tom), 'day')
            ? Tidsperioden({
                  fom: ISOStringToDate(tidsperiode.fom),
                  tom: ISOStringToDate(tidsperiode.tom),
              }).getAntallUttaksdager()
            : undefined;

    let tilAvgrensninger: Avgrensninger = {};
    if (datoAvgrensninger && datoAvgrensninger.til) {
        tilAvgrensninger = datoAvgrensninger.til;
    } else if (tidsperiode.fom) {
        tilAvgrensninger = { minDato: ISOStringToDate(tidsperiode.fom) };
    }

    const { uker, dager } = varighetIDager ? getUkerOgDagerFromDager(Math.abs(varighetIDager)) : { uker: 0, dager: 0 };

    const validators = getValidators();

    return (
        <SkjemaGruppe feil={feil !== undefined ? feil.feilmelding : undefined}>
            <div className={bem.block}>
                <div className={bem.element('fra')}>
                    <Block margin="none">
                        <DatoInput
                            name="fraDatoInput"
                            id={guid()}
                            label={datoInputLabelProps ? datoInputLabelProps.fom : getMessage(intl, 'fraogmed')}
                            onChange={(fom) => {
                                handleOnChange({
                                    ...tidsperiode,
                                    fom,
                                });
                            }}
                            allowInvalidDateSelection={allowInvalidDateSelection}
                            disabled={startdatoDisabled}
                            dato={tidsperiode.fom}
                            datoAvgrensinger={datoAvgrensninger && datoAvgrensninger.fra}
                            validators={validators.fra}
                            dayPickerProps={{ initialMonth: defaultMånedFom }}
                            calendarSettings={{ position: calendarPosition }}
                        />
                    </Block>
                </div>

                <div className={bem.element('til')}>
                    <Block margin="none">
                        <DatoInput
                            name="tilDatoInput"
                            id={guid()}
                            label={datoInputLabelProps ? datoInputLabelProps.tom : getMessage(intl, 'tilogmed')}
                            onChange={(tom) => {
                                handleOnChange({
                                    ...tidsperiode,
                                    tom,
                                });
                            }}
                            allowInvalidDateSelection={allowInvalidDateSelection}
                            dato={tidsperiode.tom}
                            disabled={pågående || false}
                            datoAvgrensinger={tilAvgrensninger}
                            validators={validators.til}
                            dayPickerProps={{
                                initialMonth: defaultMånedTom || ISOStringToDate(tidsperiode.fom),
                            }}
                            calendarSettings={{ position: calendarPosition }}
                        />
                    </Block>
                </div>

                {ukerOgDagerVelgerEnabled && (
                    <Block margin="none">
                        <Block margin="xs">
                            <Element>{getMessage(intl, 'tidsperiodeBolk.velgLengde')}</Element>
                        </Block>
                        <ValiderbarUkerDagerTeller
                            name="periodeUkerOgDager"
                            ukeLegend={getMessage(intl, 'spørsmål.farFellesperiode.uker.label')}
                            dagLegend={getMessage(intl, 'spørsmål.farFellesperiode.dager.label')}
                            stepperProps={[
                                {
                                    value: uker !== undefined ? uker : 0,
                                    min: 0,
                                    max: 100,
                                    onChange: (nyUker: number) => {
                                        const date = ISOStringToDate(tidsperiode.fom);
                                        if (date) {
                                            handleOnChange({
                                                ...tidsperiode,
                                                tom: dateToISOString(getTidsperiode(date, nyUker * 5 + dager).tom),
                                            });
                                        }
                                    },
                                    ariaLabel: 'Antall uker',
                                    increaseAriaLabel: 'Øk antall uker med en uke',
                                    decreaseAriaLabel: 'Mink antall uker med en uke',
                                },
                                {
                                    value: dager !== undefined && dager !== 5 ? dager : 0,
                                    min: 0,
                                    max: 5,
                                    onChange: (nyDager: number) => {
                                        const date = ISOStringToDate(tidsperiode.fom);
                                        if (date) {
                                            handleOnChange({
                                                ...tidsperiode,
                                                tom: dateToISOString(getTidsperiode(date, uker * 5 + nyDager).tom),
                                            });
                                        }
                                    },
                                    ariaLabel: 'Antall dager',
                                    increaseAriaLabel: 'Øk antall dager med en dag',
                                    decreaseAriaLabel: 'Mink antall dager med en dag',
                                },
                            ]}
                        />
                    </Block>
                )}

                {visVarighet && varighetIDager !== undefined && (
                    <Normaltekst className={bem.element('varighet')}>
                        {varighetRenderer ? varighetRenderer(varighetIDager) : getVarighetString(varighetIDager, intl)}
                    </Normaltekst>
                )}
            </div>

            <div className={bem.element('pågående-checkbox')}>
                <Block visible={visPågåendePeriodeCheckbox}>
                    <Checkbox
                        name="pågående"
                        checked={pågående || false}
                        label={getMessage(intl, 'pågående')}
                        onChange={(e: InputChangeEvent) => {
                            handleOnChange({
                                ...tidsperiode,
                                tom: undefined,
                                pågående: e.target.checked,
                            });
                        }}
                    />
                </Block>
            </div>
        </SkjemaGruppe>
    );
};

export default TidsperiodeBolk;
