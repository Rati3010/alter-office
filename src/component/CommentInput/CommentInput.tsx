// import React from "react";
import { GrAttachment } from "react-icons/gr";
import "./CommentInput.css";
import { ChangeEvent, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../AuthContext";

const CommentInput: React.FC<{ postId: string }> = ({
  postId = "60df41c0b4d2f39e1c8a4e65",
}) => {
  const [text, setText] = useState<string>("");
  const [formats, setFormats] = useState<{
    bold: boolean;
    italic: boolean;
    underline: boolean;
  }>({
    bold: false,
    italic: false,
    underline: false,
  });
  const { user } = useContext(AuthContext);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const toggleFormat = (formatType: "bold" | "italic" | "underline") => {
    setFormats((prevFormats) => ({
      ...prevFormats,
      [formatType]: !prevFormats[formatType],
    }));
  };

  const getTextAreaStyle = () => {
    return {
      fontWeight: formats.bold ? "bold" : "normal",
      fontStyle: formats.italic ? "italic" : "normal",
      textDecoration: formats.underline ? "underline" : "none",
    };
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`,
        { postId, text },
        {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        }
      );
      if (response.data.success) {
        setText("");
        alert("Comment posted successfully!");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    }
  };
  return (
    <div className="text-area-container">
      <div>
        <textarea
          value={text}
          onChange={handleTextChange}
          className="text-area"
          style={getTextAreaStyle()}
        ></textarea>
        <hr />
        <div className="text-area-bottom">
          <div className="text-area-edit">
            <p
              onClick={() => toggleFormat("bold")}
              style={{ fontWeight: formats.bold ? "bold" : "normal" }}
            >
              B
            </p>
            <p
              onClick={() => toggleFormat("italic")}
              style={{ fontStyle: formats.italic ? "italic" : "normal" }}
            >
              I
            </p>
            <p
              onClick={() => toggleFormat("underline")}
              style={{
                textDecoration: formats.underline ? "underline" : "none",
              }}
            >
              U
            </p>
            <p>
              <GrAttachment />
            </p>
          </div>
          <button onClick={handleSubmit}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
