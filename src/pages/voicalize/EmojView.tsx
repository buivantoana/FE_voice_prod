import React, { useState } from "react";
import { Box, Typography, Button, IconButton, useTheme, TextField } from "@mui/material";
import { RiUploadCloudFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";



const EmojView = ({textVoice,setTextVoice,limit}:any) => {
  const { t } = useTranslation();
  return (
    <Box >
      <AdvancedOptions />
      <Box
        width={"100%"}
        height={"100%"}
        position={"relative"}
        sx={{
          ".css-lh8pzc-MuiInputBase-root-MuiOutlinedInput-root": {
            height: "83%",
            border: "none",
          },
          ".css-15oluye-MuiFormControl-root-MuiTextField-root": {
            height: "90%",
          },
        }}
        boxSizing={"border-box"}>
        <TextField
          placeholder={t("input_text_desc")}
          multiline
          fullWidth
          value={textVoice}
                onChange={(e) => {
                  if (e.target.value.length <= limit) {
                    setTextVoice(e.target.value);
                  } else {
                    if (!limit) {
                      setTextVoice(e.target.value);
                    }
                  }
                }}
          rows={4} // Số dòng hiển thị
          variant='standard' // Loại bỏ border mặc định
          InputProps={{
            disableUnderline: true, // Bỏ underline của variant="standard"
            sx: {
              backgroundColor: "white", // Nền trắng
              borderRadius: 2, // Đặt border-radius nếu cần
              padding: 1, // Khoảng cách padding
            },
          }}
          sx={{
            "& .MuiInputBase-input": {
              height: "50vh !important", // Cài đặt chiều cao tự động
              minHeight: "100px", // Đặt chiều cao tối thiểu nếu cần
              resize: "none", // Bỏ resize của textarea
              overflow: "auto", // Để có thể cuộn
              scrollbarWidth: "none", // Ẩn thanh cuộn cho Firefox
              msOverflowStyle: "none", // Ẩn thanh cuộn cho Internet Explorer và Edge
            },
            "& .MuiFormControl-root": {
              minHeight: "100px", // Đặt chiều cao tối thiểu cho TextField
            },
            // Ẩn thanh cuộn trong các trình duyệt WebKit
            "&::-webkit-scrollbar": {
              display: "none", // Ẩn thanh cuộn
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default EmojView;









import {
  Chip,
  Modal,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,

} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PetsIcon from '@mui/icons-material/Pets';
import BoltIcon from '@mui/icons-material/Bolt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const options = [
  { label: 'Ác độc', icon: <PetsIcon />, value: 'acdoc' },
  { label: 'Năng lượng', icon: <BoltIcon />, value: 'nangluong' },
  { label: 'Lời nhắc', icon: <NotificationsIcon />, value: 'loinhac' },
];

const emotionOptions = [
  {
    value: 'acdoc1',
    icon: '😼',
    label: 'Ác độc 1',
    description: 'Nói tói thô ráp, kéo dài, đầy rắp rối.',
  },
  {
    value: 'acdoc2',
    icon: '😾',
    label: 'Ác độc 2',
    description: 'Ngữ điệu gay gắt, biểu cảm mạnh.',
  },
  {
    value: 'acdoc3',
    icon: '👹',
    label: 'Ác độc 3',
    description: 'Giọng dữ dội, tạo cảm giác đáng sợ.',
  },
];

const energyOptions = [
  {
    value: 'nangluong1',
    icon: '⚡️',
    label: 'Năng lượng 1',
    description: 'Giọng nhanh, nhiệt huyết, truyền cảm hứng.',
  },
  {
    value: 'nangluong2',
    icon: '🔥',
    label: 'Năng lượng 2',
    description: 'Cường độ cao, mạnh mẽ, khích lệ.',
  },
  {
    value: 'nangluong3',
    icon: '🎯',
    label: 'Năng lượng 3',
    description: 'Tập trung, sắc bén, rất dứt khoát.',
  },
];

// Initial list of reminders (this could come from a backend in a real app)
const initialReminders = [
  {
    value: 'loinhac1',
    label: 'Lời nhắc tùy chỉnh 1',
    prompt: 'Đây là lời nhắc tùy chỉnh số 1.',
  },
  {
    value: 'loinhac2',
    label: 'toan',
    prompt: 'Đây là lời nhắc cho toan.',
  },
];

function AdvancedOptions() {
  const [selected, setSelected] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string>('acdoc1');
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const [openEnergyModal, setOpenEnergyModal] = useState(false);
  const [selectedEnergy, setSelectedEnergy] = useState<string>('nangluong1');
  const [energySearch, setEnergySearch] = useState('');
  const [showCustomEnergyForm, setShowCustomEnergyForm] = useState(false);
  const [customEnergyName, setCustomEnergyName] = useState('');
  const [customEnergyPrompt, setCustomEnergyPrompt] = useState('');
  // State for reminders
  const [openReminderModal, setOpenReminderModal] = useState(false);
  const [reminders, setReminders] = useState(initialReminders);
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderName, setReminderName] = useState('');
  const [reminderPrompt, setReminderPrompt] = useState(''); // New state for the reminder prompt
  const [editReminderValue, setEditReminderValue] = useState<string | null>(null);
  const {t} = useTranslation()
  // Handle single selection for "Ác độc" or "Năng lượng"
  const handleToggle = (value: string) => {
    if (value === 'acdoc') {
      setOpenModal(true);
      setSelected(['acdoc']);
    } else if (value === 'nangluong') {
      setOpenEnergyModal(true);
      setSelected(['nangluong']);
    } else if (value === 'loinhac') {
      setOpenReminderModal(true);
      if (!selected.includes('loinhac')) {
        setSelected(prev => [...prev, 'loinhac']);
      }
    } else {
      setSelected(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    }
  };

  const handleEmotionSelect = (value: string) => {
    setSelectedEmotion(value);
    setOpenModal(false);
  };

  const filteredEmotionOptions = emotionOptions.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEnergyOptions = energyOptions.filter(option =>
    option.label.toLowerCase().includes(energySearch.toLowerCase())
  );

  const handleCustomEnergySubmit = () => {
    if (customEnergyName && customEnergyPrompt) {
      const newEnergy = {
        value: `custom-${Date.now()}`,
        icon: '🌟',
        label: customEnergyName,
        description: customEnergyPrompt,
      };
      energyOptions.push(newEnergy);
      setSelectedEnergy(newEnergy.value);
      setShowCustomEnergyForm(false);
      setCustomEnergyName('');
      setCustomEnergyPrompt('');
    }
  };

  // Reminder handlers
  const handleReminderSelect = (value: string) => {
    setSelectedReminder(value);
    setOpenReminderModal(false);
  };

  const handleReminderUnselect = () => {
    setSelectedReminder(null);
    setOpenReminderModal(false);
  };

  const handleReminderDelete = (value: string) => {
    setReminders(prev => prev.filter(reminder => reminder.value !== value));
    if (selectedReminder === value) {
      setSelectedReminder(null);
    }
  };

  const handleReminderEdit = (value: string, label: string, prompt: string) => {
    setEditReminderValue(value);
    setReminderName(label);
    setReminderPrompt(prompt); // Set the prompt for editing
    setShowReminderForm(true);
  };

  const handleReminderSubmit = () => {
    if (reminderName && reminderPrompt) {
      if (editReminderValue) {
        // Edit existing reminder
        setReminders(prev =>
          prev.map(reminder =>
            reminder.value === editReminderValue
              ? { ...reminder, label: reminderName, prompt: reminderPrompt }
              : reminder
          )
        );
        if (selectedReminder === editReminderValue) {
          setSelectedReminder(editReminderValue);
        }
      } else {
        // Create new reminder
        const newReminder = {
          value: `loinhac-${Date.now()}`,
          label: reminderName,
          prompt: reminderPrompt,
        };
        setReminders(prev => [...prev, newReminder]);
      }
      setShowReminderForm(false);
      setReminderName('');
      setReminderPrompt(''); // Reset the prompt field
      setEditReminderValue(null);
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        p="8px"
        sx={{ borderBottom: '1px solid #ddd' }}
        flexWrap="wrap"
      >
        <Typography variant="body2" color="text.secondary">
          ⚙️ {t("advanced_options")}:
        </Typography>
        {options.map(option => (
          <Chip
            key={option.value}
            label={
              <Box display="flex" alignItems="center" gap={0.5}>
                {option.icon}
                {option.label}
              </Box>
            }
            clickable
            onClick={() => handleToggle(option.value)}
            sx={{
              backgroundColor: selected.includes(option.value) ? '#e3f2fd' : '#f5f5f5',
              color: selected.includes(option.value) ? theme.palette.active.main : '#000',
              border: selected.includes(option.value)
                ? `1px solid ${theme.palette.active.main}`
                : '1px solid #ccc',
              '&:hover': {
                backgroundColor: selected.includes(option.value) ? '#bbdefb' : '#e0e0e0',
              },
              borderRadius: 2,
              fontWeight: 500,
              height: '26px',
            }}
          />
        ))}
      </Box>

      {/* Modal cảm xúc */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            width: 500,
            maxHeight: 600,
            overflowY: 'auto',
            bgcolor: 'background.paper',
            m: '100px auto',
            p: 2,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
          {t("choose_emotion")} “Ác độc”
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder={t("searching_for_emotions")}
            size="small"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused': {
                '& fieldset': {
                  borderColor: 'rgb(5 122 85)',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'rgb(5 122 85)',
              },
              mb: 2,
            }}
          />

          <List>
            {filteredEmotionOptions.map(option => {
              const isSelected = selectedEmotion === option.value;
              return (
                <ListItem
                  key={option.value}
                  sx={{
                    '&:hover': { backgroundColor: '#f5f5f5' },
                    borderRadius: 1,
                  }}
                  secondaryAction={
                    !isSelected && (
                      <Box display="flex" gap={1}>
                        <Button
                          size="small"
                          sx={{
                            borderColor: 'rgb(5 122 85)',
                            color: 'rgb(5 122 85)',
                          }}
                          variant="outlined"
                        >
                         {t("sample")}
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ bgcolor: 'rgb(5 122 85)' }}
                          onClick={() => handleEmotionSelect(option.value)}
                        >
                         {t("use")}
                        </Button>
                      </Box>
                    )
                  }
                >
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography fontWeight={500}>{option.label}</Typography>
                        {isSelected && <CheckIcon fontSize="small" color="primary" />}
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {option.description}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
            {filteredEmotionOptions.length === 0 && (
              <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
                Không tìm thấy cảm xúc phù hợp.
              </Typography>
            )}
          </List>
        </Box>
      </Modal>

      {/* Modal năng lượng */}
      <Modal open={openEnergyModal} onClose={() => setOpenEnergyModal(false)}>
        <Box
          sx={{
            width: 600,
            maxHeight: 600,
            overflowY: 'auto',
            bgcolor: 'background.paper',
            m: '100px auto',
            p: 2,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          {!showCustomEnergyForm ? (
            <>
              <Box mb={2} sx={{display:"flex" ,justifyContent:'space-between',alignItems:"center"}}> 
              <Typography variant="h6" >
              {t("choose_vibes")} “Năng lượng”
              </Typography>
                <Button
                variant="contained"
                sx={{  bgcolor: 'rgb(5 122 85)' }}
                onClick={() => setShowCustomEnergyForm(true)}
              >
                  {t("add_new_vibe")} 
              </Button>
              
              </Box>

              <TextField
                fullWidth
                variant="outlined"
                placeholder={t("search_vibes")}
                size="small"
                value={energySearch}
                onChange={e => setEnergySearch(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: 'rgb(5 122 85)',
                  },
                  mb: 2,
                }}
              />

              <List>
                {filteredEnergyOptions.map(option => {
                  const isSelected = selectedEnergy === option.value;
                  return (
                    <ListItem
                      key={option.value}
                      sx={{ '&:hover': { backgroundColor: '#f5f5f5' }, borderRadius: 1 }}
                      secondaryAction={
                        !isSelected && (
                          <Box display="flex" gap={1}>
                            <Button
                              size="small"
                              variant="contained"
                              sx={{ bgcolor: 'rgb(5 122 85)' }}
                              onClick={() => {
                                setSelectedEnergy(option.value);
                                setOpenEnergyModal(false);
                              }}
                            >
                                 {t("use")} 
                            </Button>
                          </Box>
                        )
                      }
                    >
                      <ListItemIcon>{option.icon}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontWeight={500}>{option.label}</Typography>
                            {isSelected && <CheckIcon fontSize="small" color="primary" />}
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {option.description}
                          </Typography>
                        }
                      />
                    </ListItem>
                  );
                })}
                {filteredEnergyOptions.length === 0 && (
                  <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
                    Không tìm thấy cảm xúc phù hợp.
                  </Typography>
                )}
              </List>

             
            </>
          ) : (
            <>
              <Typography variant="h6" mb={2}>
              {t("create_a_new_custom_vibe")} 
              </Typography>

              <TextField
                fullWidth
                variant="outlined"
                label=  {t("vibe_name")} 
                placeholder="Ex: Santa Claus"
                size="small"
                value={customEnergyName}
                onChange={e => setCustomEnergyName(e.target.value)}
                sx={{ mb: 2 }}
                helperText= {t("this_name_vibe")} 
              />

              <TextField
                fullWidth
                variant="outlined"
                label={t("vibe_prompt")} 
                placeholder={t("prompt_here")} 
                size="small"
                multiline
                rows={4}
                value={customEnergyPrompt}
                onChange={e => setCustomEnergyPrompt(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button
                  variant="outlined"
                  onClick={() => setShowCustomEnergyForm(false)}
                  sx={{ borderColor: 'rgb(5 122 85)', color: 'rgb(5 122 85)' }}
                >
                 {t("close")} 
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: 'rgb(5 122 85)' }}
                  onClick={handleCustomEnergySubmit}
                  disabled={!customEnergyName || !customEnergyPrompt}
                >
                 {t("complete")} 
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal lời nhắc */}
      <Modal open={openReminderModal} onClose={() => setOpenReminderModal(false)}>
        <Box
          sx={{
            width: 500,
            maxHeight: 600,
            overflowY: 'auto',
            bgcolor: 'background.paper',
            m: '100px auto',
            p: 2,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          {!showReminderForm ? (
            <>
            <Box mb={2} sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}> 
            <Typography variant="h6" >
            {t("custom_prompt")} 
              </Typography>

            <Button
                variant="contained"
                sx={{  bgcolor: 'rgb(5 122 85)' }}
                onClick={() => {
                  setShowReminderForm(true);
                  setEditReminderValue(null);
                  setReminderName('');
                  setReminderPrompt('');
                }}
              >
               {t("save")} 
              </Button>
            </Box>
              
              <List>
                {reminders.map(reminder => {
                  const isSelected = selectedReminder === reminder.value;
                  return (
                    <ListItem
                      key={reminder.value}
                      sx={{ '&:hover': { backgroundColor: '#f5f5f5' }, borderRadius: 1 }}
                      secondaryAction={
                        <Box display="flex" gap={1}>
                          {isSelected ? (
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ borderColor: 'rgb(5 122 85)', color: 'rgb(5 122 85)' }}
                              onClick={() => handleReminderUnselect()}
                            >
                              Không dùng
                            </Button>
                          ) : (
                            <Button
                              size="small"
                              variant="contained"
                              sx={{ bgcolor: 'rgb(5 122 85)' }}
                              onClick={() => handleReminderSelect(reminder.value)}
                            >
                                {t("use")} 
                            </Button>
                          )}
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleReminderEdit(reminder.value, reminder.label, reminder.prompt)
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleReminderDelete(reminder.value)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontWeight={500}>{reminder.label}</Typography>
                            {isSelected && <CheckIcon fontSize="small" color="primary" />}
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {reminder.prompt}
                          </Typography>
                        }
                      />
                    </ListItem>
                  );
                })}
                {reminders.length === 0 && (
                  <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
                    Bạn chưa có bất kỳ lời nhắc nào được lưu.
                  </Typography>
                )}
              </List>

              
            </>
          ) : (
            <>
              <Typography variant="h6" mb={2}>
                {editReminderValue ? t("edit_reminder")  : t("save_new_prompt")}
              </Typography>

              <TextField
                fullWidth
                variant="outlined"
                label= {t("prompt_name")} 
                placeholder={t("reminder_here")} 
                size="small"
                value={reminderName}
                onChange={e => setReminderName(e.target.value)}
                sx={{ mb: 2 }}
                helperText={t("your_reminder")} 
              />

              <TextField
                fullWidth
                variant="outlined"
                label={t("custom_prompt")} 
                placeholder={t("reminder_here")} 
                size="small"
                multiline
                rows={4}
                value={reminderPrompt}
                onChange={e => setReminderPrompt(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowReminderForm(false);
                    setReminderName('');
                    setReminderPrompt('');
                    setEditReminderValue(null);
                  }}
                  sx={{ borderColor: 'rgb(5 122 85)', color: 'rgb(5 122 85)' }}
                >
                    {t("close")} 
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: 'rgb(5 122 85)' }}
                  onClick={handleReminderSubmit}
                  disabled={!reminderName || !reminderPrompt}
                >
                  {editReminderValue ?  t("update") :  t("complete")}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

