import * as React from 'react';
import classnames from 'classnames';
import { Periode, Periodetype, Uttaksperiode } from '../../types/uttaksplan/periodetyper';
import UtsettelsesperiodeForm, { UtsettelseFormPeriodeType } from '../utsettelse-form/UtsettelseForm';
import { FormSubmitEvent } from 'common/lib/validation/elements/ValiderbarForm';
import { RecursivePartial } from '../../types/Partial';
import './nyPeriodeForm.less';
import Block from 'common/components/block/Block';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import UttakForm from '../uttak-form/UttakForm';
import { Forelder, Tidsperiode } from 'common/types';
import PeriodeFargestrek from '../periode-fargestrek/PeriodeFargestrek';
import PeriodeCleanup from '../../util/cleanup/periodeCleanup';
import Søknad from '../../types/søknad/Søknad';
import { UttakSpørsmålVisibility } from '../uttak-form/uttakFormConfig';
import { UtsettelseSpørsmålVisibility } from '../utsettelse-form/utsettelseFormConfig';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

interface OwnProps {
    antallFeriedager: number;
    erMorUfør: boolean | undefined;
    forelder: Forelder;
    søknad: Søknad;
    periodetype: Periodetype;
    tidsperiode?: Partial<Tidsperiode>;
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
}

interface State {
    periode: RecursivePartial<Periode>;
    visibility: UtsettelseSpørsmålVisibility | UttakSpørsmålVisibility | undefined;
    ikonType: UttaksplanIkonKeys;
    ikonClass: string;
    ikonTittel: string;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('nyPeriodeForm');

const PeriodeFormTittel: React.StatelessComponent<{
    tittel: string;
    clsName: string;
    ikonType: UttaksplanIkonKeys;
    ikontittel: string;
}> = ({ tittel, clsName, ikonType, ikontittel }) => {
    return (
        <Block margin="s">
            <Undertittel tag="h1" className={bem.element('heading')}>
                {tittel}
                <span className={clsName}>
                    <UttaksplanIkon ikon={ikonType} title={ikontittel} />
                </span>
            </Undertittel>
        </Block>
    );
};

class NyPeriodeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { periodetype, tidsperiode } = props;
        const periode: RecursivePartial<Periode> = {
            tidsperiode: tidsperiode || {}
        };
        if (
            periodetype === Periodetype.Utsettelse ||
            periodetype === Periodetype.Uttak ||
            periodetype === Periodetype.Opphold ||
            periodetype === Periodetype.Overføring
        ) {
            periode.type = periodetype;
        }
        this.state = {
            periode,
            visibility: undefined,
            ikonType: UttaksplanIkonKeys.uttak,
            ikonClass: '',
            ikonTittel: 'mor'
        };

        this.updatePeriode = this.updatePeriode.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.setIkonState = this.setIkonState.bind(this);
    }

    setIkonState(cls: string, type: UttaksplanIkonKeys, tittel: string) {
        this.setState({
            ikonType: type,
            ikonClass: cls,
            ikonTittel: tittel
        });
    }

    mapIkonState = () => {
        const periode = this.state.periode;
        if ((periode.type === 'uttak' || periode.type === 'opphold') && periode.forelder !== undefined) {
            switch (periode.forelder) {
                case 'mor':
                    this.setIkonState('iconBox iconBox--purple', UttaksplanIkonKeys.uttak, 'mor');
                    break;
                case 'farMedmor':
                    this.setIkonState('iconBox iconBox--blue', UttaksplanIkonKeys.uttak, 'farMedmor');
                    break;
                default:
                    this.setIkonState('', UttaksplanIkonKeys.uttak, '');
            }
        } else if (periode.type === 'utsettelse') {
            switch (periode.årsak) {
                case 'LOVBESTEMT_FERIE':
                    this.setIkonState('iconBox iconBox--green', UttaksplanIkonKeys.ferie, 'ferie');
                    break;
                case 'ARBEID':
                    this.setIkonState('iconBox iconBox--green', UttaksplanIkonKeys.arbeid, 'arbeid');
                    break;
                default:
                    this.setIkonState('iconBox iconBox--green', UttaksplanIkonKeys.sykdom, 'sykdom');
                    break;
            }
        }
    };

    updatePeriode(
        periode: RecursivePartial<Periode>,
        replace: boolean,
        visibility?: UtsettelseSpørsmålVisibility | UttakSpørsmålVisibility
    ) {
        if (replace) {
            this.setState({ periode, visibility });
        } else {
            const updatedPeriode = {
                ...this.state.periode,
                ...periode
            };
            this.setState({
                periode: updatedPeriode as RecursivePartial<Periode>,
                visibility
            });
        }
    }

    handleOnSubmit(e: FormSubmitEvent) {
        e.preventDefault();
        e.stopPropagation();
        const { onSubmit } = this.props;
        const { periode, visibility } = this.state;
        const { søker, annenForelder } = this.props.søknad;
        const cleanedPeriode = PeriodeCleanup.cleanupNyPeriode(periode as Periode, søker, annenForelder, visibility);
        onSubmit(cleanedPeriode as Periode);
        this.updatePeriode({ tidsperiode: {} }, false);
    }

    render() {
        const { intl, antallFeriedager, forelder, onCancel } = this.props;
        const { periode } = this.state;

        return (
            <form
                className={classnames(bem.className, bem.modifier(periode.type!.toLowerCase()))}
                onSubmit={this.handleOnSubmit}>
                <div className={bem.element('fargestrek')}>
                    <PeriodeFargestrek farge={getPeriodeFarge(periode as Periode, forelder)} />
                </div>
                {periode.type === Periodetype.Utsettelse && (
                    <>
                        <PeriodeFormTittel
                            tittel={getMessage(intl, 'nyPeriodeForm.utsettelse.tittel')}
                            clsName={this.state.ikonClass}
                            ikonType={this.state.ikonType}
                            ikontittel={this.state.ikonTittel}
                        />
                        <UtsettelsesperiodeForm
                            antallFeriedager={antallFeriedager}
                            periode={periode as UtsettelseFormPeriodeType}
                            onChange={this.updatePeriode}
                            onCancel={onCancel}
                            onIkonUpdate={this.mapIkonState}
                        />
                    </>
                )}
                {(periode.type === Periodetype.Uttak ||
                    periode.type === Periodetype.Overføring ||
                    periode.type === Periodetype.Opphold) && (
                    <>
                        <PeriodeFormTittel
                            tittel={getMessage(intl, 'nyPeriodeForm.uttak.tittel')}
                            clsName={this.state.ikonClass}
                            ikonType={this.state.ikonType}
                            ikontittel={this.state.ikonTittel}
                        />
                        <UttakForm
                            periode={periode as Partial<Uttaksperiode>}
                            kanEndreStønadskonto={true}
                            onChange={this.updatePeriode}
                            onCancel={onCancel}
                            onIkonUpdate={this.mapIkonState}
                        />
                    </>
                )}
            </form>
        );
    }
}

export default injectIntl(NyPeriodeForm);
