import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";
import SimpleMDE from "react-simplemde-editor";
import customMarkdownParser from "react-simplemde-editor";

import "./AddPost.css";
import "easymde/dist/easymde.min.css";

export const AddPostPage = () => {
	const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);
	const [isLoading, setIsLoading] = React.useState(false);
	const [text, setText] = React.useState("");
	const [title, setTitle] = React.useState("");
	const [tags, setTags] = React.useState("");
	const [imageUrl, setImageUrl] = React.useState("");
	const [mainText, setMainText] = React.useState("");
	const inputFileRef = React.useRef(null);

	const handleChangeFile = async (event) => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append("image", file);
			const { data } = await axios.post("/upload", formData);
			setImageUrl(data.url);
		} catch (error) {
			console.warn(error);
			alert("Fisierul nu poate fi incarcat");
		}
	};

	const onClickRemoveImage = () => {
		setImageUrl("");
	};

	const onChange = React.useCallback((value) => {
		setText(value);
	}, []);

	const onSubmit = async () => {
		try {
			setIsLoading(true);

			const fields = {
				title,
				imageUrl,
				mainText,
				tags,
				text,
			};

			const { data } = await axios.post("/posts", fields);

			const id = data._id;

			navigate(`/posts/${id}`);
		} catch (error) {
			console.warn(error);
			alert("Articolul nu poate fi publicat");
		}
	};

	const options = React.useMemo(
		() => ({
			spellChecker: false,
      tabSize: 1,
			maxHeight: "400px",
			autofocus: true,
			placeholder: "Introduceți textul",
			status: false,
      showIcons: ['strikethrough', 'code', 'table', 'heading', 'heading-bigger', 'heading-smaller', 'heading-1', 'heading-2', 'heading-3', 'horizontal-rule'],
			autosave: {
				enabled: true,
				delay: 1000,
			},
      lineWrapping: false,
      parsingConfig: {
        allowAtxHeaderWithoutSpace: true,
        strikethrough: false,
        underscoresBreakWords: true,
      },
      previewRender: function(plainText, preview) {
        setTimeout(function(){
          preview.innerHTML = customMarkdownParser(plainText);
        }, 250);
    
        return "Loading...";
      },
		}),
		[]
	);

	if (!window.localStorage.getItem("token") && !isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<>
    <div className="container">

    <div className="flex-inputs">
    <input
				placeholder="Titlu"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea
				placeholder="Spune (câmp obligatoriu)"
				value={mainText}
				onChange={(e) => setMainText(e.target.value)}
			/>
			<input
				placeholder="Tag determinant"
				value={tags}
				onChange={(e) => setTags(e.target.value)}
			/>
      </div>
      <div className="flex-post-image">
			<button className="add-image-btn" onClick={() => inputFileRef.current.click()}>Încarcă poză</button>
			<input
				ref={inputFileRef}
				type="file"
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<div className="flex-post-image">
					<img
						className="post-image "
						src={`http://localhost:4444${imageUrl}`}
						alt="Uploaded"
					/>
          <button className="delete-image-btn" onClick={onClickRemoveImage}>Șterge poza</button>
				</div>
			)}
      </div>

			<SimpleMDE
        className="editor"
				vlaue={text}
				onChange={onChange}
				options={options}
			/>

			<div className="flex-bottom-btns">
				<button className="pub-btn" onClick={onSubmit}>Publică</button>
				<Link to="/">
					<button className="ann-btn">Anulează</button>
				</Link>
			</div>
    </div>
		</>
	);
};
