import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import axios from 'axios';

// Enregistrer les plugins FilePond
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileUploader = ({ setArticle, article }) => {
  const [files, setFiles] = useState([]);

  const serverOptions = {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'Ecommerce_cloudinary');
      data.append('cloud_name', 'iset-sfax');
      data.append('publicid', file.name);

      axios
        .post('https://api.cloudinary.com/v1_1/iset-sfax/image/upload', data)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setArticle({ ...article, imageart: data.url });
          load(data);
        })
        .catch((err) => {
          console.error('Error uploading file:', err);
          error('Upload failed');
          abort();
        });
    },
  };

  return (
    <div className="form-group">
      <label htmlFor="image">Image</label>
      <div style={{ width: '80%', margin: 'auto', padding: '1%' }}>
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={false}
          server={serverOptions}
          name="file"
          acceptedFileTypes={['image/*']}
        />
      </div>
    </div>
  );
};

export default FileUploader;
