import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../../redux/reducers';
import {
    default as Utenlandsopphold,
    UtenlandsoppholdPeriode
} from '../../../types/søknad/Utenlandsopphold';
import getMessage from 'common/util/i18nUtils';
import UtenlandsoppholdBolk from '../../../bolker/UtenlandsoppholdBolk';
import Bolk from '../../../components/layout/Bolk';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import BoddINorgeSiste12MndSpørsmål from '../../../spørsmål/BoddINorgeSiste12MndSpørsmål';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import SkalBoINorgeNeste12MndSpørsmål from '../../../spørsmål/SkalBoINorgeNeste12MndSpørsmål';
import { Språkkode } from 'common/intl/types';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import Steg, { StegProps } from '../../../components/layout/Steg';
import { StegID } from '../../../util/stegConfig';
import { HistoryProps } from '../../../types/common';

interface UtenlandsoppholdProps {
    søknad: Søknad;
    språkkode: Språkkode;
    stegProps: StegProps;
}

type Props = UtenlandsoppholdProps &
    InjectedIntlProps &
    DispatchProps &
    HistoryProps;

type PeriodeArray = 'senerePerioder' | 'tidligerePerioder';

class UtenlandsoppholdSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.addUtenlandsoppholdPeriode = this.addUtenlandsoppholdPeriode.bind(
            this
        );
        this.editUtenlandsoppholdPeriode = this.editUtenlandsoppholdPeriode.bind(
            this
        );
        this.deleteUtenlandsoppholdPeriode = this.deleteUtenlandsoppholdPeriode.bind(
            this
        );
        this.renderSkalBoINorgeNeste12MndSpørsmål = this.renderSkalBoINorgeNeste12MndSpørsmål.bind(
            this
        );
        this.renderHarBoddINorgeSiste12MndSpørsmål = this.renderHarBoddINorgeSiste12MndSpørsmål.bind(
            this
        );
    }

    addUtenlandsoppholdPeriode(
        periode: UtenlandsoppholdPeriode,
        arrayProp: PeriodeArray
    ) {
        const { søknad, dispatch } = this.props;
        const { utenlandsopphold } = søknad;
        dispatch(
            søknadActions.updateUtenlandsopphold({
                [arrayProp]: [...(utenlandsopphold[arrayProp] || []), periode]
            })
        );
    }

    editUtenlandsoppholdPeriode(
        periode: UtenlandsoppholdPeriode,
        arrayProp: PeriodeArray,
        index: number
    ) {
        const { søknad, dispatch } = this.props;
        const { utenlandsopphold } = søknad;
        const periodeArray = utenlandsopphold[arrayProp];

        if (periodeArray && index > -1) {
            periodeArray[index] = periode;
        }
        dispatch(
            søknadActions.updateUtenlandsopphold({
                [arrayProp]: periodeArray
            })
        );
    }

    deleteUtenlandsoppholdPeriode(
        periode: UtenlandsoppholdPeriode,
        arrayProp: PeriodeArray
    ) {
        const { søknad, dispatch } = this.props;
        const { utenlandsopphold } = søknad;
        const periodeArray = utenlandsopphold[arrayProp];
        if (periodeArray) {
            periodeArray.splice(periodeArray.indexOf(periode), 1);
            dispatch(
                søknadActions.updateUtenlandsopphold({
                    [arrayProp]: periodeArray
                })
            );
        }
    }

    renderSkalBoINorgeNeste12MndSpørsmål() {
        const { søknad, dispatch } = this.props;
        const { utenlandsopphold } = søknad;
        return (
            <SkalBoINorgeNeste12MndSpørsmål
                iNorgeNeste12={utenlandsopphold.iNorgeNeste12Mnd}
                onChange={(iNorgeNeste12Mnd: boolean) =>
                    dispatch(
                        søknadActions.updateUtenlandsopphold({
                            iNorgeNeste12Mnd
                        })
                    )
                }
            />
        );
    }

    renderHarBoddINorgeSiste12MndSpørsmål() {
        const { søknad, dispatch } = this.props;
        const { utenlandsopphold } = søknad;
        return (
            <Spørsmål
                synlig={utenlandsopphold.iNorgeNeste12Mnd !== undefined}
                render={() => (
                    <BoddINorgeSiste12MndSpørsmål
                        iNorgeSiste12={utenlandsopphold.iNorgeSiste12Mnd}
                        onChange={(iNorgeSiste12Mnd: boolean) =>
                            dispatch(
                                søknadActions.updateUtenlandsopphold({
                                    iNorgeSiste12Mnd
                                })
                            )
                        }
                    />
                )}
            />
        );
    }

    render() {
        const { søknad, stegProps, språkkode, intl } = this.props;
        const { utenlandsopphold } = søknad;

        return (
            <Steg {...stegProps}>
                <Bolk
                    render={() => (
                        <UtenlandsoppholdBolk
                            renderSpørsmål={
                                this.renderSkalBoINorgeNeste12MndSpørsmål
                            }
                            showUtenlandsoppholdPeriodeContent={
                                utenlandsopphold.iNorgeNeste12Mnd === false
                            }
                            oppfølgingsspørsmål={getMessage(
                                intl,
                                'utenlandsopphold.select.spørsmål.neste12mnd'
                            )}
                            perioder={søknad.utenlandsopphold.senerePerioder}
                            periodeType={'siste12mnd'}
                            språk={språkkode}
                            onAddUtenlandsoppholdPeriode={(
                                periode: UtenlandsoppholdPeriode
                            ) =>
                                this.addUtenlandsoppholdPeriode(
                                    periode,
                                    'senerePerioder'
                                )
                            }
                            onEditUtenlandsoppholdPeriode={(
                                periode: UtenlandsoppholdPeriode,
                                index: number
                            ) => {
                                this.editUtenlandsoppholdPeriode(
                                    periode,
                                    'senerePerioder',
                                    index
                                );
                            }}
                            onDeleteUtenlandsoppholdPeriode={(
                                periode: UtenlandsoppholdPeriode
                            ) => {
                                this.deleteUtenlandsoppholdPeriode(
                                    periode,
                                    'senerePerioder'
                                );
                            }}
                        />
                    )}
                />

                <Bolk
                    synlig={utenlandsopphold.iNorgeNeste12Mnd !== undefined}
                    render={() => (
                        <UtenlandsoppholdBolk
                            renderSpørsmål={
                                this.renderHarBoddINorgeSiste12MndSpørsmål
                            }
                            showUtenlandsoppholdPeriodeContent={
                                utenlandsopphold.iNorgeSiste12Mnd === false
                            }
                            oppfølgingsspørsmål={getMessage(
                                intl,
                                'utenlandsopphold.select.spørsmål.siste12mnd'
                            )}
                            perioder={søknad.utenlandsopphold.tidligerePerioder}
                            periodeType={'neste12mnd'}
                            språk={språkkode}
                            onAddUtenlandsoppholdPeriode={(
                                periode: UtenlandsoppholdPeriode
                            ) =>
                                this.addUtenlandsoppholdPeriode(
                                    periode,
                                    'tidligerePerioder'
                                )
                            }
                            onEditUtenlandsoppholdPeriode={(
                                periode: UtenlandsoppholdPeriode,
                                index: number
                            ) => {
                                this.editUtenlandsoppholdPeriode(
                                    periode,
                                    'tidligerePerioder',
                                    index
                                );
                            }}
                            onDeleteUtenlandsoppholdPeriode={(
                                periode: UtenlandsoppholdPeriode
                            ) => {
                                this.deleteUtenlandsoppholdPeriode(
                                    periode,
                                    'tidligerePerioder'
                                );
                            }}
                        />
                    )}
                />
            </Steg>
        );
    }
}

const utenlandsoppholdHasValues = (utenlandsopphold: Utenlandsopphold) =>
    utenlandsopphold.iNorgeSiste12Mnd === true ||
    (utenlandsopphold.iNorgeSiste12Mnd === false &&
        utenlandsopphold.tidligerePerioder.length > 0) ||
    (utenlandsopphold.iNorgeNeste12Mnd === true ||
        (utenlandsopphold.iNorgeNeste12Mnd === false &&
            utenlandsopphold.senerePerioder.length > 0));

export default injectIntl(
    connect((state: AppState, props: Props) => {
        const { søknad } = state;
        const { utenlandsopphold } = søknad;
        const { history } = props;

        const stegProps: StegProps = {
            id: StegID.UTENLANDSOPPHOLD,
            renderFortsettKnapp: utenlandsoppholdHasValues(utenlandsopphold),
            history
        };

        return {
            språkkode: state.common.språkkode,
            søknad,
            stegProps,
            ...props
        };
    })(UtenlandsoppholdSteg)
);
