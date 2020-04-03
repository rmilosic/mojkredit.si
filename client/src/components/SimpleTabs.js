import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// icons
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
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

  
  const tabMapper = {
    "Uporabniki": [
      {
        "title": "Postopki so dolgotrajni",
        "content": "Od začetka povpraševanja do črpanja kredita mine v povprečju 59 dni. Povpraševalec po kreditu mora spletne informativne izračune primerjati ročno in za pridobitev individualnih ponudb fizično obiskati vsako izmed bank. Po izbiri ponudbe mora ponovno obiskati banko za podpis pogodbe in ureditev ostale dokumentacije."
      },
      {
        "title": "Postopki so nepregledni",
        "content": "Ob povpraševanju pri različnih bankah se uporabnik sooča z neskladnimi postopki. Banke lahko za izračun kreditne sposobnosti, določitev pogojev ter posledično podajo individualne ponudbe zahtevajo različne podatke in dokumentacijo. Vse navedeno oteži pridobitev kredita, ki uporabniku najbolj ustreza."
      },
      {
        "title": "Oportunistični stroški",
        "content": "Ponudbe bank se lahko razlikujejo glede na njihovo vsakokratno politiko kreditiranja in morebitne akcije. Ravno tako lahko ponudbe vsebujejo različne dodatne stroške, ki znatno vplivajo na končni strošek kredita. Po naših izračunih se lahko že pri kreditih z nižjim zneskom informativni izračuni razlikujejo za 5%. Razlike pri višjih zneskih in individualnih ponudbah so pa praviome še večje."
      }
    ],
    "Banke": [
      {
        "title": "Nedostopnost celotnega potencialnega trga",
        "content": "Banke s kreditnimi produkti praviloma in pretežno dosegajo zgolj trg lastnih komitentov. Sodeč po raziskavi trga, ki smo jo izvedli, kar 70% uporabnikov ne pridobiva ponudb bank, pri katerih niso komitenti. Banka tako tudi s konkurenčno ali kvalitetnejšo ponudbo ne more doseči celotnega trga."
      },
      {
        "title": "Neefektivno oglaševanje",
        "content": "Oglaševanje v pretežni meri ne naslavlja oseb, ki so v aktivni fazi iskanja produkta, ki ga kreditodajalec ponuja. Veliko sredstev je namenjenih splošnemu naslavljanju celotne populacije (reklamni panoji, plakati, tv in radio oglasi), kar rezultira v visokih stroških in nizki konverziji."
      },
      {
        "title": "Obremenjenost analognih procesov in virov",
        "content": "Kreditodajalci s svojimi zalednimi postopki in orodji ne dohajajo izrazitih trendov digitalnega razvoja, kot je to značilno za fintech področje. Digitalizacija je ključnega pomena za nadaljnji razvoj, konkuriranje na trgu ter razbremenitev procesov in virov. Posledično se lahko znižajo tudi stroški in poviša marža."
      }
    ]
  };

  function renderTabs (type) {
    
    var elements = tabMapper[type];
    
    var components = elements.map(function(el) {
     return(
          // <Box mb={2}>
            <Col xs={12} lg={4}>
              <Card style={{backgroundColor: '#fffff'}}>
                <Container fluid>
                  <Row>
                    <Col>
                      <Box p={2}>
                        <Typography variant="h5">{el.title}</Typography>
                      </Box>
                      <Typography variant="p">{el["content"]}</Typography>
                    </Col>
                  </Row>
                </Container>
              </Card>
            </Col>
          // </ Box>
        )
      })
      return components;
    }

  return (
      
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12}>
            <Tabs 
              value={value} 
              indicatorColor="primary"
              onChange={handleChange} 
              aria-label="simple tabs example" 
                centered>
                <Tab label="Uporabniki" icon={<EmojiPeopleIcon />} {...a11yProps(0)} />
                <Tab label="Banke"  icon={<AccountBalanceIcon/>} {...a11yProps(1)} />
            </Tabs>
          </Col>
        </Row>
      </Container>

      <Container>

        <Box pt={10}/>
        <Row>
          <Col>
            <TabPanel value={value} index={0}>
              <Row className="justify-content-lg-center">
                {renderTabs("Uporabniki")}
              </Row>
            </TabPanel>
          </Col>
        </Row>
        

        <Row>
          <Col>
            <TabPanel value={value} index={1}>
              <Row className="justify-content-lg-center">
                {renderTabs("Banke")}
              </Row>
            </TabPanel>
          </Col>
        </Row>

      </Container>

      </div>
  );
}
