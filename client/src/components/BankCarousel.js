import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SberbankLogo from '../resources/sberbank-logo-png-2.png';
import SkbLogo from '../resources/skb-logo-otp.png';


class BankCarousel extends Component{

    componentDidMount() {
        console.log("items:", this.imageList)
      }

    renderItem(item){
        return <img key={item} src={item['imageLocation']} alt={item['altName']}
        style={{"height": "2.5em"}}/>
    }

    items = [
        {
            altName: "Sberbank",
            imageLocation: SberbankLogo
        },
        {
            altName: "SKB",
            imageLocation: SkbLogo
        }
    ]

    render() {

        let imageList = this.items.map( (item) => {
            return this.renderItem(item)
        });
        console.log("HELLO THERE")
        return (
            <div>
                <Grid item justify="center" xs={12}>
                    <span style={{"text-align": "center", "font-size": "1.3em", "display": "block"}}><strong>Sodelujemo z bankami</strong></span>
                </Grid>
            
                <Grid item justify="center" xs={12}>
                <Box pt={"2em"}>
                    <Carousel 
                    className="myCarouselItem"
                    animation="fade">
                        {imageList} 
                    </Carousel>
                </Box>
                </Grid>
            </div>
        )
    }
}

export default BankCarousel;