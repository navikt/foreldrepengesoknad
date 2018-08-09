import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AnnenInntektType } from '../../types/søknad/AnnenInntekt';
import InjectedIntl = ReactIntl.InjectedIntl;
import getMessage from 'common/util/i18nUtils';
import Select from 'common/wrappers/skjemaelementer/Select';

interface InntektstypeVelgerProps {
    defaultValue?: string;
    label: React.ReactNode;
    validators?: any;
    name?: string;
    onChange: (
        value: string,
        event?: React.ChangeEvent<HTMLSelectElement>
    ) => void;
}

interface InntektstypeOptions {
    [key: string]: string;
}

const getOptions = (intl: InjectedIntl): InntektstypeOptions => ({
    [AnnenInntektType.JOBB_I_UTLANDET]: getMessage(
        intl,
        'inntektstype.jobbIUtlandet'
    ),
    [AnnenInntektType.MILITÆRTJENESTE]: getMessage(
        intl,
        'inntektstype.militæret'
    ),
    [AnnenInntektType.LØNN_VED_VIDEREUTDANNING]: getMessage(
        intl,
        'inntektstype.videreutdanning'
    ),
    [AnnenInntektType.VENTELØNN]: getMessage(intl, 'inntektstype.ventelønn'),
    [AnnenInntektType.SLUTTPAKKE]: getMessage(
        intl,
        'inntektstype.sluttvederlag'
    )
});

class InntektstypeVelger extends React.Component<
    InntektstypeVelgerProps & InjectedIntlProps
> {
    renderInntektstypeOptions() {
        return Object.entries(getOptions(this.props.intl)).map(
            (value: string[]) => {
                return (
                    <option key={value[0]} value={value[0]}>
                        {value[1]}
                    </option>
                );
            }
        );
    }

    render() {
        const { validators, onChange, ...restProps } = this.props;
        return (
            <Select
                {...restProps}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    onChange(e.target.value, e)
                }
                validators={validators}>
                <option value="" />
                {this.renderInntektstypeOptions()}
            </Select>
        );
    }
}

export default injectIntl(InntektstypeVelger);
