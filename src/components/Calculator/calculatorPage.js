import React from 'react'
import { 
  Navbar, Container, Row, Col, Image} 
from 'react-bootstrap'


// custom compnents
// import CreditFormStepper from './CreditFormStepper';
import FormBasic from './FormBasic'
import FormResults from './FormResults'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

// import configs
import bankSkills from './utils/bankSkills.yml'


// images
import finsterLight from '../../resources/img/finster-light-new.svg';


class CalculatorPage extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      formValues: {
        'creditType': null,
        'creditPurpose': null,
        'creditAmount': null,
        'creditTime': null,
        'creditAffiliation': true,
        'activeBanks': null,
        'creditInsurance': null,
      },
      offerResults: [],
      creditFormHidden: false,
      compareFixedInterestRate: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.getAvailableBankSkills = this.getAvailableBankSkills.bind(this)
    this.handleFinishClick = this.handleFinishClick.bind(this)
    this.showForm = this.showForm.bind(this)
    this.backToStart = this.backToStart.bind(this)

    // this.getUrl = this.getUrl.bind(this)

  }

  componentDidMount() {
    // this.setActiveBanks(this.state.formValues['creditType']);
    // console.log(urlConfigYaml);
  }

  /** 
  * Set state with active banks 
  * @param{String} creditType  type of credit
  */
  setActiveBanks(creditType){
    let activeBanks = null;
    let newFormValues = this.state.formValues;

    // set active banks either from a single string or array
    if (Array.isArray(creditType)){
      let activeBanksAll = creditType.map((creditType) => {
        return bankSkills[creditType];
      });

      activeBanks = Array.from(new Set(activeBanksAll.flat()));

    } else {
      
      activeBanks = bankSkills[creditType]
    
    }
    newFormValues['activeBanks'] = activeBanks;
    this.setState({formValues: newFormValues});
  }

  /** 
  * Get available bank skills
  * @return {Array} skillsList  list of skills
  */
  getAvailableBankSkills(){
    let skillsList = []
    for (const [key, value] of Object.entries(bankSkills)) {
      if (value.length) {
        skillsList.push(key);
      }
    }
    return skillsList;
  }
  
  /** 
  * Handle calculator finish click
  */
  handleFinishClick() {
    this.toggleFormVisibility();
  }

  /** 
  * Show creditform stepper
  */
  showForm(){
    this.setState({ creditFormHidden: false });
  }

  /** 
  * Toggle visibility of creditform stepper
  */
  toggleFormVisibility(){
    let formState = this.state.creditFormHidden;
    let newFormState = ( formState ? false : true )
    this.setState({ creditFormHidden: newFormState });
  }

  // TODO: refractor
  setCreditAmount = (value) => {
    let formValues = this.state.formValues;
    formValues["creditAmount"] = value;
    this.setState({formValues});
  }
  
  setCreditTime = (value) => {
    let formValues = this.state.formValues;
    formValues["creditTime"] = value;
    
  }

  setCreditType = (value) => {
    let formValues = this.state.formValues;
    let mapper = {
      "nakup-stanovanja": ["stanovanjski"],
      "adaptacija-stanovanja": ["stanovanjski"],
      "nakup-avtomobila": ["hitri", "potrošniški", "gotovinski", "osebni"],
      "potovanja-poroka": ["hitri", "potrošniški", "gotovinski", "osebni"],
      "drugo": ["hitri", "potrošniški", "gotovinski", "študentski", "osebni"]
    }

    let newValue = mapper[value];
    
    formValues["creditType"] = newValue;
    formValues["creditPurpose"] = value;
    
    this.setState({formValues});
    this.setActiveBanks(newValue);

  }
  /**
   * Reset the form back to beginning
   */
  backToStart(){
    // empty results
    this.setState({offerResults: []});
    // make stepper visible again
    this.toggleFormVisibility();
  }
  
  /**
   * handle change in form stepper
   * @param {*} event 
   * @param {*} elem 
   * @param {*} value 
   */
  handleChange(event, elem, value){

    console.log(event);
    console.log(event.target);
    console.log(elem);
    console.log(value);

    let formValues = this.state.formValues;

    var newValue;
    var name;

    // console.log("event", event);
    // console.log("element", elem);
    // console.log("value", value);
    // console.log("event target", event.target);
  
    // select and assign active banks to state when changing creditType
    if (event.target.name === 'creditType') {
      
      this.setCreditType(event.target.value);
    } 
    
    
  }

  render() {

    var availableBankSkills = this.getAvailableBankSkills();
    

    return (
      // LOGO
      <div>
      <Container fluid>

              <div>
              <Row>
              <Navbar className="shadow-sm bg-white">

                <Col xs={6} sm={4} md={3} lg={2}>
                    <Navbar.Brand href="/izracun-kredita">
                        <Image 
                            src={finsterLight}
                            alt="Finster Logo"
                            fluid
                        />
                    </Navbar.Brand>
                </Col>
              </Navbar>
              </Row>
              
              
              <Row className="bg-dark text-white">
              <Navbar>
                <Col className="py-2 pl-4">
                  <h5 className="my-auto">Brskalnik kreditov
                  {!this.state.creditFormHidden ?  null : (
                  <div className="d-inline">
                    <ChevronRightIcon/> Rezultati
                  </div>
                  )}
                  </h5>
                </Col>
              </Navbar>
              </Row>
              </div>
            
       
        
      </Container>
      
              
      {/* DISPLAY FORM IF WE ARE NOT DISPLAYING RESULTS */}
      { !this.state.creditFormHidden ? (
      <Container>
      
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8}>

          {/* <CreditFormStepper 
            creditType={this.state.formValues['creditType']}
            creditAmount={this.state.formValues['creditAmount']}
            creditTime={this.state.formValues['creditTime']}
            creditAffiliation={this.state.formValues['creditAffiliation']}
            creditInsurance={this.state.formValues['creditInsurance']}
            handleChange={this.handleChange} 
            handleFinishClick={this.handleFinishClick}
            availableBankSkills={availableBankSkills}
            activeBanks={this.state.formValues['activeBanks']}
            setCreditAmount={this.setCreditAmount}
            setCreditTime={this.setCreditTime}
            />  */}

            <FormBasic
            creditType={this.state.formValues['creditType']}
            creditAmount={this.state.formValues['creditAmount']}
            creditTime={this.state.formValues['creditTime']}
            creditAffiliation={this.state.formValues['creditAffiliation']}
            creditInsurance={this.state.formValues['creditInsurance']}
            handleChange={this.handleChange} 
            handleFinishClick={this.handleFinishClick}
            availableBankSkills={availableBankSkills}
            activeBanks={this.state.formValues['activeBanks']}
            setCreditAmount={this.setCreditAmount}
            setCreditTime={this.setCreditTime}
            setCreditType={this.setCreditType} />
        </Col>
      </Row>
      </Container>
        
      ) : (

            <FormResults 
            backToStart={this.backToStart}
            activeBanks={this.state.formValues['activeBanks']}
            getUrl={this.getUrl}
            creditType={this.state.formValues['creditType']}
            creditAmount={this.state.formValues['creditAmount']}
            creditTime={this.state.formValues['creditTime']}
            creditAffiliation={this.state.formValues['creditAffiliation']}
            creditInsurance={this.state.formValues['creditInsurance']}
            handleChange={this.handleChange} 
            handleFinishClick={this.handleFinishClick}
            availableBankSkills={availableBankSkills}
            activeBanks={this.state.formValues['activeBanks']}
            creditPurpose={this.state.formValues['creditPurpose']}
            />
      )}
    
    </div>
      
    );
  }
}

export default CalculatorPage;



