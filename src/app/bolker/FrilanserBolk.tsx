import * as React from 'react';
import HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål from '../spørsmål/HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål';
import Bolk from '../components/layout/Bolk';
import DriverDuFosterhjemSpørsmål from '../spørsmål/DriverDuFosterhjemSpørsmål';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import HarDuJobbetSomFrilansSiste10MndSpørsmål from '../spørsmål/HarDuJobbetSomFrilansSiste10MndSpørsmål';
import {
    default as Søker,
    FrilansInformasjonPartial,
    SøkerPartial
} from '../types/søknad/Søker';
import JobberDuFremdelesSomFrilansSpørsmål from '../spørsmål/JobberDuFremdelesSomFrilansSpørsmål';

interface FrilanserBolkProps {
    søker: Søker;
    onChangeSøker: (v: SøkerPartial) => void;
    onChangeFrilansinformasjon: (v: FrilansInformasjonPartial) => void;
}

class FrilanserBolk extends React.Component<FrilanserBolkProps> {
    constructor(props: FrilanserBolkProps) {
        super(props);
        this.handleSøkerOnChange = this.handleSøkerOnChange.bind(this);
        this.handleFrilansinformasjonOnChange = this.handleFrilansinformasjonOnChange.bind(
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

    render() {
        const { søker } = this.props;
        const { frilansInformasjon } = søker;

        const driverFosterhjem =
            frilansInformasjon && frilansInformasjon.driverFosterhjem;
        const harJobbetForNærVennEllerFamilieSiste10Mnd =
            frilansInformasjon &&
            frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd;
        const jobberFremdelesSomFrilans =
            frilansInformasjon && frilansInformasjon.jobberFremdelesSomFrilans;

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
                        synlig={søker.harJobbetSomFrilansSiste10Mnd === true}
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

                    <Bolk
                        synlig={søker.harJobbetSomFrilansSiste10Mnd === true}
                        render={() => 1}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default FrilanserBolk;
