import {
    ADMINISTRATION,
    MAKESTAFF,
  
  } from "../actions/types.js";
  const initialState = {
   activeCases:null,
   illegalCases:null,
   sessionEndingCases:null

    
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case ADMINISTRATION:
      console.log(action.payload)

        if(action.payload["activeSerializer"]){
          return {
            ...state,
            activeCases:action.payload["activeSerializer"],
  
          };
        }if(action.payload["illegalCasesSerializer"]){
          console.log("called")
        return {
          ...state,
          illegalCases:action.payload["illegalCasesSerializer"],
        }
        };
        case MAKESTAFF:
          return {
            ...state,
          }
      default:
        return state;
    }
  }
  