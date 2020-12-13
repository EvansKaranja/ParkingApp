import {
    ACTIVECASES,
  ILLEGALCASES,
    MAKESTAFF,VEHICLE_TYPE_COUNT,TOTAL_AMOUNT_PER_WEEK
  
  } from "../actions/types.js";
  const initialState = {
   activeCases:null,
   illegalCases:null,
   sessionEndingCases:null,
   vehicleTypeCount:null,
   totalAmountPerWeek:null,
   

    
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case ACTIVECASES:
          return {
            ...state,
            activeCases:action.payload["activeSerializer"],
            illegalCases:null
  
          };
        case ILLEGALCASES:
          return {
            ...state,
            illegalCases:action.payload["illegalCasesSerializer"],
            activeCases:null
          }
        case MAKESTAFF:
          return {
            ...state,
          }
          case VEHICLE_TYPE_COUNT:
            return {
              ...state,vehicleTypeCount:action.payload
            }
            case TOTAL_AMOUNT_PER_WEEK:
            return {
              ...state,totalAmountPerWeek:action.payload
            }
      default:
        return state;
    }
  }
  