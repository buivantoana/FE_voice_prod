import React, { useState } from "react";

import EmojView from "./EmojView";



const EmojController = ({textVoice,setTextVoice,limit}:any) => {
 
  return (
    <EmojView
    setTextVoice={setTextVoice} limit={limit} textVoice={textVoice}
    />
  );
};

export default EmojController;
