import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import moment from 'moment';
import Block from 'common/components/block/Block';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { Validator } from 'common/lib/validation/types';
import { Avgrensninger } from 'common/types';
import getMessage from 'common/util/i18nUtils';
import { DatoInputVerdi } from '../../common/components/skjema/elements/dato-input/DatoInput';
import { getTermindatoRegler, termindatoAvgrensningerFodsel } from 'app/util/validation/termindato';
import { dateMoreThan10WeeksAgo } from 'app/util/validation/values';
import { fødselsdatoAvgrensninger, getFødselsdatoRegler } from '../util/validation/fødselsdato';

export interface FødselsdatoerSpørsmålProps {
    fødselsdatoer: DatoInputVerdi[];
    termindato?: DatoInputVerdi;
    antallBarn: number | undefined;
    onChangeFødselsdato: (fødselsdatoer: DatoInputVerdi[]) => void;
    onChangeTermindato?: (termindato: DatoInputVerdi) => void;
    collapsed?: boolean;
    datoavgrensninger?: Avgrensninger;
    datovalidatorer?: Validator[];
    gjelderAdopsjon?: boolean;
    erFarMedmor?: boolean;
    intl: IntlShape;
}

type Props = FødselsdatoerSpørsmålProps;

const getKey = (idx: number) => `fødselsdatoer.flere.${idx}`;

class FødselsdatoerSpørsmål extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onFødselsdatoChange = this.onFødselsdatoChange.bind(this);
        this.renderCollapsedFødselsdatoSpørsmål = this.renderCollapsedFødselsdatoSpørsmål.bind(this);
        this.renderExpandedFødselsdatoSpørsmål = this.renderExpandedFødselsdatoSpørsmål.bind(this);
        this.getFødselsdatoAvgrensninger = this.getFødselsdatoAvgrensninger.bind(this);
        this.getValidatorer = this.getValidatorer.bind(this);
        this.getTermindatoAvgrensninger = this.getTermindatoAvgrensninger.bind(this);
    }

    onFødselsdatoChange(dato: DatoInputVerdi, idx: number) {
        const datoer = [...this.props.fødselsdatoer];
        datoer[idx] = dato;
        this.props.onChangeFødselsdato(datoer);
    }

    getFødselsdatoAvgrensninger() {
        return {
            ...fødselsdatoAvgrensninger,
            ...this.props.datoavgrensninger,
        };
    }

    getTermindatoAvgrensninger() {
        return {
            ...termindatoAvgrensningerFodsel,
        };
    }

    getValidatorer(): Validator[] {
        const { fødselsdatoer, datovalidatorer, intl } = this.props;
        return [
            ...(datovalidatorer || []),
            ...getFødselsdatoRegler(
                fødselsdatoer.length > 0 ? fødselsdatoer[0].date : undefined,
                this.props.gjelderAdopsjon === true,
                intl
            ),
        ];
    }

    getTermindatoValidatorer(): Validator[] {
        const { termindato, datovalidatorer, intl } = this.props;

        const forLangtFremITidRegel: Validator = {
            test: () => {
                const wrappedTermindato = moment(termindato?.date);
                return moment().add(9, 'months').isSameOrAfter(wrappedTermindato, 'day');
            },
            failText: getMessage(intl, 'valideringsfeil.termindato.forLangtFremITid'),
        };

        return [...(datovalidatorer || []), getTermindatoRegler(termindato?.date, intl)[0], forLangtFremITidRegel];
    }

    visTermindato(
        fødselsdatoer: DatoInputVerdi[],
        erFarMedmor: boolean | undefined,
        gjelderAdopsjon: boolean | undefined
    ): boolean {
        if (gjelderAdopsjon) {
            return false;
        }

        if (fødselsdatoer.length > 0) {
            if (erFarMedmor) {
                return moment(fødselsdatoer[0].date).isSameOrAfter(dateMoreThan10WeeksAgo);
            }

            return true;
        }

        return false;
    }

    renderCollapsedFødselsdatoSpørsmål() {
        const { fødselsdatoer, antallBarn, termindato, erFarMedmor, gjelderAdopsjon } = this.props;

        let intlIdFødsel = 'fødselsdatoer.fødsel';
        let intlIdTermin = 'fødselsdatoer.termin';

        if (antallBarn !== undefined && antallBarn > 1) {
            intlIdFødsel = 'fødselsdatoer.fødsel.flereBarn';
            intlIdTermin = 'fødselsdatoer.termin.flereBarn';
        }

        const { onChangeTermindato } = this.props;

        return (
            <>
                <Block>
                    <DatoInput
                        id="fødselsdato"
                        name="fødsesdato"
                        datoVerdi={fødselsdatoer[0]}
                        onChange={(d) => this.onFødselsdatoChange(d, 0)}
                        label={<Labeltekst intlId={intlIdFødsel} />}
                        datoAvgrensinger={this.getFødselsdatoAvgrensninger()}
                        validators={this.getValidatorer()}
                    />
                </Block>
                {onChangeTermindato && (
                    <Block visible={this.visTermindato(fødselsdatoer, erFarMedmor, gjelderAdopsjon)}>
                        <DatoInput
                            id="termindato"
                            name="termindato"
                            datoVerdi={termindato}
                            onChange={(d) => onChangeTermindato(d)}
                            label={<Labeltekst intlId={intlIdTermin} />}
                            datoAvgrensinger={this.getTermindatoAvgrensninger()}
                            validators={this.getTermindatoValidatorer()}
                        />
                    </Block>
                )}
            </>
        );
    }

    renderExpandedFødselsdatoSpørsmål() {
        const { fødselsdatoer } = this.props;
        return (
            <React.Fragment>
                {fødselsdatoer.map((dato: DatoInputVerdi, idx: number) => (
                    <div className="blokk-m" key={getKey(idx)}>
                        <DatoInput
                            id={getKey(idx)}
                            name={getKey(idx)}
                            datoVerdi={dato}
                            onChange={(d) => this.onFødselsdatoChange(d, idx)}
                            label={<Labeltekst intlId={`fødselsdatoer.flere.${idx + 1}`} />}
                            datoAvgrensinger={this.getFødselsdatoAvgrensninger()}
                            validators={this.getValidatorer()}
                        />
                    </div>
                ))}
            </React.Fragment>
        );
    }

    render() {
        const { collapsed } = this.props;
        return collapsed ? this.renderCollapsedFødselsdatoSpørsmål() : this.renderExpandedFødselsdatoSpørsmål();
    }
}

export default injectIntl(FødselsdatoerSpørsmål);
