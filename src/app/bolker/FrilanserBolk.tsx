import * as React from 'react';
import HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål from '../spørsmål/HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål';
import Bolk from '../components/layout/Bolk';
import DriverDuFosterhjemSpørsmål from '../spørsmål/DriverDuFosterhjemSpørsmål';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import HarDuJobbetSomFrilansSiste10MndSpørsmål from '../spørsmål/HarDuJobbetSomFrilansSiste10MndSpørsmål';
import Søker, { SøkerPartial } from '../types/søknad/Søker';
import JobberDuFremdelesSomFrilansSpørsmål from '../spørsmål/JobberDuFremdelesSomFrilansSpørsmål';
import {
    FrilansInformasjonPartial,
    FrilansOppdrag
} from '../types/søknad/FrilansInformasjon';
import FrilansOppdragBolk from './FrilansOppdragBolk';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'common/components/dato-input/DatoInput';

interface FrilanserBolkProps {
    søker: Søker;
    onChangeSøker: (v: SøkerPartial) => void;
    onChangeFrilansinformasjon: (v: FrilansInformasjonPartial) => void;
}

type Props = FrilanserBolkProps & InjectedIntlProps;

class FrilanserBolk extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleSøkerOnChange = this.handleSøkerOnChange.bind(this);
        this.handleFrilansinformasjonOnChange = this.handleFrilansinformasjonOnChange.bind(
            this
        );
        this.renderOppdragSiste10MndSpørsmål = this.renderOppdragSiste10MndSpørsmål.bind(
            this
        );
    }

    handleSøkerOnChange(changedProps: SøkerPartial) {
        const { søker, onChangeSøker } = this.props;
        onChangeSøker({ ...søker, ...changedProps });
    }

    handleFrilansinformasjonOnChange(changedProps: FrilansInformasjonPartial) {
        const { søker, onChangeFrilansinformasjon } = this.props;
        const { frilansInformasjon } = søker;
        onChangeFrilansinformasjon({ ...frilansInformasjon, ...changedProps });
    }

    renderOppdragSiste10MndSpørsmål() {
        const { søker } = this.props;
        const { frilansInformasjon } = søker;
        const harJobbetForNærVennEllerFamilieSiste10Mnd =
            frilansInformasjon &&
            frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd;

        return (
            <Spørsmål
                synlig={søker.harJobbetSomFrilansSiste10Mnd === true}
                render={() => (
                    <HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål
                        onChange={(v: boolean) =>
                            this.handleFrilansinformasjonOnChange({
                                harJobbetForNærVennEllerFamilieSiste10Mnd: v
                            })
                        }
                        harJobbetForNærVennEllerFamilieSiste10Mnd={
                            harJobbetForNærVennEllerFamilieSiste10Mnd
                        }
                    />
                )}
            />
        );
    }

    render() {
        const { søker, intl } = this.props;
        const { frilansInformasjon } = søker;

        const driverFosterhjem =
            frilansInformasjon && frilansInformasjon.driverFosterhjem;
        const harJobbetForNærVennEllerFamilieSiste10Mnd =
            frilansInformasjon &&
            frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd;
        const jobberFremdelesSomFrilans =
            frilansInformasjon && frilansInformasjon.jobberFremdelesSomFrilans;
        const oppdragForNæreVennerEllerFamilieSiste10Mnd =
            frilansInformasjon &&
            frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd;
        const oppstartsdato = frilansInformasjon && frilansInformasjon.oppstart;

        return (
            <React.Fragment>
                <div className="blokk-s">
                    <Spørsmål
                        render={() => (
                            <HarDuJobbetSomFrilansSiste10MndSpørsmål
                                onChange={(v: boolean) =>
                                    this.handleSøkerOnChange({
                                        harJobbetSomFrilansSiste10Mnd: v
                                    })
                                }
                                harJobbetSomFrilansSiste10Mnd={
                                    søker.harJobbetSomFrilansSiste10Mnd
                                }
                            />
                        )}
                    />

                    <Spørsmål
                        animert={false}
                        synlig={søker.harJobbetSomFrilansSiste10Mnd === true}
                        render={() => (
                            <DatoInput
                                id="frilansStartDato"
                                label={getMessage(intl, 'frilans.oppstart')}
                                onChange={(oppstart: Date) =>
                                    this.handleFrilansinformasjonOnChange({
                                        oppstart
                                    })
                                }
                                dato={oppstartsdato}
                            />
                        )}
                    />

                    <Spørsmål
                        synlig={søker.harJobbetSomFrilansSiste10Mnd === true}
                        render={() => (
                            <JobberDuFremdelesSomFrilansSpørsmål
                                onChange={(v: boolean) =>
                                    this.handleFrilansinformasjonOnChange({
                                        jobberFremdelesSomFrilans: v
                                    })
                                }
                                jobberFremdelesSomFrilans={
                                    jobberFremdelesSomFrilans
                                }
                            />
                        )}
                    />

                    <Spørsmål
                        synlig={
                            søker.harJobbetSomFrilansSiste10Mnd === true &&
                            jobberFremdelesSomFrilans === true
                        }
                        render={() => (
                            <DriverDuFosterhjemSpørsmål
                                onChange={(v: boolean) =>
                                    this.handleFrilansinformasjonOnChange({
                                        driverFosterhjem: v
                                    })
                                }
                                driverFosterhjem={driverFosterhjem}
                            />
                        )}
                    />

                    <Bolk
                        synlig={søker.harJobbetSomFrilansSiste10Mnd === true}
                        render={() => (
                            <FrilansOppdragBolk
                                renderSpørsmål={
                                    this.renderOppdragSiste10MndSpørsmål
                                }
                                showOppdragsPerioderContent={
                                    harJobbetForNærVennEllerFamilieSiste10Mnd ===
                                    true
                                }
                                oppfølgingsspørsmål={getMessage(
                                    intl,
                                    'frilansOppdrag.oppfølgingsspørsmål'
                                )}
                                oppdragListe={
                                    oppdragForNæreVennerEllerFamilieSiste10Mnd ||
                                    []
                                }
                                onChange={(oppdragListe: FrilansOppdrag[]) =>
                                    this.handleFrilansinformasjonOnChange({
                                        oppdragForNæreVennerEllerFamilieSiste10Mnd: oppdragListe
                                    })
                                }
                            />
                        )}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default injectIntl(FrilanserBolk);
