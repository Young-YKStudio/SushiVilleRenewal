import PublicFooter from "./PublicFooter"

const Footer = ({path}) => {

  const FooterDistributor = () => {
    if(path.startsWith('/dashboard')) {
      return null
    } else {
      return <PublicFooter />
    }
  }
  return (
    <>
      {FooterDistributor()}
    </>
  );
}
export default Footer;