import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

// icons
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import RestoreIcon from '@material-ui/icons/Restore';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import { Container, Card, Col, Row } from 'react-bootstrap';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));



export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const iconStyle = {
    margin: "0.5em",
    fontSize: "2.5em"
  }
  
  const tabMapper = {
    "Uporabniki": [
      {
        "title": "Postopki so dolgotrajni",
        "content": "Od začetka povpraševanja do črpanja kredita mine v povprečju 59 dni. Povpraševalec po kreditu mora spletne informativne izračune primerjati ročno in za pridobitev individualnih ponudb fizično obiskati vsako izmed bank. Po izbiri ponudbe mora ponovno obiskati banko za podpis pogodbe in ureditev ostale dokumentacije.",
        "icon": <RestoreIcon style={iconStyle}/>
      },
      {
        "title": "Postopki so nepregledni",
        "content": "Ob povpraševanju pri različnih bankah se uporabnik sooča z neskladnimi postopki. Banke lahko za izračun kreditne sposobnosti, določitev pogojev ter posledično podajo individualne ponudbe zahtevajo različne podatke in dokumentacijo. Vse navedeno oteži pridobitev kredita, ki uporabniku najbolj ustreza.",
        "icon": <SwapCallsIcon style={iconStyle}/>
      },
      {
        "title": "Oportunistični stroški",
        "content": "Ponudbe bank se lahko razlikujejo glede na njihovo vsakokratno politiko kreditiranja in morebitne akcije. Ravno tako lahko ponudbe vsebujejo različne dodatne stroške, ki znatno vplivajo na končni strošek kredita. Po naših izračunih se lahko že pri kreditih z nižjim zneskom informativni izračuni razlikujejo za 5%. Razlike pri višjih zneskih in individualnih ponudbah so pa praviome še večje.",
        "icon": <MoneyOffIcon style={iconStyle}/>
      }
    ],
    "Banke": [
      {
        "title": "Nedostopnost celotnega potencialnega trga",
        "content": "Banke s kreditnimi produkti praviloma in pretežno dosegajo zgolj trg lastnih komitentov. Sodeč po raziskavi trga, ki smo jo izvedli, kar 70% uporabnikov ne pridobiva ponudb bank, pri katerih niso komitenti. Banka tako tudi s konkurenčno ali kvalitetnejšo ponudbo ne more doseči celotnega trga.",
        "icon": <GroupAddIcon style={iconStyle}/>
      },
      {
        "title": "Neefektivno oglaševanje",
        "content": "Oglaševanje v pretežni meri ne naslavlja oseb, ki so v aktivni fazi iskanja produkta, ki ga kreditodajalec ponuja. Veliko sredstev je namenjenih splošnemu naslavljanju celotne populacije (reklamni panoji, plakati, tv in radio oglasi), kar rezultira v visokih stroških in nizki konverziji.",
        "icon": <WhatshotIcon style={iconStyle}/>
      },
      {
        "title": "Obremenjenost analognih procesov in virov",
        "content": "Kreditodajalci s svojimi zalednimi postopki in orodji ne dohajajo izrazitih trendov digitalnega razvoja, kot je to značilno za fintech področje. Digitalizacija je ključnega pomena za nadaljnji razvoj, konkuriranje na trgu ter razbremenitev procesov in virov. Posledično se lahko znižajo tudi stroški in poviša marža.",
        "icon": <TrendingUpIcon style={iconStyle}/>
      }
    ]
  };

  function renderTabs (type) {
    
    var elements = tabMapper[type];
    
    var components = elements.map(function(el, index) {
     return(
            <Col key={index} className="pb-2" xs={12} md={10} lg={4}>
              <Card style={{backgroundColor: '#fffff'}}>
                <Container fluid>
                  {/* ROW CARDS */}
                  <Row>
                    <Col>
                      <Box pt={2} pb={2}>
                        {el.icon}
                        <Box pt={2} pb={2}>
                          <h4><strong>{el.title}</strong></h4>
                        </Box>
                        <Box pt={2} pb={2}>
                          <p>{el["content"]}</p>
                        </Box>
                      </Box>
                    </Col>
                  </Row>
                  
                  
                </Container>
              </Card>
            </Col>
        )
      })
      return components;
    }

  return (
      
    <div>
      <Container>
        <Row className="justify-content-center mb-4">
          <Col>
            <h4>
              Prepoznali smo naslednje izzive
            </h4>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} className="text-white">
            <Tabs 
              value={value} 
              indicatorColor="primary"
              onChange={handleChange} 
              textColor="inherit"
              aria-label="simple tabs example" 
                centered>
                <Tab className="bg-dark" label="Uporabniki" icon={<EmojiPeopleIcon />} {...a11yProps(0)} />
                <Tab className="bg-dark" label="Banke"  icon={<AccountBalanceIcon/>} {...a11yProps(1)} />
            </Tabs>
          </Col>
        </Row>
      </Container>

      <Container>

        <Box pt={10}/>
        <Row>
          <Col>
            <TabPanel value={value} index={0}>
            <Row className="justify-content-center">
              
                
                  {renderTabs("Uporabniki")}
            </Row>
            </TabPanel>
            
            <TabPanel value={value} index={1}>
              <Row className="justify-content-center">
              
              
                {renderTabs("Banke")}
              </Row>
            </TabPanel>
            

          </Col>
        </Row>

        <Row className="justify-content-center my-4">
          <Col>
            <h4>
              Katere rešitve razvijamo...
            </h4>
          </Col>
        </Row>

      </Container>

      
      
        <Container className="bg-dark"  fluid>
          <Row className="justify-content-center mt-4 p-4" >
            <Container>
              <Col>
                  <TabPanel value={value} index={0}>
                    <ResponsiveEmbed aspectRatio="16by9">
                      <iframe width="auto" height="400px" src="https://www.youtube.com/embed/FncROQV2f2c" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </ResponsiveEmbed>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <ResponsiveEmbed aspectRatio="16by9">
                      <iframe width="auto" height="400px" src="https://www.youtube.com/embed/qCdg4ZbU-8c" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </ResponsiveEmbed>
                  </TabPanel>
              </Col>
            </Container>
          </Row>

      </Container>

      </div>
  );
}
