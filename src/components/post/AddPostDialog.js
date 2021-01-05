import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ArrowBackIos, PinDrop } from "@material-ui/icons";
import React from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { UserContext } from "../../App";
import { useAddPostDialogStyles } from "../../styles";
import serialize from "../../utils/serialize";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default function AddPostDialog({ media, handleClose }) {
  const classes = useAddPostDialogStyles();
  const { me } = React.useContext(UserContext);
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = React.useState(initialValue);
  const [location, setLocation] = React.useState("");
  const [submitting, setSubmitting] = React.useState([]);

  function handleSharePost() {}

  return (
    <Dialog fullScreen open onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <ArrowBackIos onClick={handleClose} />
          <Typography align="center" variant="body1" className={classes.title}>
            New Post
          </Typography>
          <Button
            color="primary"
            className={classes.share}
            disabled={submitting}
          >
            Share
          </Button>
        </Toolbar>
      </AppBar>
      <Divider className={classes.paper} />
      <Paper className={classes.paper}>
        <Avatar src={me.profile_image} />
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Editable
            className={classes.editor}
            placeholder="Write your caption..."
          />
        </Slate>
        <Avatar
          src={URL.createObjectURL(media)}
          className={classes.avatarLarge}
          variant="square"
        />
      </Paper>
      <TextField
        fullWidth
        placeholder="Location"
        InputProps={{
          classes: {
            root: classes.root,
            input: classes.input,
            underline: classes.underline,
          },
          startAdornment: (
            <InputAdornment>
              <PinDrop />
            </InputAdornment>
          ),
        }}
        onChange={(event) => setLocation(event.target.value)}
      />
    </Dialog>
  );
}
