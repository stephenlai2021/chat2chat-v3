"use client";

/* react */
import { useState, useRef, useEffect } from "react";

/* firebase */
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { firestore, storage } from "@/lib/firebase/client";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

/* react-icons */
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlineCloudUpload } from "react-icons/ai";

/* mongoose */
import User from "@/models/User";

export default function EditProfileModal({ id, userData }) {
  // console.log("user id: ", userData?._id);

  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showUploadBtn, setShowUploadBtn] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  const imageFileInputBoxRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
      return;
    }

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setShowUploadBtn(true);
    };
    reader.readAsDataURL(selectedFile);
  };

  // const handleImageUpload = () => {
  //   handleUpload();
  // };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }
    setShowUploadBtn(false);

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error.message);
      },
      () => {
        // Upload complete, get download URL and log it
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // Reset file && upload progress state and update message with download URL
          setFile(null);
          setUploadProgress(null);
          // console.log("File available at", downloadURL);

          setImage(downloadURL);
          // console.log("image | downloadURL: ", image);

          /* Close Modal and clear file name and image preview */
          document.getElementById("editProfileModal").close();
          imageFileInputBoxRef.current.value = "";
          setImagePreview(null);

          /* Update User Data in Firstore */
          // await updateDoc(doc(firestore, "users", userData?.email), {
          //   avatarUrl: downloadURL,
          // });

          // try {
          //   await fetch("/api/users/", {
          //     method: "PUT",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       // _id: userData?._id,
          //       name: userData?.name,
          //       email: userData?.email,
          //       avatarUrl: userData?.avatarUrl,
          //     }),
          //   });
          // } catch (error) {
          //   toast.error("Something went wrong");
          //   setLoading(false);
          // }

          getUsers();
          UpdateUserProfile()

          // Clear image preview
          // setImagePreview(null);
        });
      }
    );
  };

  const UpdateUserProfile = async () => {
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData?.name,
        email: userData?.email,
        avatarUrl: image,
      }),
    });
    const updatedUser = await res.json()
    if (res.ok) {
      console.log("updatedUser: ", updatedUser);
    }
    if (res.error) {
      toast.error("User Profile Updated failed");
      setLoading(false);
    }
  };

  const getUsers = async () => {
    const res = await fetch("/api/users");
    const users = await res.json();
    if (res.ok) console.log("all users: ", users);
    if (res.error) console.log(res.error);
  };

  const handleClose = () => {
    setImagePreview(null);
    imageFileInputBoxRef.current.value = "";
    document.getElementById("editProfileModal").close();
  };

  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        {/* <form method="dialog"> */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>
        {/* </form> */}

        <h3 className="font-bold text-lg">Edit Your Profile</h3>

        <div className="mt-4 flex flex-col border- border-red-30">
          <div className="flex flex-col items-center justify-center border- border-green-30">
            {userData?.avatarUrl && !imagePreview && (
              // {user?.avatarUrl && !imagePreview && (
              <img
                alt=""
                src={userData?.avatarUrl}
                // src={user?.avatarUrl}
                className={`object-cover rounded-full w-[100px] h-[100px]`}
              />
            )}

            {!userData?.avatarUrl && !imagePreview && (
              <img
                alt=""
                src="/avatar.png"
                className={`object-cover rounded-full w-[100px] h-[100px]`}
              />
            )}

            {userData?.avatarUrl && imagePreview && (
              <div className="relative">
                <img
                  alt=""
                  src={imagePreview}
                  className={`object-cover rounded-full w-[100px] h-[100px]`}
                />
                <div
                  className={`
                    backdrop-opacity-30 backdrop-invert bg-base-100/30 rounded-full w-[40px] h-[40px]
                    absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hover:cursor-pointer
                    ${showUploadBtn ? "block" : "hidden"}
                  `}
                >
                  <AiOutlineCloudUpload
                    className={`
                      text-base-content w-[30px] h-[30px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
                    `}
                    onClick={handleUpload}
                  />
                </div>
                <div
                  className={`
                    backdrop-opacity-30 backdrop-invert bg-base-100/30 rounded-full w-[40px] h-[40px]
                    absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                    ${
                      uploadProgress !== null && !showUploadBtn
                        ? "block"
                        : "hidden"
                    } 
                  `}
                >
                  {uploadProgress !== null && !showUploadBtn && (
                    <div
                      className={`
                        w-[35px] h-[35px] backdrop-opacity-30 backdrop-invert bg-base-100/30 radial-progress text-base-content absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
                      `}
                      style={{
                        "--value": uploadProgress,
                        "--size": "1rem",
                        "--thickness": "",
                      }}
                      role="progressbar"
                    >
                      {uploadProgress.toFixed(0)}%
                    </div>
                  )}
                </div>
              </div>
            )}

            {!userData?.avatarUrl && imagePreview && (
              <div className="relative">
                <img
                  alt=""
                  src={imagePreview}
                  className={`object-cover rounded-full w-[100px] h-[100px]`}
                />
                {/* ${imagePreview == null ? "hidden" : ""}  */}
                <div
                  className={`
                    backdrop-opacity-30 backdrop-invert bg-base-100/30 rounded-full w-[40px] h-[40px]
                    absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hover:cursor-pointer
                    ${showUploadBtn ? "block" : "hidden"}
                  `}
                >
                  <AiOutlineCloudUpload
                    className={`
                      text-base-content w-[30px] h-[30px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
                    `}
                    onClick={handleUpload}
                  />
                </div>
                <div
                  className={`
                    backdrop-opacity-30 backdrop-invert bg-base-100/30 rounded-full w-[40px] h-[40px]
                    absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hover:cursor-pointer
                    ${
                      uploadProgress !== null && !showUploadBtn
                        ? "block"
                        : "hidden"
                    } 
                  `}
                >
                  {uploadProgress !== null && !showUploadBtn && (
                    <div
                      className={`
                        w-[30px] h-[30px] backdrop-opacity-30 backdrop-invert bg-base-100/30 radial-progress text-base-content absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
                      `}
                      style={{
                        "--value": uploadProgress,
                        "--size": "1rem",
                        "--thickness": "",
                      }}
                      role="progressbar"
                    >
                      {uploadProgress.toFixed(0)}%
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Image File Input Box */}
            <div className="flex justify-between items-center mt-4">
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered file-input-primary text-base-content w-ful max-w-xs hover:cursor-pointer"
                ref={imageFileInputBoxRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        {/* Close Button */}
        {/* <div className="modal-action">
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </div> */}
      </div>
    </dialog>
  );
}
