import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';


class OfferRow extends Component {

    imgMapper = {
        "skb": "skb-logo-otp.png",
        "sberbank": "sberbank-logo-png-2.png"
    }

    render() {
        return(
            <Grid container>
                <Grid item xs={12}>
                <img 
                src={process.env.PUBLIC_URL + '/' + this.imgMapper[this.props.bankName]} 
                alt={this.props.bankName}
                style={{"height": "2.5rem", "margin": "2rem 0rem 0.5rem 0"}} /> 
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Mesečna anuiteta (€)</TableCell>
                            <TableCell align="right">Letna obrestna mera</TableCell>
                            <TableCell align="right">Skupni stroški kredita (€)</TableCell>
                            <TableCell align="right">Efektivna obrestna mera</TableCell>
                            <TableCell align="right">Skupni znesek kredita (€)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        
                            <TableRow key={this.props["bankName"]}>
                            <TableCell align="right">{this.props["monthlyAnnuity"]}</TableCell>
                            <TableCell align="right">{this.props["annualInterestRate"]}</TableCell>
                            <TableCell align="right">{this.props["totalLoanCost"]}</TableCell>
                            <TableCell align="right">{this.props["effectiveInterestRate"]}</TableCell>
                            <TableCell align="right">{this.props["totalAmountPaid"]}</TableCell>
                            </TableRow>
                        
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        );
    }
}
      
export default OfferRow;