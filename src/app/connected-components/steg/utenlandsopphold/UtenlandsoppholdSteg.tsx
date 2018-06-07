import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../../redux/reducers';
import {
    default as Utenlandsopphold,
    UtenlandsoppholdPeriode,
    UtenlandsoppholdPeriodeType
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

class UtenlandsoppholdSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.renderSkalBoINorgeNeste12MndSpørsmål = this.renderSkalBoINorgeNeste12MndSpørsmål.bind(
            this
        );
        this.renderHarBoddINorgeSiste12MndSpørsmål = this.renderHarBoddINorgeSiste12MndSpørsmål.bind(
            this
        );
        this.updateUtenlandsopphold = this.updateUtenlandsopphold.bind(this);
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

    updateUtenlandsopphold(
        perioder: UtenlandsoppholdPeriode[],
        periodeType: UtenlandsoppholdPeriodeType
    ) {
        const { dispatch } = this.props;
        dispatch(
            søknadActions.updateUtenlandsopphold({ [periodeType]: perioder })
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
                                'utenlandsopphold.select.spørsmål.senerePerioder'
                            )}
                            perioder={søknad.utenlandsopphold.senerePerioder}
                            periodeType={'senerePerioder'}
                            språk={språkkode}
                            onChange={(perioder: UtenlandsoppholdPeriode[]) =>
                                this.updateUtenlandsopphold(
                                    perioder,
                                    'senerePerioder'
                                )
                            }
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
                                'utenlandsopphold.select.spørsmål.tidligerePerioder'
                            )}
                            perioder={søknad.utenlandsopphold.tidligerePerioder}
                            periodeType={'tidligerePerioder'}
                            språk={språkkode}
                            onChange={(perioder: UtenlandsoppholdPeriode[]) =>
                                this.updateUtenlandsopphold(
                                    perioder,
                                    'tidligerePerioder'
                                )
                            }
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
