import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SberPromo from '../resources/sberbank_promo.jpg';
import SkbPromo from '../resources/skb_promo.jpg';


class BankCarousel extends Component{

    componentDidMount() {
        console.log("items:", this.imageList)
      }

    renderItem(item){
        return <img key={item} src={item['imageLocation']} alt={item['altName']}/>
    }

    items = [
        {
            altName: "Sberbank Promo",
            imageLocation: SberPromo
        },
        {
            altName: "Skb Promo",
            imageLocation: SkbPromo
        }
    ]

    render() {

        let imageList = this.items.map( (item) => {
            return this.renderItem(item)
        });
        return (
            <div>
                <Grid item xs={12}>
                    <Typography variant="h4"><strong>Akcije bank</strong></Typography>
                </Grid>

                <Box pt={"1em"}/>
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