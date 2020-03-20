

const valueMapper = {
    "sberbank": {
        "creditInsurance": {
            "mortgage": 2,
            "insurance": 1
        }
    },
    "skb": {
        "creditInsurance": {
            "mortgage": 0,
            "insurance": 2
        }
    },
    "sparkasse": {
        "creditInsurance": {
            "mortgage": 0,
            "insurance": 1
        }
    },
    "unicredit": {
        // not sure about values, just putting here because we need something
        "creditInsurance":{
            "mortgage": 0,
            "insurance": 1
        }
    }
}

export default valueMapper;