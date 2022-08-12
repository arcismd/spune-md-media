import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/auth';
import SimpleMDE from 'react-simplemde-editor';
import axios from '../../axios'
import './AddPost.css'

import 'easymde/dist/easymde.min.css';

export const AddPostPage = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [mainText, setMainText] = React.useState('');
  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0]
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url)
    } catch (error) {
      console.warn(error)
      alert('Fisierul nu poate fi incarcat')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      const fields = {
        title,
        imageUrl,
        mainText,
        tags,
        text
      }

      const { data } = await axios.post('/posts', fields)


      const id = data._id

      navigate(`/posts/${id}`)
    } catch (error) {
      console.warn(error)
      alert('Articolul nu poate fi publicat')
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Introduceți textul',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <>
     <button onClick={() => inputFileRef.current.click()}>
        Incarca poza
      </button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <div>
        <button onClick={onClickRemoveImage}>
          Sterge poza
        </button>
        <img className='' src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </div>
      )}
      <br />
      <br />
      <input
        placeholder="Titlul..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
        <input
        placeholder="SPUNE"
        value={mainText}
        onChange={(e) => setMainText(e.target.value)}
      />
      <input 
      placeholder="Taguri"
      value={tags}
      onChange={(e) => setTags(e.target.value)}
       />





      <SimpleMDE className='' vlaue={text} onChange={onChange} options={options} />

      <div className=''>
        <button onClick={onSubmit}>
          Publica
        </button>
        <Link to='/'>
          <button>Anulare</button>
          </Link>
      </div>
    </>
  )
}
