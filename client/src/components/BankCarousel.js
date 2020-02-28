import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel'

class BankCarousel extends Component{

    componentDidMount() {
        console.log("items:", this.imageList)
      }

    renderItem(item){
        return <img key={item} src={item['imageLocation']} alt={item['altName']}
        style={{"height": "4em"}}/>
    }

    items = [
        {
            altName: "Sberbank",
            imageLocation: "./sberbank-logo-png-2.png"
        },
        {
            altName: "SKB",
            imageLocation: "./skb-logo-otp.png"
        }
    ]

    render() {

        let imageList = this.items.map( (item) => {
            return this.renderItem(item)
        });
        console.log("HELLO THERE")
        return (

            <Carousel 
            className="myCarouselItem"
            animation="fade">
                {imageList} 
            </Carousel>
        )
    }
}

export default BankCarousel;