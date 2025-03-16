import React from "react";
import AddMyVoiceView from "./AddMyVoiceView";

type Props = {
  handleClickOpenAddMyVoice: any;
  handleCloseAddMyVoice: any;
  openAddMyVoice: any;
  setLoading: any;
  loadMyVoices: any;
};

const AddMyVoiceController = ({
  handleClickOpenAddMyVoice,
  handleCloseAddMyVoice,
  openAddMyVoice,
  setLoading,
  loadMyVoices
}: Props) => {
  return (
    <AddMyVoiceView
      handleClickOpenAddMyVoice={handleClickOpenAddMyVoice}
      handleCloseAddMyVoice={handleCloseAddMyVoice}
      openAddMyVoice={openAddMyVoice}
      setLoading={setLoading}
      loadMyVoices={loadMyVoices}
    />
  );
};

export default AddMyVoiceController;
