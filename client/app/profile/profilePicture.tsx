"user client";
import axiosBasicInstance from "@/config/axiosConfig";
import supabaseClient from "@/services/supabaseClient";
import { useGeneralStore } from "@/store/generalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "react-modal";
// import { DetailedError } from "tus-js-client";
// const tus = require("tus-js-client");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "rgba(0, 0, 0, 0)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

type props = {
  pfpEditModalState: {
    state: boolean;
    closeModal: () => void;
  };
};

function ProfilePicture({ pfpEditModalState }: props) {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const auth = useGeneralStore((store) => store.auth);

  //   function uploadResumableFile(bucketName: string, fileName: string, file: File) {
  //     return new Promise<void>((resolve, reject) => {
  //       var upload = new tus.Upload(file, {
  //         endpoint: `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/upload/resumable`,
  //         retryDelays: [0, 3000, 5000, 10000, 20000],
  //         headers: {
  //             // authorization: `Bearer ${token}`,
  //             // authorization: `Bearer`,
  //           "x-upsert": "true", // optionally set upsert to true to overwrite existing files
  //         },
  //         uploadDataDuringCreation: true,
  //         metadata: {
  //           bucketName: bucketName,
  //           objectName: fileName,
  //           contentType: "image/png",
  //           cacheControl: 3600,
  //         },
  //         chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
  //         onError: function (error: DetailedError) {
  //           console.log("Failed because: " + error);
  //           reject(error);
  //         },
  //         onProgress: function (bytesUploaded: number, bytesTotal: number) {
  //           var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
  //           console.log(bytesUploaded, bytesTotal, percentage + "%");
  //         },
  //         onSuccess: function () {
  //           // console.log(upload)
  //           console.log("Download %s from %s", upload.file.name, upload.url);
  //           resolve();
  //         },
  //       });

  //       // Check if there are any previous uploads to continue.
  //       return upload.findPreviousUploads().then(function (previousUploads: any) {
  //         // Found previous uploads so we select the first one.
  //         if (previousUploads.length) {
  //           upload.resumeFromPreviousUpload(previousUploads[0]);
  //         }
  //         // Start the upload
  //         upload.start();
  //       });
  //     });
  //   }

  const changePFPurl = useMutation({
    mutationFn: (picUrl: string) =>
      axiosBasicInstance.post("/changePfp", {
        userEmail: auth?.email,
        picUrl: picUrl,
      }),
    onSuccess: (props) => {
      queryClient.invalidateQueries(["userData"]);
      setSelectedFile(null)
      pfpEditModalState.closeModal()
    },
  });

  const uploadFile = async (file: File) => {
    const { data, error } = await supabaseClient.storage
      .from("pfp")
      .upload(`public/${auth!.email}-pfp`, file, {
        upsert: true,
      });
    if (error) {
      console.log(error);
      return false;
    }
    //
    else {
      const { data } = supabaseClient.storage
        .from("pfp")
        .getPublicUrl(`public/${auth!.email}-pfp`);
      return data.publicUrl;
    }
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile && auth) {
      const picUrl = await uploadFile(selectedFile);
      if (picUrl) {
        console.log(picUrl);
        changePFPurl.mutate(picUrl);
      }
    }
  };

  return (
    <Modal
      isOpen={pfpEditModalState.state}
      onRequestClose={() => {
        setSelectedFile(null);
        pfpEditModalState.closeModal();
      }}
      style={customStyles}
    >
      {/* <div className="bg-donkey-dark-purple">
        <input onChange={handleFileChange} type="file" />
        <button className="bg-green-300" onClick={handleUpload}>
          Upload
        </button>
      </div> */}

      <div className=" border-dashed border-2 border-gray-700  w-72 h-80 relative bg-donkey-dark-purple">
        <input
          type="file"
          className=" w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
        <div
          className={`absolute flex justify-center items-center top-1/3 left-1/2 tranform -translate-x-1/2 -translate-y-1/2 w-2/3 h-1/3 ${
            !selectedFile &&
            "border-4 border-dashed border-gray-400 rounded-2xl pointer-events-none"
          }`}
        >
          {selectedFile ? (
            <img
              className="bg-gray-200 my-2 rounded-full h-20 w-20 md:h-24 md:w-24 object-cover"
              src={URL.createObjectURL(selectedFile)}
              height={50}
              width={50}
              alt=""
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-16 h-16 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          )}
        </div>
        <div
          className={`flex flex-col items-center absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2   ${
            !selectedFile && "pointer-events-none"
          }`}
        >
          <p
            className=" bg-donkey-rose hover:bg-donkey-grape cursor-pointer text-center font-semibold py-2 px-3 rounded-md text-white  text-lg"
            onClick={handleUpload}
          >
            {selectedFile ? "Set Profile" : "Select"}
          </p>
          <h4 className=" font-normal text-white text-center mt-3 text-sm">
            {selectedFile?.name || "Files supported png, jpg, jpeg."}
          </h4>
        </div>
      </div>
    </Modal>
  );
}

export default ProfilePicture;
