import {
    ADMINISTRATION
  
  } from "../actions/types.js";
  const initialState = {
   activeCases:null,
   illegalCases:null,
   sessionEndingCases:null

    
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case ADMINISTRATION:
        return {
          ...state,
          activeCases:action.payload["activeSerializer"],
          illegalCases:action.payload["illegalCasesSerializer"],

        };
  
      default:
        return state;
    }
  }
  