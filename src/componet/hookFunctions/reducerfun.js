

export default function reducerfun(state,action) {
switch(action.type){
    case "otpchange":{
 return   {...state,...action?.value}
    }
    default:{
        return state
    }
    case "change":{
        return   {...state,...action?.value}

    }
}
}
