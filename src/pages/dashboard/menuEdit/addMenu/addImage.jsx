import { Widget } from "@uploadcare/react-widget";

const ImageUpload = ({uploadedImage, setUploadedImage}) => {

  return (
    <section className="w-full flex flex-row items-center justify-center gap-4">
      <p className="text-xs text-white">Add Image:</p>
      <Widget
        publicKey={process.env.UPLOADCARE_PUB}
        id='file'
        onFileSelect={(file) => {
          if(file) {
            file.done(info => {
              let originalUrl = info.originalUrl
              let filename = info.name
              let link = originalUrl + filename
              setUploadedImage(link)
            })
          }
        }}
      />
    </section>
  );
}
export default ImageUpload;