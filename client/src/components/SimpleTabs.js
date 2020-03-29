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

  return (
      
      <div>
      <div className="container">
        <div className="row justify-content-center pb-5">
            <Tabs 
            value={value} 
            indicatorColor="primary"
            onChange={handleChange} 
            aria-label="simple tabs example" 
            centered>
            <Tab label="Kreditojemalci" icon={<EmojiPeopleIcon />} {...a11yProps(0)} />
            <Tab label="Kreditodajalci"  icon={<AccountBalanceIcon/>} {...a11yProps(1)} />
          </Tabs>
         
        </div>

      </div>
      

      {/* KREDITOJEMALCI */}
      <TabPanel value={value} index={0}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-4 mb-4">
                <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Clock-Back icon--lg"></i>
                    <Typography variant="h5">Postopki so dolgotrajni</Typography>
                    <Box pt="2em"/>
                    <Typography variant="p">Od začetka povpraševanja do črpanja kredita mine v povprečju 59 dni. Povpraševalec po kreditu mora spletne informativne izračune primerjati ročno in za pridobitev individualnih ponudb fizično obiskati vsako izmed bank. Po izbiri ponudbe mora ponovno obiskati banko za podpis pogodbe in ureditev ostale dokumentacije.</Typography>
                </div>
            </div>
            <div className="col-sm-12 col-lg-4 mb-4">
                <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Arrow-Squiggly icon--lg"></i>
                    <Typography variant="h5">Postopki so nepregledni</Typography>
                    <Box pt="2em"/>
                    <Typography variant="p">Ob povpraševanju pri različnih bankah se uporabnik sooča z neskladnimi postopki. Banke lahko za izračun kreditne sposobnosti, določitev pogojev ter posledično podajo individualne ponudbe zahtevajo različne podatke in dokumentacijo. Vse navedeno oteži pridobitev kredita, ki uporabniku najbolj ustreza.</Typography>
                </div>
            </div>
            <div className="col-sm-12 col-lg-4 mb-4">
                <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Coins icon--lg"></i>
                    <Typography variant="h5">Oportunistični stroški</Typography>
                    <Box pt="2em"/>
                    <Typography variant="p">Ponudbe bank se lahko razlikujejo glede na njihovo vsakokratno politiko kreditiranja in morebitne akcije. Ravno tako lahko ponudbe vsebujejo različne dodatne stroške, ki znatno vplivajo na končni strošek kredita. Po naših izračunih se lahko že pri kreditih z nižjim zneskom informativni izračuni razlikujejo za 5%. Razlike pri višjih zneskih in individualnih ponudbah so pa praviome še večje.</Typography>
                </div>
            </div>
          </div>
        </div>
        <div className="bg--primary py-5">
          <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-8">
                {/* <CardMedia component="video" height="140" image="https://vimeo.com/401596300" /> */}
                
                  <div class="embed-responsive embed-responsive-16by9">
                    
                    <iframe src="https://player.vimeo.com/video/401596116" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                    
                  </div>
          
                </div>  
            </div>
          </div>
        </div>
        
      </TabPanel>

      {/* KREDITODAJALCI */}
      <TabPanel value={value} index={1}>
        <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-4 mb-4">
                <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Add-UserStar icon--lg"></i>
                    <Typography variant="h5">Nedostopnost celotnega potencialnega trga</Typography>
                    <Box pt="2em"/>
                    <Typography variant="p">Banke s kreditnimi produkti praviloma in pretežno dosegajo zgolj trg lastnih komitentov. Sodeč po raziskavi trga, ki smo jo izvedli, kar 70% uporabnikov ne pridobiva ponudb bank, pri katerih niso komitenti. Banka tako tudi s konkurenčno ali kvalitetnejšo ponudbo ne more doseči celotnega trga.</Typography>
                </div>
            </div>
            <div className="col-sm-12 col-lg-4 mb-4">
                <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Euro icon--lg"></i>
                    <Typography variant="h5">Neefektivno oglaševanje</Typography>
                    <Box pt="2em"/>
                    <Typography variant="p">Oglaševanje v pretežni meri ne naslavlja oseb, ki so v aktivni fazi iskanja produkta, ki ga kreditodajalec ponuja. Veliko sredstev je namenjenih splošnemu naslavljanju celotne populacije (reklamni panoji, plakati, tv in radio oglasi), kar rezultira v visokih stroških in nizki konverziji. </Typography>
                </div>
            </div>
            <div className="col-sm-12 col-lg-4 mb-4">
                <div className="feature feature-3 boxed boxed--lg boxed--border"> <i className="icon icon-Info-Window icon--lg"></i>
                    <Typography variant="h5">Obremenjenost analognih procesov in virov</Typography>
                    <Box pt="2em"/>
                    <Typography variant="p">Kreditodajalci s svojimi zalednimi postopki in orodji ne dohajajo izrazitih trendov digitalnega razvoja, kot je to značilno za fintech področje. Digitalizacija je ključnega pomena za nadaljnji razvoj, konkuriranje na trgu ter razbremenitev procesov in virov. Posledično se lahko znižajo tudi stroški in poviša marža.</Typography>
                </div>
            </div>
          </div>
        </div>
        <div className="bg--primary py-5">
          <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-8">
                {/* <CardMedia component="video" height="140" image="https://vimeo.com/401596300" /> */}
                
                  <div class="embed-responsive embed-responsive-16by9">
                    
                    <iframe src="https://player.vimeo.com/video/401596300" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                    
                  </div>
          
                </div>  
            </div>
          </div>
        </div>
      </TabPanel>
      </div>
  );
}
