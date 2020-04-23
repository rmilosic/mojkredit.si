import React from 'react';
import { 
    Row, Col, Image, Button } 
  from 'react-bootstrap';
  import Tooltip from '@material-ui/core/Tooltip';

// images
import SkbLogo from '../../resources/img/skb-logo-otp.png';
import SberbankLogo from '../../resources/img/sberbank-logo-png-2.png';
import SparkasseLogo from '../../resources/img/sparkasse-logo.png';
import UnicreditLogo from '../../resources/img/unicredit-logo.jpg';
import GorenjskaLogo from '../../resources/img/gorenjska-logo.jpg';
import AbankaLogo from '../../resources/img/abanka-logo.png';
import NLBLogo from '../../resources/img/nlb-logo.png';


//  config
import translations from './utils/translations.yml';

// icons
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function OfferRowPanel(props) {
    
    const imgMapper = {
        "skb": SkbLogo,
        "sberbank": SberbankLogo,
        "sparkasse": SparkasseLogo,
        "unicredit": UnicreditLogo,
        "gorenjska": GorenjskaLogo,
        "abanka": AbankaLogo,
        "nlb": NLBLogo  
    };

        
    return(
            
            <div className="bg-white shadow-sm rounded my-4 p-4">
            
                
                {/* logo & title */}
                <Row className="pt-3">
                    <Col xs={6} md={4}>
                        <Image className="d-block"
                            src={imgMapper[props.bankName]}
                            alt={props.bankName}
                            fluid
                            /> 
                    </Col>
                    <Col><small>{props["offerTitle"]}</small></Col>

                </Row>
                {/* Credit tags */}
                <Row className="py-2">
                    
                        { (props["creditInsurance"] != "null") ? (
                        <Col xs={6} lg={4}>
                            <Tooltip title={`Potrebno je ${translations[props["creditInsurance"]]}`} arrow>
                                <Button className="btn-small btn-outline-secondary" variant="outlined">{translations[props["creditInsurance"]]}</Button>
                            </Tooltip>
                            
                        </Col>
                        ) : null
                        }
                        { (props["cooperation"] == "true") ? (
                        <Col xs={6}>
                            <Tooltip title="Potrebno je sodelovanje z banko" arrow>
                                <Button className="btn-small btn-outline-secondary" variant="outlined">S sodelovanjem</Button>
                            </Tooltip>
                        </Col>
                        ) : null
                        }
                            
                </Row>

                {/* Details */}
                <Row>
                    {/* numbers */}
                    <Col xs={12} md={9}>
                        <Row>
                            {/* skupni znesek */}
                            <Col  xs={6} md={3}>
                                    
                                    <span className="d-block text-success text-center"><strong>{props["totalAmountPaid"]} €</strong></span>
                                    <span className="d-block text-center"><small>Skupni znesek</small></span>
                                
                            </Col>
                            <Col xs={6} md={3}>
                                <p>
                                    <span className="d-block text-center"><strong>{props["monthlyAnnuity"]} €</strong></span>
                                    <span className="d-block text-center"><small>Mesečna anuiteta</small></span>
                                </p>
                            </Col>
                            <Col xs={6} md={3}>
                                <p>
                                    <span className="d-block text-center"><strong>{props["effectiveInterestRate"]} %</strong></span>
                                    <span className="d-block text-center"><small>Efektivna obrestna mera</small></span>
                                </p>
                            </Col>
                            <Col xs={6} md={3}>
                                <p>
                                    
                                    <span className="d-block text-center"><strong>{props["totalLoanCost"]} €</strong></span>    
                                    <span className="d-block text-center"><small>Skupni stroški</small></span>
                                </p>
                            </Col>
                        </Row>
                    </Col>

                    {/* Buttons */}
                    <Col xs={12} md={3}>
                        <Row>
                            <Col xs={6} md={12}>
                                <Button className="text-white mb-2" variant="secondary" block><strong>Pridobi ponudbo</strong></Button>
                            </Col>
                            {/* <Col xs={6} md={12}>
                                <Button variant="outline-light" block>Več info</Button> 
                            </Col> */}

                            
                        
                            
                        </Row>
                                
                       
                    </Col>
                </Row>
                
                
                
            </div>
    
    )
    
}
