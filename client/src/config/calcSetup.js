

const config = {
    "sberbank": {
        "creditInsurance": {
            "mortgage": 2,
            "insurance": 1
        },
        "creditAmountRange": {
            "stanovanjski": {
                "creditInsurance":{
                    "mortgage": {
                        "min_time": 12,
                        "max_time": 360,
                        "min_amount": 15000,
                        "max_amount": 500000
                    },
                    "insurance": {
                        "min_time": 12,
                        "max_time": 240,
                        "min_amount": 1000,
                        "max_amount": 50000
                    }
                }
            },
            "potrošniški": {
                "creditInsurance":{
                    "mortgage": {
                        "min_time": 12,
                        "max_time": 120,
                        "min_amount": 15000,
                        "max_amount": 500000
                    },
                    "insurance": {
                        "min_time": 12,
                        "max_time": 84,
                        "min_amount": 1000,
                        "max_amount": 50000
                    }
                }
            },
            "avtomobilski": {
                "creditInsurance":{
                "insurance": {
                    "min_time": 12,
                    "max_time": 84,
                    "min_amount": 1000,
                    "max_amount": 50000
                }
                }
            },
            "gotovinski": {
                "creditInsurance":{
                "insurance": {
                    "min_time": 12,
                    "max_time": 84,
                    "min_amount": 1000,
                    "max_amount": 50000
                },
                "mortgage": {
                    "min_time": 12,
                    "max_time": 120,
                    "min_amount": 15000,
                    "max_amount": 500000
                },
                }
            }
        }
    },
    "skb": {
        "creditInsurance": {
            "mortgage": 0,
            "insurance": 2
        },
        "creditAmountRange": {
            "stanovanjski": {
                "creditInsurance":{
                    "mortgage": {
                        "min_time": 13,
                        "max_time": 300,
                        "min_amount": 2000,
                        "max_amount": 300000
                    },
                    "insurance": {
                        "min_time": 13,
                        "max_time": 240,
                        "min_amount": 2000,
                        "max_amount": 50000
                    }
                }
            },
            "potrošniški": {
                "creditInsurance":{
                    "mortgage": {
                        "min_time": 12,
                        "max_time": 120,
                        "min_amount": 15000,
                        "max_amount": 500000
                    },
                    "insurance": {
                        "min_time": 12,
                        "max_time": 84,
                        "min_amount": 1000,
                        "max_amount": 50000
                    }
                }
            },
            "avtomobilski": {
                "creditInsurance":{
                "insurance": {
                    "min_time": 12,
                    "max_time": 84,
                    "min_amount": 1000,
                    "max_amount": 50000
                }
                }
            },
            "gotovinski": {
                "creditInsurance":{
                "insurance": {
                    "min_time": 12,
                    "max_time": 84,
                    "min_amount": 1000,
                    "max_amount": 50000
                },
                "mortgage": {
                    "min_time": 12,
                    "max_time": 120,
                    "min_amount": 15000,
                    "max_amount": 500000
                },
                }
            }
        }
    },
    
}


export default config;