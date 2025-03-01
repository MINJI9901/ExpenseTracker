import { useState, useContext, useEffect } from "react";
// MUI
import {
  Grid2,
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  Avatar,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
// CONTEXTS
import { UserContext } from "@/context/UserContext";
import { ProfileContext } from "@/context/ProfileContext";
// COMPONENTS
import PasswordForm from "./PasswordForm";
import PopupBox from "../notification/PopupBox";
// HOOKS
import { getUser, updateUserProfile } from "@/lib/userApi";
import { deleteUser } from "@/app/login/actions";
import { toast } from "react-toastify";
import { ToastMsg } from "../notification/ToastMsg";
// SUPABASE
// import { createClient } from "@/utils/supabase/client";

export default function UserProfile() {
  console.log("render for Profile");
  const { palette } = useTheme();

  const blockName = ["name", "email"];

  const { user, setUser } = useContext(UserContext);
  const { userInfo, setUserInfo } = useContext(ProfileContext);

  const [openInput, setOpenInput] = useState({ name: false });
  const [openPopup, setOpenPopup] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  // To check whether a user logged in using social authentication or using email/password
  const [provider, setProvider] = useState("");

  useEffect(() => {
    if (user) {
      setProvider(user.app_metadata.provider);
      console.log("provider: ", user.app_metadata.provider);
    }
  }, [user]);

  // OPEN INPUT TO EDIT INFORMATION
  const handleOpenInput = (field) => {
    if (openInput[field]) {
      setOpenInput((prev) => ({ ...prev, [field]: false }));
    } else {
      setOpenInput((prev) => ({ ...prev, [field]: true }));
    }
  };

  // OPEN PASSWORD FORM TO CHANGE PASSWORD
  const handlePasswordForm = () => {
    changePassword ? setChangePassword(false) : setChangePassword(true);
  };

  // TO REFLECT NEWLY SELECTED IMAGE FOR PROFILE PICTURE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Convert file into url to show preview
    const objectUrl = URL.createObjectURL(file);
    // FileReader to read and convert file into buffer
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    console.log("reader: ", reader);

    reader.onloadend = () => {
      //   const buffer = Buffer.from(new Uint8Array(reader.result));
      const buffer = Buffer.from(reader.result);
      console.log("buffer: ", buffer);

      setUserInfo((prev) => ({
        ...prev,
        image: { src: objectUrl, buffer: buffer, type: file.type },
      }));
    };
  };

  // TO REFLECT CHANGES IN INPUT
  const handleEditInfo = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // TO SAVE CHANGES
  const handleSave = async () => {
    const body = { email: userInfo.email, name: userInfo.name };
    if (userInfo.image.buffer && userInfo.image.type) {
      body["image"] = {
        data: userInfo.image.buffer,
        contentType: userInfo.image.type,
      };
    }

    const userProfile = await updateUserProfile(user.id, body);
    setOpenInput((prev) => ({ ...prev, name: false }));
  };

  // TO DELETE ACCOUNT
  const handleDeleteAccount = async () => {
    // const supabase = createClient();
    // const { data, error } = supabase.auth.admin.deleteUser(user.id);
    // console.log(data);
    const res = await deleteUser(user.id);
  };

  const socialBadge =
    provider !== "email" ? (
      <Chip
        label={`${provider.toUpperCase()} LOGIN`}
        size="small"
        sx={{
          position: "absolute",
          right: 0,
          top: "0.2rem",
          bgcolor: palette.info.main,
          color: "white",
        }}
      />
    ) : (
      ""
    );

  return (
    <Box
      width={{ xs: "90%", sm: "70%", md: "60%" }}
      border={"1px solid"}
      borderColor={palette.grey[300]}
      borderRadius={"1rem"}
      padding={"2rem"}
      margin={"4rem auto"}
    >
      {openPopup ? (
        <PopupBox
          title={"Are you sure?"}
          msg={"You cannot restore a deleted account again"}
          noFn={() => setOpenPopup(false)}
          yesFn={handleDeleteAccount}
        />
      ) : (
        ""
      )}
      <Box width={"90%"} margin={"auto"}>
        <Typography
          variant="h1"
          fontSize={"2rem"}
          textAlign={"center"}
          mb={"1rem"}
        >
          Profile
        </Typography>
        <Grid2 container spacing={2} alignItems={"center"}>
          <Grid2 size={{ xs: 12, md: 4 }} position={"relative"}>
            <Avatar
              src={userInfo.image?.src}
              sx={{ width: "7rem", height: "7rem", alignSelf: "center" }}
            >
              {user ? "" : "?"}
            </Avatar>
            <Typography fontSize={"0.8rem"} color="gray" position={"relative"}>
              <CameraAltIcon fontSize="0.5rem" sx={{ mx: "0.3rem" }} />
              Change Photo
              <input
                type="file"
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "1rem",
                  width: "6rem",
                }}
                onChange={handleImageChange}
              ></input>
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            {["Profile Name", "Email"].map((item, idx) => (
              <Box key={item} mt={"1rem"}>
                <Typography margin={"auto"}>
                  {item}
                  {item !== "Email" ? (
                    <EditIcon
                      fontSize="1.2rem"
                      sx={{ margin: "auto 0.3rem" }}
                      onClick={() => handleOpenInput("name")}
                    />
                  ) : (
                    ""
                  )}
                </Typography>
                <Box
                  height={"2rem"}
                  border={"1px solid"}
                  borderColor={palette.grey[300]}
                  borderRadius={"0.5rem"}
                >
                  {openInput[blockName[idx]] ? (
                    <TextField
                      variant="standard"
                      size="small"
                      name={blockName[idx]}
                      value={userInfo[blockName[idx]]}
                      sx={{ height: "90%", mx: "0.5rem" }}
                      onChange={handleEditInfo}
                    >
                      {/* {userInfo[blockName[idx]]} */}
                    </TextField>
                  ) : (
                    <Box
                      lineHeight={"2rem"}
                      fontSize={"0.9rem"}
                      margin={"auto 0.5rem"}
                      position={"relative"}
                    >
                      {userInfo[blockName[idx]]}
                      {blockName[idx] === "email" ? socialBadge : ""}
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
            <Typography
              display={provider === "email" ? "block" : "none"}
              color="gray"
              fontSize={"0.9rem"}
              sx={{ cursor: "pointer" }}
              onClick={handlePasswordForm}
            >
              {changePassword ? "Close Form" : "Want to change the password?"}
            </Typography>
            {changePassword ? (
              <PasswordForm setCloseForm={setChangePassword} />
            ) : (
              ""
            )}
            <Box display={"flex"} justifyContent={"space-between"} mt={"2rem"}>
              <Button
                sx={{
                  bgcolor: palette.primary.dark,
                  color: "black",
                }}
                onClick={handleSave}
              >
                Save
              </Button>
              <Typography
                color={palette.error.light}
                fontSize={"0.9rem"}
                margin={"auto 0"}
                sx={{ cursor: "pointer" }}
                onClick={() => setOpenPopup(true)}
              >
                Delete Account
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}
