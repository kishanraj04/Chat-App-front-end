import React, { useRef } from "react";
import { FaImage, FaVideo, FaFileAlt, FaMusic } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'
import { setFileUploading } from "../../store/reducers/tmpvariable";
import { useSendAttachmentsMutation } from "../../store/api/api";
function ChooseFile() {
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);
  const audioRef = useRef(null);
  const dispatch = useDispatch()
  const {chatId} = useSelector((state)=>state.tmp)
  const [sendAttachments] =  useSendAttachmentsMutation()
  const handleFileChange = async(e, type) => {
    const files = Array.from(e.target.files);
    if (files.length <= 0) {
      return
    }
    else if(files.length>5){
        toast.error("you can only send 5 file")
    }
    else {
        console.log(`${type} files selected:`, files);
    }
    dispatch(setFileUploading(true))

    try {
        const formdata = new FormData()
        formdata.append("chatId",chatId)
        files.forEach((file)=>formdata.append("files",file))

        const resp = await sendAttachments(formdata)
        dispatch(setFileUploading(false))
    } catch (error) {
        toast.error(error.message)
    }finally{
        setFileUploading(false)
    }
    e.target.value = "";
  };

  return (
    <div className="flex gap-4 bg-white p-2  rounded-xl shadow-xl w-fit items-center">
      {/* Image */}
      <div>
        <button
          onClick={() => imageRef.current?.click()}
          className="hover:bg-gray-200 p-2 rounded-full"
          title="Upload Image"
        >
          <FaImage size={15} className="text-blue-500" />
        </button>
        <input
          type="file"
          ref={imageRef}
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e, "Image")}
          className="hidden"
        />
      </div>

      {/* Video */}
      <div>
        <button
          onClick={() => videoRef.current?.click()}
          className="hover:bg-gray-200 p-2 rounded-full"
          title="Upload Video"
        >
          <FaVideo size={15} className="text-red-500" />
        </button>
        <input
          type="file"
          ref={videoRef}
          accept="video/mp4"
          multiple
          onChange={(e) => handleFileChange(e, "Video")}
          className="hidden"
        />
      </div>

      {/* File */}
      <div>
        <button
          onClick={() => fileRef.current?.click()}
          className="hover:bg-gray-200 p-2 rounded-full"
          title="Upload File"
        >
          <FaFileAlt size={15} className="text-green-600" />
        </button>
        <input
          type="file"
          ref={fileRef}
          multiple
          onChange={(e) => handleFileChange(e, "File")}
          className="hidden"
        />
      </div>

      {/* Audio */}
      <div>
        <button
          onClick={() => audioRef.current?.click()}
          className="hover:bg-gray-200 p-2 rounded-full"
          title="Upload Audio"
        >
          <FaMusic size={15} className="text-purple-600" />
        </button>
        <input
          type="file"
          ref={audioRef}
          accept="audio/*"
          multiple
          onChange={(e) => handleFileChange(e, "Audio")}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default ChooseFile;
