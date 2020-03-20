import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Grid, Typography } from '@material-ui/core';
import SkbLogo from '../resources/img/skb-logo-otp.png';
import SberbankLogo from '../resources/img/sberbank-logo-png-2.png';
import SparkasseLogo from '../resources/img/sparkasse-logo.png';
import UnicreditLogo from '../resources/img/unicredit-logo.jpg';


class OfferRowPanel extends Component {
    imgMapper = {
        "skb": SkbLogo,
        "sberbank": SberbankLogo,
        "sparkasse": SparkasseLogo,
        "unicredit": UnicreditLogo
    };

    render() {
        
        return(
                
                <div>
                <img 
                src={this.imgMapper[this.props.bankName]}
                alt={this.props.bankName}
                style={{"height": "2.5rem", "margin": "2rem 0rem 0.5rem 0"}} /> 

                <ExpansionPanel bgcolor="primary">
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Skupni znesek kredita: <strong>{this.props["totalAmountPaid"]} €</strong></Typography>

                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Grid container>
                        <Grid item xs={12}><Typography>Mesečna anuiteta: <strong>{this.props["monthlyAnnuity"]} €</strong></Typography></Grid>
                        <Grid item xs={12}><Typography>Letna obrestna mera: <strong>{this.props["annualInterestRate"]} %</strong></Typography></Grid>
                        <Grid item xs={12}><Typography>Efektivna obrestna mera: <strong>{this.props["effectiveInterestRate"]} %</strong></Typography></Grid>
                        <Grid item xs={12}><Typography>Skupni stroški kredita: <strong>{this.props["totalLoanCost"]} €</strong></Typography></Grid>
                        
                        </Grid>
                         {/* <p>Letna obrestna mera: {this.props["annualInterestRate"]}</p>
                        <p>Efektivna obrestna mera: {this.props["effectiveInterestRate"]}</p>
                         <p>Skupni stroški kreditaanuiteta: {this.props["totalLoanCost"]}</p>*/}
                       
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                </div>
      
        );
    }
}

export default OfferRowPanel;