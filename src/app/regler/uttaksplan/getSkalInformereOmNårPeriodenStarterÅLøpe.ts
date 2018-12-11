const getSkalInformereOmNårPeriodenStarterÅLøpe = (søkerErFarEllerMedmor: boolean, morHarRett: boolean): boolean => {
    return søkerErFarEllerMedmor && morHarRett === false;
};
