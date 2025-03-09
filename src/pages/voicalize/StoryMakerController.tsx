import React, { useEffect, useState } from "react";
import StoryMakerView from "./StoryMakerView";
import { getVoicesOpenAi } from "../../service/voice";
import { useCoursesContext } from "../../App";
import { useTranslation } from "react-i18next";

type Props = {
  setBlock: any;
  block: any;
  setHidden: any;
  hidden: any;
  voicesFavorite: any;
  setVoicesFavorite: any;
  myVoices: any;
};
let arr: any = [];
const StoryMakerController = ({
  setBlock,
  block,
  setHidden,
  hidden,
  voicesFavorite,
  setVoicesFavorite,
  myVoices,
}: Props) => {
  const [openAuthor, setOpenAuthor] = React.useState(false);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [voices, setVoices] = useState<any>([]);
  const [voice, setVoice] = useState<any>({});
  const [idVoice, setIdVoice] = useState(null);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [openEditAll, setOpenEditAll] = React.useState(false);
  const [isEditAll, setIsEditAll] = React.useState(false);
  const context: any = useCoursesContext();

  const [dataEditAll, setDataEditAll] = React.useState({
    name: "",
    delay: 0,
    voice: "alloy",
    speed: 1,
  });
  const handleCheckboxChange = (id: any) => {
    setSelectedItems((prev: any) =>
      prev.includes(id)
        ? prev.filter((itemId: any) => itemId !== id)
        : [...prev, id]
    );
  };
  useEffect(() => {
    if (Object.keys(context.state.history).length > 0) {
      if (context.state.history.content) {
        if (context.state.history.type == "story") {
          arr = context.state.history.content;
        }
      }
    }
  }, []);
  useEffect(() => {
    loadVoicesOpenai();
  }, []);
  useEffect(() => {
    if (idVoice && Object.keys(voice).length > 0) {
      arr = arr.map((item: any) =>
        item.id === idVoice
          ? { ...item, voice: voice.id, open: true, title: voice.name }
          : item
      );
      setBlock(arr);
      setTimeout(() => {
        setIdVoice(null);
        setVoice({});
        handleCloseAuthor();
      }, 500);
    }
  }, [idVoice, voice]);
  useEffect(() => {
    if (openEditAll && Object.keys(voice).length > 0) {
      setDataEditAll({ ...dataEditAll, voice: voice.id });
      setVoice({});
      handleCloseAuthor();
    }
  }, [openEditAll, voice]);
  const loadVoicesOpenai = async () => {
    setLoadingVoices(true);
    try {
      let data = await getVoicesOpenAi();
      console.log("AAAA data", data);
      if (data.voices && data.voices.length > 0) {
        setVoices(data.voices);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingVoices(false);
  };
  const handleClickOpenAuthor = () => {
    setOpenAuthor(true);
  };

  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };
  const handleClickOpenEditAll = () => {
    setOpenEditAll(true);
  };

  const handleCloseEditAll = () => {
    setIsEditAll(false);
    setDataEditAll({
      name: "",
      delay: 0,
      voice: "alloy",
      speed: 1,
    });
    setOpenEditAll(false);
  };
  // useEffect(() => {
  //   setBlock(arr);
  // }, [arr]);
  function themKhoi() {
    arr.push({
      id: 1,
      name: `Block 1`,
      text: "",
      delay: 0,
      voice: "alloy",
      speed: 1,
      open: true,
    });
    setBlock(arr);
  }
  function dongMoKhoi(idKhoi: any) {
    arr = arr.map((item: any) => {
      if (idKhoi == item.id) {
        return { ...item, open: true };
      }
      return { ...item, open: false };
    });
    setBlock(arr);
  }
  function xoaKhoi(idKhoi: any) {
    arr = arr.filter((item: any) => {
      return item.id != idKhoi;
    });

    if (!arr[0]) {
      setHidden(false);
      arr = [];
      setBlock([]);
    } else {
      setBlock(arr);
    }
  }
  function themKhoiSau(idHienTai: any) {
    let data = arr;
    const viTri = data.findIndex((block: any) => block.id === idHienTai);
    const khoiMoi = {
      id: data.length + 1,
      name: `Block ${data.length + 1}`,
      text: "",
      delay: 0,
      voice: "alloy",
      speed: 1,
      open: false,
    };
    data = [...arr.slice(0, viTri + 1), khoiMoi, ...arr.slice(viTri + 1)];

    arr = data.map((item: any) => {
      if (item.id == khoiMoi.id) {
        return { ...item, open: true };
      } else {
        return { ...item, open: false };
      }
    });
    console.log(arr);
    setBlock(arr);
  }
  function themKhoiMoi() {
    let data = arr;
    const khoiMoi = {
      id: data.length + 1,
      name: `Block ${data.length + 1}`,
      text: "",
      delay: 0,
      voice: "alloy",
      speed: 1,
      open: false,
    };

    arr = [...data, khoiMoi];
    arr = arr.map((item: any) => {
      if (item.id == data.length + 1) {
        return { ...item, open: true };
      } else {
        return { ...item, open: false };
      }
    });
    setBlock(arr);
  }
  function dongtatcakhoi() {
    arr = arr.map((item: any) => {
      return { ...item, open: false };
    });
    setBlock(arr);
  }
  function suaVanBanKhoi(idKhoi: any, vanBanMoi: any) {
    arr = arr.map((item: any) =>
      item.id === idKhoi ? { ...item, name: vanBanMoi, open: true } : item
    );
    setBlock(arr);
  }
  function suaVanBanVoice(idKhoi: any, vanBanMoi: any) {
    arr = arr.map((item: any) =>
      item.id === idKhoi ? { ...item, text: vanBanMoi, open: true } : item
    );
    setBlock(arr);
  }
  function suaGiayBatDau(idKhoi: any, giay: any) {
    arr = arr.map((item: any) =>
      item.id === idKhoi ? { ...item, delay: Number(giay), open: true } : item
    );
    setBlock(arr);
  }
  function suaTocDo(idKhoi: any, tocdo: any) {
    arr = arr.map((item: any) =>
      item.id === idKhoi ? { ...item, speed: Number(tocdo), open: true } : item
    );
    setBlock(arr);
  }
  function xoaKhoiChon() {
    console.log(selectedItems);
    arr = arr.filter((item: any) => {
      return !selectedItems.includes(item.id);
    });

    if (!arr[0]) {
      setHidden(false);
      arr = [];
      setBlock([]);
    } else {
      setBlock(arr);
    }
  }
  function xoaTatCa() {
    arr = [];
    if (!arr[0]) {
      setHidden(false);
      arr = [];
      setBlock([]);
    } else {
      setBlock(arr);
    }
  }
  function chonTatCa() {
    console.log(selectedItems);
    if (selectedItems.length == arr.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(arr.map((item: any) => item.id));
    }
  }
  console.log(dataEditAll);
  function suaTatCa() {
    if (openEditAll && dataEditAll.delay && dataEditAll.name) {
      arr = arr.map((item: any) => {
        if (selectedItems.includes(item.id)) {
          return {
            ...item,
            speed: dataEditAll.speed,
            delay: dataEditAll.delay,
            name: dataEditAll.name,
            voice: dataEditAll.voice,
          };
        } else {
          return item;
        }
      });
      setBlock(arr);
      handleCloseEditAll();
      setVoice({});
    } else {
      handleCloseEditAll();
      setVoice({});
    }
  }
  async function handleChangeSrt(event: any) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const srtFile = files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const srtContent = e.target.result;
      const blocks = parseSrtToBlocks(srtContent);
      arr = blocks;
      setBlock(arr);
      setHidden(true);
    };

    reader.readAsText(srtFile);
  }
  return (
    <StoryMakerView
      themKhoi={themKhoi}
      dongMoKhoi={dongMoKhoi}
      themKhoiSau={themKhoiSau}
      xoaKhoi={xoaKhoi}
      block={block}
      setHidden={setHidden}
      hidden={hidden}
      dongtatcakhoi={dongtatcakhoi}
      themKhoiMoi={themKhoiMoi}
      suaVanBanKhoi={suaVanBanKhoi}
      suaVanBanVoice={suaVanBanVoice}
      suaGiayBatDau={suaGiayBatDau}
      suaTocDo={suaTocDo}
      handleCloseAuthor={handleCloseAuthor}
      handleClickOpenAuthor={handleClickOpenAuthor}
      openAuthor={openAuthor}
      voices={voices}
      voice={voice}
      setVoice={setVoice}
      loadingVoices={loadingVoices}
      setIdVoice={setIdVoice}
      handleCheckboxChange={handleCheckboxChange}
      selectedItems={selectedItems}
      xoaKhoiChon={xoaKhoiChon}
      chonTatCa={chonTatCa}
      xoaTatCa={xoaTatCa}
      openEditAll={openEditAll}
      handleCloseEditAll={handleCloseEditAll}
      handleClickOpenEditAll={handleClickOpenEditAll}
      setIsEditAll={setIsEditAll}
      setDataEditAll={setDataEditAll}
      dataEditAll={dataEditAll}
      suaTatCa={suaTatCa}
      handleChangeSrt={handleChangeSrt}
      voicesFavorite={voicesFavorite}
      setVoicesFavorite={setVoicesFavorite}
      myVoices={myVoices}
    />
  );
};

export default StoryMakerController;
function parseSrtToBlocks(srtContent: any) {
  const blockTemplate = {
    id: 0,
    name: "",
    text: "",
    delay: 0,
    voice: "alloy",
    speed: 1,
    open: false,
  };

  const blocks: any = [];
  const srtEntries = srtContent.split("\n\n");

  srtEntries.forEach((entry: any, index: any) => {
    const lines = entry.split("\n");
    if (lines.length < 3) return;

    const [idLine, timeLine, ...textLines] = lines;
    const text = textLines.join("\n");

    const [start] = timeLine.split(" --> ");
    const delay = parseTimeToSeconds(start);

    blocks.push({
      ...blockTemplate,
      id: index + 1,
      name: `Block ${index + 1}`,
      text: text.trim(),
      delay,
    });
  });

  return blocks;
}

// Hàm chuyển đổi thời gian từ định dạng HH:MM:SS,ms thành giây
function parseTimeToSeconds(timeString: any) {
  const [hours, minutes, seconds] = timeString.split(":");
  const [sec, ms] = seconds.split(",");
  return (
    parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(sec, 10)
  );
}
