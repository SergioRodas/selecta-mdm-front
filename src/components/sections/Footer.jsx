const Footer = ({ documentSettings }) => {
  const footerStyles = documentSettings?.documentStyles?.footer || {};

  const footerPosition = () => {
    switch (footerStyles.position) {
      case 'left':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  };

  const getTextStyles = () => ({
    color: footerStyles.color,
    fontSize: `${footerStyles.fontSize}px`,
    fontWeight: footerStyles.fontWeight,
    fontFamily: footerStyles.font,
  });

  return (
    <section
      className="flex flex-wrap justify-between items-center border-t-2 mb-8"
      style={{ borderColor: footerStyles.pleca }}
    >
      <div
        className="flex items-center space-x-1 sm:space-x-3 divide-x-2 text-xs sm:text-sm font-bold mt-8"
        style={{ borderColor: footerStyles.pleca }}
      >
        <div>
          <p style={getTextStyles()}>atencionaclientes@intelicast.net</p>
        </div>
        <div>
          <p style={getTextStyles()} className="sm:ml-3 ml-1">
            Tel: (55)4627-4700
          </p>
        </div>
      </div>

      <div
        className="sm:w-52 w-32 mt-8"
        style={{ justifyContent: footerPosition() }}
      >
        {footerStyles.image && (
          <img src={footerStyles.image} alt="Logo" className="w-full" />
        )}
      </div>
    </section>
  );
};

export default Footer;
