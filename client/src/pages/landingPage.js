import React  from 'react';

// import images
import finsterLight from '../resources/img/finster.svg';
import finsterDark from '../resources/img/finster-dark.svg';
import timelinePNG from '../resources/img/timeline-lp.png';

import langingPageGraphic from '../resources/img/landing-graphic-2.svg';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography, Box, Button, Link } from '@material-ui/core';


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
                                    <img className="logo logo-dark" alt="logo" src={finsterDark}/> 
                                    {/* <img className="logo logo-light" alt="logo" src={finsterLight}/>  */}
                                </a>
                            </div>
                            <div className="col-9 col-md-10 text-right">
                                <a href="#userstitle" className="hamburger-toggle" data-toggle-className="#menu1;hidden-xs hidden-sm"> 
                                <i className="icon icon--sm stack-interface stack-menu"></i> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <nav id="menu1" className="bar bar-1 hidden-xs bar--absolute bar--transparent">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1 col-md-2 ">
                                <div className="bar__module">
                                    <a href="#"> 
                                        <img className="logo logo-light" alt="logo" src={finsterLight}/> 
                                        {/* <img className="logo logo-light" alt="logo" src={finsterLight}/>  */}
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-11 col-md-12 text-right text-left-xs text-left-sm">
                                <div className="bar__module">
                                    <ul className="menu-horizontal text-left">
                                        <li> <a href="#opis-resitve">O NAS</a> </li>
                                        <li> <a href="#za-banke">OPIS REŠITEV</a> </li>
                                    </ul>
                                </div>
                                <div className="bar__module">
                                    <a className="btn btn--sm type--uppercase" href="#kontakt"> <span className="btn__text">KONTAKT</span> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            
        </div>

        {/* MAIN COMPONENT */}
        <div className="main-container">
            <a id="cover" className="in-page-link"></a>
            <section className="switchable bg--primary">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5 col-md-7">
                            <div className="mt--3">
                                {/* MAIN MESSAGE */}
                                <h1>Razvijamo rešitve za optimizacijo procesov izdaje in pridobitve kreditov.</h1>
                                {/* <p className="lead"> Prihranite čas in primerjajte informativne ponudbe vseh bank na enem mestu</p> */}
                                
                                {/* CTA */}
                                {/* <a className="btn btn--primary type--uppercase" href="/izracun-kredita"> 
                                <span className="btn__text"> IZRAČUN KREDITA</span> </a>  */}
                                {/* <span className="block type--fine-print"><br/> </span>  */}
                            </div> 

                            <div className="row text-center">
                                <div className="col-sm-10 col-lg-10 justify-content-center">
                                    <span>
                                        <a href="#opis-resitve"><ExpandMoreIcon fontSize="large" style={{fontSize: 7 + 'em'}}/></a>
                                    </span> 
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-5 col-12"> <img alt="Finster idea" style={{height: 40 + 'em'}} src={langingPageGraphic}/> </div>
                    </div>
                </div>
            </section>
            <a id="opis-resitve" className="in-page-link"></a>
            <section className="text-center bg--secondary space--sm">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8">
                            <Typography variant="h3">Finster je</Typography>
                        </div>
                    </div>
                    <Box mt={"3em"}/>
                    <div className="row">
                        <div className="col-md-10 col-lg-8">
                            <p>
                            <Typography variant="subtitle1"><i>disruptivna lendtech rešitev, ki s pomočjo standardiziranih rešitev za digitalizacijo kreditnega procesa in agregacijo ponudbe in povpraševanja na trgu kreditov, optimizira ter izboljša poslovanje obeh vpletenih strank - kreditodajalcev in kreditojemalcev.</i></Typography>
                            </p>
                        </div>
                    </div>
                    
                </div>
            </section>
            {/* tabs */}
            <section class="text-center">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="tabs-container" data-content-align="left">
                                <ul class="tabs">
                                    {/* KREDITOJEMALCI */}
                                    <li class="active">
                                        <div class="tab__title text-center"> <i class="icon icon--sm block icon-Business-ManWoman"></i> <span class="h5">Kreditojemalci</span> </div>
                                        <div class="tab__content">
                                            
                                            <section className="text-center bg--secondary space--xxs">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Clock-Back icon--lg"></i>
                                                                <Typography variant="h5">Postopki so dolgotrajni</Typography>
                                                                <Box pt="2em"/>
                                                                <Typography variant="p">Od začetka povpraševanja do črpanja kredita mine v povprečju 59 dni. Povpraševalec po kreditu mora spletne informativne izračune primerjati ročno in za pridobitev individualnih ponudb fizično obiskati vsako izmed bank. Po izbiri ponudbe mora ponovno obiskati banko za podpis pogodbe in ureditev ostale dokumentacije.</Typography>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Arrow-Squiggly icon--lg"></i>
                                                                <Typography variant="h5">Postopki so nepregledni</Typography>
                                                                <Box pt="2em"/>
                                                                <Typography variant="p">Ob povpraševanju pri različnih bankah se uporabnik sooča z neskladnimi postopki. Banke lahko za izračun kreditne sposobnosti, določitev pogojev ter posledično podajo individualne ponudbe zahtevajo različne podatke in dokumentacijo. Vse navedeno oteži pridobitev kredita, ki uporabniku najbolj ustreza.</Typography>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Coins icon--lg"></i>
                                                                <Typography variant="h5">Oportunistični stroški</Typography>
                                                                <Box pt="2em"/>
                                                                <Typography variant="p">Ponudbe bank se lahko razlikujejo glede na njihovo vsakokratno politiko kreditiranja in morebitne akcije. Ravno tako lahko ponudbe vsebujejo različne dodatne stroške, ki znatno vplivajo na končni strošek kredita. Po naših izračunih se lahko že pri kreditih z nižjim zneskom informativni izračuni razlikujejo za 5%. Razlike pri višjih zneskih in individualnih ponudbah so pa praviome še večje.</Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </li>
                                    {/* KREDITODAJALCI */}
                                    <li>
                                        <div class="tab__title text-center"> <i class="icon icon--sm block icon-Bank"></i> <span class="h5">Kreditodajalci</span> </div>
                                        <div class="tab__content">
                                            <section className="text-center bg--secondary space--xxs">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Add-UserStar icon--lg"></i>
                                                                <Typography variant="h5">Nedostopnost celotnega potencialnega trga</Typography>
                                                                <Box pt="2em"/>
                                                                <Typography variant="p">Banke s kreditnimi produkti praviloma in pretežno dosegajo zgolj trg lastnih komitentov. Sodeč po raziskavi trga, ki smo jo izvedli, kar 70% uporabnikov ne pridobiva ponudb bank, pri katerih niso komitenti. Banka tako tudi s konkurenčno ali kvalitetnejšo ponudbo ne more doseči celotnega trga.</Typography>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Euro icon--lg"></i>
                                                                <Typography variant="h5">Neefektivno oglaševanje</Typography>
                                                                <Box pt="2em"/>
                                                                <Typography variant="p">Oglaševanje v pretežni meri ne naslavlja oseb, ki so v aktivni fazi iskanja produkta, ki ga kreditodajalec ponuja. Veliko sredstev je namenjenih splošnemu naslavljanju celotne populacije (reklamni panoji, plakati, tv in radio oglasi), kar rezultira v visokih stroških in nizki konverziji. </Typography>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Info-Window icon--lg"></i>
                                                                <Typography variant="h5">Obremenjenost analognih procesov in virov</Typography>
                                                                <Box pt="2em"/>
                                                                <Typography variant="p">Kreditodajalci s svojimi zalednimi postopki in orodji ne dohajajo izrazitih trendov digitalnega razvoja, kot je to značilno za fintech področje. Digitalizacija je ključnega pomena za nadaljnji razvoj, konkuriranje na trgu ter razbremenitev procesov in virov. Posledično se lahko znižajo tudi stroški in poviša marža.</Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* TIMELINE */}
            <section class="text-center bg--primary">
                <div class="container">
                    {/* kje smo */}
                    <div className="row">
                        <div className="col-md-12 mb--1">
                            <Typography variant="h3" color="white">Kje smo in kam gremo?</Typography>
                        </div>
                        <div className="col-md-12 mb--1">
                            <Typography variant="h5" color="white">Zbirnik informativnih izračunov je že v razvoju!</Typography>
                        </div>

                        <div className="col-md-12 mb--1">
                            <a href="/izracun-kreditov"><Button variant="contained" color="secondary">Ogled zbirnika</Button></a>
                        </div>

                        
                    </div>
                        
                    <div className="row">
                        <div className="col-md-12">
                            <img alt="timeline" src={timelinePNG}/>
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