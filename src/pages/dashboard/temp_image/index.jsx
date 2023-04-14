import { Widget } from "@uploadcare/react-widget";
import { useState } from 'react'

const ImageUpload = () => {

  const [ uploadedImages, SetUploadedImages ] = useState([{
    image: ''
  }])

  return (
    <section className="flex justify-center items-center w-full">
      <Widget
        publicKey={process.env.UPLOADCARE_PUB}
        id='file'
        onFileSelect={(file) => {
          if(file) {
            file.done(info => {
              SetUploadedImages((prev) => [...prev, {image: info.cdnUrl}])
            })
          }
        }}
      />
      {uploadedImages.length >= 1 && <div className="my-4">
          <div className="flex flex-col gap-2">
            {uploadedImages.map((image, i) => {
              return <div
                className="flex flex-row flex-nowrap items-center gap-4"
                key={i}
              >
                <img src={image.image} className="w-12" />
                <p>{image.image}</p>
              </div>
            })}
          </div>
        </div>
      }
    </section>
  );
}
export default ImageUpload;