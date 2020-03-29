import React  from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography, Box, Button} from '@material-ui/core';

// import components
import SimpleTabs from '../components/SimpleTabs';
import SimpleMenu from '../components/SimpleMenu';
// import images
import finsterLight from '../resources/img/finster.svg';
import finsterDark from '../resources/img/finster-dark.svg';
import timelinePNG from '../resources/img/timeline-lp.png';
import langingPageGraphic from '../resources/img/landing-graphic-2.svg';




function LandingPage() {
    return (
        <div>
        {/* NAVIGATION COMPONENT  -- MOBILE*/} 

        
        <div className="nav-container">
            <div className="bar bar--sm d-lg-none">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <a href="/"> 
                                <img className="logo logo-dark" alt="logo" src={finsterDark}/> 
                                {/* <img className="logo logo-light" alt="logo" src={finsterLight}/>  */}
                            </a>
                        </div>
                        <div className="col-10 text-right">
                            {/* <div className="dropdown"> */}
                            <SimpleMenu/>
                            {/*  */}
                        </div>
                    </div>
                </div>                        
            </div>
        </div>
            

        <nav id="menu1" className="bar bar-1 d-none d-lg-block bar--absolute bar--transparent">
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
                                <li> <a href="#o-nas">O NAS</a> </li>
                                <li> <a href="#opis-resitev">OPIS REŠITEV</a> </li>
                            </ul>
                        </div>
                        <div className="bar__module">
                            <a className="btn btn--sm type--uppercase" href="#kontakt"> <span className="btn__text">KONTAKT</span> </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        {/* MAIN COMPONENT */}
        <div className="main-container">
            
            <section className="switchable bg--primary">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-12  col-md-5">
                            <div className="mt--3">
                                {/* MAIN MESSAGE */}
                                <h1 className="text-center">Razvijamo rešitve za optimizacijo procesov izdaje in pridobitve kreditov.</h1>
                               
                            </div> 

                        <div className="col-sm-12 justify-content-center text-center">
                            <a href="#o-nas" class="data-scroll"><ExpandMoreIcon fontSize="large" style={{fontSize: 7 + 'em'}}/></a>                            
                        </div>
                            
                        </div>
                        <div className="col-md-7 col-12 text-center"> 
                            <img alt="Finster idea" style={{height: 40 + 'em'}} src={langingPageGraphic}/> 
                        </div>
                    </div>
                </div>
            </section>
          
            <section id="o-nas" className="text-center bg--secondary space--sm">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8">
                            <Typography variant="h3">Finster je</Typography>
                        </div>
                    </div>
                   
                    <div className="row my--2">
                        <div className="col-md-10 col-lg-8">
                            <p>
                            <Typography variant="subtitle1"><i>disruptivna lendtech rešitev, ki s pomočjo standardiziranih rešitev za digitalizacijo kreditnega procesa in agregacijo ponudbe in povpraševanja na trgu kreditov, optimizira ter izboljša poslovanje obeh vpletenih strank - kreditodajalcev in kreditojemalcev.</i></Typography>
                            </p>
                        </div>
                    </div>
                    
                </div>
            </section>
            

            {/* TABS */}
            <div id="opis-resitev" className="text-center">
            
                <SimpleTabs/>
               
            </div>
             
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
                            <a href="/izracun-kredita"><Button variant="contained" color="secondary">Ogled zbirnika</Button></a>
                        </div>

                        
                    </div>
                        
                    <div className="row">
                        <div className="col-md-12">
                            <img alt="timeline" src={timelinePNG}/>
                        </div>
                    </div>
                </div>
            </section>
            <section id="kontakt" className="switchable imagebg" data-overlay="9">
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