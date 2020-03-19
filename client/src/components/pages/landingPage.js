import React from 'react';

// styles for bootstrap
import stackInterfaceCSS from '../../resources/css/stack-interface.css';
import iconsMindCSS from '../../resources/css/iconsmind.css';
import bootstrapCSS from '../../resources/css/bootstrap.css';
import themeCSS from '../../resources/css/theme.css';
import customCSS from '../../resources/css/custom.css';
import fontRalewayCSS from '../../resources/css/font-raleway.css';

// import scripts
import parallaxScript from '../../resources/js/parallax.js';
import smoothScrollScript from '../../resources/js/smooth-scroll.min.js';
import customScripts from '../../resources/js/scripts.js';

// import images
import finsterLight from '../../resources/img/finster.svg';
import langingPageGraphic from '../../resources/img/landing-graphic.svg';


function LandingPage() {
    return (
        <div>
        {/* NAVIGATION COMPONENT */}
        <div className="nav-container">
            <div className="via-1584620477666" via="via-1584620477666" vio="Basic Nav">
                <div className="bar bar--sm visible-xs">
                    <div className="container">
                        <div className="row">
                            <div className="col-3 col-md-2">
                                <a href="#"> 
                                    {/* FINSTER LOGOS */}
                                    <img className="logo logo-dark" alt="logo" src={finsterLight}/> 
                                    <img className="logo logo-light" alt="logo" src={finsterLight}/> 
                                </a>
                            </div>
                            <div className="col-9 col-md-10 text-right">
                                <a href="#userstitle" className="hamburger-toggle" data-toggle-className="#menu1;hidden-xs hidden-sm"> 
                                <i className="icon icon--sm stack-interface stack-menu"></i> </a>
                            </div>
                        </div>
                    </div>
                </div>
                <nav id="menu1" className="bar bar-1 hidden-xs bar--absolute bar--transparent">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1 col-md-2 hidden-xs">
                                <div className="bar__module">
                                    <a href="#"> 
                                        <img className="logo logo-dark" alt="logo" src={finsterLight}/> 
                                        <img className="logo logo-light" alt="logo" src={finsterLight}/> 
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-11 col-md-12 text-right text-left-xs text-left-sm">
                                <div className="bar__module">
                                    <ul className="menu-horizontal text-left">
                                        <li> <a href="#opis-resitve">KAKO DELUJE FINSTER</a> </li>
                                        <li> <a href="#za-banke">ZA BANKE</a> </li>
                                    </ul>
                                </div>
                                <div className="bar__module">
                                    <a className="btn btn--sm type--uppercase" href="#kontakt"> <span className="btn__text">POŠLJI POVPRAŠEVANJE</span> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

        {/* MAIN COMPONENT */}
        <div className="main-container">
            <a id="cover" className="in-page-link"></a>
            <section className="switchable bg--primary">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5 col-md-7">
                            <div className="mt--2">
                                {/* MAIN MESSAGE */}
                                <h1><span>Hitro in učinkovito do bančnega kredita po vaši meri.</span></h1>
                                <p className="lead"> Prihranite čas in primerjajte informativne ponudbe vseh bank na enem mestu</p>
                                
                                {/* CTA */}
                                <a className="btn btn--primary type--uppercase" href="/izracun-kredita"> 
                                <span className="btn__text"> IZRAČUN KREDITA</span> </a> 
                                {/* <span className="block type--fine-print"><br/> </span>  */}
                            </div> 
                        </div>
                        <div className="col-lg-7 col-md-5 col-12"> <img alt="Image" src={langingPageGraphic}/> </div>
                    </div>
                </div>
            </section>
            <a id="opis-resitve" className="in-page-link"></a>
            <section className="text-center bg--secondary space--sm">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8">
                            <h2>Kako deluje Finster?</h2>
                        </div>
                    </div>
                </div>
            </section>
            <a id="usersfeature" className="in-page-link"></a>
            <section className="text-center bg--secondary space--xxs">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Clock-Back icon--lg"></i>
                                <h4>Do kredita v 2 tednih</h4>
                                <p><span>Z digitalizacijo celotnega postopka in uporabo sodobnih tehnologij Finster zmanjša čas do pridobitve kredita na le nekaj ur za manjše kredite do maksimalno 2 tednov za kredite z bolj kompleksnimi zavarovanji (npr. stanovanjski krediti)</span><br/></p> <a href="#userstitle">Več informacij</a> </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Magnifi-Glass2 icon--lg"></i>
                                <h4>Povečaj svoj pregled&nbsp;</h4>
                                <p>Standardiziran postopek naredi proces bolj pregleden, saj lahko ponudniki kreditov predstavijo svojo ponudbo na bolj ekstenziven in pregleden način, sorazmerno s posamičnimi fazami cikla, kupci pa namesto večjega števila vzporednih ciklov, izpeljejo le enega.&nbsp;<br/></p> <a href="#userstitle">
                        Več informacij
                    </a> </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Coins icon--lg"></i>
                                <h4>Izogni se odvečnim stroškom</h4>
                                <p>Finster eliminira oportunistične stroške s tem, ko omogoči pridobivanje ponudb različnih bank v sklopu samo enega postopka, ter omogoča sklenitev pogodbe z izbrano banko kar preko spleta.&nbsp;<br/></p> <a href="#userstitle">
                        Več informacij
                    </a> </div>
                        </div>
                    </div>
                </div>
            </section>
            <a id="za-banke" className="in-page-link"></a>
            <section className="text-center space--xs">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8">
                            <h1>Za banke</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="switchable feature-large space--sm">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-6 col-lg-5">
                            <div className="switchable__text">
                                <h2>Perfect for bootstrapped startups</h2>
                                <p className="lead"> Launching an attractive and scalable website quickly and affordably is important for modern startups — Stack offers massive value without looking 'bargain-bin'. </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="boxed boxed--lg boxed--border">
                                <div className="feature feature-2"> <i className="icon color--primary icon-Globe-2 icon--lg"></i>
                                    <div className="feature__body">
                                        <h5>Neposredni dostop do celotnega trga</h5>
                                        <p> Finster bankam omogoči, da dostopajo do širšega trga, saj je ravno neučinkovitost, zamudnost in nepreglednost postopkov en izmed glavnih dejavnikov za tovrstno ravnanje uporabnikov. </p>
                                    </div>
                                </div>
                                <div className="feature feature-2"> <i className="icon color--primary icon-Numbering-List icon--lg"></i>
                                    <div className="feature__body">
                                        <h5>Efektivna predstavitev produktov</h5>
                                        <p>Finster ponuja izpostavitev uporabnikom, ki so v aktivni fazi iskanja, in sicer na način, da izpostavi ponudbe v kategoriji produktov, po katerih uporabnik v danem trenutku tudi povprašuje.&nbsp;&nbsp;<br/></p>
                                    </div>
                                </div>
                                <div className="feature feature-2"> <i className="icon color--primary material-icons icon--lg">trending_up</i>
                                    <div className="feature__body">
                                        <h5>Poenostavitev procesov&nbsp; in razbremenitev virov</h5>
                                        <p>Z digitalnim pristopom platforme Finster in podpornimi storitvami lahko bankam ponudimo razbremenitev, kar rezultira v nižjih stroških.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <a id="kontakt" className="in-page-link"></a>
            <section className="switchable imagebg" data-overlay="9">
                <div className="background-image-holder"> <img alt="background" src="img/agency-1.jpg"/> </div>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-5">
                            <p className="lead"> E-naslov: <a href="mailto:info@finster.si">info@finster.si</a><br/> P: +386 30 604 077</p>
                            <p className="lead"><b>Finster d.o.o</b><br/>Ulica Lackove čete 9,&nbsp;2250 Ptuj<br/>Matična številka: 8625913000<br/></p>
                        </div>
                        <div className="col-md-6 col-12">
                            <form className="form-email row mx-0" data-success="Thanks for your enquiry, we'll be in touch shortly." data-error="Please fill in all fields correctly.">
                                <div className="col-md-6 col-12"> <label>Vaše ime:</label> <input type="text" name="name" className="validate-required"/> </div>
                                <div className="col-md-6 col-12"> <label>Vaš e-mail naslov:</label> <input type="email" name="email" className="validate-required validate-email"/> </div>
                                <div className="col-md-12 col-12"> <label>Sporočilo:</label> <textarea rows="4" name="Message" className="validate-required"></textarea> </div>
                                <div className="col-md-5 col-lg-4 col-6"> <button type="submit" className="btn btn--primary type--uppercase">POŠLJI</button> </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        

        </div>
    )
}

export default LandingPage;