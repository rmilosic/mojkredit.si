
function Navigation(){
    render (
        <div className="nav-container">
                    <div className="via-1584620477666" via="via-1584620477666" vio="Basic Nav">
                        <div className="bar bar--sm visible-xs">
                            <div className="container">
                                <div className="row">
                                    <div className="col-3 col-md-2">
                                        <a href="index.html"> <img className="logo logo-dark" alt="logo" src="img/finster.svg"/> <img className="logo logo-light" alt="logo" src="img/logo-light.png"/> </a>
                                    </div>
                                    <div className="col-9 col-md-10 text-right">
                                        <a href="#userstitle" className="hamburger-toggle" data-toggle-className="#menu1;hidden-xs hidden-sm"> <i className="icon icon--sm stack-interface stack-menu"></i> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav id="menu1" className="bar bar-1 hidden-xs bar--absolute bar--transparent">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-1 col-md-2 hidden-xs">
                                        <div className="bar__module">
                                            <a href="index.html"> <img className="logo logo-dark" alt="logo" src="img/finster.svg"/> <img className="logo logo-light" alt="logo" src="img/finster.svg"/> </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-11 col-md-12 text-right text-left-xs text-left-sm">
                                        <div className="bar__module">
                                            <ul className="menu-horizontal text-left">
                                                <li> <a href="#userstitle">KAKO DELUJE FINSTEr</a> </li>
                                                <li>
                                                    <a href="#userstitle"> </a>
                                                </li>
                                                <li> <a href="#userstitle">ZA BANKE</a> </li>
                                            </ul>
                                        </div>
                                        <div className="bar__module">
                                            <a className="btn btn--sm type--uppercase" href="#customise-template"> <span className="btn__text">POŠLJI POVPRAŠEVANJE</span> </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
    )
}

export default Navigation;