
import { useContext, useState } from 'react'
import { axiosInstance } from '../../components/config';
import { Context } from '../../components/context/Context';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './Write.css'

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [isloading, setIsloading] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();
  const newPost = {
  username : user.username,
   title,
   desc,
  };
  if (file) {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name", filename);
    data.append("file", file);
    newPost.photo = filename;

    try{
      setIsloading(true)
      await axiosInstance.post("/upload", data);

    }catch(err){}
    setIsloading(false)


  }
  try {
  const res = await axiosInstance.post("/posts", newPost);
  window.location.replace("/");
  }catch (err){}
}


  return (
<>
{isloading ? <LoadingSpinner /> : 
        <div className='write'>
      {file && (
        <img
        className='writeImg'
        src={URL.createObjectURL(file)}
        alt='writeimag'
        />
        )}
<form className="writeForm" onSubmit={handleSubmit}>
    <div className="writeFormGroup">
        <label htmlFor='fileInput'>
        <i className="writeFormIcon fa-solid fa-file-arrow-up"></i>
        </label>
        <input type="file" 
        id='fileInput' className='fileUpload' 
        style={{display:"none"}}
        onChange={(e) => setFile(e.target.files[0])}
          />
        <input type="text" 
        placeholder='Title' 
        className='writeInput tit' 
        autoFocus={true}
        onChange={(e) => setTitle(e.target.value)}
        />
    </div>
    <div className="writeFormGroup">
        <textarea placeholder='Write or upload your story...' 
        type="text" 
        className='writeInput writeText'
        onChange={(e) => setDesc(e.target.value)}></textarea>
    </div>
    <button className='writeSubmit' type='submit'>Publish</button>
</form>
    </div>
}
    </>
  )
}
