
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';


import { 
   Container, Row, Col, Button } 
  from 'react-bootstrap';


// import CreditType from './CreditType';
// import CreditAmount from './CreditAmount';
// import CreditInsurance from './CreditInsurance';
// import CreditTime from './CreditTime';

import SideConfigNew from './SideConfigNew';

const useStyles = makeStyles({
  paperAnchorRight: {
    backgroundColor: 'white',
  },
});


export default function RightDrawer(props) {
  
    const handleSubmit = (event) => {
        props.toggleDrawer(event);
        // props.gatherCalculations(props.activeBanks, props.creditAmount, props.creditType, props.creditTime, props.creditInsurance);
    }

  return (
    <div>
        <React.Fragment>
          <Drawer anchor={'right'} open={props.state} onClose={props.toggleDrawer}>
            
            <Container>
              
              <SideConfigNew 
                handleComparisonChange={props.handleComparisonChange}
                handleSortByChange={props.handleSortByChange}
                compareFixedInterestRate={props.compareFixedInterestRate}
                sortBy={props.sortBy}
                backToStart={props.backToStart}
                />
              <Row className="my-3 justify-content-center">
                <Col>
                  <Button variant="primary" onClick={handleSubmit} block>Potrdi</Button>
                </Col>
              </Row>
            </Container>
          </Drawer>
        </React.Fragment>
    </div>
  );
};
