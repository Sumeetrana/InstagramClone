import React from "react";
import {createEditor} from "slate";
import {Slate, Editable, withReact} from "slate-react";
import {useAddPostDialogStyles} from '../../styles'


const initialValue = [
    {
        type: "paragraph",
        children: [{text: ""}]
    }
]

export default function AddPostDialog({ media, handleClose }) {
    const classes = useAddPostDialogStyles()
    const editor = React.useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = React.useState(initialValue)

  return (
    
  );
}
