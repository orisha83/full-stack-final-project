
import React, {  createContext, useState } from "react";

export const SubscriptionsContext = createContext();

  export const SubscriptionsContextProvider = props => {
    const [subscriptions, setSubscriptions] = useState("")
  
    return (
      <SubscriptionsContext.Provider value={[subscriptions, setSubscriptions]}>
        {props.children}
      </SubscriptionsContext.Provider>
    );
  };